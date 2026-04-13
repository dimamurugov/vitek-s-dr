import { Info } from './components/Info/Info'
import { Persona } from './components/Persona/Persona'
import { Duration } from './components/Duration/Duration'
import { FallingPetals } from './components/FallingPetals/FallingPetals'
import './App.css'

function App() {
  return (
    <main className="app-center">
      <FallingPetals />
      <Info />
      <Persona />
      <Duration />
    </main>
  )
}

export default App
