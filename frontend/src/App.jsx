import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Login from './pages/LoginPage/Login'
import {ProfileDetails} from './pages/ProfileDetails/ProfileDetails'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ProfileDetails/>
    </div>
  )
}

export default App
