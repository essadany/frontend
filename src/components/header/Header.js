import React from 'react';
import './Header.css';
import Notification  from  'react-notifications';
import  FontAwesomeIcon  from 'react-fontawesome';
export default function Header() {
  return (
    <div className="header ">
        <div className="logo">
            <img src="icons/technical-support.png"  className="d-inline-block align-top" alt="Logo"/>
            <h3>Claims Management</h3>
        </div>
        <div className="notif">
            <button ><FontAwesomeIcon icon="fa-sharp fa-solid fa-bell" /></button>
            <p> Nom Prénom</p>
            <p>Fonction</p>
            <button ><FontAwesomeIcon icon="fa-solid fa-user" /></button>
        </div>
    </div>
  )
}
