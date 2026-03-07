import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
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
import Homestaff from './components/staffpage/homestaff';
import Editmenu from './components/staffpage/editmenu';
import Manageacc from './components/staffpage/manageacc';
import Viewstatus from './components/staffpage/viewstatus';

function AppContent() {
  const location = useLocation();
  const isStaffPage = location.pathname.startsWith('/staff');

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to='/' />;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.clear();
        return <Navigate to='/' />;
      }
    } catch {
      localStorage.clear();
      return <Navigate to='/' />;
    }
    return children;
  };

  return (
    <>
      {!isStaffPage && <Navbar />}
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

        {/* staff page - protected */}
        <Route path='/staffhome' element={<ProtectedRoute><Homestaff/></ProtectedRoute>}/>
        <Route path='/staffmenu' element={<ProtectedRoute><Editmenu/></ProtectedRoute>}/>
        <Route path='/staffaccounts' element={<ProtectedRoute><Manageacc/></ProtectedRoute>}/>
        <Route path='/staffstatus' element={<ProtectedRoute><Viewstatus/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
