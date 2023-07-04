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
import { Edit } from '@material-ui/icons';
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
  const [actions,setActions] = useState([]);
  const [pilot,setPilot] = useState('');
  const [action,setAction] = useState('');
  const [planned_date,setPlanned_date] = useState('');
  const [report_id,setReport_id] = useState('');
  const [editB,setEditB] = useState(true);
  const [users_of_team, setUsers_of_team] = useState([]);
  const [action_id,setAction_id] = useState('');


  const actions_type = [
  { value: 'potential', label: 'potential' },
  { value: 'implemented', label: 'implemented' },
  { value: 'preventive', label: 'preventive' }
  ]
  const actions_status = [
    { value: 'not started', label: 'not started' },
    { value: 'on going', label: 'on going' },
    { value: 'done', label: 'done' },
    { value: 'delayed', label: 'delayed' }
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
     //Get report
  function getReport(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/report`)
      .then(res => res.json())
      .then(
        (result) => {
          setReport_id(result.id);

        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  
    // Get Actions 
  
    function getActions(){
      fetch(`http://127.0.0.1:8000/api/actions_activated/${report_id}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setActions(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
        console.log(actions);
    }
    

     // Get Comments of action
    const [comments,setComments]=useState([]);
     function getComments(){
      fetch(`http://127.0.0.1:8000/api/action_comments`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setComments(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
        console.log(actions);
    }
    useEffect(() => {
      getUsersOfTeam();
    }, [claim_id]);
    useEffect(() => {
      getReport();
    }, [claim_id])
    useEffect(() => {
      getActions();
    }, [report_id]);
    useEffect(() => {
      getComments();
    }, []);
    
   // Add Action ------------------------------------------------------------------------------------------------
        

   let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/action", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({report_id, user_id, action, type , planned_date }),
      })      
      if (res.status === 200) {
        setUser_id('');
        setType('');
        setAction('');
        setPlanned_date('');
        alert("Action Added successfully");
        handleClose();
        getActions();
      } else {
        alert("Some error occured, try again!");
        console.log("user_id" ,user_id,"report_id",report_id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Update Action -------------------------------------------------------------------------------------------------
  const [action_obj,setAction_obj]=useState('');
  function selectAction(action_obj){
      setAction_obj(action_obj);
      setAction(action_obj.action);
      setType(action_obj.type);
      setPlanned_date(action_obj.planned_date)
      setAction_id(action_obj.id);
      setUser_id(action_obj.user_id);
      
  };
  const [status,setStatus]= useState('');
  function updateAction(){
    console.warn(user_id);
    try{
        fetch(`http://127.0.0.1:8000/api/action/${action_id}`, {
          method: 'PUT',
          headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ user_id, action, type , planned_date})
        }).then((result) => {
            if (result.ok){
              getActions();
              setAction('');
              setUser_id('');
              setType('');
              setPlanned_date('');
              alert("Action Updated successfully");
              handleClose();
              setEditB(true);
            }else{
              result.json().then((resp) => {
                console.warn(resp)
                alert("Some error occured, Verify that : - All fields required are typed -The product reference is not duplicated! - The customer reference exists in customers table (if not than add it in product interface)");

              })
            }
            
          })
        
      } catch (err) {
      console.log(err);
    }
  }
  // Filter Actions --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const [filter1, setFilter1] = useState("");
  const handleChange1 = (e) => {
    setFilter1(e.target.value);
  };

  const filteredData = actions.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    ) &&
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter1.toLowerCase())
    )
  );

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
                <form class="row g-3  needs-validation" >
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
                          <Button   hidden={addB} onClick={handleSubmit} variant='primary'>Save</Button>
                          <Button onClick={updateAction} hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                          </div>
                    </form>
                    </Modal.Body>
                  
            </Modal>   
            </div>
            <div >
                <legend >List Of Actions</legend>
                <div className='filter'>
                  <form className='row container'>
                    <div  className='col-2'>
                      <label >Status : </label>
                      <select className='form-select selectpicker' required  label={filter1} onChange={handleChange1}>
                        <option  selected disabled >--- Select Status ---</option>
                      {actions_status.map((item)=>(<option value={item.label} >{item.label}</option>))}
                      </select>
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
                            <th className='text-center' >Action</th>
                            <th className='text-center' >Type</th>
                            <th className='text-center' >Pilot</th>
                            <th className='text-center' >Function</th>
                            <th className='text-center' >Planned date</th>
                            <th className='text-center' >Start date</th>
                            <th className='text-center' >Status</th>
                            <th className='text-center'>Comments</th>
                            <th className='text-center'>Comment Date</th>
                            <th className='text-center' >Done date</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item)=>(
                        <tr key={item.id}>
                        <td className='text-center' >{item.action}</td>
                        <td className='text-center' >{item.type}</td>
                        <td className='text-center' >{item.name}</td>
                        <td className='text-center' >{item.fonction}</td>
                        <td className='text-center' >{item.planned_date}</td>
                        <td className='text-center' >{item.start_date}</td>
                        <td className='text-center'  style={{color:item.status==='done'? 'green': 'not started'? 'brown':'on going'? 'orange' : 'red'}} ><b>{item.status}</b></td>
                        <td className='text-center'>
                          {comments
                            .filter((comm) => comm.action_id === item.id)
                            .map((comm) => (
                              <div key={comm.id}>{comm.comment}</div>
                            ))}
                        </td>
                        <td className='text-center'>
                          {comments
                            .filter((comm) => comm.action_id === item.id)
                            .map((comm) => (
                              <div key={comm.id}>{comm.comment_date}</div>
                            ))}
                        </td>
                        <td className='text-center' >{item.done_date}</td>
                        <td className='text-center' ><Button style={{marginRight:10}} onClick={()=>{setModalTitle("Update Action");handleShow();setAddB(true);setEditB(false);selectAction(item)}} variant='primary'><Edit /></Button></td>
            </tr>
                    ))}
                            
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
  )
}
