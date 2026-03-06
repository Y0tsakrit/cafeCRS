import { useState } from 'react'
import { Navigate } from 'react-router-dom';
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
import Resetpassword from './components/loginpage/resetpassword';
import History from './components/loginpage/history';
import Topup from './components/loginpage/topup';
import Reserve from './components/loginpage/reserve';
import Order from './components/loginpage/order';

function App() {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to='/' />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/signin' element={<Signup />}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/faq' element={<Faq/>}/>

        {/* login page - protected */}
        <Route path='/mainpage' element={<ProtectedRoute><HomeLogin/></ProtectedRoute>}/>
        <Route path='/resetpassword' element={<ProtectedRoute><Resetpassword/></ProtectedRoute>}/>
        <Route path='/history' element={<ProtectedRoute><History/></ProtectedRoute>}/>
        <Route path='/topup' element={<ProtectedRoute><Topup/></ProtectedRoute>}/>
        <Route path='/reserve' element={<ProtectedRoute><Reserve/></ProtectedRoute>}/>
        <Route path='/order' element={<ProtectedRoute><Order/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App
