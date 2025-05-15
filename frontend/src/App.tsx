import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' component={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
