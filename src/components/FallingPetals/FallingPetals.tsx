import { useEffect, useRef } from 'react'
import './FallingPetals.css'

interface Petal {
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  wobbleSpeed: number
  wobbleAmount: number
  opacity: number
}

function createPetal(width: number): Petal {
  return {
    x: Math.random() * width,
    y: -20 - Math.random() * 40,
    size: 10 + Math.random() * 14,
    rotation: Math.random() * 360,
    speed: 0.5 + Math.random() * 1,
    wobbleSpeed: 0.5 + Math.random() * 1.5,
    wobbleAmount: 15 + Math.random() * 25,
    opacity: 0.6 + Math.random() * 0.4,
  }
}

export function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petalsRef = useRef<Petal[]>([])

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

    // Initialize petals
    for (let i = 0; i < 30; i++) {
      const petal = createPetal(canvas.width)
      petal.y = Math.random() * canvas.height
      petalsRef.current.push(petal)
    }

    let animationId: number
    let lastTime = 0

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.globalAlpha = opacity

      // White petal body
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.ellipse(0, -size * 0.4, size * 0.3, size * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Subtle shadow
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.beginPath()
      ctx.ellipse(1, -size * 0.4 + 1, size * 0.3, size * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Yellow center
      ctx.fillStyle = '#f5e642'
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const animate = (time: number) => {
      const delta = (time - lastTime) / 16
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petalsRef.current.forEach((petal) => {
        petal.y += petal.speed * delta
        petal.x += Math.sin((time / 1000) * petal.wobbleSpeed) * petal.wobbleAmount * 0.02 * delta
        petal.rotation += 0.5 * delta

        if (petal.y > canvas.height + 20) {
          Object.assign(petal, createPetal(canvas.width))
        }

        drawPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.opacity)
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="falling-petals-canvas" />
}
