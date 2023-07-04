import { Add, AddAPhoto, AddComment, Done, StarTwoTone } from '@material-ui/icons';
import React from 'react'
import { useState, useEffect } from 'react';
import { Button, FormSelect } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Play, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import './MyActions.css';
import  Modal  from 'react-bootstrap/Modal'
import { CircularProgress, LinearProgress } from '@material-ui/core';
import  Select  from 'react-select';
import { useParams } from 'react-router';
import { useAuth } from '../Login/AuthProvider';
import moment from 'moment';
export default function MyActions() {
  const auth = useAuth();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
const handleClose1 = () =>  setShow1(false);
  const [modalTitle,setModalTitle]= useState('Add new Comment');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);
  const [actions, setActions] = useState([]);
  const [comment, setComment] = useState('');
  const [comment_date, setComment_date] = useState('');


  const actions_status = [
    { value: 'not started', label: 'not started' },
    { value: 'on going', label: 'on going' },
    { value: 'done', label: 'done' },
    { value: 'delayed', label: 'delayed' }
    ]

    //Get Actions join Claims
    const user_id = auth.user.id;
    function getActions_join_Claims(){
      fetch(`http://127.0.0.1:8000/api/user/${user_id}{/actions_join_claims`)
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
    }

    // Get Comments of action-----------------------------------------------------
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
    useEffect(()=>{
      getActions_join_Claims()
    }
      ,[user_id]);
      useEffect(() => {
        getComments();
      }, []);

  //Begin Action-------------------------------------------------------------
  const currentDate = new Date();
  const formattedDate =  moment(currentDate.toDateString()).format("YYYY-MM-DD");

  function beginAction(item) {
    if (item.status==='not started'){
      try{
        fetch(`http://127.0.0.1:8000/api/action/${item.id}/update_status`, {
          method: 'PUT',
          headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({status : "on going", start_date : formattedDate, done_date:item.done_date})
        }).then((result) => {
            if (result.ok){
              getActions_join_Claims();
            }else{
              result.json().then((resp) => {
                console.warn(resp)
                alert("Some error occured!");
  
              })
            }
            
          })
        
      } catch (err) {
      console.log(err);
    }
    } else if (item.status==="on going") {
      try{
        fetch(`http://127.0.0.1:8000/api/action/${item.id}/update_status`, {
          method: 'PUT',
          headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({status : "done",start_date :item.start_date, done_date : formattedDate})
        }).then((result) => {
            if (result.ok){
              getActions_join_Claims();
            }else{
              result.json().then((resp) => {
                console.warn(resp)
                alert("Some error occured!");
  
              })
            }
            
          })
        
      } catch (err) {
      console.log(err);
    }
    }
    
  }
  //-------------------------------------------------------------------------------------
  //Action Done --------------------------------------------------------------------------------------------
  function actionDone(id) {
    try{
      fetch(`http://127.0.0.1:8000/api/action/${id}/update_status`, {
        method: 'PUT',
        headers:{
          'Accept' : 'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({status : "done", done_date : formattedDate })
      }).then((result) => {
          if (result.ok){
            getActions_join_Claims();
          }else{
            result.json().then((resp) => {
              console.warn(resp)
              alert("Some error occured!");

            })
          }
          
        })
      
    } catch (err) {
    console.log(err);
  }
  }
  
  // Add Comment-----------------------------------------------------------------------------------
  const [action_id,setAction_id]= useState("");
  let handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/action_comment", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({action_id : action_id ,comment : comment  , comment_date : formattedDate}), })      
      if (res.status === 200) {
        setComment("");
        handleClose1();
        getComments();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Filter Users --------------------------------------------------------------------------------------------------------------------------
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
      String(value).toLowerCase().includes(filter.toLowerCase()) &&
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filter1.toLowerCase())
      )
    )
  );

  
  return (
    <div className='main'>
        <h2 >My Actions</h2>
        <div className='border'>
        <div >
                <legend >List Of Actions</legend>
                <div>
                <Modal
                size='md'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>Update Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form class="container row g-3">
                    <div class="col-12">
                      <label class="form-label">Comment : </label>
                      <textarea type="text" class="form-control"  />
                    </div>
                    <div class="col-12">
                      <label className="form-label" class="form-label">Status : </label>
                      <select className='form-select selectpicker' >
                      <option  selected disabled >--- Select Status ---</option>
                      {actions_status.map((item)=>(<option value={item.label} >{item.label}</option>))}
                      </select>                   
                    </div>
                  </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button   variant='primary'>Save</Button>                            
                  </Modal.Footer>
            </Modal>   
                </div>
                <div className='filter'>
                  <form className='container row'>
                    <div  className='col-2'>
                      <label>Claim reference : </label>
                      <select className='form-select selectpicker'  label={filter1} onChange={handleChange1}>
                      <option  selected disabled >--- Select Claim ---</option>
                      {actions.map((item)=>(<option value={item.internal_ID} >{item.internal_ID}</option>))}
                      </select>    
                    </div>
                    <div  className='col-6'></div>
                    <div  className='col-4 filter'>
                      <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                    </div>
                  </form>
                  
                </div>
                <div className='table-responsive'>
                  <table className="table table-striped" >
                      <thead>
                          <tr>
                              <th >Clain reference</th>
                              <th >Action</th>
                              <th >Planned date</th>
                              <th >Started date</th>
                              <th >Done date</th>
                              <th>Comment</th>
                              <th>Status</th>
                              <th></th>
                              
                          </tr>                   
                      </thead>
                      <tbody>
                      {filteredData.map((item)=>(
                        <tr>
                                <td>{item.internal_ID}</td>
                                  <td>{item.action}</td>
                                  <td>{item.planned_date}</td>
                                  <td>{item.start_date}</td>
                                  <td>{item.done_date}</td>
                                  <td>
                                  {comments
                                  .filter((comm) => comm.action_id === item.id)
                                  .map((comm) => (
                                    <p key={comm.id}>{comm.comment};</p>
                                  ))}
                                  <Button onClick={(e)=>{setAction_id(item.id);handleShow1()}}  className='circle-button' variant='secondary' ><AddComment /></Button>
                                  <Modal
                                    size='md'
                                    show={show1}
                                    onHide={handleClose1}
                                    backdrop="static"
                                    keyboard={false}
                                    >
                                    <Modal.Header closeButton>
                                    <Modal.Title>{modalTitle}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form className='container'>
                                            <div>
                                              <label>Comment :</label>
                                              <textarea  className='form-control form-control-sm' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                                            </div> 
                                          </form>
                                        </Modal.Body>
                                      <Modal.Footer>
                                      <Button variant="secondary" onClick={handleClose1}>
                                          Annuler
                                      </Button>
                                      <Button onClick={handleSubmit1}  variant='primary'>Save</Button>                    
                                      </Modal.Footer>
                                  </Modal>
                                  </td>
                                  <td>{item.status === 'done' ? (
                                    <b style={{ color: 'green' }}>Done</b>
                                  ) : item.status === 'not started' ? (
                                    <Button className='circle-button' variant='none' onClick={() => beginAction(item)}>
                                      <Play color='blue' />
                                    </Button>
                                  ) : (
                                    <>
                                      <b style={{ color: 'orange' }}>On going</b>
                                      <Button className='circle-button' variant='none' onClick={() => beginAction(item)}>
                                        <Done color='green' />
                                      </Button>
                                    </>
                                  )}</td>
                                  <td><Button style={{marginRight:10}} onClick={()=>handleShow()} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>                            
                              </tr>
                      ))}
                              
                      </tbody>
                  </table>
                </div>
                

            </div>
        </div>
    </div>  
    );
}