import React from 'react'
import Tab from '../tabs/Tab'
import { Download, PlusCircle } from 'react-bootstrap-icons'
import { Button, Modal, ModalFooter } from 'react-bootstrap'
import { Add, Edit } from '@material-ui/icons'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import moment from "moment";
export default function Containement({haveAccess}) {

  const {claim_id} = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [modalTitle,setModalTitle]= useState('Add new Sorting');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [method_description,setMethod_description] = useState("");
  const [method_validation,setMethod_validation] = useState("");
  const [risk_assesment,setRisk_assesment] = useState("");
  const [update_date,setUpdate_date] = useState("");
  const [containement_id,setContainemen_id] = useState('');
  const [containement,setContainement] = useState('');
  const [sorting_id,setSorting_id] = useState('');
  const [sortings,setSortings] = useState([]);
  const [location_company	, setLocation_company] = useState('');
  const [qty_to_sort,setQty_to_sort]= useState('');
  const [qty_sorted,setQty_sorted] = useState('');
  const [qty_NOK	,setQty_NOK] = useState('');
  const [scrap	,setScrap] = useState('');


  //Get containement
  function getContainement(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/containement`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setContainement(result);
          setContainemen_id(result.id);
          setMethod_description(result.method_description);
          setMethod_validation(result.method_validation);
          setRisk_assesment(result.risk_assesment);
          const date = moment(result.updated_at).format("YYYY-MM-DD");
          setUpdate_date(date);


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
  
  //Update Containement
  function updateContainement(){
            
    fetch(`http://127.0.0.1:8000/api/containement/${containement_id}`, {
      method: 'PUT',
      headers:{
        'Accept' : 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({method_description : method_description ,method_validation : method_validation ,risk_assesment : risk_assesment })
    }).then((result) => {

          result.json().then((resp) => {
            console.warn(resp)
         
        })
        
      }) 
    }
  //Get Sortings list
  function getSortings(){
    fetch(`http://127.0.0.1:8000/api/containement/${containement_id}/sortings`)
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setSortings(result);
          
        },
        (error) => {
          //setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(() => {
    getContainement();
  }, [claim_id,isLoaded])
  useEffect(() => {
    getSortings();
  }, [containement_id])
  // Add Sorting list
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/sorting`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({containement_id, location_company, qty_to_sort,qty_sorted,qty_NOK,scrap}),
      })      
      if (res.status === 200) {
       
        alert("Sorting Added successfully");
        setLocation_company('');
        setQty_to_sort('');
        setQty_sorted('');
        setQty_NOK('');
        handleClose();
        getSortings();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Update Sorting
  function selectSorting(sorting){
    setSorting_id(sorting.id);
    setLocation_company(sorting.location_company);
    setQty_to_sort(sorting.qty_to_sort);
    setQty_sorted(sorting.qty_sorted);
    setQty_NOK(sorting.qty_NOK);
  }
  function updateSorting(){
    fetch(`http://127.0.0.1:8000/api/sorting/${sorting_id}`, {
              method: 'PUT',
              headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify({containement_id, location_company, qty_to_sort,qty_sorted,qty_NOK,scrap })
            }).then((result) => {
                if(result.ok){
                  alert("Sorting Updated successfully");
                  setLocation_company('');
                  setQty_to_sort('');
                  setQty_sorted('');
                  setQty_NOK('');
                  handleClose();
                  getSortings();
                }else{
                  result.json().then((resp) => {
                    console.warn(resp)
                  })
                }
                
              })
  }
  return (
    <div className='main'>
        <Tab />
        <h2 ><img className='report_icon' src='../icons/container.png'/>  Containement List - Risk Assesment</h2>
    <div className='border' disabled>
      <div>
        <form className='row container'>
          <div className='col-2'>
            <label >Update date : </label>
            <input type='date'  className='form-control form-control-sm'  value={update_date}  />
          </div>
          <div className='col-1'></div>
        </form>
      </div>

      <div>
        <legend>Sorting Method</legend>
        <div>
          <form className='row container '>
            <div>
              <label className='label-control'>Method description</label>
              <textarea rows={4} className='form-control' disabled={!isEditing} value={method_description} onChange={(e)=>setMethod_description(e.target.value)}/>
            </div>
            <div >
              <label className='label-control'>Method validation</label>
              <textarea rows={4} className='form-control' disabled={!isEditing}   value={method_validation} onChange={(e)=>setMethod_validation(e.target.value)} />
            </div>
          </form>
        </div>
      </div>

      <div>
        <legend>Risk Assesment</legend>
        <div>
          <form className='row container'>
            <div>
              <textarea rows={6} className='form-control' disabled={!isEditing}  value={risk_assesment} onChange={(e)=>setRisk_assesment(e.target.value)}/>
            </div>
          </form>
        </div>
      </div>
      <div>
            <Button disabled={haveAccess===true? false : true}  variant='primary'onClick={()=>{setIsEditing(!isEditing);updateContainement();setEditB(false)}} >{isEditing ? 'Save' : 'Edit'}</Button>
      </div>
      
      <div>
        <legend>Sorting List</legend>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Location and company</th>
                <th>Qty to sort</th>
                <th>Qty sorted</th>
                <th>Qty NOK</th>
                <th>Scrap</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {sortings.map((item)=>(
              <tr>
                <td>{item.location_company}</td>
                <td>{item.qty_to_sort}</td>
                <td>{item.qty_sorted}</td>
                <td>{item.qty_NOK}</td>
                <td>{item.scrap}</td>
                <td><Button disabled={haveAccess===true? false : true}  onClick={()=>{handleShow();setModalTitle("Update Sorting");selectSorting(item);setAddB(true);setEditB(false)}}><Edit /></Button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div>
        <Button disabled={haveAccess===true? false : true}  onClick={()=>{handleShow();setAddB(false);setEditB(true)}} variant='success'> <Add /></Button>

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
                            <label  class="form-label">Location and company* :</label>
                            <input type="text" class="form-control"  required value={location_company} onChange={(e)=>setLocation_company(e.target.value)} />
                            
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Qty to sort* : </label>
                            <input type="number" class="form-control"  required value={qty_to_sort} onChange={(e)=>setQty_to_sort(e.target.value)} />
                        </div>
                        
                        <div class="col-md-6">
                            <label  class="form-label">Qty sorted* :</label>
                            <input type="number" class="form-control"  required value={qty_sorted} onChange={(e)=>setQty_sorted(e.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label  class="form-label">Qty NOK* :</label>
                            <input type="number" class="form-control"  required value={qty_NOK} onChange={(e)=>setQty_NOK(e.target.value)} />
                        </div>
                        <div className='col-md-6'></div>
                          <ModalFooter>
                          <Button variant="secondary" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button type='submit'   hidden={addB} variant='primary'>Save</Button>
                        <Button  hidden={editB} variant='success' onClick={updateSorting}>Update<i class="fa-solid fa-pen-to-square"></i></Button> 
                          </ModalFooter>
                    </form>
                    </Modal.Body>
            </Modal>   
        </div>


      </div>
      
    </div>
    </div>
  )
}
