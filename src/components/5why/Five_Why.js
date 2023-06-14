import React from 'react'
import Tab from '../tabs/Tab'
import { Button } from 'react-bootstrap'
import { Download, Plus, PlusCircle } from 'react-bootstrap-icons'
import { useState } from 'react';
import { Add, Delete } from '@material-ui/icons';
import { useParams } from 'react-router';

export default function () {

  const { claim_id } = useParams();

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
                  <textarea rows={3} className='form-control form-control-sm'/>
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
                    <textarea rows={3} className='form-control form-control-sm'/>
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
                    <textarea rows={3} className='form-control form-control-sm'/>
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
