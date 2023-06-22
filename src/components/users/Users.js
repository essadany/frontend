import React, { useEffect } from 'react'
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
  
   // Get User list ---------------------------------------------------------------------------------------------------------------
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [users, setUsers] = useState([]);
        const [name, setName] = useState("");
        const [fonction, setFonction] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("user");
        const [user_id, setUser_id] = useState("");

        const [isAdmin, setIsAdmin] = useState(false);
        const [deleted, setDeleted] = useState(false);

        function checkAdmin() {
          setIsAdmin(!isAdmin);
        
          if (!isAdmin) {
            setRole('admin');
          } else {
            setRole('user');
          }
        }
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        function getUsers(){
          fetch("http://127.0.0.1:8000/api/users_activated")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setUsers(result);
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
        useEffect(() => {
          getUsers();
        }, [])

      
        // Add User ------------------------------------------------------------------------------------------------
        

        let handleSubmit = async (e) => {
            e.preventDefault();
            try {
              let res = await fetch("http://127.0.0.1:8000/api/user", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({name ,fonction ,email ,password,phone,role }),
              })
              let resJson = await res.json();
              
              if (res.status === 200) {
                setName("");
                setFonction("");
                setEmail("");
                setPassword("");
                setPhone("");
                setRole("");
                alert("User Added successfully");
                handleClose();
                getUsers();
              } else {
                alert("Some error occured, try again!");
              }
            } catch (err) {
              console.log(err);
            }
          };
          //Update User -------------------------------------------------------------------------------------------------
          const [user,setUser] = useState([]);
          function selectUser(user){
              setName(user.name);
              setFonction(user.fonction);
              setEmail(user.email);
              setPassword(user.password);
              setPhone(user.phone);
              setRole(user.role);
              setUser_id(user.id);
              setIsAdmin((user.role==='admin'))
          }
          function updateUser(){
            
            fetch(`http://127.0.0.1:8000/api/user/${user_id}`, {
              method: 'PUT',
              headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify({name ,fonction ,email ,password,phone,role })
            }).then((result) => {
                if(result.ok){
                  getUsers()
                  alert("User Updated successfully");
                  setName("");
                  setFonction("");
                  setEmail("");
                  setPassword("");
                  setPhone("");
                  setRole("user");
                  setEditB(true);
                  handleClose();
                  setIsAdmin(false);
                }else{
                  result.json().then((resp) => {
                    console.warn(resp)
                  })
                }
                
              })
              

            }
          // Delete User ------------------------------------------------------------------------------------------------------------------------
          function deleteUser(id){
            try{
                fetch(`http://127.0.0.1:8000/api/user_disactivated/${id}`, {
                  method: 'PUT',
                  headers:{
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(deleted)
                }).then((result) => {
                    if (result.ok){
                      getUsers();
                      alert("User Deleted successfully");
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
  // Filter Users --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = users.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

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
                            <label  class="form-label">Name* :</label>
                            <input type="text" class="form-control"  required value={name} onChange={(e)=>setName(e.target.value)} />
                            
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Function* : </label>
                            <input type="text" class="form-control"  required value={fonction} onChange={(e)=>setFonction(e.target.value)} />
                        </div>
                        <div className="form-check col-md-6">
                          <label  className="form-check-label">Admin ?</label>
                          <input type="checkbox" checked={isAdmin} class="form-check-input" required  onChange={(e)=>checkAdmin()}/>
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Email* :</label>
                            <input type="text" class="form-control"  required value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Phone :</label>
                            <input type="text" class="form-control"  required value={phone} onChange={(e)=>setPhone(e.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Password* :</label>
                            <input type="password" class="form-control"  required value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className='col-md-6'></div>
                    </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button   hidden={addB} onClick={handleSubmit} variant='primary'>Save</Button>
                  <Button hidden={editB} variant='success' onClick={updateUser}>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                            
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
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.fonction}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.role}</td>
                                <td><Button style={{marginRight:10}} onClick={()=>{handleShow();selectUser(item);setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button>
                                    <Button onClick={()=>deleteUser(item.id)} variant='danger' >Delete<i class="fa-solid fa-user-xmark"></i></Button></td>

                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
  )
}
