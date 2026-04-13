import vitekSrc from './vitek.svg'
import holmBg from './holm.png'
import colpackSrc from './colpack.png'
import './Persona.css'

interface PersonaProps {
  isBirthday: boolean
}

export function Persona({ isBirthday }: PersonaProps) {
  return (
    <section className="persona" aria-label="Persona">
      <img className="persona-bg" src={holmBg} alt="" decoding="async" />
      <img className="persona-svg" src={vitekSrc} alt="" decoding="async" />
      {isBirthday && <img className="persona-colpack" src={colpackSrc} alt="" decoding="async" />}
    </section>
  )
}
