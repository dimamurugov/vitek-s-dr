import { Info } from './components/Info/Info'
import { Persona } from './components/Persona/Persona'
import { Duration } from './components/Duration/Duration'
import { FallingPetals } from './components/FallingPetals/FallingPetals'
import { Fireworks } from './components/Fireworks/Fireworks'
import './App.css'

const today = new Date()
const isBirthday = today.getMonth() === 3 && today.getDate() === 14

function App() {
  return (
    <main className="app-center">
      {isBirthday ? <Fireworks /> : <FallingPetals />}
      <Info isBirthday={isBirthday} />
      <Persona />
      <Duration />
    </main>
  )
}

export default App
