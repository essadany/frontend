import React from 'react'
import './Claim_track.css'
import '../8d_report/Report.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
export default function Claim_track() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Product');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);
  const options = [
  { value: 'Intern', label: 'Intern' },
  { value: 'Extern', label: 'Extern' }
  ]
  // Filter Claim Trackings --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  /*const filteredData = Claim Trackings.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );*/

  return (
    <div className='main'>
        <h2 >Claim Trackings</h2>
        <div className='border'>
            <div>
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
                    <form class="row g-3">
                      <div class="col-12">
                        <label for="inputAddress" class="form-label">8D Submission date</label>
                        <input type="date" class="form-control" />
                      </div>
                      <div class="col-12">
                        <label class="form-label">Détails</label>
                        <textarea type="text" class="form-control"  />
                      </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button  hidden={addB} variant='primary'>Save</Button>
                  <Button  hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                            
                  </Modal.Footer>
            </Modal> 
            </div>
        
            <div >
                <legend >List Of Claim Trackings</legend>
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
                          <th>Opening date</th>  
                          <th>Year</th>
                          <th>Month</th>
                          <th>Week</th>
                          <th>Category</th>
                          <th >internal ID</th>
                          <th >Direct Customer</th>
                          <th>Final Customer</th>
                          <th>BCMA Responsiblity</th>
                          <th>N° Claim/AQI</th>
                          <th>Claim Object (e-mail)</th>
                          <th >Claim details</th>
                          <th>Mode de défaillance</th>
                          <th >BCMA Part number</th>
                          <th>Customer Part number</th>
                          <th >Product designation</th>
                          <th>UAP</th>
                          <th>Number of claimed parts</th>
                          <th >NOK parts after customer  sorting</th>
                          <th>Production date of claimed part</th>
                          <th>Recurrence</th>
                          <th>Returned parts</th>
                          <th>25%</th>
                          <th>50%</th>
                          <th>75%</th>
                          <th>100%</th>
                          <th>Progress rate</th>
                          <th>8D Due date</th>
                          <th>8D status</th>
                          <th>8D Submission date</th>
                          <th>5M</th>
                          <th>Détails</th>
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><Button style={{marginRight:10}} onClick={()=>{setModalTitle("Update Claim Tracking");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                

            </div>
        </div>
    </div>
  )
}
