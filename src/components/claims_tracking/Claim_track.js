import React, { useEffect } from 'react'
import './Claim_track.css'
import '../8d_report/Report.css'
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
export default function Claim_track({haveAccess}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Product');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState(true);
  const [sub_date, setSub_date] = useState("");
    const [claim_details, setClaim_details] = useState("");
    const [product_ref, setProduct_ref] = useState("");
    const [engraving, setEngraving] = useState("");
    const [prod_date, setProd_date] = useState("");
    const [type, setType] = useState("");
    const [object, setObject] = useState("");
    const [opening_date, setOpening_date] = useState("");
    const [direct_customer, setDirect_customer] = useState("");
    const [final_cusomer, setFinal_cusomer] = useState("");
    const [def_mode, setDef_mode] = useState("");
    const [prod_designation, setProd_designation] = useState("");
    const [nbr_claimed_parts, setNbr_claimed_parts] = useState("");
    const [deleted,setDeleted]= useState(false);
    const [products,setProducts]= useState([]);
    const [customers,setCustomers]= useState([]);
    const [status, setStatus] = useState("on going");
    const [category, setCategory] = useState("");
    const [customer_id,setCustomer_id]= useState('');
    const [progress_rate,setProgress_rate]= useState('');
    const [bontaz_fault,setBontaz_fault]= useState('NOT CONFIREMD');

    const [recurrence, setRecurrence] = useState(false);
    const [received,setReceived ] = useState(false);
    const [date_reception,setDate_reception ] = useState('');
    const [qty_NOK	,setQty_NOK] = useState('');


    const [claims_tracking,setClaims_tracking]= useState([]);

    //Get Claims_tracking
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    function getClaims_tracking(){
      fetch("http://127.0.0.1:8000/api/claims_tracking")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setClaims_tracking(result);
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
      getClaims_tracking();
    }, [isLoaded])

  // Filter Claim Trackings --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const [filter1, setFilter1] = useState("");
  const handleSelectChange1 = (e) => {
    setFilter1(e.target.value);
  };

  const filteredData = claims_tracking.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )&&
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter1.toLowerCase())
    )
  );
  //Update Tracking
  const [claim_tracking,SetClaim_tracking] = useState([]);
  function selectClaim(item){
    SetClaim_tracking(item);
    setProgress_rate(item.progress_rate);
    setSub_date(item.report_sub_date);
    setBontaz_fault(item.bontaz_fault);
  }
  const updateTracking = ()=>{
    let item={sub_date ,progress_rate }
    console.warn("item",item)
    try{
      fetch(`http://127.0.0.1:8000/api/report/${claim_tracking.report_id}`, {
      method: 'PUT',
      headers:{
        'Accept' : 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
        if(result.ok){
          getClaims_tracking()
          //alert("Claims Tracking Updated successfully");
          setProgress_rate("");
          setSub_date("");
          setBontaz_fault("");
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
                <Modal.Title>Update Tracking Claim</Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                    <form class="row g-3">
                    <div className="col-12">
                    <label  className="form-label">Progress rate :</label>
                    <select  data-live-search="true"  className='selectpicker form-select form-select-sm' onChange={(e)=>setProgress_rate(e.target.value)} required >
                    <option selected>0%</option>
                    <option selected={progress_rate==='25%'} >25%</option>
                    <option selected={progress_rate==="50%"}>50%</option>
                    <option selected={progress_rate==="75%"}>75%</option>
                    <option selected={progress_rate==="100%"}>100%</option>
                    </select>
                </div>
                      <div className="col-12">
                          <label  className="form-label">bMCA Responsiblity:</label>
                          <select data-live-search="true"  className='selectpicker form-select form-select-sm' onChange={(e)=>setBontaz_fault(e.target.value)} required >
                          <option selected={bontaz_fault==="YES"} >YES</option>
                          <option selected={bontaz_fault==="NO"}>NO</option>
                          <option selected>NOT CONFIRMED</option>
                          </select>
                      </div>
                      <div class="col-12">
                        <label for="inputAddress" class="form-label">8D Submission date</label>
                        <input type="date" class="form-control"  value={sub_date} onChange={(e)=>setSub_date(e.target.value)}/>
                      </div>
                      <div class="col-12">
                        <label class="form-label">Details</label>
                        <textarea type="text" class="form-control" value={claim_details}  />
                      </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Annuler
                  </Button>
                  <Button onClick={updateTracking()} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                            
                  </Modal.Footer>
            </Modal> 
            </div>
        
            <div >
                <legend >List Of Claim Trackings</legend>
                <div className='row md-4 filter'>
                <div  className='col-2'>
                      <label>Type : </label>
                      <select data-live-search="true"  className='selectpicker form-select' label={filter1} onChange={handleSelectChange1} required >
                      <option disabled selected>--- Select Type ---</option>
                      <option>AQI</option>
                      <option>CC</option>
                      <option>Field</option>
                  </select>
                    </div>                  <div  className='col-md-4'></div>
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
                          <th >Direct Customer</th>
                          <th>Final Customer</th>
                          <th>BCMA Responsiblity</th>
                          <th>N° Claim/AQI</th>
                          <th>Claim Object (e-mail)</th>
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
                          <th>Details</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item)=>(
                          <tr>
                            <td>{item.opening_date}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{item.category}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.final_cusomer}</td>
                            <td>{item.bontaz_fault}</td>
                            <td>{item.internal_ID}</td>
                            <td>{item.object}</td>
                            <td>{item.def_mode}</td>
                            <td>{item.product_ref}</td>
                            <td>{item.customer_ref}</td>
                            <td>{item.product_name}</td>
                            <td>{item.uap}</td>
                            <td>{item.nbr_claimed_parts}</td>
                            <td>{item.how_many_after}</td>
                            <td>{item.prod_date}</td>
                            <td>{item.recurrence}</td>
                            <td>{item.date_reception}</td>
                            <td style={{backgroundColor:item.progress_rate==='25%'||item.progress_rate==='50%'||item.progress_rate==='75%'||item.progress_rate==='100%'? 'green' : 'none'}}>{item.progress_rate==='25%'||item.progress_rate==='50%'||item.progress_rate==='75%'||item.progress_rate==='100%'?1:''}</td>
                            <td style={{backgroundColor:item.progress_rate==='50%'||item.progress_rate==='75%'||item.progress_rate==='100%'? 'green' : 'none'}}>{item.progress_rate==='50%'||item.progress_rate==='75%'||item.progress_rate==='100%'?1:''}</td>
                            <td style={{backgroundColor:item.progress_rate==='75%'||item.progress_rate==='100%'? 'green' : 'none'}}>{item.progress_rate==='75%'||item.progress_rate==='100%'?1:''}</td>
                            <td style={{backgroundColor:item.progress_rate==='100%'? 'green' : 'none'}}>{item.progress_rate==='100%'?1:''}</td>
                            <td style={{backgroundColor:item.progress_rate==='100%'? 'green' : item.progress_rate==='75%'? 'blue': item.progress_rate==='50%'? 'yellow' : item.progress_rate==='25%'? 'brown' : 'none'}}>{item.progress_rate}</td>
                            <td>{item.report_due_date}</td>
                            <td style={{backgroundColor:item.report_status==='Submitted'? 'green' : item.report_status==='On going'? 'orange' : 'red'}} >{item.report_status}</td>
                            <td>{item.report_sub_date}</td>
                            <td>{item.ishikawa_principale}</td>
                            <td>{item.claim_details}</td>
                            <td><Button disabled={haveAccess===true? false : true}  style={{marginRight:10}} onClick={()=>{handleShow();selectClaim(item)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
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
