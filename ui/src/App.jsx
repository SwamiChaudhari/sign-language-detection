import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Service from './components/Service'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Hero/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/service" element={<Service/>}/>
    </Routes>
   
    {/* <Hero/> */}
    </BrowserRouter>
    </>
  )
}

export default App
