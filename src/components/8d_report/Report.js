import React, { useEffect, useRef, useState } from 'react'
import Tab from '../tabs/Tab'
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Edit } from '@material-ui/icons';
import { useParams } from 'react-router';
import moment from "moment";

export default function Report({haveAccess}) {
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
  const [first_batch6,setFirst_batch6] = useState("");
  const [date_cause_definition,setDate_cause_definition] = useState("");
  const [sub_date,setSub_date] = useState("");
  const [due_date,setDue_date] = useState("");
  const [update_date,setUpdate_date] = useState("");
  const [report_id,setReport_id] = useState('');
  const [report,setReport] = useState([]);
  const [reported_by,setReported_by] = useState('');
  const [pilot,setPilot] = useState('');
  const [ddm	, setDdm] = useState(false);
  const [approved,setApproved]= useState(false);
  const [others,setOthers] = useState(false);
  const [ctrl_plan	,setCtrl_plan] = useState(false);
  const [pfmea	,setPfmea] = useState(false);
  const [dfmea	,setDfmea] = useState(false);
  const [users_of_team	,setUsers_of_team] = useState([]);

  const [progress_rate	,setProgress_rate] = useState(0);


  //Get report
  function getReport_join(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/report_join`)
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
          setSub_date(result.sub_date);
          setDue_date(result.due_date);
          setDdm(result.ddm);
          setDfmea(result.dfmea);
          setPfmea(result.pfmea);
          setOthers(result.others);
          setPilot(result.pilot);
          setApproved(result.approved);
          setCtrl_plan(result.ctrl_plan);
          setFirst_batch6(result.first_batch6);
          setReported_by(result.reported_by);

        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };
   // Get Users of Team 
  
   function getUsersOfTeam(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team_users`)
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setUsers_of_team(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      console.log(users_of_team);
  }

  
  //Get Preventive actions
  const [preventive_actions,setPreventive_actions] = useState([]);
  function getPreventiveActions(){
    console.warn('report_id=',report_id);
    fetch(`http://127.0.0.1:8000/api/report/${report_id}/preventive_actions`)
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
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
          //setIsLoaded(true);
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
          //setIsLoaded(true);
          setPotential_actions(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(() => {
    getReport_join();
  }, [claim_id, isLoaded]);
  useEffect(() => {
    getUsersOfTeam();
  }, [claim_id]);
  useEffect(() => {
    getPreventiveActions();
  }, [report_id]);
  useEffect(() => {
    getImplementedActions();
  }, [report_id])
  useEffect(() => {
    getPotentialActions();
  }, [report_id])
  //Get Images ----------------------------------------------------------------------------
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/report/${report_id}/images`)
      .then(response => response.json())
      .then(data => {
        const images = data.filter(item => item.isGood === null);
        setSelectedFiles(images.map(obj=>obj['path']));
        console.warn(data);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }, [report_id]);
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
        //-------------------------------------------------------------------
        const formData = new FormData();
        formData.append('report_id', report_id); 
        formData.append('path', file);
  
        fetch('http://127.0.0.1:8000/api/add_image', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
            .then(data => {
              console.log(data);
              ;
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
          ///////////////////////////////////////////////////////////////////////////////////////////
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

  //Update Report
function updateReport(){
            
  try{
    fetch(`http://127.0.0.1:8000/api/report/${report_id}`, {
    method: 'PUT',
    headers:{
      'Accept' : 'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
    sub_date,
    due_date,
    containement_actions ,
    first_batch3,
    date_cause_definition,
    reported_by,
    ddm,
    dfmea,
    pfmea,
    others,
    pilot,
    approved,
    ctrl_plan,
    first_batch6
   })
  }).then((result) => {

        result.json().then((resp) => {
          console.warn(resp)
          console.log("pilot=",pilot);
       
      })
      
    }) 
  } catch(err){
    console.error(err)
  }
  }

  const downloadExcel = () => {
    fetch(`http://127.0.0.1:8000/api/populate-excel/${claim_id}`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className='main'>
      <Tab />
      <h2 ><img className='report_icon' src='../icons/stamp.png'/>  8D Report </h2>
      <div className='border'>
        <div className=' report_header'>
            <form className='row container g-3'>
              <div className="col-4">
                  <label  className="col-form-label">opening date :</label>
                  <input  type="date" class="form-control form-control-sm" value={report.opening_date}   required />     
              </div>
              <div className='col-4'><Button variant='success' onClick={downloadExcel}><Download /></Button></div>
              <div class="col-4">
                  <label  class="form-label">Reported by :</label>
                  <textarea class="form-control form-control-sm" disabled={!isEditing} value={reported_by} onChange={(e)=>setReported_by(e.target.value)} required />
              </div>
              <div className="col-4">
                  <label   className=" col-form-label">Update date :</label>
                  <input type="date" class="form-control form-control-sm" disabled={!isEditing}  value={update_date} required />
              </div>
          <div className="col-4">
                  <label   className=" col-form-label">Due date :</label>
                  <input type="date" class="form-control form-control-sm" disabled={!isEditing} value={due_date} onChange={(e)=>setDue_date(e.target.value)} required />
              </div>
              <div className="col-4">
                  <label  className=" col-form-label">Closure date :</label>
                  <input type="date" class="form-control form-control-sm" disabled={!isEditing} value={sub_date} onChange={(e)=>setSub_date(e.target.value)} required />
              </div>
              </form>
          </div>

          <div className='description '>
            <legend>Problem Description</legend>
            <div>
              <form className='row container'>
                <div class="col-md-12">
                    <textarea  class="form-control" value={report.what}   required />
                </div>
                <div className="col-md-3 ">
                    <label  for='3' className=" col-form-label">Engraving :</label>
                    <input type="text" id='3' class="form-control form-control-sm" value={report.engraving} required />
                </div>
                <div className="col-md-3">
                    <label  for='4' className=" col-form-label">Production date :</label>
                    <input type="date" id='4' class="form-control form-control-sm" value={report.production_date} required />
                </div>
                <div className='col-md-3'></div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Recurrence :</label>
                  <input type="checkbox"  class="form-check-input"  checked={report.recurrence} required />
                </div>
              </form>
            </div>
            <div className='row'>
            {selectedFiles.map((file, index) => (
              <div className='col-md-4'>
                <img key={index} src={file} alt="Uploaded" style={{ width: '300px', height: '200px'}} />
                <div>
                {/*<Button style={{marginRight:5}} variant='secondary' onClick={() => handleReplaceClick(index)}><Edit /></Button>*/}
                <Button  disabled={!haveAccess} variant='danger' onClick={() => handleDeleteClick(index)}><Delete /></Button>
                </div>
                
                </div>
              ))}
              
              <div className='col-md-4'>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <Button  disabled={!haveAccess} onClick={handleImportClick}  ><AddAPhoto  size={30}  /></Button>
              </div>
            </div>
            
          </div>

          <div>
            <legend>Containment Action(s)</legend>
            <form className='row container'>
              <div class="col-md-12">
                  <textarea  class="form-control" value={containement_actions} disabled={!isEditing} onChange={(e)=>setContainement_actions(e.target.value)}  required />
              </div>
              <div className="col-md-2">
                  <label  for='4' className=" col-form-label">First Batch Certified :</label>
                  <input type="text" id='4' class="form-control form-control-sm" disabled={!isEditing} value={first_batch3} onChange={(e)=>setFirst_batch3(e.target.value)} required />
              </div>
            </form>
          </div>

          <div>
            <legend>Root Cause Or Escape Point</legend>
            <form className='row container'>
              <div class="col-md-6">
                  <label  className=" col-form-label">On Occurence:</label>
                  <textarea  class="form-control" value={report.occurrence_root_cause} disabled={!isEditing} required />
              </div>
              <div class="col-md-6">
              <label  className=" col-form-label">On No Detection:</label>
                  <textarea  class="form-control"  value={report.detection_root_cause} disabled={!isEditing} required />
              </div>
              <div className="form-check col-md-4">
                <label  className="form-check-label">Is Bontaz Responsible for this issue </label>
                <input type="checkbox" class="form-check-input" checked={report.bontaz_fault==="YES"}  />
              </div>
              <div className='col-md-4'></div>
              <div className="col-md-3">
                  <label  for='4' className=" col-form-label">Date of Roote Cause Definition :</label>
                  <input type="date" id='4' class="form-control form-control-sm" disabled={!isEditing} value={date_cause_definition} onChange={(e)=>setDate_cause_definition(e.target.value)} required />
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
                          <td style={{color:item.status==='done'? 'green': item.status==='not started'? 'brown':item.status==='on going'? 'orange' : 'red'}} >{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>       
              </div>
            <div>
              <form className='row container'>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">DDM </label>
                  <input type="checkbox"  class="form-check-input" disabled={!isEditing} checked={ddm} onChange={(e)=>setDdm(!ddm)} required />
                </div>
                <div className="col-md-3">
                  <label  className=" col-form-label">Pilot :</label>
                  <select className='form-select' disabled={!isEditing} required onChange={(e)=>setPilot(e.target.value)}>
                        <option  selected disabled >--- Select User ---</option>
                      {users_of_team.map((item)=>(<option value={item.name} selected={item.name===pilot} >{item.name}</option>))}
                      </select>                </div>
                <div className='col-md-3'></div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Approved </label>
                  <input type="checkbox"  class="form-check-input" disabled={!isEditing} checked={approved} onChange={(e)=>setApproved(!approved)} required />
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
                          <td style={{color:item.status==='done'? 'green': item.status==='not started'? 'brown':item.status==='on going'? 'orange' : 'red'}} >{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>       
              </div>
            <div>
              <form className='container'> 
              <div className="col-md-2">
                  <label  for='4' className=" col-form-label">First Batch Certified :</label>
                  <input type="text" id='4' class="form-control form-control-sm" disabled={!isEditing} value={first_batch6} onChange={(e)=>setFirst_batch6(e.target.value)} required />
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
                          <td style={{color:item.status==='done'? 'green': item.status==='not started'? 'brown':item.status==='on going'? 'orange' : 'red'}} >{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>       
                </div>
            <div>
              <form className='row container'>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">DFMEA </label>
                  <input type="checkbox"  class="form-check-input" checked={dfmea} disabled={!isEditing} onChange={(e)=>setDfmea(!dfmea)} required />
                </div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">PFMEA </label>
                  <input type="checkbox"  class="form-check-input" checked={pfmea} disabled={!isEditing} onChange={(e)=>setPfmea(!dfmea)} required />
                </div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Ctrl Plan </label>
                  <input type="checkbox"  class="form-check-input" checked={ctrl_plan} disabled={!isEditing} onChange={(e)=>setCtrl_plan(!ctrl_plan)} required />
                </div>
                <div className="form-check col-md-3">
                  <label  className="form-check-label">Others </label>
                  <input type="checkbox"  class="form-check-input" checked={others} disabled={!isEditing} onChange={(e)=>setOthers(!others)} required />
                </div>
              </form>
            </div>
          </div>
          <div>
            <Button disabled={haveAccess===true? false : true}  variant='primary'onClick={()=>{updateReport();setIsEditing(!isEditing);setEditB(false)}} >{isEditing ? 'Save' : 'Edit'}</Button>
          </div>
        </div>
    </div>
  )
}
