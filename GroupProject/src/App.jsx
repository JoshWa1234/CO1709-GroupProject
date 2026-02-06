import { useState } from 'react'
import Navbar from "./Components/Navbar/Navbar.jsx";
import HomePage from "./Pages/HomePage/Homepage.jsx";
import './App.css'
import Footer from "./Components/Footer/Footer.jsx";
function App() {

  return (
    <>
        <Navbar></Navbar>
        <HomePage></HomePage>
        <Footer></Footer>
    </>
  )
}

export default App
