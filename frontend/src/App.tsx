
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import { Landing } from './components/Landing'
import { Room } from './components/Room'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/room' element={<Room />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
