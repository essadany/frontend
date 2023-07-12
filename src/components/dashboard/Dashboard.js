import React from 'react'
import SideNavBar from '../sidebar/SideNavBar';
import Tab from '../tabs/Tab';
import Header from '../header/Header';
import Product from '../products/Product';
import Report from '../8d_report/Report';
import { Routes, Router, Route } from 'react-router';
import Claims from '../claims/Claims';
import Customer from '../customers/Customer';
import Claim_track from '../claims_tracking/Claim_track';
import MyActions from '../my_actions/MyActions';
import Users from '../users/Users';
import { BrowserRouter } from 'react-router-dom';
import Actions from '../actions/Actions';
import Effectiveness from '../effectiveness/Effectiveness';
import Team from '../team/Team';
import Meetings from '../meetings/Meetings';
import Pb_desc from '../problem_description/Pb_desc';
import Containement from '../containement/Containement';
import Five_Why from '../5why/Five_Why';
import Label_Check from '../label_checking/Label_Check';
import Annexe from '../8d_annexe/Annexe';

export default function Dashboard() {
  return (
    <>
        
        <div className='main'>
        <h2 >Dashboard</h2>
        <div className='border'></div>
        
    </div>
    
    </>
    
  )
}
