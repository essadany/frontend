import React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";

import  Modal  from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';

export default function Product({haveAccess}) {
        const auth=useAuth();
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [modalTitle,setModalTitle]= useState('Add new Product');
        const [addB,setAddB] = useState('');
        //const [editB,setEditB] = useState('');
    
    // Get Product list ---------------------------------------------------------------------------------------------------------------
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [isLoaded1, setIsLoaded1] = useState(false);

        const [products_customers,setProducts_customers]=useState([]);
          const handleChange = (e) => {
            setFilter(e.target.value);
          };
          const handleChange2 = (e) => {
            setFilter2(e.target.value);
          };
        function getProducts_customers(){
          fetch("http://127.0.0.1:8000/api/products_join_customers")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setProducts_customers(result);
                
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
          getProducts_customers();
        }, [isLoaded]);
        // Add Product ------------------------------------------------------------------------------------------------
        const [customers,setCustomers]= useState([]);
        function getCustomers(){
          fetch("http://127.0.0.1:8000/api/customers")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded1(true);
                setCustomers(result);
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                setIsLoaded1(true);
                setError(error);
              }
            )
        }
        useEffect(() => {
          getCustomers();
        }, [isLoaded1]);
          // Afficher la liste des clients et des zones des produits dans le formulaire        
        
        const product_zones = [
          {value: '', label: '--- Select Zone ---',Selected : true, Disabled : true},
          {value: 'Module', label: 'Module'},
          {value: 'Gicleur', label: 'Gicleur'},
          {value: 'Clapet', label: 'Clapet'},
          {value: 'Vanne', label: 'Vanne'},
          {value: 'Faiscaux', label: 'Faiscaux'},
          {value: 'Bobine', label: 'Bobine'}
        ]
      
        const [product_ref, setProduct_ref] = useState("");
        const [customer_id, setCustomer_id] = useState("");
        const [customer_code, setcustomer_code] = useState("");
        const [customer_name, setCustomer_name] = useState("");
        const [name, setName] = useState('');
        const [zone, setZone] = useState('');
        const [deleted, setDeleted] = useState(false);
        const [message, setMessage] = useState("");
        const [editB,setEditB] = useState(true);

        let handleSubmit = async (e) => {
            e.preventDefault();
            try {
              let res = await fetch("http://127.0.0.1:8000/api/product", {
                method: "POST",
                headers: {
                  'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                  product_ref : product_ref,
                  customer_code : customer_code,
                  customer_id : customer_id,
                  name: name,
                  zone: zone,
                }),
              })
              let resJson = await res.json();
              console.log(res.status);
              if (res.status === 200) {
                setProduct_ref("");
                setcustomer_code("");
                setZone("");
                setName("");
                alert("Product Added successfully");
                handleClose();
                getProducts_customers();
              } else {
                alert("Some error occured, try again!");
              }
            } catch (err) {
              console.log(err);
            }
          };
          //Update Product -------------------------------------------------------------------------------------------------
          const [product,setProduct] = useState([]);
          function selectProduct(product){
              setProduct(product);
              setcustomer_code(product.customer_code);
              setCustomer_name(product.customer_name);
              setCustomer_id(product.customer_id)
              setName(product.product_name);
              setZone(product.zone);
              setProduct_ref(product.product_ref);
              
          };
          function updateProduct(){
            let item={product_ref ,customer_code , customer_id,name ,zone }
            console.warn("item",item)
            try{
                fetch(`http://127.0.0.1:8000/api/product/${product.product_id}`, {
                  method: 'PUT',
                  headers:{
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(item)
                }).then((result) => {
                    if (result.ok){
                      getProducts_customers();
                      setProduct_ref("");
                      setcustomer_code("");
                      setCustomer_id("");
                      setCustomer_name("");
                      setZone("");
                      setName("");
                      alert("Product Updated successfully");
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
            
          // Delete Product ------------------------------------------------------------------------------------------------------------------------
          function deleteProduct(product){
            try{
                fetch(`http://127.0.0.1:8000/api/product_disactivated/${product.product_id}`, {
                  method: 'PUT',
                  headers:{
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(deleted)
                }).then((result) => {
                    if (result.ok){
                      getProducts_customers();
                      alert("Product Deleted successfully");
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
          // Filter Products --------------------------------------------------------------------------------------------------------------------------
          const [filter, setFilter] = useState("");
          const [filter2, setFilter2] = useState("");
          
          const filteredData = products_customers.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(filter.toLowerCase())
            ) && 
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(filter2.toLowerCase())
            )
          );
          

  return (
    <div className='main product'>
        <h2>Products</h2>
        
        <div className='border'>
        <div>
        <Button disabled={!haveAccess || auth.user.role!=='admin' }  onClick={()=>{handleShow();setModalTitle("Add New Product");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Product</Button>

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
                <form className="row g-3 container  needs-validation" onSubmit={handleSubmit}>
                        
                        <div className="col-md-6">
                            <label  className="form-label">Bontaz Part Number* :</label>
                            <input type="text" className="form-control" onChange={(e)=>setProduct_ref(e.target.value)} value={product_ref} required />
                        </div>
                        <div className="col-md-6">
                            <label  className="form-label">Customer code* :</label>
                            <input type="text" className="form-control" onChange={(e)=>setcustomer_code(e.target.value)}  value={customer_code} required />
                            
                        </div>
                        
                        <div className="col-md-6">
                            <label className="form-label">Product name* : </label>
                            <input type="text" className="form-control"  onChange={(e)=>setName(e.target.value)}   value={name} required />
                        </div>

                        <div className="col-md-6">
                            <label  className="form-label">Zone* :</label>
                            <select data-live-search="true"  className='selectpicker form-select' onChange={(e)=>setZone(e.target.value)} required >
                            <option selected disabled>--- Select Zone ---</option>
                            <option selected={zone==="Salle Grise 1"} >Salle Grise 1</option>
                            <option selected={zone==="Salle Grise 2"}>Salle Grise 2</option>
                            <option selected={zone==="Salle Grise 3"}>Salle Grise 3</option>
                            <option selected={zone==="Gicleur & Clapet"}>Gicleur & Clapet</option>
                            <option selected={zone==="Fx Bobine Injection"}>Fx Bobine Injection</option>
                            <option selected={zone==="Vanne motorisée"}>Vanne motorisée</option>
                            </select>
                        </div>
                        <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button type='submit'  hidden={addB} variant='primary'>Save</Button>
                  <Button   onClick={updateProduct} hidden={editB} variant='success'>Update<i className="fa-solid fa-pen-to-square"></i></Button>
                            
                  </Modal.Footer>
                    </form>
                    </Modal.Body>
                  
              </Modal>  
              </div>
            <div >
                <legend >LIST OF PRODUCTS</legend>
                <div className='filter'>
                  <form className='row container'>
                    <div  className='col-2'>
                      <label >Customer : </label>
                      <select data-live-search="true" label={filter} className='selectpicker form-select' onChange={handleChange} required >
                            <option selected disabled >--- Select Customer ---</option>
                            {customers.map((item)=>(<option >{item.name}</option> ))}
                          </select>
                    </div>
                    <div  className='col-6'></div>
                    <div  className='col-4 filter'>
                      <input  className="form-control " type="text" placeholder="Filter table" value={filter2} onChange={handleChange2} />
                    </div>
                  </form>
                  
                </div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th >Interne ref</th>
                            <th >Customer code</th>
                            <th>Customer name</th>
                            <th >Product name</th>
                            <th>Zone</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.product_ref}</td>
                                <td>{item.customer_code}</td>
                                <td>{item.customer_name}</td>
                                <td>{item.product_name}</td>
                                <td>{item.zone}</td>
                                <td><Button  disabled={!haveAccess || auth.user.role!=='admin' } style={{marginRight:10}} onClick={()=>{selectProduct(item);setModalTitle("Update Product");handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i className="fa-solid fa-pen-to-square"></i></Button>
                                    <Button  disabled={!haveAccess || auth.user.role!=='admin'}  onClick={()=>deleteProduct(item)} variant='danger' >Delete<i className="fa-solid fa-user-xmark"></i></Button></td>
                                

                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}
