import React, { useState } from "react";
import "./SideNavBar.css";
import  { Link,BrowserRouter }  from 'react-router-dom';



const SideNavBar = () => {
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
			icon: "icons/dashboard (1).png",
		},
		{
			text: "List of Claims",
			icon: "icons/delivery-box.png",
		},
		{
			text: "My Actions",
			icon: "icons/to-do-list.png",
		},
		{
			text: "Claims Tracking",
			icon: "icons/list.png",
		},
		{
			text: "Customer",
			icon: "icons/customer.png",
		},
		{
			text: "Product",
			icon: "icons/product.png",
		},
		{
			text: "Users",
			icon: "icons/followers.png",
		},
	];
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
							<img src="icons/bontaz.png" alt="" srcset="" />
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
					{menuItems.map(({ text, icon }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href="#"
						>
							<img className={isExpanded ? "menu-item-icon" : "menu-item-icon-NX"} src={icon} alt="" srcset=""/>
							{isExpanded && <p>{text}</p>}
							
						</a>
						
					))}
					<br/><br />
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;