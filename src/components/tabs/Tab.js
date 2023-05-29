import React from 'react'
import './Tab.css';
import Annexe from '../8d_annexe/Annexe';
export default function Tab() {
  return (
    <div className='tab'>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/Report">8D REPORT</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Annexe" >8D ANNEXE</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Team">TEAM</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Meetings">MEETINGS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Problem_Description">PROBLEM DESCRIPTION</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Containement">CONTAINEMENT</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/5_Whey">5 WHY</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Label_Checking">LABEL CHECKING</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Actions">ACTIONS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Effectiveness">EFFECTIVENESS</a>
            </li>
        </ul>
    </div>
  )
}
