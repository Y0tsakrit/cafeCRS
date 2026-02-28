import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup'
import Navbar from './components/navbar'
import Home from './components/home'
import AboutUs from './components/aboutus'
import Service from './components/service';
import Contact from './components/contact';
import Faq from './components/faq';
import HomeLogin from './components/loginpage/homeLogin';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<HomeLogin/>}/>
        <Route path='/about' element={<AboutUs />} />
        <Route path='/signin' element={<Signup />}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/faq' element={<Faq/>}/>
      </Routes>
    </Router>
  );
}

export default App
