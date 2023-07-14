import React, { useEffect } from 'react';
import './Header.css';

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

  /*useEffect(()=>{
    getNumber();
      getNotificationsOfUser();
      
  },[notificationsOfUser]);*/

 
 


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
            {/*{auth.user.fonction}*/}</div>
            <Button  onClick={handlLogout} variant='' ><div>Logout</div></Button>
        </div> 
    </div>


  )
}
