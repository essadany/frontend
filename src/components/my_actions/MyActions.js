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
export default function MyActions() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle,setModalTitle]= useState('Add new Meeting');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);


 


  // Filter Users --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  /*const filteredData = actions.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );*/

  
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
                  <form class="row g-3">
                    <div class="col-12">
                      <label class="form-label">Commentaire : </label>
                      <textarea type="text" class="form-control"  />
                    </div>
                    <div class="col-12">
                      <label className="form-label" class="form-label">Status : </label>
                      <FormSelect class="form-control" />
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
                  <form className='row'>
                    <div  className='col-2'>
                      <label>Claim reference : </label>
                      <Select   />
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
                              <th >Action</th>
                              <th >Planned date</th>
                              <th>Comment</th>
                              <th>ferejihugyur</th>
                              <th>htrh</th>
                              
                          </tr>                   
                      </thead>
                      <tbody>
                      
                              <tr>
                                  <td>skdjfsdkhg ihgierhg hfdjghfgeiuh heigurghr hjdfghfdiu fguirhg</td>
                                  <td>10-06-2023</td>
                                  <td>Exemple commentaire  <Button  className='circle-button' variant='secondary'><AddComment /></Button></td>
                                  <td><Button className='circle-button' variant='primary'><Play /></Button>
                                  <Button className='circle-button' variant='success'><Done /></Button></td>
                                  <td><Button style={{marginRight:10}} onClick={()=>handleShow()} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>                            </tr>
                              <tr>
                                  <td>htntre erreuithherjthre irutreerther jerihreiuerizt erthreuithery</td>
                                  <td>11/06/2023</td>
                                  <td>Exemple commentaire  <Button  className='circle-button' variant='secondary'><AddComment /></Button></td>
                                  <td><Button variant='none'><CircularProgress disableShrink /></Button>
                                  <Button className='circle-button' variant='success'><Done /></Button></td>
                                  <td><Button style={{marginRight:10}} onClick={()=>handleShow()} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
                              </tr>
                      </tbody>
                  </table>
                </div>
                

            </div>
        </div>
    </div>  
    );
}