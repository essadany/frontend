import React from 'react'
import logo from './logo.svg';
import './App.css';
import Interface from './Interface';
import SideNavBar from './components/sidebar/SideNavBar';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/authenification/Login';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Interface />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
