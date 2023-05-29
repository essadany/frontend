import React from 'react'
import './Interface.css'
import SideNavBar from './components/sidebar/SideNavBar';
import Tab from './components/tabs/Tab';
import Header from './components/header/Header';
import Product from './components/products/Product';
import Report from './components/8d_report/Report';
import { Routes, Router, Route } from 'react-router';
import Claims from './components/claims/Claims';
import Customer from './components/customers/Customer';
import Dashboard from './components/dashboard/Dashboard';
import Claim_track from './components/claims_tracking/Claim_track';
import MyActions from './components/my_actions/MyActions';
import Users from './components/users/Users';
import { BrowserRouter } from 'react-router-dom';
import Actions from './components/actions/Actions';
import Effectiveness from './components/effectiveness/Effectiveness';
import Team from './components/team/Team';
import Meetings from './components/meetings/Meetings';
import Pb_desc from './components/problem_description/Pb_desc';
import Containement from './components/containement/Containement';
import Five_Why from './components/5why/Five_Why';
import Label_Check from './components/label_checking/Label_Check';
import Login from './components/authenification/Login';
export default function Interface() {
  return (
    <div className='Interface'>
     <SideNavBar />
      <Header />
        <Routes>
        <Route exact path='/' element={< Dashboard />}>  </Route>
          <Route exact path='/Dashboard' element={< Dashboard />}>  </Route>
          <Route exact path='/Claims' element={< Claims />}>  </Route>
          <Route exact path='/Customer' element={<Customer />}>  </Route>
          <Route exact path='/Product' element={<Product />}>  </Route>
          <Route exact path='/Claim_track' element={<Claim_track />}>  </Route>
          <Route exact path='/MyActions' element={<MyActions />}>  </Route>
          <Route exact path='/Users' element={<Users />}>  </Route>
          <Route exact path='/Report' element={<Report />}>  </Route>
          <Route exact path='/Team' element={<Team />}>  </Route>
          <Route exact path='/Meetings' element={< Meetings />}>  </Route>
          <Route exact path='/Problem_Description' element={<Pb_desc />}>  </Route>
          <Route exact path='/Containement' element={<Containement />}>  </Route>
          <Route exact path='/5_Why' element={< Five_Why />}>  </Route>
          <Route exact path='/Label_Checking' element={<Label_Check />}>  </Route>
          <Route exact path='/Actions' element={<Actions />}>  </Route>
          <Route exact path='Effectiveness' element={<Effectiveness />}>  </Route>
          <Route exact path='*' element="error 404">  </Route>
        </Routes>
    </div>
  )
}
