import React, { useRef, useState } from 'react'
import Tab from '../tabs/Tab'
import './Report.css';
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Edit } from '@material-ui/icons';
export default function Report() {
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
      <h2 ><img className='report_icon' src='icons/stamp.png'/>  8D Report</h2>
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
                  <input type="date" class="form-control form-control-sm" required />
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
                            <th>Planned Date</th>
                            <th >Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
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
                            <th>Date</th>
                            <th >Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>ES-SADANY YASSINE</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>ES-SADANY YASSINE</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>ES-SADANY YASSINE</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
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
                            <th>Date</th>
                            <th >Status</th>
                        </tr>                   
                    </thead>
                    <tbody>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>ES-SADANY YASSINE</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
                      <tr>
                        <td>jfdhirg r eiugf fhuriuhr_ui hdsjdhg_u guerighre hg_ureg</td>
                        <td>ES-SADANY YASSINE</td>
                        <td>08/06/2023</td>
                        <td>on going</td>
                      </tr>
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
