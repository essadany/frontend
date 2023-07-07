import React from 'react'
import Tab from '../tabs/Tab'
import { Button, Table } from 'react-bootstrap'
import { Download, Plus, PlusCircle } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import { Add, Delete } from '@material-ui/icons';
import { useParams } from 'react-router';
import  Modal  from 'react-bootstrap/Modal'
export default function ({haveAccess}) {

  const { claim_id } = useParams();

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleShow3 = () => setShow3(true);
  const handleClose1 = () =>  setShow1(false);
  const handleClose2 = () =>  setShow2(false);
  const handleClose3 = () =>  setShow3(false);
  const [modalTitle,setModalTitle]= useState('Add new Why/Answer');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [result_id,setResult_id] = useState('');
  const [system_results,setSystem_results] = useState('');
  const [detection_results	, setDetection_results] = useState('');
  const [occurence_results,setOccurence_results]= useState('');
  const [results,setResults] = useState('');
  const [five_lignes	,setFive_lignes] = useState([]);
  const [five_why_id	,setFive_why_id] = useState('');
  const [why	,setWhy] = useState('');
  const [answer	,setAnswer] = useState('');
  //--------------------------------------------------------------
  const [occurenceArea, setOccurenceArea] = useState([]);
  const [detectionArea, setDetectionArea] = useState([]);
  const [systemArea, setSystemArea] = useState([]);
  const [labelCount, setLabelCount] = useState(1);

  const handleButtonClick1 = () => {
    setOccurenceArea([...occurenceArea, 'Why', 'Answer']); // Add two empty textareas to the array
    setLabelCount(labelCount + 1);
  };
  const handleButtonClick2 = () => {
    setDetectionArea([...detectionArea, 'Why', 'Answer']); // Add two empty textareas to the array
    setLabelCount(labelCount + 1);
  };const handleButtonClick3 = () => {
    setSystemArea([...systemArea, 'Why', 'Answer']); // Add two empty textareas to the array
    setLabelCount(labelCount + 1);
  };
  const handleDeleteLastTextarea1 = () => {
    if (occurenceArea.length === 0) return;

    setOccurenceArea(occurenceArea.slice(0, -2));
    setLabelCount(labelCount - 2);
  };
  const handleDeleteLastTextarea2 = () => {
    if (detectionArea.length === 0) return;

    setDetectionArea(detectionArea.slice(0, -2));
    setLabelCount(labelCount - 2);
  };
  const handleDeleteLastTextarea3 = () => {
    if (systemArea.length === 0) return;

    setSystemArea(systemArea.slice(0, -2));
    setLabelCount(labelCount - 2);
  };
  //Get five why
  function getFiveWhy(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/five_why`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFive_why_id(result.id);

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
  //Get five lignes
  function getFiveLignes(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/five_lignes`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFive_lignes(result);
          

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
  //Get five lignes Occurence
  const [five_lignes_occurence,setFive_lignes_occurence] = useState([]);
  function getFiveLignesOccurence(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/five_lignes_occurence`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFive_lignes_occurence(result);

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

  //Get five lignes Detection
  const [five_lignes_detection,setFive_lignes_detection] = useState([]);
  function getFiveLignesDetection(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/five_lignes_detection`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFive_lignes_detection(result);

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

  //Get five lignes Occurence
  const [five_lignes_system,setFive_lignes_system] = useState([]);
  function getFiveLignesSystem(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/five_lignes_system`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFive_lignes_system(result);

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
  //Get Results
  function getResults(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/results`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResults(result);
          setOccurence_results(result.filter(item=>item.type==="occurence").map(item => item.input)[0]);
          setDetection_results(result.filter(item=>item.type==="detection").map(item => item.input)[0]);
          setSystem_results(result.filter(item=>item.type==="system").map(item => item.input)[0]);
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
    getFiveWhy();
  }, [claim_id])
  useEffect(() => {
    getResults();
  }, [claim_id])
  useEffect(() => {
    getFiveLignes();
  }, [claim_id])
  useEffect(() => {
    getFiveLignesOccurence();
  }, [claim_id])
  useEffect(() => {
    getFiveLignesDetection();
  }, [claim_id])
  useEffect(() => {
    getFiveLignesSystem();
  }, [claim_id])
 
  //Update Results --------------------------------------------------------------------------------------------------------------------
  const updatedInputs= [occurence_results,detection_results,system_results];
  const updateResults = async () => {
    try {
      await Promise.all(results.map(async (result, index) => {
        const input = updatedInputs[index];
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: input }),
        };

        const response = await fetch(`http://127.0.0.1:8000/api/result/${result.id}`, requestOptions);
        const data = await response.json();

        console.log(data);
        // Handle success message or any other logic
      }));

      console.log('All lines updated successfully');
      // Handle success message or any other logic

    } catch (error) {
      console.error(error);
      // Handle error message or any other logic
    }
  };
  // Add why/Answer --------------------------------------------------------------
  let handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/five_ligne", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({five_why_id : five_why_id,why : why,answer : answer, type : 'occurence'}), })      
      if (res.status === 200) {
        setWhy("");
        setAnswer("");
        handleClose1();
        getFiveLignesOccurence();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/five_ligne", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({five_why_id : five_why_id,why : why,answer : answer, type : 'detection'}), })      
      if (res.status === 200) {
        setWhy("");
        setAnswer("");
        handleClose2();
        getFiveLignesDetection();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/five_ligne", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({five_why_id : five_why_id,why : why,answer : answer, type : 'system'}), })      
      if (res.status === 200) {
        setWhy("");
        setAnswer("");
        handleClose3();
        getFiveLignesSystem();
      } else {
        alert("Some error occured, try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='main'>
        <Tab />
        <h2 >5 Why Analyse {claim_id}</h2>
        <div className='border'>
          <div>
            <form className='row container'>
              <div className='col-2'>
                <label >Update date : </label>
                <input type='date' className='form-control form-control-sm' />
              </div>
              <div className='col-1'></div>
            <div className='col-6'>
              <Button variant='success'><Download /> </Button>
            </div>
            </form>
          </div>

          <div>
            <legend>Failure Occurence Analysis</legend>
            <div>
            <Button disabled={haveAccess===true? false : true}  onClick={()=>handleShow1()} variant='success'> <Add /></Button>

            <Modal
                size='md'
                show={show1}
                onHide={handleClose1}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='container'>
                        <div>
                          <label>Why :</label>
                          <textarea  className='form-control form-control-sm' value={why} onChange={(e)=>setWhy(e.target.value)}/>
                        </div>
                        <div>
                          <label>Answer :</label>
                          <textarea    className='form-control form-control-sm' value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        </div>
                        
                      </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose1}>
                      Annuler
                  </Button>
                  <Button onClick={handleSubmit1}  variant='primary'>Save</Button>                    
                  </Modal.Footer>
              </Modal>  
          </div>
            <div className='table-responsive'>
            <form className=' row container'>
                
                  {five_lignes_occurence.map((item)=>(
                    <div>
                      
                      <label>Why :</label>
                      <textarea rows={1}  value={item.why}  disabled className='form-control form-control-sm'/>
                    
                    
                      <label>Answer :</label>
                      <textarea rows={1} value={item.answer} disabled className='form-control form-control-sm'/>
                    
                    </div>
                  ))}
         
                  <div>
                    <label>Result :</label>
                    <textarea rows={3} className='form-control form-control-sm'  disabled={!isEditing}  value={occurence_results} onChange={(e)=>setOccurence_results(e.target.value)}/>
                </div>
                </form>
              </div>
          </div>

          <div>
            <legend>Failure Detection Analysis</legend>
            <div>
            <Button disabled={haveAccess===true? false : true} onClick={()=>handleShow2()} variant='success'> <Add /></Button>

            <Modal
                size='md'
                show={show2}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='container'>
                        <div>
                          <label>Why :</label>
                          <textarea  className='form-control form-control-sm' value={why} onChange={(e)=>setWhy(e.target.value)}/>
                        </div>
                        <div>
                          <label>Answer :</label>
                          <textarea    className='form-control form-control-sm' value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        </div>
                        
                      </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose2}>
                      Annuler
                  </Button>
                  <Button  onClick={handleSubmit2}  variant='primary'>Save</Button>                    
                  </Modal.Footer>
              </Modal>  
          </div>
            <div>
            <form className=' row container'>
            {five_lignes_detection.map((item)=>(
                    <div>
                      
                      <label>Why :</label>
                      <textarea rows={1} value={item.why}  disabled className='form-control form-control-sm'/>
                  
                      <label>Answer :</label>
                      <textarea rows={1} value={item.answer} disabled className='form-control form-control-sm'/>
                    
                    </div>
                  ))}
                  <div>
                    <label>Result :</label>
                    <textarea rows={3} className='form-control form-control-sm'  disabled={!isEditing}  value={detection_results} onChange={(e)=>setDetection_results(e.target.value)}/>
                </div>
                </form>
               </div>
          </div>

          <div>
            <legend>Failure System Analysis</legend>
            <div>
            <Button disabled={haveAccess===true? false : true}  onClick={()=>handleShow3()} variant='success'> <Add /></Button>

            <Modal
                size='md'
                show={show3}
                onHide={handleClose3}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='container'>
                        <div>
                          <label>Why :</label>
                          <textarea  className='form-control form-control-sm' value={why} onChange={(e)=>setWhy(e.target.value)}/>
                        </div>
                        <div>
                          <label>Answer :</label>
                          <textarea    className='form-control form-control-sm' value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        </div>
                        
                      </form>
                    </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose3}>
                      Annuler
                  </Button>
                  <Button  onClick={handleSubmit3}  variant='primary'>Save</Button>                    
                  </Modal.Footer>
              </Modal>  
          </div>
            <div>
            <form className=' row container'>
            {five_lignes_system.map((item)=>(
                    <div>
                      
                      <label>Why :</label>
                      <textarea  value={item.why} rows={1}  disabled className='form-control form-control-sm'/>
                    
                    
                      <label>Answer :</label>
                      <textarea value={item.answer} rows={1} disabled className='form-control form-control-sm'/>
                    
                    </div>
                  ))}
                  <div>
                    <label>Result :</label>
                    <textarea rows={3} className='form-control form-control-sm'  disabled={!isEditing}  value={system_results} onChange={(e)=>setSystem_results(e.target.value)}/>
                </div>
                </form>
               </div>
          </div>
        
          <div>
            <Button disabled={haveAccess===true? false : true}  variant='primary'onClick={()=>{setIsEditing(!isEditing);updateResults();setEditB(false)}} >{isEditing ? 'Save' : 'Edit'}</Button>
          </div>
      </div>
    </div>
  )
}
