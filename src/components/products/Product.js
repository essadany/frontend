import React from 'react';
import './Product.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";

import  Modal  from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';

export default function Product() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [modalTitle,setModalTitle]= useState('Add new Product');
        const [addB,setAddB] = useState('');
        //const [editB,setEditB] = useState('');
    // Get Product list ---------------------------------------------------------------------------------------------------------------
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        
        const [products_customers,setProducts_customers]=useState([]);
          const handleChange = (e) => {
            setFilter(e.target.value);
          };
        function getProducts_customers(){
          fetch("http://127.0.0.1:8000/api/products_join_customers")
            .then(res => res.json())
            .then(
              (result) => {
                setProducts_customers(result);
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                setError(error);
              }
            )
        }
        useEffect(() => {
          getProducts_customers();
        }, []);
        // Add Product ------------------------------------------------------------------------------------------------
        const [customers,setCustomers]= useState([]);
        function getCustomers(){
          fetch("http://127.0.0.1:8000/api/customers")
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
        }, []);
          // Afficher la liste des clients et des zones des produits dans le formulaire        
        const customer_names = customers.map((item)=>({ value : item.id, label : item.name}));
        const product_zones = [
          {value: 'Module', label: 'Module'},
          {value: 'Gicleur', label: 'Gicleur'},
          {value: 'Clapet', label: 'Clapet'},
          {value: 'Vanne', label: 'Vanne'},
          {value: 'Faiscaux', label: 'Faiscaux'},
          {value: 'Bobine', label: 'Bobine'}
        ]
      
        const [product_ref, setProduct_ref] = useState("");
        const [customer_id, setCustomer_id] = useState("");
        const [customer_ref, setCustomer_ref] = useState("");
        const [customer_name, setCustomer_name] = useState("");
        const [name, setName] = useState(customer_names[1]);
        const [zone, setZone] = useState(product_zones[1]);
        const [uap, setUap] = useState("");
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
                  customer_ref : customer_ref,
                  customer_id : customer_id,
                  name: name,
                  zone: zone,
                  uap: uap
                }),
              })
              let resJson = await res.json();
              console.log(res.status);
              if (res.status === 200) {
                setProduct_ref("");
                setCustomer_ref("");
                setZone("");
                setName("");
                setUap("");
                alert("Product Added successfully");
                handleClose();
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
              setCustomer_ref(product.customer_ref);
              setCustomer_name(product.customer_name);
              setName(product.product_name);
              setZone(product.zone);
              setUap(product.uap);
              setProduct_ref(product.product_ref);
              
          };
          function updateProduct(){
            let item={product_ref ,customer_ref , customer_id,name ,zone ,uap }
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
                      setCustomer_ref("");
                      setCustomer_id("");
                      setCustomer_name("");
                      setZone("");
                      setName("");
                      setUap("");
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
          
          const filteredData = products_customers.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(filter.toLowerCase())
            )
          );
          

  return (
    <div className='main product'>
        <h2>Products</h2>
        
        <div className='border'>
        <div>
        <Button onClick={()=>{handleShow();setModalTitle("Add New Product");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Product</Button>

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
                <form class="row g-3  needs-validation" onSubmit={handleSubmit}>
                        
                        <div class="col-md-6">
                            <label  class="form-label">Intern reference* :</label>
                            <input type="text" class="form-control" onChange={(e)=>setProduct_ref(e.target.value)} value={product_ref} required />
                            <div class="valid-feedback">
                            Looks good!
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Customer reference* :</label>
                            <input type="text" class="form-control" onChange={(e)=>setCustomer_ref(e.target.value)}  value={customer_ref} required />
                            
                        </div>
                        <div class="col-md-6">
                          <label  class="form-label">Customer name* :</label>
                          <Select options={customer_names} class="form-select" defaultValue={customer_name}   aria-label="Default select example" onChange={(e)=>{setCustomer_name(e.label);setCustomer_id(e.value)}} />
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label">Product name* : </label>
                            <input type="text" class="form-control"  onChange={(e)=>setName(e.target.value)}   value={name} required />
                        </div>

                        <div class="col-md-6">
                            <label  class="form-label">Zone* :</label>
                            <Select options={product_zones} class="form-select" defaultValue={zone}  aria-label="Default select example" onChange={(e)=>setZone(e.label)} />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">UAP Engineer : </label>
                            <input type="text" class="form-control"  onChange={(e)=>setUap(e.target.value)}   value={uap}  />
                        </div>
                    </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button onClick={handleSubmit} hidden={addB} variant='primary'>Save</Button>
                  <Button onClick={updateProduct} hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                            
                  </Modal.Footer>
              </Modal>  
              </div>
            <div >
                <legend >LIST OF PRODUCTS</legend>
                <div className='filter'>
                  <form className='row'>
                    <div  className='col-2'>
                      <label >Customer : </label>
                      <Select  options={customer_names} />
                    </div>
                    <div  className='col-6'></div>
                    <div  className='col-4 filter'>
                      <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                    </div>
                  </form>
                  
                </div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th >Interne ref</th>
                            <th >Customer ref</th>
                            <th>Customer name</th>
                            <th >Product name</th>
                            <th>Zone</th>
                            <th>UAP Engineer</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.product_ref}</td>
                                <td>{item.customer_ref}</td>
                                <td>{item.customer_name}</td>
                                <td>{item.product_name}</td>
                                <td>{item.zone}</td>
                                <td>{item.uap}</td>
                                <td><Button style={{marginRight:10}} onClick={()=>{selectProduct(item);handleShow();setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button>
                                    <Button onClick={()=>deleteProduct(item)} variant='danger' >Delete<i class="fa-solid fa-user-xmark"></i></Button></td>
                                

                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}
