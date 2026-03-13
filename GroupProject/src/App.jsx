
import Navbar from "./ui Components/Navbar/Navbar.jsx";
import HomePage from "./Pages/HomePage/Homepage.jsx";
import './App.css'
import Footer from "./ui Components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home(){
    return <HomePage/>
}

function App() {

  return (
    <>
        <BrowserRouter>
            <nav>
                <Navbar></Navbar>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        <Footer></Footer>
        </BrowserRouter>
    </>
  )
}

export default App
