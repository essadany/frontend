import React,{useEffect, useState} from 'react';
import {  BrowserRouter as Router, Route, Routes,Navigate, useLocation } from 'react-router-dom';
import './Interface.css'
import SideNavBar from './components/sidebar/SideNavBar';
import Tab from './components/tabs/Tab';
import Header from './components/header/Header';
import Product from './components/products/Product';
import Report from './components/8d_report/Report';
import Claims from './components/claims/Claims';
import Customer from './components/customers/Customer';
import Dashboard from './components/dashboard/Dashboard';
import Claim_track from './components/claims_tracking/Claim_track';
import MyActions from './components/my_actions/MyActions';
import Users from './components/users/Users';
import Actions from './components/actions/Actions';
import Effectiveness from './components/effectiveness/Effectiveness';
import Team from './components/team/Team';
import Meetings from './components/meetings/Meetings';
import Pb_desc from './components/problem_description/Pb_desc';
import Containement from './components/containement/Containement';
import Five_Why from './components/5why/Five_Why';
import Label_Check from './components/label_checking/Label_Check';
import Login from './components/Login/login';
import Annexe from './components/8d_annexe/Annexe';
import './App.css'
import './components/8d_report/Report.css'
import './components/header/Header.css'

import {useAuth, AuthProvider } from './components/Login/AuthProvider';
import { RequireAuth } from './components/Login/RequireAuth';
import Ishikawa from './components/ishikawa/Ishikawa';



export default function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set the CSS variables dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--window-width', `${windowWidth}px`);
    document.documentElement.style.setProperty('--window-height', `${windowHeight}px`);
    console.log('width = ',windowWidth)
    
  }, [windowWidth, windowHeight]);



  const Menu = ()=>{
    if (useAuth().user ){
      return (<><SideNavBar />
      <Header /></>);
    }
  } 
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
if (isLoginPage) {
  document.body.classList.add('login-page');
} else {
  document.body.classList.remove('login-page');
}

  return (  
      
    <div className='app'>

      
          <AuthProvider>
          
      <Menu />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path='/' element={<RequireAuth>< Dashboard /></RequireAuth>}/>

          <Route exact path='/Dashboard' element={<RequireAuth>< Dashboard /></RequireAuth>}/>
          <Route exact path='/Claims' element={<RequireAuth>< Claims /></RequireAuth>}/>
          <Route exact path='/Customer' element={<RequireAuth><Customer /></RequireAuth>}/>
          <Route exact path='/Product' element={<RequireAuth><Product /></RequireAuth>}/>
          <Route exact path='/Annexe/:claim_id' element={<RequireAuth>< Annexe /></RequireAuth>}/>

          <Route exact path='/Claim_track' element={<RequireAuth><Claim_track /></RequireAuth>}/>
          <Route exact path='/MyActions' element={<RequireAuth><MyActions /></RequireAuth>}/>
          <Route exact path='/Users' element={<RequireAuth><Users /></RequireAuth>}/>
          <Route exact path='/Report/:claim_id' element={<RequireAuth><Report /></RequireAuth>}/>
          <Route exact path='/Team/:claim_id' element={<RequireAuth><Team /></RequireAuth>}/>
          <Route exact path='/Meetings/:claim_id' element={<RequireAuth>< Meetings /></RequireAuth>}/>
          <Route exact path='/Problem_Description/:claim_id' element={<RequireAuth><Pb_desc /></RequireAuth>}/>
          <Route exact path='/Containement/:claim_id' element={<RequireAuth><Containement /></RequireAuth>}/>
          <Route exact path='/Ishikawa/:claim_id' element={<RequireAuth><Ishikawa /></RequireAuth>}/>
          <Route exact path='/Five_Why/:claim_id' element={<RequireAuth>< Five_Why /></RequireAuth>}/>
          <Route exact path='/Label_Checking/:claim_id' element={<RequireAuth><Label_Check /></RequireAuth>}/>
          <Route exact path='/Actions/:claim_id' element={<RequireAuth><Actions /></RequireAuth>}/>
          <Route exact path='Effectiveness/:claim_id' element={<RequireAuth><Effectiveness /></RequireAuth>}/>
          <Route exact path='*' element="error 404"/>
      
      </Routes>
    </AuthProvider>
    </div>
    
  );
}

