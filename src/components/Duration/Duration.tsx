import { useState, useEffect } from 'react'
import './Duration.css'

export function Duration() {
  const getTimeUntilBirthday = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    let nextBirthday = new Date(currentYear, 3, 14) // 14 апреля

    if (today >= nextBirthday) {
      nextBirthday = new Date(currentYear + 1, 3, 14)
    }

    const diff = nextBirthday.getTime() - today.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState(getTimeUntilBirthday)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilBirthday())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="duration" aria-label="Duration">
      <p className="duration-text">
        до следующего др осталось:
      </p>
      <div className="duration-countdown">
        <div className="duration-unit">
          <span className="duration-value">{timeLeft.days}</span>
          <span className="duration-label">д</span>
        </div>
        <div className="duration-unit">
          <span className="duration-value">{timeLeft.hours}</span>
          <span className="duration-label">ч</span>
        </div>
        <div className="duration-unit">
          <span className="duration-value">{timeLeft.minutes}</span>
          <span className="duration-label">м</span>
        </div>
        <div className="duration-unit">
          <span className="duration-value">{timeLeft.seconds}</span>
          <span className="duration-label">с</span>
        </div>
      </div>
    </section>
  )
}
