import React from 'react';
import './Customer.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";

import  Modal  from 'react-bootstrap/Modal'


export default function Customer({haveAccess}) {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [modalTitle,setModalTitle]= useState('Add new Product');
        const [addB,setAddB] = useState('');
      

    // Get Customer list ---------------------------------------------------------------------------------------------------------------
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [customers, setCustomers] = useState([]);
        
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        function getCustomers(){
          fetch("http://127.0.0.1:8000/api/customers_activated")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setCustomers(result);
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
          getCustomers();
        }, [])
        // Add Customer ------------------------------------------------------------------------------------------------
        const [customer_ref, setCustomer_ref] = useState("");
        const [name, setName] = useState("");
        const [category, setCategory] = useState("");
        const [info, setInfo] = useState("");
        const [deleted, setDeleted] = useState(false);
        const [message, setMessage] = useState("");
        const [editB,setEditB] = useState(true);

        let handleSubmit = async (e) => {
            e.preventDefault();
            try {
              let res = await fetch("http://127.0.0.1:8000/api/customer", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                  customer_ref : customer_ref,
                  name: name,
                  category: category,
                  info: info
                }),
              })
              let resJson = await res.json();
              
              if (res.status === 200) {
                setCustomer_ref("");
                setCategory("");
                setName("");
                setInfo("");
                alert("Customer Added successfully");
                handleClose();
                getCustomers();
              } else {
                alert("Some error occured, try again!");
              }
            } catch (err) {
              console.log(err);
            }
          };
          //Update Customer -------------------------------------------------------------------------------------------------
          const [customer,setCustomer] = useState([]);
          function selectCustomer(customer){
            
           
                setCustomer_ref(customer.customer_ref);
                setName(customer.name);
                setCategory(customer.category);
                setInfo(customer.info);
                setCustomer(customer)
          }
          function updateCustomer(){
            let item={customer_ref ,name ,category ,info }
            console.warn("item",item)
            try{
              fetch(`http://127.0.0.1:8000/api/customer/${customer.id}`, {
              method: 'PUT',
              headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify(item)
            }).then((result) => {
                if(result.ok){
                  getCustomers()
                  alert("Customer Updated successfully");
                  setCustomer_ref("");
                  setCategory("");
                  setName("");
                  setInfo("");
                  setEditB(true);
                  handleClose();
                }else{
                  result.json().then((resp) => {
                    console.warn(resp)
                  })
                }
                
              })
            }catch (e){
                console.error("Error",e);
            }
              

            }
          // Delete Customer ------------------------------------------------------------------------------------------------------------------------
          function deleteCustomer(id){
            try{
                fetch(`http://127.0.0.1:8000/api/customer_disactivated/${id}`, {
                  method: 'PUT',
                  headers:{
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(deleted)
                }).then((result) => {
                    if (result.ok){
                      getCustomers();
                      alert("Customer Deleted successfully");
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
          // Filter Customers --------------------------------------------------------------------------------------------------------------------------
          const [filter, setFilter] = useState("");
          const handleChange = (e) => {
            setFilter(e.target.value);
          };

          const filteredData = customers.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(filter.toLowerCase())
            )
          );
          

  return (
    <div className='main Customer'>
        <h2>Customers</h2>
        <div className='border'>
          <div>
        <Button  disabled={!haveAccess}  onClick={()=>{handleShow();setModalTitle("Add New Customer");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Customer</Button>

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
                <form className="row container g-3  needs-validation" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label for="validationCustom02" className="form-label">Reference* :</label>
                            <input type="text" className="form-control" id="validationCustom02" onChange={(e)=>setCustomer_ref(e.target.value)}  value={customer_ref} required />
                        </div>
                        <div className="col-md-6">
                            <label for="validationCustom02" className="form-label">Customer name* : </label>
                            <input type="text" className="form-control" id="validationCustom02" onChange={(e)=>setName(e.target.value)}   value={name} required />
                        </div>
                        <div className="col-md-6">
                            <label for="validationCustom02" className="form-label">Category* :</label>
                            <select data-live-search="true"  className='selectpicker form-select'  onChange={(e)=>setCategory(e.target.value)}  required >
                            <option disabled selected>--- Select Category ---</option>
                            <option selected={category==='Intern'}>Intern</option>
                            <option selected={category==='Extern'}>Extern</option>
                        </select>
                        </div>
                        <div className="col-md-6">
                            <label for="validationCustom02" className="form-label">About : </label>
                            <textarea type="text" className="form-control" id="validationCustom02" onChange={(e)=>setInfo(e.target.value)}   value={info}  />
                        </div>
                        <div className='col-md-6'></div>
                        <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button type='submit' hidden={addB} variant='primary'>Save</Button>
                  <Button onClick={updateCustomer} hidden={editB} variant='success'>Update<i className="fa-solid fa-pen-to-square"></i></Button>
                            
                  </Modal.Footer>
                    </form>
                    </Modal.Body>
                  
            </Modal>   
            </div>
            <div >
                <legend >List Of Customers</legend>
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
                            <th >Customer ref</th>
                            <th >Name</th>
                            <th>category</th>
                            <th>info</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.customer_ref}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.info}</td>
                                <td><Button disabled={!haveAccess} style={{marginRight:10}} onClick={()=>{setModalTitle('Update Customer');handleShow();selectCustomer(item);setAddB(true);setEditB(false)}} variant='primary'>Edit<i className="fa-solid fa-pen-to-square"></i></Button>
                                    <Button disabled={!haveAccess} onClick={()=>deleteCustomer(item.id)} variant='danger' >Delete<i className="fa-solid fa-user-xmark"></i></Button></td>

                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}

