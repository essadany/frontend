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
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate()

  const handlLogout= async()=>{
    auth.logout();
  }
  
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  //Get Notifications of User

  const user_id = auth.user.id;
  const [notifications,setNotifications] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];

  const getNotifications = async()=>{
    await fetch(`http://127.0.0.1:8000/api/user/${user_id}/notifications`)
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

  useEffect(()=>{
    getNotifications();

  },[user_id])

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
  

  useEffect(() => {
    getActions();
    notifications.forEach(item => {
      const action = actions.find(action => action['id'] === item.action_id);
      const diffInDays = moment(action['planned_date']).diff(moment(currentDate), 'days');
      if (diffInDays == 1 && action['status'] != 'done') {
        updateNotification(item.id,"You have to do this action  : { " +action['action']+ " } :today the delay is tomorrow");
        console.warn('planned_date : ', item.planned_date, ' current_date : ', currentDate);
      }
      if (diffInDays == -2 && action['status'] != 'done') {
        deleteNotification(item.id);
      }
      console.warn('diff : ',diffInDays);

    });
  }, [currentDate]);
  //Get Number of Notifications
	const [number,setNumber] = useState('0')
	useEffect(()=>{
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
	,[user_id])
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
                {notifications.map((item)=>(
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
