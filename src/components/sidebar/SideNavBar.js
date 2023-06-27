import React, { useState } from "react";
import "./SideNavBar.css";
import  { Link,BrowserRouter }  from 'react-router-dom';
import { useAuth } from "../Login/AuthProvider";



const SideNavBar = ({isAuthentificated}) => {
	const auth = useAuth()

	const [notificationMessage, setNotificationMessage] = useState('');

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
							<img className={isExpanded ? "menu-item-icon" : "menu-item-icon-NX"} src={icon} alt="" srcset=""/>
							{isExpanded && <p>{text}</p>}
							
						</Link>
						
					))}
					<br/><br />
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;