import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve(process.env.LOCAL_SANDBOX === 'true' ? '.local-sandbox/dist' : 'docs')

const server = http.createServer((req, res) => {
  const urlPath = req.url && req.url !== '/' ? req.url.split('?')[0] : '/index.html'
  let filePath = path.join(distDir, urlPath)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html')
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500)
      res.end('Internal Server Error')
      return
    }
    const ext = path.extname(filePath)
    const typeByExtension = {
      '.css': 'text/css; charset=utf-8',
      '.html': 'text/html; charset=utf-8',
      '.ico': 'image/x-icon',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml',
    }
    const type = typeByExtension[ext] ?? 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type })
    res.end(data)
  })
})

const port = process.env.PORT ? Number(process.env.PORT) : 5173
server.listen(port, '0.0.0.0', () => {
  console.log(`Serving docs on http://localhost:${port}`)
})
