import React, { useEffect, useState } from "react";
import "./SideNavBar.css";
import  { Link,BrowserRouter }  from 'react-router-dom';
import { useAuth } from "../Login/AuthProvider";
import { Badge } from "@material-ui/core";
import { NotificationImportantOutlined } from "@material-ui/icons";



const SideNavBar = ({isAuthentificated}) => {
	const auth = useAuth()

	const [notificationMessage, setNotificationMessage] = useState('');
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const handleClick = () => {
		setNotificationMessage('This is a notification!');
		Notification.notify({
		title: 'Notification',
		message: notificationMessage,
		type: 'success',
		position: 'top',
		autoDismiss: false,
		});
	};
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Dashboard",
			icon: "../icons/dashboard1.png",
			path: '/Dashboard'
		},
		{
			text: "List of Claims",
			icon: "../icons/delivery-box.png",
			path: '/Claims'
		},
		{
			text: "My Actions",
			icon: "../icons/to-do-list.png",
			path: '/MyActions'
		},
		{
			text: "Claims Tracking",
			icon: "../icons/list.png",
			path: '/Claim_track'
		},
		{
			text: "Customer",
			icon: "../icons/customer.png",
			path: '/Customer'
		},
		{
			text: "Product",
			icon: "../icons/product.png",
			path: '/Product'
		},
		{
			text: "Users",
			icon: "../icons/followers.png",
			path: '/Users'
		},
	];

	if (isAuthentificated){
		
	}
	//Get Number of Actions
	const [number,setNumber] = useState('0')
	useEffect(()=>{
		fetch(`http://127.0.0.1:8000/api/user/${auth.user.id}/actions_not_started`)
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
	,[])
		
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="../icons/bontaz.png" alt="" srcset="" />
							<h1>ontaz</h1>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon, path }) => (
						<Link
						className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
						to={path}
					  >
						{path === '/MyActions' ? (
						  <Badge badgeContent={number} color="error">
							<img className={isExpanded ? "menu-item-icon" : "menu-item-icon-NX"} src={icon} alt="" srcSet="" />
							{isExpanded && <p>{text}</p>}
						  </Badge>
						) : (
						  <>
							<img className={isExpanded ? "menu-item-icon" : "menu-item-icon-NX"} src={icon} alt="" srcSet="" />
							{isExpanded && <p>{text}</p>}
						  </>
						)}
					  </Link>
					  
						
					))}
					<br/><br />
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;