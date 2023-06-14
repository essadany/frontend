import React from 'react'
import Tab from '../tabs/Tab'
import { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Edit } from '@material-ui/icons';
export default function Pb_desc() {
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
        <h2 ><img className='report_icon' src='../icons/problem_desc.png'/>  Problem Description</h2>
        <div className='border'>
        <div className='row report_header'>
          <div className='col-md-4'>
            <form className='row g-3'>
              <div className="">
                  <label className="col-form-label">opening date :</label>
                  <input  type="date" class="form-control form-control-sm"  required />      
              </div>
            </form>
          </div>
          <div className='col-md-4'><Button variant='success'><Download /></Button></div>
          </div>
          <div className='description '>
            <legend>Problem Description</legend>
            <div>
              <form className='row form-group'>
                <div class="col-md-6">
                    <label  className=" form-label">What happened ? </label>
                    <textarea  class="  form-control form-control-sm" required />
                </div>
                <div className='col-md-4'></div>
                <div className="form-check col-md-2">
                  <label  className="form-check-label">Is it recurrent :</label>
                  <input type="checkbox"  class="form-check-input" required />
                </div>
                <div class="col-md-6">
                    <label  className=" form-label">Who detected it (Name and function) ? </label>
                    <textarea  class="  form-control form-control-sm" required />
                </div>
                <div class="col-md-6">
                    <label  className=" form-label">Where has it been detected (operation) ? </label>
                    <textarea  class="  form-control form-control-sm" required />
                </div>
                <div class="col-md-6">
                    <label  className=" form-label">When has it been detected and manufactured ? </label>
                    <input type='date'  class="col-md-3  form-control form-control-sm" required />
                </div>
                <div class="col-md-6">
                    <label  className=" form-label">Why is it a problem ? </label>
                    <textarea  class="  form-control form-control-sm" required />
                </div>
                <div class="col-md-4">
                    <label  className=" form-label">How has it been detected ? </label>
                    <textarea  class="  form-control form-control-sm" required />
                </div>
                <div class="col-md-2">
                    <label  className=" form-label">How many parts ? </label>
                </div>
                <div class="col-md-3">
                    <label  className=" form-label">before sorting ? </label>
                    <input type='number'  class="  form-control form-control-sm" required />
                </div>
                <div class="col-md-3">
                    <label  className=" form-label">after sorting ? </label>
                    <input type='number'  class="  form-control form-control-sm" required />
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
                  accept="image/*"
                  onChange={handleImageChange1}
                  style={{ display: 'none' }}
                />
                <div>
                  <Button onClick={handleEditClick1}><Edit /></Button>
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
                  <Button onClick={handleEditClick2}><Edit /></Button>
                </div>               
              </div>
            </div>
          </div>

          <div>
            <legend>Analyse Of The Defective Part(s)</legend>
            <div>
            <form className='form-group g-3 row'>
              <div className="form-check col-md-4">
                  <label  className="form-check-label">Has Bontaz received the detective parts ?</label>
                  <input type="checkbox"  class="form-check-input" required />
              </div>
              <div className='col-md-5'></div>
              <div className="col-md-3">
                  <label className=" col-form-label">Date of reception :</label>
                  <input type="date" class="form-control form-control-sm" required />
              </div>
              <div class="col-md-12">
                  <label  className=" col-form-label">Analyse:</label>
                  <textarea  class="form-control"  required />
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
            <legend>Bontaz Fault</legend>
            <div>
              <form className='g-3  row'>
                <div className="form-check col-md-1">
                    <label  className="form-check-label">YES</label>
                    <input type="radio" name='radio'  class="form-check-input" required />
                </div>
                <div className='col-md-2'></div>
                <div className="form-check col-md-1">
                    <label  className="form-check-label">NO</label>
                    <input type="radio" name='radio' class="form-check-input" required />
                </div>
                <div className='col-md-5'></div>
                <div className="col-md-3">
                    <label   className=" col-form-label">Done date :</label>
                    <input type="date"  class="form-control form-control-sm" required />
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
