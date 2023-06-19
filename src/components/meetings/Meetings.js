import React, { useEffect } from 'react'
import './Meetings.css'
import '../my_actions/MyActions.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
import Tab from '../tabs/Tab';
import { useParams } from 'react-router';
import { Add } from '@material-ui/icons';
export default function Meetings() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Meeting');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);

  const [type,setType] = useState('');
  const [date,setDate] = useState('');
  const [comment,setComment] = useState('');
  const [user_id,setUser_id] = useState('');
  const [team,setTeam] = useState('');
  const [meetings,setMeetings] = useState([]);
  const [absences,setAbsences] = useState([]);

  const [team_id,setTeam_id] = useState('');

  const [users_of_team,setUsers_of_team] = useState([]);
  const meetings_type = [
  { value: 'Containement', label: 'Containement' },
  { value: 'Analyse1', label: 'Analyse1' },
  { value: 'Analyse2', label: 'Analyse2' },
  { value: 'Analyse3', label: 'Analyse3' },
  { value: 'Closure', label: 'Closure' },
  ]
  const {claim_id} = useParams();
  
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

  //Get absences in each meeting

  
  const getAbsences = (id) => {
    fetch(`http://127.0.0.1:8000/api/meeting/${id}/absences`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAbsences(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
      return absences.map((user) => user.name).join(';');
  }
  


   // Get Meetings of Team 
  
   function getMeetings(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team_meetings`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMeetings(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      console.log(meetings);
  }
  
  useEffect(() => {
    getMeetings();
  }, [claim_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/meeting`, {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ type, date, comment
        }),
      })
      
      if (res.status === 200) {
        setType('');
        setDate('');
        setComment("");
        
        alert("Meeting Added successfully");
        setShow(false);
        handleClose();
        getMeetings();
      } else {
        res.data(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

   //Add Meeting -------------------------------------------------------------------------------------------------
   const [meeting_id,setMeeting_id] =useState('');
   function selectMeeting(meeting){
       setDate(meeting.date);
       setComment(meeting.comment);
       setType(meeting.type);
       setMeeting_id(meeting.id);
       
   };
   function updateMeeting(){
     let item={type, date, comment }
     console.warn("item",item)
     try{
         fetch(`http://127.0.0.1:8000/api/meeting/${meeting_id}`, {
           method: 'PUT',
           headers:{
             'Accept' : 'application/json',
             'Content-Type':'application/json'
           },
           body:JSON.stringify(item)
         }).then((result) => {
             if (result.ok){
               getMeetings();
               setComment('');
               setType('');
               setDate('');
               alert("Meeting Updated successfully");
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
     
   
   // Filter Meetings --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = meetings.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );
 // Add Absence -----------------------------------------------------------------------------------------------------
 function AddAbsence(){
  try {
    let res = fetch(`http://127.0.0.1:8000/api/add_absence`, {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ meeting_id : meeting_id , user_id : user_id }),
    })
    console.log(meeting_id,user_id);
    if (res.status === 200) {
      alert("User Added successfully as an absent");
      getMeetings();
    } else {
      console.log(error);
      
    }
  } catch (err) {
    console.log(err);
  }
 }
  return (
    <div className='main'>
        <Tab team_id={team_id}/>
        <h2 ><img className='report_icon' src='../../icons/meeting.png'/>  Meetings</h2>
        <div className='border'>
        <div>
        <Button onClick={()=>{handleShow();setModalTitle("Add New Meeting");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Meeting</Button>

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
                <form class="row g-3  needs-validation" onSubmit={handleSubmit}>
                        <div class="col-md-6">
                            <label  class="form-label">Type* :</label>
                            <select className='form-select col-2' onChange={(e)=>setType(e.target.value)}   required>
                              <option selected disabled>--- Select Type ---</option>
                              {meetings_type.map((item)=>(<option selected={item.label===type}>{item.label}</option>))}
                            </select>
                            
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">date* : </label>
                            <input type="date" class="form-control"  value={date} onChange={(e)=>setDate(e.target.value)} required />
                        </div>
                      
                        <div class="col-md-12">
                            <label class="form-label">Comment :</label>
                            <textarea className="form-control"  value={comment} onChange={(e)=>setComment(e.target.value)}  required />
                        </div>
                        <div className='modal-footer'>
                          <Button variant="secondary" onClick={handleClose}>
                              Annuler
                          </Button>
                          <Button type='submit'   hidden={addB} variant='primary'>Save</Button>
                          <Button onClick={updateMeeting} hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>          
                        </div>
                        
                    </form>
                    </Modal.Body>
                  
            </Modal>   
            </div>
            <div >
                <legend >List Of Meetings</legend>
                <div>
                  <form className='row g-3 ' onSubmit={AddAbsence}>
                    <div className='col-3'>
                      <select className='form-select' required onChange={(e)=>setUser_id(e.target.value)}>
                        <option  selected disabled >--- Select User ---</option>
                      {users_of_team.map((item)=>(<option value={item.id} >{item.name}</option>))}
                      </select>
                    </div>
                    <div className='col-3'>
                      <select className='form-select' required onChange={(e)=>setMeeting_id(e.target.value)}>
                        <option  selected disabled >--- Select Meeting ---</option>
                      {meetings.map((item)=>(<option value={item.id}>{item.type}</option>))}
                      </select>
                    </div>
                    <div className='col-3'>
                      <Button  type='submit' variant='danger'><PlusCircle />  Add Absence</Button>
                    </div>                               
                  </form></div>
                <div className='row md-4 filter'>
                  <div  className='col-4'></div>
                  <div  className='col-4'></div>
                  <div  className='col-4'>
                    <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                  </div>
                </div>
                <div className=''>
                  <table className="table table-striped" >
                      <thead>
                          <tr>
                              <th >Type</th>
                              <th >Date</th>    
                              <th>Comment</th>
                              <th>Absences </th>
                              <th></th>
                          </tr>                
                      </thead>
                      <tbody>
                        {meetings.map((item)=>(
                            <tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.date}</td>
                            <td>{item.comment}</td>
                            <td>
                                {/*getAbsences(item.id)*/}
                            </td>
                            <td><Button style={{marginRight:10}} onClick={()=>{selectMeeting(item);setModalTitle("Update Meeting");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
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
