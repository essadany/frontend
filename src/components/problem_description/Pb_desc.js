import React from 'react'
import Tab from '../tabs/Tab'
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Done, Edit } from '@material-ui/icons';
import { useParams } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import moment from "moment";
import { useAuth } from '../Login/AuthProvider';
export default function Pb_desc({haveAccess}) {

  const {claim_id} = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
  const [what, setWhat] = useState('');
  const [who, setWho] = useState('');
  const [where,setWhere ] = useState('');
  const [when,setWhen ] = useState('');
  const [why,setWhy ] = useState('');
  const [how, setHow] = useState('');
  const [how_many_before, setHow_many_before] = useState('');
  const [how_many_after,setHow_many_after ] = useState('');
  const [recurrence, setRecurrence] = useState(false);
  const [received,setReceived ] = useState(false);
  const [date_reception,setDate_reception ] = useState('');
  const [date_done,setDate_done ] = useState('');
  const [bontaz_fault,setBontaz_fault ] = useState('NOT CONFIRMED');
  const [description, setDescription ] = useState('');
  const [update_date,setUpdate_date]= useState('');
  const [problem_desc,setProblem_desc] = useState('');
  const [id,setId] = useState('');

  const [team,setTeam] = useState('');

  const auth = useAuth();
//Get Team of the Claim selected
  function getTeam(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team`)
      .then(res => res.json())
      .then(
        (result) => {
          setTeam(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
      console.log(team);
  }
useEffect(() => {
    getTeam();
  }, [claim_id]);
   //Get Problem description
   function getProbDesc(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/problem_description`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProblem_desc(result);
          setId(result.id);
          setWhat(result.what);
          setWho(result.who);
          setWhere(result.where);
          setWhy(result.why);
          setHow(result.how);
          setHow_many_before(result.how_many_before);
          setHow_many_after(result.how_many_after);
          setRecurrence(result.recurrence);
          setReceived(result.received);
          setDate_reception(result.date_reception);
          setDate_done(result.date_done);
          setBontaz_fault(result.bontaz_fault);
          setDescription(result.description);



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
    getProbDesc();
  }, [claim_id])


  // Good and Bad part-------------------------------------------------------
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage1(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
    //if (!image1){
      const formData = new FormData();
      formData.append('isGood', 1); // Example value
      formData.append('problem_id', id); // Example value
      formData.append('path', file);

      fetch('http://127.0.0.1:8000/api/add_good_part', {
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
    //} else {
      
   // }
    
  };
  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    //if (!image2){
      const formData = new FormData();
      formData.append('isGood', 0); // Example value
      formData.append('problem_id', id); // Example value
      formData.append('path', file);

      fetch('http://127.0.0.1:8000/api/add_bad_part', {
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
    //}
    
  };

  const handleEditClick1 = () => {
    setIsEditing(true);
    const fileInput = document.getElementById('file-input1');
    fileInput.click();
  
  };
  const handleEditClick2 = () => {
    setIsEditing(true);
    const fileInput = document.getElementById('file-input2');
    fileInput.click();
  };
 // Analyse of defective parts ------------------------------------------
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
      formData.append('problem_id', id); 
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
  // Delete Image ----------------------------------------------------------------------------
  function deleteImage(imageId) {
    fetch(`http://127.0.0.1:8000/api/image/${imageId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image deleted:', data);
        // Refresh the image state by fetching the updated images from the database
        getImages();
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  }

  const handleDeleteClick = (index, imageId) => {
    deleteImage(imageId);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  
//Update Problem description
function updateProblem_desc(){
            
  fetch(`http://127.0.0.1:8000/api/problem_description/${id}`, {
    method: 'PUT',
    headers:{
      'Accept' : 'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
    what,
    where,
    who,
    when,
    why,
    how,
    how_many_before,
    how_many_after,
    recurrence,
    received,
    date_reception,
    date_done,
    bontaz_fault,
    description    })
  }).then((result) => {

        result.json().then((resp) => {
          console.warn(resp)
       
      })
      
    }) 
  }

  //Get Images -------------------------------------------------------------------------------
  
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/problem_description/${id}/images`)
      .then(response => response.json())
      .then(data => {
        const goodPart = data.find(item => item.isGood === 1);
        const badPart = data.find(item => item.isGood === 0);
          setImage1(goodPart.path);
          setImage2(badPart.path);
        
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }, [id]);
  //Get Image of Defective analyses ---------------------------------------------------------------------------------------------
  function getImages(){
    fetch(`http://127.0.0.1:8000/api/problem_description/${id}/images`)
    .then(response => response.json())
    .then(data => {
      const images = data.filter(item => item.isGood === null);
      setSelectedFiles(images);
      console.warn(data);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  }
  useEffect(() => {
    getImages();
  }, [id]);
  
    
 
  return (
      <div className='main'>
        <Tab />
        <h2 ><img className='report_icon' src='../icons/problem_desc.png'/>  Problem Description</h2>
        <div className='border'>
        <div className='row report_header'>
          <div className='col-md-4'>
            <form className='row container g-3'>
              <div className="">
                  <label className="col-form-label">Due date :</label>
                  <input  type="date" className="form-control form-control-sm"  value={problem_desc.due_date}  />      
              </div>
            </form>
          </div>
          </div>
          <div className='description '>
            <legend>Problem Description</legend>
            <div>
              <form className='row container form-group'>
                <div className="col-md-6">
                    <label  className=" form-label">What happened ? </label>
                    <textarea  className="  form-control form-control-sm" disabled={!isEditing} value={what} onChange={(e)=>setWhat(e.target.value)} required />
                </div>
                <div className='col-md-4'></div>
                <div className="form-check col-md-2">
                  <label  className="form-check-label">Is it recurrent :</label>
                  <input type="checkbox"  className="form-check-input" disabled={!isEditing} checked={recurrence} onChange={(e)=>setRecurrence(!recurrence)} required />
                </div>
                <div className="col-md-6">
                    <label  className=" form-label">Who detected it (Name and function) ? </label>
                    <textarea  className="  form-control form-control-sm" disabled={!isEditing} value={who} onChange={(e)=>setWho(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <label  className=" form-label">Where has it been detected (operation) ? </label>
                    <textarea  className="  form-control form-control-sm" disabled={!isEditing} value={where} onChange={(e)=>setWhere(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <label  className=" form-label">When has it been detected and manufactured ? </label>
                    <input type='date'  className="col-md-3  form-control form-control-sm" disabled={!isEditing} value={when} onChange={(e)=>setWhen(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <label  className=" form-label">Why is it a problem ? </label>
                    <textarea  className="  form-control form-control-sm" disabled={!isEditing} value={why} onChange={(e)=>setWhy(e.target.value)} required />
                </div>
                <div className="col-md-4">
                    <label  className=" form-label">How has it been detected ? </label>
                    <textarea  className="  form-control form-control-sm" disabled={!isEditing} value={how} onChange={(e)=>setHow(e.target.value)} required />
                </div>
                <div className="col-md-2">
                    <label  className=" form-label">How many parts ? </label>
                </div>
                <div className="col-md-3">
                    <label  className=" form-label">before sorting ? </label>
                    <input type='number'  className="  form-control form-control-sm" disabled={!isEditing} value={how_many_before} onChange={(e)=>setHow_many_before(e.target.value)} required />
                </div>
                <div className="col-md-3">
                    <label  className=" form-label">after sorting ? </label>
                    <input type='number'  className="  form-control form-control-sm" disabled={!isEditing} value={how_many_after} onChange={(e)=>setHow_many_after(e.target.value)} required />
                </div>
              </form>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <h5>Good part :</h5>
                {image1 ? (
                  <img src={image1} style={{ width: '300px', height: '200px'}} alt="Uploaded" />
                ) : (
                  <div className="placeholder-image">No image uploaded</div>
                )}
                <input
                  type="file"
                  id="file-input1"
                  name='file-input1'
                  accept="image/*"
                  onChange={handleImageChange1}
                  style={{ display: 'none' }}
                />
                <div>
                  <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)}  onClick={handleEditClick1}><Edit /></Button>
                </div>
              </div>

              <div className='col-md-6'>
                <h5>Bad part :</h5>
                {image2 ? (
                  <img src={image2} style={{ width: '300px', height: '200px'}} alt="Uploaded" />
                ) : (
                  <div className="placeholder-image">No image uploaded</div>
                )}
                <input
                  type="file"
                  id="file-input2"
                  accept="image/*"
                  onChange={handleImageChange2}
                  style={{ display: 'none' }}
                />
                <div>
                  <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)} onClick={handleEditClick2}><Edit /></Button>
                </div>               
              </div>
            </div>
          </div>

          <div>
            <legend>Analyse Of The Defective Part(s)</legend>
            <div>
            <form className='form-group g-3 container row'>
            <div className='col-md-1'></div>

              <div className="form-check col-md-4">
                  <label  className="form-check-label">Has Bontaz received the detective parts ?</label>
                  <input type="checkbox"  className="form-check-input" disabled={!isEditing} checked={received} onChange={(e)=>setReceived(!received)} required />
              </div>
              <div className='col-md-4'></div>
              <div className="col-md-3">
                  <label className=" col-form-label">Date of reception :</label>
                  <input type="date" className="form-control form-control-sm" disabled={!isEditing} value={date_reception} onChange={(e)=>setDate_reception(e.target.value)} required />
              </div>
              <div className="col-md-12">
                  <label  className=" col-form-label">Analyse:</label>
                  <textarea  className="form-control" value={description} disabled={!isEditing}  onChange={(e)=>setDescription(e.target.value)} required />
              </div>
            </form>
            </div>
            <div className='row'>
            {selectedFiles.map((file, index) => (
              <div className='col-md-4'>
                <img key={index} src={file.path} alt="Uploaded" style={{ width: '300px', height: '200px'}} />
                <div>
                <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)} variant='danger' onClick={() => handleDeleteClick(index, file.id)}><Delete /></Button>
                </div>
                
                </div>
              ))}
              
              <div className='col-md-4'>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)} onClick={handleImportClick}  ><AddAPhoto  size={30}  /></Button>
              </div>
            </div>
          </div>

          <div>
            <legend>Bontaz Fault</legend>
            <div>
              <form className='g-3 container row'>
              <div className='col-md-1'></div>
                <div className="col-4">
                    <label  className="form-label">Is it Bontaz Fault :</label>
                    <select disabled={!isEditing} data-live-search="true"  className='selectpicker form-select form-select-sm' onChange={(e)=>setBontaz_fault(e.target.value)} required >
                    <option selected={bontaz_fault==="YES"} >YES</option>
                    <option selected={bontaz_fault==="NO"}>NO</option>
                    <option selected>NOT CONFIRMED</option>
                    </select>
                </div>
                <div className='col-md-2'></div>
                <div className="col-md-3">
                    <label   className=" col-form-label">Done date :</label>
                    <input type="date"  className="form-control form-control-sm" disabled={!isEditing} value={date_done} onChange={(e)=>setDate_done(e.target.value)} required />
                </div> 

              </form>
            </div>
            
          </div>
          <div>
            <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)}  variant='primary'onClick={()=>{setIsEditing(!isEditing);updateProblem_desc();setEditB(false)}} >{isEditing ? 'Save' : 'Edit'}</Button>
          </div>

        </div>
    </div>
      
    
  )
}
