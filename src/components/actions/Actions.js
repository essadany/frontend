import React from 'react'
import './Actions.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button, FormSelect } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
import { Skeleton } from '@mui/material';
import Tab from '../tabs/Tab';
import { useEffect } from 'react';
import { useParams } from 'react-router';
export default function Actions() {

  const {claim_id} = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Action');
  const [addB,setAddB] = useState('');
  const [user_id,setUser_id] = useState('');
  const [type,setType] = useState('');
  const [pilot,setPilot] = useState('');

  const [action,setAction] = useState('');
  const [planned_date,setPlanned_date] = useState('');

  const [editB,setEditB] = useState(true);
  const [users_of_team, setUsers_of_team] = useState([]);

  const actions_type = [
  { value: 'potential', label: 'potential' },
  { value: 'implemented', label: 'implemented' },
  { value: 'preventive', label: 'preventive' }
  ]
  const actions_status = [
    { value: 'not started', label: 'not started' },
    { value: 'on going', label: 'on going' },
    { value: 'done', label: 'done' }
    ]

    // Get Users of Team 
  
    function getUsersOfTeam(){
      fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team_users`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUsers_of_team(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
        console.log(users_of_team);
    }
    
    useEffect(() => {
      getUsersOfTeam();
    }, [claim_id]);

   // Add User ------------------------------------------------------------------------------------------------
        

   let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/action", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({user_id, pilot ,type, planned_date ,action}),
      })
      let resJson = await res.json();
      
      if (res.status === 200) {
        setUser_id('');
        setType('');
        setAction('');
        setPlanned_date('');
        alert("Action Added successfully");
        handleClose();
       // getActions();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Filter Actions --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  /*const filteredData = Actions.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );*/

  return (
    <div className='main'>
        <Tab />
        <h2 ><img className='report_icon' src='../icons/action-plan.png'/>  Actions</h2>
        <div className='border'>
        <div>
        <Button onClick={()=>{handleShow();setModalTitle("Add New Action");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Action</Button>

        <Modal
                size='md'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form class="row g-3  needs-validation" onClick={handleSubmit}>
                        <div className="col-12">
                            <label class="form-label">Pilot* :</label>
                            <select className='form-select' required onChange={(e)=>{setUser_id(e.target.value);setPilot(e.label)}}>
                              <option  selected disabled >--- Select User ---</option>
                            {users_of_team.map((item)=>(<option value={item.id} selected={item.id===user_id} >{item.name}</option>))}
                            </select>
                            
                        </div>
                        <div className="col-6">
                            <label  class="form-label">Planned date* : </label>
                            <input type="date" class="form-control" value={planned_date}  required onChange={(e)=>setPlanned_date(e.target.value)} />
                        </div>
                        <div className="form-check col-6">
                          <label  className="form-check-label">Type* :</label>
                          <select className='form-select' required onChange={(e)=>setType(e.target.value)}>
                              <option  selected disabled >--- Select Type ---</option>
                            {actions_type.map((item)=>(<option value={item.label} selected={item.label===type} >{item.label}</option>))}
                            </select>
                        
                        </div>
                        <div className="col-12">
                            <label class="form-label">Action* :</label>
                            <textarea  class="form-control"   required value={action}  onChange={(e)=>setAction(e.target.value)}/>
                        </div>
                        <div className='modal-footer'>
                          <Button variant="secondary" onClick={handleClose}>
                              Annuler
                          </Button>
                          <Button   hidden={addB} type='submit' variant='primary'>Save</Button>
                          <Button hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                          </div>
                    </form>
                    </Modal.Body>
                  
            </Modal>   
            </div>
            <div >
                <legend >List Of Actions</legend>
                <div className='filter'>
                  <form className='row'>
                    <div  className='col-2'>
                      <label >Status : </label>
                      <Select  options={actions_status} />
                    </div>
                    <div  className='col-6'></div>
                    <div  className='col-4 filter'>
                      <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                    </div>
                  </form>
                  
                </div>
                <div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th >Action</th>
                            <th >Type</th>
                            <th>Pilot</th>
                            <th>Planned date</th>
                            <th>Start date</th>
                            <th>Status</th>
                            <th>Done date</th>
                            <th>action</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><Button style={{marginRight:10}} onClick={()=>{setModalTitle("Update Action");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button>
                                    <Button  variant='danger' >Delete<i class="fa-solid fa-Action-xmark"></i></Button></td>

                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
  )
}
