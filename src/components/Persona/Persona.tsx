import vitekSrc from './vitek.svg'
import './Persona.css'

export function Persona() {
  return (
    <section className="persona" aria-label="Persona">
      <img className="persona-svg" src={vitekSrc} alt="" decoding="async" />
    </section>
  )
}
