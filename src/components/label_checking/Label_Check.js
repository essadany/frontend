import React from 'react';
import Tab from '../tabs/Tab';
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus, Save } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Edit } from '@material-ui/icons';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react'
import moment from "moment";
export default function Label_Check() {
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
  const [label_check,setLabel_check] = useState('');
  const [id,setId] = useState('');

  const [product_ref,setProduct_ref] = useState('');
  const [customer_ref,setCustomer_ref] = useState('');
  const [bontaz_plant,setBontaz_plant] = useState('');
  const [sorting_method,setSorting_method] = useState('');
  const [internal_ID,setInternal_ID] = useState('');
  const bontaz_plants =[{value: "'El Jadida", label : 'El Jadida'},{value: "Shanghai", label : 'Shanghai'},{value: "Marnaz", label : 'Marnaz'},
                        {value: "Fouchana", label : 'Fouchana'},{value: "Dobra", label : 'Dobra'},{value: "Velka", label : 'Velka'},
                        {value: "Viana Do Casteo", label : 'Viana Do Casteo'},{value: "Troy", label : 'Troy'},
                        {value: "Pingamonhangaba-sp", label : 'Pingamonhangaba-sp'}];

   //Get Label Checking
   useEffect(() => {
    getLabelCheck();
    
  }, [claim_id])
   function getLabelCheck(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/label_checking_join`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLabel_check(result);
          setId(result.id);
          setProduct_ref(result.product_ref);
          setCustomer_ref(result.customer_ref);
          setBontaz_plant(result.bontaz_plant);
          setSorting_method(result.sorting_method);
          setInternal_ID(result.internal_ID);   
          
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  
  
  // Edit image code----------------------------------------------------------

  const [image1, setImage1] = useState(null);

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
  
  const handleEditClick1 = () => {
    setIsEditing(true);
    const fileInput = document.getElementById('file-input1');
    fileInput.click();
  };
  

 

  //Update Label Checking
    function updateLabelCheck(){
      try{
          fetch(`http://127.0.0.1:8000/api/label_checking/${id}`, {
            method: 'PUT',
            headers:{
              'Accept' : 'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({sorting_method : sorting_method ,bontaz_plant: bontaz_plant})
          }).then((result) => {
              if (result.ok){
                alert("Label Checking Updated successfully");
                
              }else{
                result.json().then((resp) => {
                  console.warn(resp)
                  alert("Some error occured!");

                })
              }
              
            })
          
        } catch (err) {
          alert(id);
        console.log(err);
      }
    }
      
  return (
    <div className='main'>
        <Tab />
        <h2 >Label Checking</h2>
        <div className='border row' style={{alignItems:"center"}}>
          <div className='col-6' >
            <form >
            <div >
                <label  className="form-label">Customer Part Number :</label>
                <input type="text" className="form-control" disabled value={customer_ref} required />
            </div>
            <div >
                <label  className="form-label">Customer Complaint n°:</label>
                <input type="text" className="form-control" disabled value={internal_ID} required />
            </div>
            <div>
                <label  className="form-label">Bontaz Part Number :</label>
                <input type="text" className="form-control" disabled value={product_ref} required />
            </div>
            <div>
                <label  className="form-label">Sorting method :</label>
                <input type="text" className="form-control"  value={sorting_method} onChange={(e)=>setSorting_method(e.target.value)} required />
            </div>
            <div>
                <label  className="form-label">Bontaz Plant :</label>
                <select data-live-search="true"  className='selectpicker form-select' onChange={(e)=>setBontaz_plant(e.target.value)} required >
                        <option disabled selected>--- Select User ---</option>
                        {bontaz_plants.map((item)=>(<option value={item.label} selected={item.label===bontaz_plant}>{item.label}</option>))}
                      </select>            
            </div>
            </form>
          </div>
          <div className='col-6'>
            <h5>Product picture</h5>
            <div>
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
          </div>
          <div className='col-6'>
            <Button onClick={updateLabelCheck}  variant='success'>Save</Button>
          </div>
        </div>
        
    </div>
  )
}
