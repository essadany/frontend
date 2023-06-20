import React, { useEffect, useRef, useState } from 'react'
import Tab from '../tabs/Tab'
import './Report.css';
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Edit } from '@material-ui/icons';
import { useParams } from 'react-router';
import moment from "moment";

export default function Report() {
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
  const [containement_actions,setContainement_actions] = useState("");
  const [first_batch3,setFirst_batch3] = useState("");
  const [date_cause_definition,setDate_cause_definition] = useState("");
  const [opening_date,setOpening_date] = useState("");
  const [update_date,setUpdate_date] = useState("");
  const [report_id,setReport_id] = useState('');
  const [report,setReport] = useState('');
  const [reported_by,setReported_by] = useState('');
  const [pilot,setPilot] = useState('');
  const [ddm	, setDdm] = useState(false);
  const [approved,setApproved]= useState(false);
  const [others,setOthers] = useState(false);
  const [ctrl_plan	,setCtrl_plan] = useState(false);
  const [pfmea	,setPfmea] = useState(false);
  const [dfmea	,setDfmea] = useState(false);
  const [progress_rate	,setProgress_rate] = useState(0);


  //Get report
  function getReport(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/report`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setReport(result);
          setReport_id(result.id);
          setContainement_actions(result.containement_actions);
          setFirst_batch3(result.first_batch3);
          setDate_cause_definition(result.date_cause_definition);
          const date = moment(result.updated_at).format("YYYY-MM-DD");
          setUpdate_date(date);
          setDdm(result.ddm);
          setDfmea(result.dfmea);
          setPfmea(result.pfmea);
          setOthers(result.others);
          setPilot(result.pilot);
          setApproved(result.approved);
          setCtrl_plan(result.ctrl_plan);

        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  
  //Get Preventive actions
  const [preventive_actions,setPreventive_actions] = useState([]);
  function getPreventiveActions(){
    console.warn('report_id=',report_id);
    fetch(`http://127.0.0.1:8000/api/report/${report_id}/preventive_actions`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPreventive_actions(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  
  //Get Implemented actions
  const [implemented_actions,setImplemented_actions] = useState([]);
  function getImplementedActions(){
    fetch(`http://127.0.0.1:8000/api/report/${report_id}/implemented_actions`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setImplemented_actions(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  
  //Get Potential actions
  const [potential_actions,setPotential_actions] = useState([]);
  function getPotentialActions(){
    fetch(`http://127.0.0.1:8000/api/report/${report_id}/potential_actions`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPotential_actions(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(() => {
    getReport();
  }, [claim_id])
  useEffect(() => {
    getPreventiveActions();
  }, [report_id])
  useEffect(() => {
    getImplementedActions();
  }, [report_id])
  useEffect(() => {
    getPotentialActions();
  }, [report_id])
 // Import images code ----------------------------------------------
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const selectedImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        selectedImages.push(reader.result);
        if (selectedImages.length === files.length) {
          setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...selectedImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReplaceClick = (index) => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.value = null;
      fileInput.click();
      fileInput.onchange = (event) => handleReplaceFile(event, index);
    }
  };

  const handleReplaceFile = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedFiles = [...selectedFiles];
        updatedFiles[index] = reader.result;
        setSelectedFiles(updatedFiles);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  return (
    <div className='main'>
      <Tab />
      <h2 ><img className='report_icon' src='../icons/stamp.png'/>  8D Report {claim_id}</h2>
      <div className='border'>
        <div className='row report_header'>
          <div className='col-md-4'>
            <form className=' g-3'>
              <div className="">
                  <label  className="col-form-label">opening date :</label>
                  <input  type="date" class="form-control form-control-sm"  required />     
                  
              </div>
              <div className="">
                  <label  for='2' className=" col-form-label">Update date :</label>
                  <input type="date" class="form-control form-control-sm" disabled value={update_date} required />
              </div>
            </form>
          </div>
          <div className='col-md-4'><Button variant='success'><Download /></Button></div>
          <div className='col-md-4'>
            <form className=' g-3'>
              <div class="">
                  <label  class="form-label">Reported by :</label>
                  <textarea class="form-control form-control-sm"  required />
              </div>
            </form>
          </div>
          </div>

          <div className='description '>
            <legend>Problem Description</legend>
            <div>
              <form className='row'>
                <div class="col-md-12">
                    <textarea  class="form-control"  required />
                </div>
                <div className="col-md-3 ">
                    <label  for='3' className=" col-form-label">Engraving :</label>
                    <input type="text" id='3' class="form-control form-control-sm" required />
                </div>
                <div className="col-md-3">
                    <label  for='4' className=" col-form-label">Production date :</label>
                    <input type="date" id='4' class="form-control form-control-sm" required />
                </div>
                <div className='col-md-3'></div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Recurrence :</label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
              </form>
            </div>
            <div className='row'>
            {selectedFiles.map((file, index) => (
              <div className='col-md-4'>
                <img key={index} src={file} alt="Uploaded" style={{ width: '300px', height: '200px'}} />
                <div>
                <Button style={{marginRight:5}} variant='secondary' onClick={() => handleReplaceClick(index)}><Edit /></Button>
                <Button variant='danger' onClick={() => handleDeleteClick(index)}><Delete /></Button>
                </div>
                
                </div>
              ))}
              
              <div className='col-md-4'>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <Button onClick={handleImportClick}  ><AddAPhoto  size={30}  /></Button>
              </div>
            </div>
            
          </div>

          <div>
            <legend>Containment Action(s)</legend>
            <form className='row'>
              <div class="col-md-12">
                  <textarea  class="form-control"  required />
              </div>
              <div className="col-md-2">
                  <label  for='4' className=" col-form-label">First Batch Certified :</label>
                  <input type="text" id='4' class="form-control form-control-sm" required />
              </div>
            </form>
          </div>

          <div>
            <legend>Root Cause Or Escape Point</legend>
            <form className='row'>
              <div class="col-md-6">
                  <label  className=" col-form-label">On Occurence:</label>
                  <textarea  class="form-control"  required />
              </div>
              <div class="col-md-6">
              <label  className=" col-form-label">On No Detection:</label>
                  <textarea  class="form-control"  required />
              </div>
              <div className="form-check col-md-4">
                <label  className="form-check-label">Is Bontaz Responsible for this issue </label>
                <input type="checkbox" class="form-check-input" required />
              </div>
              <div className='col-md-4'></div>
              <div className="col-md-3">
                  <label  for='4' className=" col-form-label">Date of Roote Cause Definition :</label>
                  <input type="date" id='4' class="form-control form-control-sm" required />
              </div>

            </form>
          </div>

          <div>
            <legend>Potential Actions - Occurence/Detection</legend>
            <div className='table-responsive'>
                <table className="table mx-auto table-striped " >
                    <thead>
                        <tr>
                            <th >Action</th>
                            <th >Pilot</th>
                            <th>Planned Date</th>
                            <th >Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {potential_actions.map((item)=>(
                        <tr>
                          <td>{item.action}</td>
                          <td>{item.name}</td>
                          <td>{item.planned_date}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>       
              </div>
            <div>
              <form className='row'>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">DDM </label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
                <div className="col-md-3">
                  <label  className=" col-form-label">Pilot :</label>
                  <input type="text"  class="form-control form-control-sm" required />
                </div>
                <div className='col-md-3'></div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Approved </label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
              </form>
            </div>
          </div>
          
          <div>
            <legend>Implemented Actions - Occurence/Detection</legend>
            <div className='table-responsive'>
                <table className="table mx-auto table-striped " >
                    <thead>
                        <tr>
                            <th >Action</th>
                            <th >Pilot</th>
                            <th>Planned Date</th>
                            <th >Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                      {implemented_actions.map((item)=>(
                        <tr>
                          <td>{item.action}</td>
                          <td>{item.name}</td>
                          <td>{item.planned_date}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>       
              </div>
            <div>
              <form>
              <div className="col-md-2">
                  <label  for='4' className=" col-form-label">First Batch Certified :</label>
                  <input type="text" id='4' class="form-control form-control-sm" required />
              </div>
              </form>
            </div>
          </div>
            
          <div>
            <legend>Preventive Actions - Document Update</legend>
            <div className='table-responsive'>
                <table className="table mx-auto table-striped " >
                    <thead>
                        <tr>
                            <th >Action</th>
                            <th >Pilot</th>
                            <th>Planned Date</th>
                            <th >Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {preventive_actions.map((item)=>(
                        <tr>
                          <td>{item.action}</td>
                          <td>{item.name}</td>
                          <td>{item.planned_date}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>       
                </div>
            <div>
              <form className='row'>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">DFMEA </label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">PFMEA </label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Ctrl Plan </label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Others </label>
                  <input type="checkbox"  class="form-check-input" required />
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
