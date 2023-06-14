import React from 'react'
import './Actions.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button, FormSelect } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
import { Skeleton } from '@mui/material';
import Tab from '../tabs/Tab';
export default function Actions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Product');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);
  const actions_type = [
  { value: 'Potential', label: 'Potential' },
  { value: 'Implemented', label: 'Implemented' },
  { value: 'Preventive', label: 'Preventive' }
  ]
  const actions_status = [
    { value: 'not started', label: 'not started' },
    { value: 'on going', label: 'on going' },
    { value: 'done', label: 'done' }
    ]
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
                <form class="row g-3  needs-validation">
                        <div className="col-12">
                            <label class="form-label">Pilot* :</label>
                            <Select  required />
                            
                        </div>
                        <div className="col-6">
                            <label  class="form-label">Planned date* : </label>
                            <input type="date" class="form-control"  required />
                        </div>
                        <div className="form-check col-6">
                          <label  className="form-check-label">Type* :</label>
                          <Select options={actions_type} />
                        </div>
                        <div className="col-12">
                            <label class="form-label">Action* :</label>
                            <textarea  class="form-control"   required />
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
                            <th>Comment</th>
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
