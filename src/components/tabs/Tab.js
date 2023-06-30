import React, { useState } from 'react'
import './Tab.css';
import '../../App.css'
import Annexe from '../8d_annexe/Annexe';
import Report from '../8d_report/Report';
import Team from '../team/Team';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
export default function Tab() {
    const { claim_id } = useParams();
    const [activeLink, setActiveLink] = useState(null);

  return (
    <div className='tab'>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "report" ? "active-link" : ""}`} aria-current="page" to={`/Report/${claim_id}`} onClick={() => setActiveLink("report")}>REPORT</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "annexe" ? "active-link" : ""}`} to={`/Annexe/${claim_id}`} onClick={() => setActiveLink("annexe")} >ANNEXE</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "team" ? "active-link" : ""}`} to={`/Team/${claim_id}`} onClick={() => setActiveLink("team")}>TEAM</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "meetings" ? "active-link" : ""}`} to={`/Meetings/${claim_id}`} onClick={() => setActiveLink("meetings")}>MEETINGS</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "pb_desc" ? "active-link" : ""}`} to={`/Problem_Description/${claim_id}`} onClick={() => setActiveLink("pb_desc")}>PROBLEM DESCRIPTION</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "containement" ? "active-link" : ""}`} to={`/Containement/${claim_id}`} onClick={() => setActiveLink("containement")}>CONTAINEMENT</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "ishikawa" ? "active-link" : ""}`} to={`/Ishikawa/${claim_id}`} onClick={() => setActiveLink("ishikawa")}>ISHIKAWA </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "five_why" ? "active-link" : ""}`} to={`/Five_Why/${claim_id}`} onClick={() => setActiveLink("five_why")}>5 WHY</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "label_check" ? "active-link" : ""}`} to={`/Label_Checking/${claim_id}`} onClick={() => setActiveLink("label_check")}>LABEL CHECK</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "actions" ? "active-link" : ""}`} to={`/Actions/${claim_id}`} onClick={() => setActiveLink("actions")}>ACTIONS</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${activeLink === "effectiveness" ? "active-link" : ""}`} to={`/Effectiveness/${claim_id}`} onClick={() => setActiveLink("effectiveness")}>EFFECTIVENESS</Link>
            </li>
        </ul>
    
    </div>
  )
}
