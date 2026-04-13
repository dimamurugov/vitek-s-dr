import { useEffect, useRef } from 'react'
import './Fireworks.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  alpha: number
  decay: number
}

interface Rocket {
  x: number
  y: number
  targetY: number
  speed: number
  color: string
  exploded: boolean
}

const FIREWORK_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb', '#ffb347', '#fff']

function createRocket(width: number, height: number): Rocket {
  return {
    x: Math.random() * width,
    y: height,
    targetY: height * 0.1 + Math.random() * height * 0.3,
    speed: 3 + Math.random() * 3,
    color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
    exploded: false,
  }
}

function explode(rocket: Rocket): Particle[] {
  const particles: Particle[] = []
  const count = 50 + Math.floor(Math.random() * 30)

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count
    const speed = 1 + Math.random() * 3
    particles.push({
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: Math.random() > 0.5 ? rocket.color : FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
      alpha: 1,
      decay: 0.01 + Math.random() * 0.02,
    })
  }
  return particles
}

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rocketsRef = useRef<Rocket[]>([])
  const particlesRef = useRef<Particle[]>([])
  const lastLaunchRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize first rockets
    for (let i = 0; i < 5; i++) {
      rocketsRef.current.push(createRocket(canvas.width, canvas.height))
    }

    let animationId: number
    let lastTime = 0

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 16, 3)
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Launch new rockets periodically
      if (time - lastLaunchRef.current > 400 + Math.random() * 600) {
        rocketsRef.current.push(createRocket(canvas.width, canvas.height))
        lastLaunchRef.current = time
      }

      // Update and draw rockets
      rocketsRef.current = rocketsRef.current.filter((rocket) => {
        if (rocket.exploded) return false

        rocket.y -= rocket.speed * delta

        // Draw rocket trail
        ctx.fillStyle = rocket.color
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2)
        ctx.fill()

        // Trail effect
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.arc(rocket.x, rocket.y + 8, 1.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1

        // Explode when reaching target
        if (rocket.y <= rocket.targetY) {
          particlesRef.current.push(...explode(rocket))
          return false
        }

        return true
      })

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        particle.vy += 0.05 * delta // gravity
        particle.alpha -= particle.decay * delta

        if (particle.alpha <= 0) return false

        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      ctx.globalAlpha = 1

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fireworks-canvas" />
}
