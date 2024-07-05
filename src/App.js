import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import { PexelProvider } from './context/PexelContext'
import Navbar from './page/Navbar'


function App() {
  return (
    <div>
      <PexelProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PexelProvider>
    </div>
  )
}

export default App
