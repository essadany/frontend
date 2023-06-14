import React from 'react'
import './Meetings.css'
import '../my_actions/MyActions.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
import Tab from '../tabs/Tab';
export default function Meetings() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Meeting');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);
  const meetings_type = [
  { value: 'Containement', label: 'Containement' },
  { value: 'Analyse', label: 'Analyse' },
  { value: 'Closure', label: 'Closure' },
  ]
  // Filter Meetings --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  /*const filteredData = Meetings.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );*/

  return (
    <div className='main'>
        <Tab />
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
                <form class="row g-3  needs-validation">
                        <div class="col-md-6">
                            <label  class="form-label">Type* :</label>
                            <Select options={meetings_type} required />
                            
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">date* : </label>
                            <input type="date" class="form-control" required />
                        </div>
                      
                        <div class="col-md-12">
                            <label class="form-label">Comment :</label>
                            <textarea className="form-control" required />
                        </div>
                        
                    </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button   hidden={addB} variant='primary'>Save</Button>
                  <Button hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                            
                  </Modal.Footer>
            </Modal>   
            </div>
            <div >
                <legend >List Of Meetings</legend>
                <div className='row md-4 filter'>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'>
                    <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                  </div>
                </div>
                <div className='table-responsive'>
                  <table className="table table-striped" >
                      <thead>
                          <tr>
                              <th >Type</th>
                              <th >Date</th>
                              <th>Absences</th>
                              <th>Comment</th>
                              <th></th>
                          </tr>                   
                      </thead>
                      <tbody>
                      
                              <tr>
                                  <td></td>
                                  <td></td>
                                  <td>
                                      <select className='form-select' options={meetings_type} required/>
                                      <Button className="circle-button"  variant='warning'><Plus /></Button>

                                      <li>
                                        YASSINE
                                      </li>
                                    
                                  </td>
                                  <td></td>
                                  <td><Button style={{marginRight:10}} onClick={()=>{setModalTitle("Update Meeting");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>

                      </tr>
                      </tbody>
                  </table>
                </div>
                

            </div>
        </div>
    </div>
  )
}
