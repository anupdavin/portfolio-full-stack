import { useEffect, useRef, useState } from 'react'

const SKILLS = [
  'PLAN', 'CHALLENGE', 'PITFALLS', 'SETUP', 'DOCS', 'UI/UX',
  'CONCISE', 'CLEAN CODE', 'PRODUCTION', 'GRAPH', 'MAP', 'POLISH',
]

const THREE_MODULE_URL = 'https://esm.sh/three@0.180.0'

export default function ThreeAgentScene() {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('WebGLRenderingContext' in window)) {
      setFallback(true)
      return
    }

    let disposed = false
    let frame = 0
    let cleanup = () => {}

    const boot = async () => {
      try {
        const dynamicImport = new Function('url', 'return import(url)') as (url: string) => Promise<any>
        const THREE = await dynamicImport(THREE_MODULE_URL)
        if (disposed || !hostRef.current) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100)
        camera.position.set(0, 0, 8.8)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
        renderer.setSize(host.clientWidth, host.clientHeight)
        renderer.setClearColor(0x000000, 0)
        renderer.domElement.setAttribute('aria-hidden', 'true')
        host.appendChild(renderer.domElement)

        const group = new THREE.Group()
        scene.add(group)

        const nodeGeometry = new THREE.IcosahedronGeometry(0.13, 1)
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x4ade80 })
        const coreGeometry = new THREE.IcosahedronGeometry(0.52, 2)
        const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true })
        const core = new THREE.Mesh(coreGeometry, coreMaterial)
        group.add(core)

        const positions = SKILLS.map((_, index) => {
          const ring = index % 2 === 0 ? 2.15 : 2.85
          const angle = (index / SKILLS.length) * Math.PI * 2
          const z = Math.sin(index * 1.7) * 0.7
          return new THREE.Vector3(Math.cos(angle) * ring, Math.sin(angle) * ring * 0.72, z)
        })

        const nodes = positions.map((position) => {
          const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone())
          mesh.position.copy(position)
          group.add(mesh)
          return mesh
        })

        const linePoints: any[] = []
        positions.forEach((position) => {
          linePoints.push(new THREE.Vector3(0, 0, 0), position.clone())
        })
        for (let index = 0; index < positions.length; index += 1) {
          linePoints.push(positions[index].clone(), positions[(index + 1) % positions.length].clone())
        }
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.34 })
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
        group.add(lines)

        const particlesGeometry = new THREE.BufferGeometry()
        const particleCount = 170
        const particlePositions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i += 1) {
          particlePositions[i * 3] = (Math.random() - 0.5) * 9
          particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6
          particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
        const particles = new THREE.Points(
          particlesGeometry,
          new THREE.PointsMaterial({ color: 0x64748b, size: 0.025, transparent: true, opacity: 0.55 }),
        )
        scene.add(particles)

        let pointerX = 0
        let pointerY = 0
        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect()
          pointerX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.6
          pointerY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 0.35
        }
        const onResize = () => {
          if (!hostRef.current) return
          const width = host.clientWidth
          const height = Math.max(host.clientHeight, 1)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
        host.addEventListener('pointermove', onPointerMove)
        window.addEventListener('resize', onResize)

        const startedAt = performance.now()
        const render = () => {
          const elapsed = (performance.now() - startedAt) / 1000
          group.rotation.y += (pointerX - group.rotation.y) * 0.035
          group.rotation.x += (-pointerY - group.rotation.x) * 0.035
          core.rotation.x = elapsed * 0.32
          core.rotation.y = elapsed * 0.48
          nodes.forEach((node, index) => {
            const pulse = 1 + Math.sin(elapsed * 2 + index * 0.75) * 0.16
            node.scale.setScalar(pulse)
          })
          particles.rotation.y = elapsed * 0.018
          renderer.render(scene, camera)
          frame = requestAnimationFrame(render)
        }
        render()

        cleanup = () => {
          cancelAnimationFrame(frame)
          host.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('resize', onResize)
          nodeGeometry.dispose()
          coreGeometry.dispose()
          coreMaterial.dispose()
          nodeMaterial.dispose()
          lineGeometry.dispose()
          lineMaterial.dispose()
          particlesGeometry.dispose()
          particles.material.dispose()
          nodes.forEach((node) => node.material.dispose())
          renderer.dispose()
          renderer.domElement.remove()
        }
      } catch {
        if (!disposed) setFallback(true)
      }
    }

    void boot()
    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div className="relative min-h-[430px] md:min-h-[520px] rounded-3xl overflow-hidden border border-green-400/20 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),rgba(2,6,23,0.7)_48%,rgba(0,0,0,0.94)_76%)] shadow-2xl">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 text-[10px] md:text-xs font-mono tracking-[0.22em] text-gray-500">
        <span>AGENT.OS / LIVE GRAPH</span>
        <span className="text-green-400">12 SKILLS • 1 SYSTEM</span>
      </div>

      <div ref={hostRef} className="absolute inset-0" aria-label="Interactive Three.js agent orchestration graph">
        {fallback && (
          <div className="absolute inset-0 grid place-items-center p-10">
            <div className="relative w-72 h-72 rounded-full border border-blue-400/25 animate-[spin_28s_linear_infinite]">
              <div className="absolute inset-[25%] rounded-full border border-green-400/45 shadow-[0_0_45px_rgba(34,197,94,0.25)]" />
              {SKILLS.map((skill, index) => {
                const angle = (index / SKILLS.length) * Math.PI * 2
                const x = 50 + Math.cos(angle) * 47
                const y = 50 + Math.sin(angle) * 47
                return <span key={skill} className="absolute w-2 h-2 rounded-full bg-green-400" style={{ left: `${x}%`, top: `${y}%` }} />
              })}
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-x-4 bottom-4 z-10 grid grid-cols-2 md:grid-cols-3 gap-2 pointer-events-none">
        {SKILLS.slice(0, 6).map((skill, index) => (
          <div key={skill} className="rounded-lg border border-gray-700/70 bg-black/65 backdrop-blur px-3 py-2 font-mono text-[10px] md:text-xs text-gray-300">
            <span className="text-green-400 mr-2">0{index + 1}</span>{skill}
          </div>
        ))}
      </div>
    </div>
  )
}
