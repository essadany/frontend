import React from 'react'
import './Tab.css';
import Annexe from '../8d_annexe/Annexe';
import Report from '../8d_report/Report';
import Team from '../team/Team';
import { useParams } from 'react-router';
export default function Tab() {
    const { claim_id } = useParams();
    
  return (
    <div className='tab'>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href={`/Report/${claim_id}`}>8D REPORT</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Annexe/${claim_id}`} >8D ANNEXE</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Team/${claim_id}`}>TEAM</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Meetings/${claim_id}`}>MEETINGS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Problem_Description/${claim_id}`}>PROBLEM DESCRIPTION</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Containement/${claim_id}`}>CONTAINEMENT</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Five_Why/${claim_id}`}>5 WHY</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Label_Checking/${claim_id}`}>LABEL CHECKING </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Actions/${claim_id}`}>ACTIONS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href={`/Effectiveness/${claim_id}`}>EFFECTIVENESS</a>
            </li>
        </ul>
    
    </div>
  )
}
