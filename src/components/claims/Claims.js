import React from 'react'
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";

import { useState, useEffect } from 'react';
import Select from 'react-select';
import  Modal  from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';
import './Claims.css';
import { Details } from '@material-ui/icons';
export default function Claims() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Claim');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
  const options = [
    { value: 'Intern', label: 'Intern' },
    { value: 'Extern', label: 'Extern' }
    ]
  const options1 = [
    { value: 'Module', label: 'Module' },
    { value: 'Bobine', label: 'Bobine' },
    { value: 'Faiscaux', label: 'Faiscaux' },
    { value: 'Clapet', label: 'Clapet' },
    { value: 'Gicleur', label: 'Gicleur' }
    ]

// Get Claim list ---------------------------------------------------------------------------------------------------------------
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [claims, setClaims] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    function getClaims(){
      fetch("http://127.0.0.1:8000/api/claims")
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
    const[product_ref,setProduct_ref] = useState('');
    const [engraving, setEngraving] = useState("");
    const [prod_date, setProd_date] = useState("");
    const [type, setType] = useState(options[1]);
    const [object, setObject] = useState("");
    const [opening_date, setOpening_date] = useState("");
    const [direct_customer, setDirect_customer] = useState("");
    const [final_cusomer, setFinal_cusomer] = useState("");
    const [claim_details, setClaim_details] = useState("");
    const [def_mode, setDef_mode] = useState("");
    const [prod_designation, setProd_designation] = useState("");
    const [nbr_claimed_parts, setNbr_claimed_parts] = useState("");
    const [status,setStatus] = useState("red")
    const [products,setProducts]= useState([]);
        function getProducts(){
          fetch("http://127.0.0.1:8000/api/products")
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
        useEffect(() => {
          getProducts();
        }, []);

    const products_ref = products.map((item)=>({ value : item.id, label : item.product_ref}));
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://127.0.0.1:8000/api/claim", {
            method: "POST",
            headers: {
              'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              internal_ID ,
              refRecClient ,
              product_ref,
              engraving ,
              prod_date ,
              object ,
              opening_date ,
              final_cusomer ,
              claim_details ,
              def_mode ,
              nbr_claimed_parts,
            }),
          })
          let resJson = await res.json();
          
          if (res.status === 200) {
            setInternal_ID('');
            setRefRecClient('');
            setProduct_ref('');
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
          } else {
            alert("Some error occured, Verify that : - All fields required are typed -The claim reference is not duplicated! - The product reference exists in products table (if not than add it in product interface)");
          }
        } catch (err) {
          console.log(err);
        }
      };
      //Update Claim -------------------------------------------------------------------------------------------------
      const [id,setId] = useState("");
      function selectClaim(id){
        let claim=claims[id-1];
        console.log(claim)
        setInternal_ID(claim.internal_ID);
          setRefRecClient(claim.refRecClient);
          setProduct_ref(claim.product_ref);
          setEngraving(claim.engraving);
          setProd_date(claim.prod_date);
          setObject(claim.object);
          setOpening_date(claim.opening_date);
          setFinal_cusomer(claim.final_cusomer);
          setClaim_details(claim.claim_details);
          setDef_mode(claim.def_mode);
          setNbr_claimed_parts(claim.nbr_claimed_parts);
          setId(claim.id)
      }
      function updateClaim(){
        let item = {
          internal_ID ,
          refRecClient ,
          product_ref,
          engraving ,
          prod_date ,
          object ,
          opening_date ,
          final_cusomer ,
          claim_details ,
          def_mode ,
          nbr_claimed_parts,
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
                setProduct_ref('');
                setEngraving('');
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
      // Delete Claim ------------------------------------------------------------------------------------------------------------------------
      function deleteClaim(id) {
        fetch(`http://127.0.0.1:8000/api/claim/${id}`, {
          method: 'DELETE'
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp)
            getClaims()
            alert('Claim Deleted Successfully')
          })
        })
      }
      // Filter claims --------------------------------------------------------------------------------------------------------------------------
      const [filter, setFilter] = useState("");
      const handleChange = (e) => {
        setFilter(e.target.value);
      };

      const filteredData = claims.filter((item) =>
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
            <form class="row g-3  needs-validation" onSubmit={handleSubmit}>
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
                  <label  class="form-label">Product reference* :</label>
                  <Select options={products_ref} class="form-select" defaultValue={product_ref}   aria-label="Default select example" onChange={(e)=>setProduct_ref(e.label)} />
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
                    <label for="validationCustom02" class="form-label">Claim details :</label>
                    <textarea  class="form-control" id="validationCustom02"  onChange={(e)=>setClaim_details(e.target.value)}  value={claim_details}  />
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
                <div className='row md-4 filter'>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'>
                    <input  class="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                  </div>
                </div>
                <div className='table-responsive'>
                <table className="table mx-auto table-striped " >
                    <thead>
                        <tr>
                            <th >internal ID</th>
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
                              <td><Dot color={status} size={60}/></td>
                              <td><Button onClick={()=>{selectClaim(item.id);handleShow();setModalTitle("Update Claim");setAddB(true);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
                              <td><Button onClick={()=>deleteClaim(item.id)} variant="danger" >Delete<i ></i></Button></td>
                              <td><Button variant='success' href='./Report' ><TicketDetailed color='orange'  size={25}/></Button></td>

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
