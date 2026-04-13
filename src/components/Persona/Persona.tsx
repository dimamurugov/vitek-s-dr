import vitekSrc from './vitek.svg'
import holmBg from './holm.png'
import './Persona.css'

export function Persona() {
  return (
    <section className="persona" aria-label="Persona">
      <img className="persona-bg" src={holmBg} alt="" decoding="async" />
      <img className="persona-svg" src={vitekSrc} alt="" decoding="async" />
    </section>
  )
}
