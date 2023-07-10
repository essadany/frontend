import React, { useEffect } from 'react';
import './Header.css';
import Notification, { NotificationContainer }  from  'react-notifications';
import  FontAwesomeIcon  from 'react-fontawesome';
import { NotificationImportant, NotificationsOffTwoTone, SupervisedUserCircle, SupervisedUserCircleOutlined, SupervisedUserCircleRounded } from '@material-ui/icons';
import {  Button } from 'react-bootstrap';
import { Person, PersonFill, PersonFillGear, PersonFillLock } from 'react-bootstrap-icons';
import { useAuth } from '../Login/AuthProvider';
import { useNavigate } from 'react-router';
import { useCollapse } from 'react-collapsed'
import { useState } from 'react';
import { Badge, Paper, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import notificationsIcon from '@mui/icons-material/Notifications'
import { NotificationAdd, NotificationImportantOutlined, NotificationImportantRounded } from '@mui/icons-material';
import moment from 'moment';

export default function Header() {

   // Auto update notifications and actions
   const currentDate = new Date().toISOString().split('T')[0];
   const [notificationsOfUser,setNotificationsOfUser] = useState([]);
   const [actionsOfUser,setActionsOfUser] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded1, setIsLoaded1] = useState(false);

  const [isLoaded2, setIsLoaded2] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate()

  const handlLogout= async()=>{
    auth.logout();
  }
  
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  //Get Notifications of User

  const user_id = auth.user.id;
  //const currentDate = new Date().toISOString().split('T')[0];

 
  //Get Number of Notifications
	const [number,setNumber] = useState('0');
  function getNumber(){
    fetch(`http://127.0.0.1:8000/api/user/${user_id}/notifications_number`)
    .then(res => res.json())
    .then(
    (result) => {
      setIsLoaded(true);
      setNumber(result);

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
	useEffect(()=>{
		getNumber();
	  }
	,[isLoaded])
  

  const  getNotificationsOfUser = ()=>{
    fetch(`http://127.0.0.1:8000/api/user/${user_id}/notifications`)
     .then(res => res.json())
     .then(
       (result) => {
         setIsLoaded2(true);
         setNotificationsOfUser(result);
       },
       // Note: it's important to handle errors here
       // instead of a catch() block so that we don't swallow
       // exceptions from actual bugs in components.
       (error) => {
         setIsLoaded2(true);
         setError(error);
       }
     )
 }
 const getActions = ()=>{
   fetch(`http://127.0.0.1:8000/api/user/${user_id}/actions_join_claims`)
     .then(res => res.json())
     .then(
       (result) => {
         setIsLoaded1(true);
         setActionsOfUser(result);
       },
       // Note: it's important to handle errors here
       // instead of a catch() block so that we don't swallow
       // exceptions from actual bugs in components.
       (error) => {
         setIsLoaded1(true);
         setError(error);
       }
     )
     console.log(actionsOfUser);
 }
  useEffect(()=>{
    getActions();
  },[isLoaded1]);
  useEffect(()=>{
    getNotificationsOfUser();
  },[isLoaded2]);
  useEffect(() => {
    //getActions();
    actionsOfUser.forEach(item => {
      const diffInDays = moment(item.planned_date).diff(moment(currentDate), 'days');
      if (diffInDays == -1 && item.status != 'done') {
          updateStatus(item);
      }
      console.warn('diff : ',diffInDays);
    });

  }, [ actionsOfUser, currentDate]);
  useEffect(() => {
    //getNotificationsOfUser();
    notificationsOfUser.forEach(item => {
      const action = actionsOfUser.find(action => action['id'] == item.action_id);
      const diffInDays = moment(action['planned_date']).diff(moment(currentDate), 'days');
      if (diffInDays == 1 && action['status'] != 'done') {
        updateNotification(item.id,"You have an action to do before tomorrow: { " +action['action'] + " }");
        console.warn('planned_date : ', item.planned_date, ' current_date : ', currentDate);
      }
      if ( action['status'] == 'done' || action['status']=='delayed') {
        deleteNotification(item.id);
      }
      console.warn('diff : ',diffInDays);
    });

  }, [ actionsOfUser, currentDate]);

  //Update Notification
  function  updateNotification(id, msg){
    try {
      const response =  fetch(`http://127.0.0.1:8000/api/notification/${id}`, {
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
  function deleteNotification(id){
    try {
      const response = fetch(`http://127.0.0.1:8000/api/notification/${id}`, {
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
   function updateStatus(item) {
    try {
      const response = fetch(`http://127.0.0.1:8000/api/action/${item.id}/update_status`, {
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

    <div className="header ">
        <div className="logo">
            <img src="../icons/technical-support.png"  className="d-inline-block align-top" alt="Logo"/>
            <h3>Claims Management</h3>
        </div>
        <div className=" notif">
            <div className='message ' style={{
          height: !isExpanded ? 'auto' : '100px', // Adjust the height based on your needs
          overflowY: 'auto',
        }}>
            <section   className=" "   {...getCollapseProps()} > 
            <TableContainer component={Paper}>
              <TableBody>
                {notificationsOfUser.map((item)=>(
                    <TableRow>
                    <TableCell>
                        {item.message}
                    </TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </TableContainer>
            </section>
            </div>
            
            
            <Button variant='' {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}><Badge color='error' badgeContent={number}><NotificationImportantRounded color='white'  size={20} /></Badge></Button>
            

            <Button   variant='' ><PersonFillGear size={30} /></Button>
            <div>{auth.user.name} <br />
            {auth.user.fonction}</div>
            <Button  onClick={handlLogout} variant='' ><div>Logout</div></Button>
        </div> 
    </div>


  )
}
