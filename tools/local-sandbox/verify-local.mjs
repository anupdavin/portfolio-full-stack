import { spawn, spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)))
const outputDir = resolve(root, '.local-sandbox', 'dist')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const port = Number(process.env.LOCAL_VERIFY_PORT || 4173)
const localEnv = {
  ...process.env,
  FORCE_COLOR: '0',
  LOCAL_SANDBOX: 'true',
}

const checks = []

function record(name, passed, detail = '', severity = 'error') {
  checks.push({ name, passed, detail, severity })
}

function tail(output, lines = 10) {
  return output.trim().split('\n').slice(-lines).join('\n')
}

function runNpm(script, timeoutMs = 120000) {
  const result = spawnSync(npmCommand, ['run', script], {
    cwd: root,
    env: localEnv,
    encoding: 'utf8',
    timeout: timeoutMs,
  })
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`
  return {
    code: result.error ? 1 : result.status ?? 1,
    output: result.error ? `${output}\n${result.error.message}` : output,
  }
}

function readText(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

function collectTextFiles(relativePath) {
  const absolutePath = resolve(root, relativePath)
  if (!existsSync(absolutePath)) return []
  if (statSync(absolutePath).isFile()) return [absolutePath]

  const files = []
  for (const entry of readdirSync(absolutePath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.local-sandbox') continue
    const childPath = join(absolutePath, entry.name)
    if (entry.isDirectory()) files.push(...collectTextFiles(childPath))
    else if (/\.(css|html|js|json|md|ts|tsx|yml|yaml)$/.test(entry.name)) files.push(childPath)
  }
  return files
}

function hasForbiddenSecret(text) {
  return [
    /sk-[A-Za-z0-9_-]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  ].some((pattern) => pattern.test(text))
}

async function waitForHttp(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs
  let lastError = 'not attempted'
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      return { response, body: await response.text() }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
      await new Promise((resolveWait) => setTimeout(resolveWait, 250))
    }
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError}`)
}

const requiredFiles = [
  'package.json',
  'package-lock.json',
  'index.html',
  'src/main.tsx',
  'src/pages/Portfolio.tsx',
  'public/chat/index.json',
]

for (const file of requiredFiles) {
  record(`required file: ${file}`, existsSync(resolve(root, file)), 'active application structure')
}

let packageJson
try {
  packageJson = JSON.parse(readText('package.json'))
  record('package metadata', Boolean(packageJson.name && packageJson.scripts?.['verify:local']), 'package.json is valid')
} catch (error) {
  record('package metadata', false, error instanceof Error ? error.message : String(error))
}

try {
  const chatDocs = JSON.parse(readText('public/chat/index.json'))
  const ids = new Set()
  const valid = Array.isArray(chatDocs) && chatDocs.length > 0 && chatDocs.every((doc) => {
    const hasFields = doc && typeof doc.id === 'string' && typeof doc.title === 'string' && typeof doc.text === 'string'
    const uniqueId = hasFields && !ids.has(doc.id)
    if (hasFields) ids.add(doc.id)
    return hasFields && uniqueId && doc.text.trim().length > 20
  })
  record('knowledge base schema', valid, valid ? `${chatDocs.length} documents` : 'expected unique id/title/text records')
} catch (error) {
  record('knowledge base schema', false, error instanceof Error ? error.message : String(error))
}

const indexHtml = readText('index.html')
record('portfolio metadata', /<title>[^<]+<\/title>/.test(indexHtml) && /name="description"/.test(indexHtml), 'title and description are present')

const sourceFiles = [
  ...collectTextFiles('src'),
  resolve(root, 'index.html'),
  resolve(root, 'public/chat/index.json'),
  resolve(root, 'Portfolio.md'),
]
const sourceText = sourceFiles.map((file) => readFileSync(file, 'utf8')).join('\n')

record('secret scan', !hasForbiddenSecret(sourceText), 'scanned active source, metadata, and knowledge content')

const warnings = [
  { name: 'placeholder links', pattern: /href\s*=\s*["']#["']/g, detail: 'replace placeholder anchors before public release' },
  { name: 'template identity residue', pattern: /Alex Thompson|San Francisco, CA|CodeNinja/g, detail: 'replace template identity or location text' },
  { name: 'generic external destinations', pattern: /https:\/\/github\.com\/(?:"|')|https:\/\/calendly\.com(?:"|')/g, detail: 'use a verified destination or remove the CTA' },
  { name: 'fake contact success state', pattern: /Message sent!|I['’]ll get back to you within 24 hours/g, detail: 'do not claim delivery without a real handoff' },
  { name: 'default Vite residue', pattern: /React \+ TypeScript \+ Vite|vite\.svg/g, detail: 'replace template copy/assets in the public experience' },
]

for (const warning of warnings) {
  const matches = sourceText.match(warning.pattern) ?? []
  record(`quality warning: ${warning.name}`, matches.length === 0, `${matches.length} match(es); ${warning.detail}`, 'warning')
}

const build = runNpm('build')
const lint = runNpm('lint')
record('local production build', build.code === 0, tail(build.output), 'error')
record('active lint', lint.code === 0, tail(lint.output), 'error')

let previewProcess
if (build.code === 0) {
  const builtIndexPath = join(outputDir, 'index.html')
  const builtIndex = existsSync(builtIndexPath) ? readFileSync(builtIndexPath, 'utf8') : ''
  record('isolated output directory', existsSync(outputDir) && builtIndex.length > 0, outputDir)
  record('local root base path', !builtIndex.includes('/portfolio-full-stack/'), 'local build must be mounted at /')

  const assetDirectory = join(outputDir, 'assets')
  if (existsSync(assetDirectory)) {
    const largestJavaScript = readdirSync(assetDirectory)
      .filter((file) => file.endsWith('.js'))
      .map((file) => ({ file, bytes: statSync(join(assetDirectory, file)).size }))
      .sort((left, right) => right.bytes - left.bytes)[0]
    const withinBudget = !largestJavaScript || largestJavaScript.bytes <= 500_000
    record(
      'bundle size budget',
      withinBudget,
      largestJavaScript ? `${largestJavaScript.file}: ${largestJavaScript.bytes} bytes (target <= 500000)` : 'no JavaScript assets found',
      'warning',
    )
  } else {
    record('bundle size budget', false, 'assets directory is missing', 'warning')
  }

  if (process.env.LOCAL_VERIFY_SKIP_PREVIEW === 'true') {
    record('preview smoke checks', true, 'skipped by LOCAL_VERIFY_SKIP_PREVIEW', 'warning')
  } else {
    previewProcess = spawn(npmCommand, ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], {
      cwd: root,
      env: localEnv,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    try {
      const page = await waitForHttp(`http://127.0.0.1:${port}/`)
      record('preview serves HTML', page.response.ok && page.body.includes('<div id="root"></div>'), `${page.response.status}`)

      const chat = await waitForHttp(`http://127.0.0.1:${port}/chat/index.json`)
      record('knowledge endpoint', chat.response.ok && chat.body.trimStart().startsWith('['), `${chat.response.status}`)

      const fallback = await waitForHttp(`http://127.0.0.1:${port}/deep-link-check`)
      record('SPA fallback', fallback.response.ok && fallback.body.includes('<div id="root"></div>'), `${fallback.response.status}`)

      const assetMatch = builtIndex.match(/(?:src|href)="([^"?]+assets[^"?]+)"/)
      if (assetMatch?.[1]) {
        const asset = await waitForHttp(`http://127.0.0.1:${port}${assetMatch[1]}`)
        record('built asset serves', asset.response.ok, `${asset.response.status} ${assetMatch[1]}`)
      } else {
        record('built asset serves', false, 'no built asset reference found')
      }
    } catch (error) {
      record('preview smoke checks', false, error instanceof Error ? error.message : String(error))
    } finally {
      previewProcess.kill('SIGTERM')
    }
  }
} else {
  record('preview smoke checks', false, 'skipped because the build failed')
}

console.log('\nLocal sandbox verification')
for (const check of checks) {
  const label = check.passed ? 'PASS' : check.severity === 'warning' ? 'WARN' : 'FAIL'
  console.log(`${label}  ${check.name}`)
  if (!check.passed && check.detail) console.log(`      ${check.detail}`)
}

const failures = checks.filter((check) => !check.passed && check.severity === 'error')
const warningsFound = checks.filter((check) => !check.passed && check.severity === 'warning')
const passed = checks.filter((check) => check.passed).length
console.log(`\n${passed}/${checks.length} checks passed; ${warningsFound.length} warning(s); ${failures.length} hard failure(s)`)
process.exitCode = failures.length > 0 ? 1 : 0
