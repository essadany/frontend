import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Interface from './Interface';
import SideNavBar from './components/sidebar/SideNavBar';
import Login from './components/Login/login';
import AuthUser from './components/Login/AuthUser';
import Auth from './components/sidebar/Auth';
import Guest from './components/sidebar/guest';
import Dashboard from './components/dashboard/Dashboard';
import './App.css'
function App() {
  return (
    <div className='app'><Interface /></div>
    
    /*<Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <ProtectedRoute path="/Dashboard"><Dashboard /></ProtectedRoute>
        <Route path="/" element={<Navigate to="/Dashboard" />} />
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    </Router>*/
  );
}

export default App;
