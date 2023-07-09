import React,{useContext, useEffect, useState} from 'react';
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
import {useAuth, AuthProvider } from './components/Login/AuthProvider';
import { RequireAuth } from './components/Login/RequireAuth';
import Ishikawa from './components/ishikawa/Ishikawa';
import ExcelDownload from './components/8d_report/ExcelDownload';
import MyContext from './components/Login/login';
import moment from 'moment';
export default function App() {
  const haveAccess = useContext(MyContext);
  const auth =useAuth();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Auto update notifications and actions
  const currentDate = new Date().toISOString().split('T')[0];
  const [notifications,setNotifications] = useState([]);
  const getNotifications = async()=>{
    await fetch(`http://127.0.0.1:8000/api/notifications`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setNotifications(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

 /* useEffect(()=>{
    getNotifications();

  },[])*/

  // Update notifications
  const [actions,setActions]= useState([]);  
  function getActions(){
    fetch(`http://127.0.0.1:8000/api/actions`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setActions(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      console.log(actions);
  }
  
  useEffect(()=>{
    getNotifications();
  },[])
  useEffect(()=>{
    getActions();
  },[])
  useEffect(() => {
    notifications.forEach(item => {
      const action = actions.find(action => action['id'] === item.action_id);
      const diffInDays = moment(action['planned_date']).diff(moment(currentDate), 'days');
      if (diffInDays == 1 && action['status'] != 'done') {
        updateNotification(item.id,"You have an action to do before tomorrow: { " +action['action'] + " }");
        console.warn('planned_date : ', item.planned_date, ' current_date : ', currentDate);
      }
      if ( action['status'] == 'done') {
        deleteNotification(item.id);
      }
      console.warn('diff : ',diffInDays);
    });

    actions.forEach(item => {
      const diffInDays = moment(item.planned_date).diff(moment(currentDate), 'days');
      if (diffInDays == -1 && item.status != 'done') {
          updateStatus(item);
      }
      console.warn('diff : ',diffInDays);
    });

  }, [currentDate]);
  
  /*useEffect(() => {
    getActions();
    actions.forEach(item => {
      const diffInDays = moment(item.planned_date).diff(moment(currentDate), 'days');
      if (diffInDays == -1 && item.status != 'done') {
          updateStatus(item);
      }
      console.warn('diff : ',diffInDays);
    });

  }, [currentDate]);*/
    //Update Notification
  const updateNotification = async (id, msg) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notification/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message : msg }), // Replace 'attribute' with the attribute you want to update and 'new value' with the new value
      });

      if (response.ok) {
        console.log('Notification updated successfully.');
      } else {
        console.error('Notification update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //Delete Notification ---------------------------
  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notification/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }      });

      if (response.ok) {
        console.log('Notification deleted successfully.');
      } else {
        console.error('Notification delete failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //Update Status
  const updateStatus = async (item) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/action/${item.id}/update_status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status : "delayed", start_date : item.start_date, done_date : item.done_date }), // Replace 'attribute' with the attribute you want to update and 'new value' with the new value
      });

      if (response.ok) {
        console.log('Status updated successfully.');
      } else {
        console.error('Status update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (  
    
          <div className='app'>
      
          <AuthProvider>
           
       <Menu />
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route exact path='/' element={<RequireAuth>< Dashboard /></RequireAuth>}/>
 
           <Route exact path='/Dashboard' element={<RequireAuth>< Dashboard /></RequireAuth>}/>
           <Route exact path='/Claims' element={<RequireAuth>< Claims haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Customer' element={<RequireAuth><Customer haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Product' element={<RequireAuth><Product haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Annexe/:claim_id' element={<RequireAuth>< Annexe haveAccess={true}/></RequireAuth>}/>
 
           <Route exact path='/Claim_track' element={<RequireAuth><Claim_track haveAccess={true} /></RequireAuth>}/>
           <Route exact path='/MyActions' element={<RequireAuth><MyActions /></RequireAuth>}/>
           <Route exact path='/Users' element={<RequireAuth><Users haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Report/:claim_id' element={<RequireAuth><Report haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Team/:claim_id' element={<RequireAuth><Team haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Meetings/:claim_id' element={<RequireAuth>< Meetings haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Problem_Description/:claim_id' element={<RequireAuth><Pb_desc haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Containement/:claim_id' element={<RequireAuth><Containement haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Ishikawa/:claim_id' element={<RequireAuth><Ishikawa haveAccess={true} /></RequireAuth>}/>
           <Route exact path='/Five_Why/:claim_id' element={<RequireAuth>< Five_Why haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Label_Checking/:claim_id' element={<RequireAuth><Label_Check haveAccess={true}/></RequireAuth>}/>
           <Route exact path='/Actions/:claim_id' element={<RequireAuth><Actions haveAccess={true}/></RequireAuth>}/>
           <Route exact path='Effectiveness/:claim_id' element={<RequireAuth><Effectiveness haveAccess={true}/></RequireAuth>}/>
           <Route exact path='*' element="error 404"/>
       
       </Routes>
   </AuthProvider>  
     </div>
       
    
    
  );
}

