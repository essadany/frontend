import React from 'react'
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import Header from '../header/Header';
import SideNavBar from '../sidebar/SideNavBar';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import  Modal  from 'react-bootstrap/Modal'
import {Button, FormSelect} from 'react-bootstrap';
import './Claims.css';
import { Details, Done } from '@material-ui/icons';
import { Link } from 'react-router-dom';
export default function Claims() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Claim');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
 
// Get Claim list ---------------------------------------------------------------------------------------------------------------
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [claims, setClaims] = useState([]);
    
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    function getClaims(){
      fetch("http://127.0.0.1:8000/api/claims_join")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setClaims(result);
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
      getClaims();
    }, [])
    // Add Claim ------------------------------------------------------------------------------------------------
    
    const [internal_ID, setInternal_ID] = useState(" ");
    const [refRecClient, setRefRecClient] = useState("");
    const [product_ref, setProduct_ref] = useState("");
    const [engraving, setEngraving] = useState("");
    const [prod_date, setProd_date] = useState("");
    const [type, setType] = useState("");
    const [object, setObject] = useState("");
    const [opening_date, setOpening_date] = useState("");
    const [direct_customer, setDirect_customer] = useState("");
    const [final_cusomer, setFinal_cusomer] = useState("");
    const [claim_details, setClaim_details] = useState("");
    const [def_mode, setDef_mode] = useState("");
    const [prod_designation, setProd_designation] = useState("");
    const [nbr_claimed_parts, setNbr_claimed_parts] = useState("");
    const [deleted,setDeleted]= useState(false);
    const [products,setProducts]= useState([]);
    const [customers,setCustomers]= useState([]);
    const [status, setStatus] = useState("not started");

    const [customer_id,setCustomer_id]= useState('');
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

        

    function getProductsByCustomer(customer_id){
      
      fetch(`http://127.0.0.1:8000/api/products_by_customer/${customer_id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProducts(result);       
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
    useEffect(()=>{
      if (customer_id !== '') {
        getProductsByCustomer(customer_id);
      }
    },[customer_id])
    
   
    
    const [customer_name,setCustomer_name]= useState("");
    const[product_name,setProduct_name] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://127.0.0.1:8000/api/claim", {
            method: "POST",
            headers: {
              'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ internal_ID , refRecClient , product_ref, engraving , prod_date , object , opening_date , final_cusomer ,
              claim_details ,
              def_mode ,
              nbr_claimed_parts,
            }),
          })
          let resJson = await res.json();
          
          if (res.status === 200) {
            setInternal_ID('');
            setRefRecClient('');
            setProduct_name("");
            setEngraving('');
            setProd_date('');
            setObject('');
            setOpening_date('');
            setFinal_cusomer('');
            setClaim_details('');
            setDef_mode('');
            setNbr_claimed_parts('');
            alert("Claim Added successfully");
            setShow(false);
            handleClose();
            getClaims();
          } else {
            alert("Some error occured, Verify that : - All fields required are typed -The claim reference is not duplicated! - The product reference exists in products table (if not than add it in product interface)");
          }
        } catch (err) {
          console.log(err);
        }
      };
      //Update Claim -------------------------------------------------------------------------------------------------
      const [id,setId] = useState("");
      function selectClaim(claim){
        
        console.log(claim)
        setInternal_ID(claim.internal_ID);
          setRefRecClient(claim.refRecClient);
          setProduct_name(claim.product_name);
          setCustomer_name(claim.customer_name);
          setCustomer_id(claim.customer_id);
          setProduct_ref(claim.product_ref);
          setEngraving(claim.engraving);
          setProd_date(claim.prod_date);
          setObject(claim.object);
          setOpening_date(claim.opening_date);
          setFinal_cusomer(claim.final_cusomer);
          setClaim_details(claim.claim_details);
          setDef_mode(claim.def_mode);
          setNbr_claimed_parts(claim.nbr_claimed_parts);
          setId(claim.id);
      }
      function updateClaim(){
        let item = {
          internal_ID : internal_ID ,
          refRecClient : refRecClient ,
          product_ref : product_ref,
          engraving : engraving,
          prod_date : prod_date,
          object : object,
          opening_date : opening_date ,
          final_cusomer : final_cusomer ,
          claim_details : claim_details,
          def_mode : def_mode,
          nbr_claimed_parts : nbr_claimed_parts,
          
        }
        console.warn("item",item)
        try{
          fetch(`http://127.0.0.1:8000/api/claim/${id}`, {
            method: 'PUT',
            headers:{
              'Accept' : 'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(item)
          }).then((result) => {
              if (result.ok){
                getClaims()
                setInternal_ID('');
                setRefRecClient('');
                setEngraving('');
                setProduct_ref('');
                setCustomer_name('');
                setProd_date('');
                setObject('');
                setOpening_date('');
                setFinal_cusomer('');
                setClaim_details('');
                setDef_mode('');
                setNbr_claimed_parts('');
                alert("Claim Updated successfully");
                setShow(false);
                handleClose();
              }else{
                result.json().then((resp) => {
                  console.warn(resp);
                  alert("Some error occured, Verify that : - All fields required are typed -The claim reference is not duplicated! - The product reference exists in products table (if not than add it in product interface)");

              })
              }
              
            })
            
          }catch (err){
            console.log(err)
          }
        }

        //update Status
        function updateStatus(claim){
          let item = {
            status : "done",
          }
          try{
            fetch(`http://127.0.0.1:8000/api/claim_status/${claim.id}`, {
              method: 'PUT',
              headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify(item)
            }).then((result) => {
              if (result.ok){
                getClaims();
              }})
            }catch (err){
              console.log(err)
            }
          }
      // Delete Claim ------------------------------------------------------------------------------------------------------------------------
      function deleteClaim(id) {
        try{
          fetch(`http://127.0.0.1:8000/api/claim_disactivated/${id}`, {
            method: 'PUT',
            headers:{
              'Accept' : 'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(deleted)
          }).then((result) => {
              if (result.ok){
                getClaims();
                alert("Claim Deleted successfully");
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
      // Filter claims --------------------------------------------------------------------------------------------------------------------------
      const [filter, setFilter] = useState("");
      const [filter1, setFilter1] = useState("");
      const [filter2, setFilter2] = useState("");
      const handleInputChange = (e) => {
        setFilter(e.target.value);
      };
      const handleSelectChange2 = (e) => {
        setFilter2(e.target.value);
      };
      const handleSelectChange1 = (e) => {
        setFilter1(e.target.value);
      };

      const filteredData = claims.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filter1.toLowerCase())
        ) &&
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filter2.toLowerCase())
        ) &&
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      );

  return (
    
    <div className='main'>
        <h2 >Claims</h2>
        <div className='border '>
        <div>
        <Button onClick={()=>{handleShow();setModalTitle("Add New Claim");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Claim</Button>
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
            <form class="row g-3 container needs-validation" onSubmit={handleSubmit}>
                <div class="col-md-6">
                    <label for="validationCustom01" class="form-label">Intern ID* :</label>
                    <input type="text" class="form-control" id="validationCustom01" onChange={(e)=>setInternal_ID(e.target.value)} value={internal_ID} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Customer Claim ref* :</label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setRefRecClient(e.target.value)}  value={refRecClient} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                  <label  class="form-label">Customer* :</label>
                  <select data-live-search="true"   className='selectpicker form-select' onChange={(e)=>{setCustomer_name(e.label);setCustomer_id(e.target.value)}} required >
                    <option disabled selected>--- Select Customer ---</option>
                    {customers.map((item)=>(<option value={item.id} selected={item.id===customer_id}>{item.name}</option>))}
                  </select>
                </div>
                <div class="col-md-6">
                  <label  class="form-label">Product reference* :</label>
                  <select data-live-search="true"  className='selectpicker form-select' onChange={(e)=>{setProduct_ref(e.target.value)}}  required >
                    <option disabled selected>--- Select Product ---</option>
                    {products.map((item)=>(<option  selected={item.product_ref===product_ref}>{item.product_ref}</option>))}
                  </select>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Product engraving* : </label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setEngraving(e.target.value)}   value={engraving} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Date of Production* : </label>
                    <input type="date" class="form-control" id="validationCustom02" onChange={(e)=>setProd_date(e.target.value)}   value={prod_date} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Object* : </label>
                    <textarea class="form-control" id="validationCustom02" onChange={(e)=>setObject(e.target.value)}   value={object} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Opening date* :</label>
                    <input type="date" class="form-control" id="validationCustom02"  onChange={(e)=>setOpening_date(e.target.value)}  value={opening_date} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Final customer :</label>
                    <input type="text" class="form-control" id="validationCustom02"  onChange={(e)=>setFinal_cusomer(e.target.value)}  value={final_cusomer}  />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Defaillance mode :</label>
                    <textarea  class="form-control" id="validationCustom02"  onChange={(e)=>setDef_mode(e.target.value)}  value={def_mode}  />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Claim details* :</label>
                    <textarea  class="form-control" id="validationCustom02"  onChange={(e)=>setClaim_details(e.target.value)}  value={claim_details} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label">Number of Claimed parts* :</label>
                    <input type='number'  class="form-control" id="validationCustom02"  onChange={(e)=>setNbr_claimed_parts(e.target.value)}  value={nbr_claimed_parts} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
            </form>
            </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Annuler
          </Button>
          <Button onClick={updateClaim} hidden={editB} variant="success" >Update</Button>
          <Button onClick={handleSubmit} hidden={addB} variant="primary" >Save</Button>
          </Modal.Footer>
      </Modal>     
      </div>
            <div >
                <legend >List of Claims</legend>
                <div className='filter'>
                  <form className='row container'>
                  <div  className='col-2'>
                      <label>Type : </label>
                      <select data-live-search="true"  className='selectpicker form-select' label={filter1} onChange={handleSelectChange1} required >
                      <option disabled selected>--- Select Type ---</option>
                      <option>Intern</option>
                      <option>Extern</option>
                  </select>
                    </div>
                    <div  className='col-2'></div>
                    <div  className='col-2'>
                      <label>Status : </label>
                      <select data-live-search="true"  className='selectpicker form-select' label={filter2} onChange={handleSelectChange2} required >
                      <option disabled selected>--- Select Status ---</option>
                      <option>on going</option>
                      <option>done</option>
                      <option>delayed</option>
                  </select>                    </div>
                    <div  className='col-2'></div>
                    <div  className='col-4 filter'>
                      <input  className="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleInputChange} />
                    </div>
                  </form>
                  
                </div>
                <div className='table-responsive'>
                <table className="table  table-striped " >
                    <thead>
                        <tr>
                            <th >internal ID</th>
                            <th >Type</th>
                            <th >Customer ref</th>
                            <th>Product ref</th>
                            <th >Engraving</th>
                            <th>Production date</th>
                            <th>Object</th>
                            <th >Opening date</th>
                            <th >Final Customer</th>
                            <th >Claim details</th>
                            <th>Def mode</th>
                            <th>Parts claimed</th>
                            <th>Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                              <td>{item.internal_ID}</td>
                              <td>{item.category}</td>
                              <td>{item.refRecClient}</td>
                              <td>{item.product_ref}</td>
                              <td>{item.engraving}</td>
                              <td>{item.prod_date}</td>
                              <td>{item.object}</td>
                              <td>{item.opening_date}</td>
                              <td>{item.final_cusomer}</td>
                              <td>{item.claim_details}</td>
                              <td>{item.def_mode}</td>
                              <td>{item.nbr_claimed_parts}</td>
                              <td><Dot color={item.status==='on going'?'orange': 'done'?'green' : 'red'} size={60}/></td>
                              <td>{item.status==='done'?'':<Button onClick={()=>updateStatus(item)} variant='success'>Finaliser</Button>}</td>
                              <td><Button onClick={()=>{selectClaim(item);handleShow();setModalTitle("Update Claim");setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
                              <td><Button onClick={()=>deleteClaim(item.id)} variant="danger" >Delete<i ></i></Button></td>
                              <td><Button  variant='success'> <Link to={`/Report/${item.id}`} ><TicketDetailed color='orange'  size={25}/></Link></Button></td>
                            
                    </tr>
                    ))}
                    </tbody>
                </table>       
                </div>
              
                
                
                
                
                

            </div>
        </div>
    </div>

  )
}
