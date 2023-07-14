import React, { useState, useEffect } from 'react'
import Tab from '../tabs/Tab'
import '../../App.css'
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap'
import { BarChartLineFill, Braces, Dot, Plus, PlusCircle, TicketDetailed, Wifi } from "react-bootstrap-icons";
import  Modal  from 'react-bootstrap/Modal'
import { Edit } from '@material-ui/icons';
export default function Ishikawa({haveAccess}) {
  const {claim_id} = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalTitle,setModalTitle]= useState('Add new Cause');
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded1, setIsLoaded1] = useState(false);
  const [ishikawa_id,setIshikawa_id]= useState('');
  const [category_id,setCategory_id]= useState('');
  const [categories,setCategories]= useState([]);
  const [type,setType]= useState('');
  const [input,setInput]= useState('');
  const [influence,setInfluence]= useState('');
  const [comment,setComment]= useState('');
  const [status,setStatus]= useState('');
  const [isPrincipale,setIsPrincipale]= useState(false);




  //Get Team of the Claim selected
  function getIshikawa(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/ishikawa`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setIshikawa_id(result.id);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  
 
  
  // Get Users of Team 
  
  function getCategories(){
    fetch(`http://127.0.0.1:8000/api/ishikawa/${ishikawa_id}/categories`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded1(true);
          setCategories(result);
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
  


  useEffect(()=>{
    getIshikawa();
  },[claim_id,isLoaded])

  useEffect(() => {
    getCategories();
  }, [ishikawa_id,isLoaded1]);
  // Add Category--------------------------------------------------
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/category", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ishikawa_id,type, input, status, isPrincipale , influence, comment}), })      
      if (res.status === 200) {
        setType("");
        setInfluence("");
        setInput("");
        setComment("");
        setStatus("");
        setIsPrincipale(false);
        alert("Cause Added successfully");
        handleClose();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Update Category -------------------------------------------------------------------------------------------------
  function selectCategorie(category){
    setCategory_id(category.id);
    setType(category.type);
    setInfluence(category.influence);
    setInput(category.input);
    setComment(category.comment);
    setStatus(category.status);
    setIsPrincipale(category.isPrincipale);
  }
  function updateCategory(){
    fetch(`http://127.0.0.1:8000/api/category/${category_id}`, {
      method: 'PUT',
      headers:{
        'Accept' : 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ishikawa_id,type, input, status, isPrincipale , influence, comment})
    }).then((result) => {
        if(result.ok){
          getCategories()
          alert("Cause Updated successfully");
          setCategory_id("");
          setType("");
          setInfluence("");
          setInput("");
          setComment("");
          setStatus("");
          setIsPrincipale(false);
          setEditB(true);
          getCategories();
          handleClose();
        }else{
          result.json().then((resp) => {
            console.warn(resp)
          })
        }
        
      })
      

    }
  // Filter Categories --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = categories.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );
  return (
    <div className='main'>
        <Tab />
        <h2 >Ishikawa</h2>
        <div className='border'>
        <div>
        <Button disabled={haveAccess===true? false : true}  onClick={()=>{handleShow();setModalTitle("Add New Cause");setAddB(false);setEditB(true)}} variant='success'> <PlusCircle /> New Cause</Button>

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
                <form class="row g-3  needs-validation" >
                        <div className="col-12">
                            <label class="form-label">Type* :</label>
                            <select className='form-select' required onChange={(e)=>setType(e.target.value)}>
                              <option  selected disabled >--- Select Category ---</option>
                              <option selected={type==='Person'} >Person</option>
                              <option selected={type==='Machine'} >Machine</option>
                              <option selected={type==='Materials'} >Materials</option>
                              <option selected={type==='Method'} >Method</option>
                              <option selected={type==='Management'} >Management</option>
                              <option selected={type==='Measurment'} >Measurment</option>
                              <option selected={type==='Environment'} >Environment</option>
                              <option selected={type==='Money'} >Money</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label class="form-label">Parameter* :</label>
                            <textarea  class="form-control"   required value={input}  onChange={(e)=>setInput(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label class="form-label">Influence* :</label>
                            <select className='form-select' required onChange={(e)=>setInfluence(e.target.value)}>
                              <option  selected disabled >--- Select Influence ---</option>
                              <option selected={influence==='2'} >2</option>
                              <option selected={influence==='4'} >4</option>
                              <option selected={influence==='6'} >6</option>
                              <option selected={influence==='8'} >8</option>
                              <option selected={influence==='10'} >10</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label class="form-label">Comments* :</label>
                            <textarea  class="form-control"   required value={comment}  onChange={(e)=>setComment(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label class="form-label">Status :</label>
                            <select className='form-select' required onChange={(e)=>setStatus(e.target.value)}>
                              <option  selected disabled >--- Select Status ---</option>
                              <option selected={status==='on going'} >on going</option>
                              <option selected={status==='confirmed'} >confirmed</option>
                              <option selected={status==='not confirmed'} >not confirmed</option>
                            </select>
                        </div>
                        <div className="form-check col-md-1">
                          <label  className="form-check-label">Is principale ?</label>
                          <input type="checkbox"  class="form-check-input" checked={isPrincipale} onChange={(e)=>setIsPrincipale(!isPrincipale)} required />
                        </div>
                        <div className='modal-footer'>
                          <Button variant="secondary" onClick={handleClose}>
                              Annuler
                          </Button>
                          <Button   hidden={addB} onClick={handleSubmit} variant='primary'>Save</Button>
                          <Button onClick={updateCategory} hidden={editB} variant='success'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                          </div>
                    </form>
                    </Modal.Body>
                  
            </Modal>   
            </div>
            <div >
                <legend >List Of Causes</legend>
                <div className='filter'>
                  <form className='row container'>
                    <div  className='col-2'>
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
                            <th className='text-center' >Category</th>
                            <th className='text-center' >Parameter</th>
                            <th className='text-center' >Influence</th>
                            <th className='text-center' >Comments</th>
                            <th className='text-center' >Status</th>
                            <th className='text-center' >is Principale</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item)=>(
                        <tr key={item.id}>
                        <td className='text-center' >{item.type}</td>
                        <td className='text-center' >{item.input}</td>
                        <td className='text-center' >{item.influence}</td>
                        <td className='text-center' >{item.comment}</td>
                        <td className='text-center' style={{color:item.status==='confirmed'? 'green': 'on going'? 'orange' : 'red'}}><b>{item.status}</b></td>
                        <td className='text-center' >{item.isPrincipale===1? <b>X</b>: ""}</td>
                        <td className='text-center' ><Button disabled={haveAccess===true? false : true}  style={{marginRight:10}} onClick={()=>{setModalTitle("Update Cause");handleShow();setAddB(true);setEditB(false);selectCategorie(item)}} variant='primary'><Edit /></Button></td>
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
