import React from 'react';
import './Header.css';
import Notification  from  'react-notifications';
import  FontAwesomeIcon  from 'react-fontawesome';
import { NotificationImportant, NotificationsOffTwoTone, SupervisedUserCircle, SupervisedUserCircleOutlined, SupervisedUserCircleRounded } from '@material-ui/icons';
import { Button } from 'react-bootstrap';
import { Person, PersonFill, PersonFillGear, PersonFillLock } from 'react-bootstrap-icons';
import { useAuth } from '../Login/AuthProvider';
import { useNavigate } from 'react-router';
export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate()

  const handlLogout=()=>{
    auth.logout()
    navigate('/login')
  }
  return (
    <div className="header ">
        <div className="logo">
            <img src="../icons/technical-support.png"  className="d-inline-block align-top" alt="Logo"/>
            <h3>Claims Management</h3>
        </div>
        <div className="notif">
            <Button variant=''><NotificationImportant  size={20} color='red'/></Button>
            <div>{auth.user.name} <br />
            {auth.user.fonction}</div>
            <Button  onClick={handlLogout} variant='' >Logout</Button>
            <Button   variant='' ><PersonFillGear size={30} /></Button>
        </div>
    </div>
  )
}
