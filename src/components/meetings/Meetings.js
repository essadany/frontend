import React, { useEffect } from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
import Tab from '../tabs/Tab';
import { useParams } from 'react-router';
import { Add } from '@material-ui/icons';
import { useAuth } from '../Login/AuthProvider';
export default function Meetings({haveAccess}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded1, setIsLoaded1] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Meeting');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);

  const [type,setType] = useState('');
  const [date,setDate] = useState('');
  const [hour,setHour] = useState('');
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
  const auth = useAuth();
  // Get Users of Team 
  
  function getUsersOfTeam(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team_users`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded1(true);
          setUsers_of_team(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded1(true);
          setError(error);
        }
      )
      console.log(users_of_team);
  }
  //Get Team of the Claim selected
  function getTeam(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team`)
      .then(res => res.json())
      .then(
        (result) => {
          setTeam(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
      console.log(team);
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
      console.warn(meetings);
  }
 
  //Get absences in each meeting

  const [id,setId]=useState('');
  const getAbsences = (id) => {
    setId(id);
    fetch(`http://127.0.0.1:8000/api/meeting/${id}/absences`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded2(true);
          setAbsences(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded2(true);
          setError(error);
        }
      );
      return absences.map((user) => user.name).join(';');
  }
  useEffect(() => {
    getUsersOfTeam();
  }, [claim_id,isLoaded1]);
  useEffect(() => {
    getMeetings();
  }, [claim_id,isLoaded]);
  useEffect(() => {
    getAbsences();
  }, [id,isLoaded2]);
  useEffect(() => {
    getTeam();
  }, [claim_id]);
  // Add meeting--------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/meeting`, {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ type, date, hour, comment
        }),
      })
      
      if (res.status === 200) {
        resetForm();
        alert("Meeting Added successfully");
        setShow(false);
        handleClose();
        getMeetings();
      } else {
        alert('Some error occured! try again!');
      }
    } catch (err) {
      console.log(err);
    }
  };

   //Update Meeting -------------------------------------------------------------------------------------------------
   const [meeting_id,setMeeting_id] =useState('');
   function selectMeeting(meeting){
       setDate(meeting.date);
       setHour(meeting.hour);
       setComment(meeting.comment);
       setType(meeting.type);
       setMeeting_id(meeting.id);
       
   };
   function updateMeeting(){
     let item={type, date,hour, comment }
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
               resetForm();
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
 let AddAbsence = async (e)=>{
  e.preventDefault();
  try {
    let res = await fetch(`http://127.0.0.1:8000/api/meeting_user`, {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ meeting_id , user_id }),
    })
    console.log(meeting_id,user_id);
    if (res.status === 200) {
      alert("User Added successfully as an absent");
    } else {
      getMeetings();

      console.log(error);
      console.log(res.status);

    }
  } catch (err) {
    console.log(err);
  }
 }
 const resetForm = ()=>{
              setComment('');
               setType('');
               setDate('');
               setHour('');
 }
  return (
    <div className='main'>
        <Tab team_id={team_id}/>
        <h2 ><img className='report_icon' src='../../icons/meeting.png'/>  Meetings</h2>
        <div className='border'>
        <div>
        <Button  disabled={!haveAccess || (meetings.length === 0 && auth.user.role !== 'admin') || ( auth.user.role !== 'admin' && auth.user.name !== team.leader)}  onClick={()=>{handleShow();setModalTitle("Add New Meeting");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Meeting</Button>

        <Modal
                size='md'
                show={show}
                onHide={()=>{handleClose();resetForm()}}                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="row container g-3  needs-validation" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label  className="form-label">Type* :</label>
                            <select className='form-select col-2'  onChange={(e)=>setType(e.target.value)}   required>
                              <option selected disabled>--- Select Type ---</option>
                              { meetings.length===0 ?(
                              <option value='Containement'  >Containement</option>
                              ) :meetings.every(item => item.type === 'Containement')? (
                                  <option  value='Analyse1'   >Analyse1</option>
                              ) : (<>
                                <option value='Analyse2'  >Analyse2</option>
                                <option value='Analyse3'  >Analyse3</option>
                                <option value='Closure'  >Closure</option>
                                </>
                            )}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date* : </label>
                            <input type="date" className="form-control"  value={date} onChange={(e)=>setDate(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Hour* : </label>
                            <input type="time" className="form-control"  value={hour} onChange={(e)=>setHour(e.target.value)} required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Comment :</label>
                            <textarea className="form-control"  value={comment} onChange={(e)=>setComment(e.target.value)}  />
                        </div>
                        <div className='modal-footer'>
                          <Button variant="secondary" onClick={()=>{handleClose();resetForm()}}>
                              Annuler
                          </Button>
                          <Button    type='submit'   hidden={addB} variant='primary'>Save</Button>
                          <Button    onClick={updateMeeting} hidden={editB} variant='success'>Update<i className="fa-solid fa-pen-to-square"></i></Button>          
                        </div>
                        
                    </form>
                    </Modal.Body>
                  
            </Modal>   
            </div>
            <div >
                <legend >List Of Meetings</legend>
                <div>
                  <form className='container row g-3 ' onSubmit={AddAbsence}>
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
                      <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)} type='submit' variant='danger'><PlusCircle />  Add Absence</Button>
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
                  <table className="table table-striped table-bordered" >
                      <thead>
                          <tr>
                              <th >Type</th>
                              <th >Date</th>   
                              <th >Hour</th>     
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
                            <td>{item.hour}</td>
                            <td>{item.comment}</td>
                            <td className='text-center'>
                          {absences
                            .filter((abs) => abs.meeting_id === item.id)
                            .map((abs) => (
                              <div key={abs.id}>{abs.name}</div>
                            ))}
                        </td>
                            <td><Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)} style={{marginRight:10}} onClick={()=>{selectMeeting(item);setModalTitle("Update Meeting");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i className="fa-solid fa-pen-to-square"></i></Button></td>
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
