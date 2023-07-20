import React, { useState } from 'react'
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
                <Link className="nav-link " aria-current="page" to={`/Report/${claim_id}`}>REPORT</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Team/${claim_id}`}>TEAM</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Meetings/${claim_id}`}>MEETINGS</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Problem_Description/${claim_id}`} >PROBLEM DESCRIPTION</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Containement/${claim_id}`} >CONTAINEMENT</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Ishikawa/${claim_id}`} >ISHIKAWA </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Five_Why/${claim_id}`} >5 WHY</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Label_Checking/${claim_id}`} >LABEL CHECK</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Actions/${claim_id}`} >ACTIONS</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/Effectiveness/${claim_id}`} >EFFECTIVENESS</Link>
            </li>
        </ul>
    
    </div>
  )
}
