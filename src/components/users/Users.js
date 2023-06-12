import React from 'react'
import './Users.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
export default function Users() {
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
  // Filter Users --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  /*const filteredData = users.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );*/

  return (
    <div className='main'>
        <h2 >Users</h2>
        <div className='border'>
        <div>
        <Button onClick={()=>{handleShow();setModalTitle("Add New User");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New User</Button>

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
                            <label for="validationCustom02" class="form-label">Name* :</label>
                            <input type="text" class="form-control" id="validationCustom02"  required />
                            
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Function* : </label>
                            <input type="text" class="form-control" id="validationCustom02"  required />
                            <div class="valid-feedback">
                            Looks good!
                            </div>
                        </div>
                        <div className="form-check col-md-6">
                          <label  className="form-check-label">Admin ?</label>
                          <input type="checkbox"  class="form-check-input" required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Email* :</label>
                            <input type="text" class="form-control" id="validationCustom02"  required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Phone :</label>
                            <input type="text" class="form-control" id="validationCustom02"  required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Password* :</label>
                            <input type="password" class="form-control" id="validationCustom02"  required />
                        </div>
                        <div className='col-md-6'></div>
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
                <legend >List Of Users</legend>
                <div className='row md-4 filter'>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'>
                    <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                  </div>
                </div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th >Name</th>
                            <th >Function</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><Button style={{marginRight:10}} onClick={()=>{setModalTitle("Update User");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button>
                                    <Button  variant='danger' >Delete<i class="fa-solid fa-user-xmark"></i></Button></td>

                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
  )
}
