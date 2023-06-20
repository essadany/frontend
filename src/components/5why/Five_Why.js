import React from 'react'
import Tab from '../tabs/Tab'
import { Button } from 'react-bootstrap'
import { Download, Plus, PlusCircle } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import { Add, Delete } from '@material-ui/icons';
import { useParams } from 'react-router';

export default function () {

  const { claim_id } = useParams();
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
  const [system_results,setSystem_results] = useState('');
  const [detection_results	, setDetection_results] = useState('');
  const [occurence_results,setOccurence_results]= useState('');
  const [results,setResults] = useState('');
  const [five_lignes	,setFive_lignes] = useState([]);
  const [five_why_id	,setFive_why_id] = useState('');
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
  //Get Results
  function getResults(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/five_lignes`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResults(result);
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
  return (
    <div className='main'>
        <Tab />
        <h2 >5 Why Analyse {claim_id}</h2>
        <div className='border'>
          <div>
            <form className='row'>
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
              <form>
                <div>
                  <label>Why :</label>
                  <textarea rows={1} className='form-control form-control-sm'/>
                </div>
                <div>
                  <label>Answer :</label>
                  <textarea rows={1} className='form-control form-control-sm'/>
                </div>

                {occurenceArea.map((occurenceArea, index) => (
                  <div>
                    <label>{occurenceArea} :</label>
                    <textarea rows={1} key={index}  className='form-control form-control-sm'/>
                  </div>
                  
                ))}
              
               <div>
                <Button style={{marginRight:20}} variant='success' onClick={handleButtonClick1}><Add /></Button>
                <Button variant='danger' onClick={handleDeleteLastTextarea1}><Delete /></Button>
               </div>
                
               <div>
                  <label>Result :</label>
                  <textarea rows={3} className='form-control form-control-sm' value={occurence_results} onChange={(e)=>setOccurence_results(e.target.value)}/>
               </div>
              </form>
            </div>
          </div>

          <div>
            <legend>Failure Detection Analysis</legend>
            <div>
              <form>
                <div>
                  <label>Why :</label>
                  <textarea rows={1} className='form-control form-control-sm'/>
                </div>
                <div>
                  <label>Answer :</label>
                  <textarea rows={1} className='form-control form-control-sm'/>
                </div>

                {detectionArea.map((detectionArea, index) => (
                  <div>
                    <label>{detectionArea} :</label>
                    <textarea rows={1} key={index}  className='form-control form-control-sm'/>
                  </div>
                ))}
                
                <div>
                <Button style={{marginRight:20}} variant='success' onClick={handleButtonClick2}><Add /></Button>
                <Button variant='danger' onClick={handleDeleteLastTextarea2}><Delete /></Button>
               </div>
                  
                <div>
                    <label>Result :</label>
                    <textarea rows={3} className='form-control form-control-sm' value={detection_results} onChange={(e)=>setDetection_results(e.target.value)}/>
                </div>
              </form>
            </div>
          </div>

          <div>
            <legend>Failure System Analysis</legend>
            <div>
              <form>
                <div>
                  <label>Why :</label>
                  <textarea rows={1} className='form-control form-control-sm'/>
                </div>
                <div>
                  <label>Answer :</label>
                  <textarea rows={1} className='form-control form-control-sm'/>
                </div>

                {systemArea.map((systemArea, index) => (
                  <div>
                    <label>{systemArea} :</label>
                    <textarea rows={1} key={index}  className='form-control form-control-sm'/>
                    </div>
                ))}
                
                <div>
                <Button style={{marginRight:20}} variant='success' onClick={handleButtonClick3}><Add /></Button>
                <Button variant='danger' onClick={handleDeleteLastTextarea3}><Delete /></Button>
               </div>
                  
                <div>
                    <label>Result :</label>
                    <textarea rows={3} className='form-control form-control-sm' value={system_results} onChange={(e)=>setSystem_results(e.target.value)}/>
                </div>
              </form>
            </div>
          </div>
        
          <div>
            <Button style={{marginRight:10}} variant="success" >Edit</Button>
            <Button variant='primary' >Save</Button>
          </div>
      </div>
    </div>
  )
}
