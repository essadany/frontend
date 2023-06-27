import React from 'react'
import './Tab.css';
import Annexe from '../8d_annexe/Annexe';
import Report from '../8d_report/Report';
import Team from '../team/Team';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
export default function Tab() {
    const { claim_id } = useParams();
    
  return (
    <div className='tab'>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <Link class="nav-link" aria-current="page" to={`/Report/${claim_id}`}>8D REPORT</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Annexe/${claim_id}`} >8D ANNEXE</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Team/${claim_id}`}>TEAM</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Meetings/${claim_id}`}>MEETINGS</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Problem_Description/${claim_id}`}>PROBLEM DESCRIPTION</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Containement/${claim_id}`}>CONTAINEMENT</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Five_Why/${claim_id}`}>5 WHY</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Label_Checking/${claim_id}`}>LABEL CHECKING </Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Actions/${claim_id}`}>ACTIONS</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to={`/Effectiveness/${claim_id}`}>EFFECTIVENESS</Link>
            </li>
        </ul>
    
    </div>
  )
}
