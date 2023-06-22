import React,{useState} from 'react';
import {  BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
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

function PrivateRoute({ isAuthenticated, redirectTo, ...rest }) {
  return isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Navigate to={redirectTo} replace state={{ from: rest.location }} />
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return (    
    <div className='app'>
        <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route exact path="/Dashboard" element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Dashboard />
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />
         <Route exact path='/Claims' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Claims />
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />  
          <Route exact path='/Customer'  element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Customer />
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />
         <Route exact path='/Product' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Product />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Annexe/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Annexe />
          </>
        ) : (
          <Navigate to="/login" />
        )}  />

          <Route exact path='/Claim_track' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Claim_track />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/MyActions' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <MyActions />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Users' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Users />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Report/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Report />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Team/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Team />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Meetings/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Meetings />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Problem_Description/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Pb_desc />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Containement/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Containement />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Five_Why/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Five_Why />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Label_Checking/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Label_Check />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='/Actions/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Actions />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='Effectiveness/:claim_id' element={isAuthenticated ? (
          <>
            <SideNavBar />
            <Header />
            <Effectiveness />
          </>
        ) : (
          <Navigate to="/login" />
        )} />
          <Route exact path='*' element={(
            <div style={{textAlign:"center",margin:"auto",height:"100px"}}><h5> Error 404 : Page not found</h5>  </div>
          )
            
          }/>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
