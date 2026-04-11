import './Info.css'

export function Info() {
  const birthDate = new Date(1999, 3, 14) // 14 апреля 1999 (месяц 0-indexed)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return (
    <section className="info" aria-label="Information">
      <p className="info-text">сегодня Вите <span className="info-age">{age}</span> лет</p>
    </section>
  )
}
