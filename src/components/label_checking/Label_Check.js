import React from 'react';
import Tab from '../tabs/Tab';
import { Button } from 'react-bootstrap';
import { CloudDownload, Download, Plus, Save } from 'react-bootstrap-icons';
import { AddAPhoto, Delete, Edit } from '@material-ui/icons';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react'
import moment from "moment";
import { useAuth } from '../Login/AuthProvider';
export default function Label_Check({haveAccess}) {
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
  const [label_check_id,setLabel_check_id] = useState('');
  const [image1_id,setImage1_id] = useState('');

  const [bontaz_plant,setBontaz_plant] = useState('');
  const [sorting_method,setSorting_method] = useState('');
  const bontaz_plants =[{value: "Morocco", label : 'Morocco'},{value: "France", label : 'France'},{value: "Italy", label : 'Italy'},
                        {value: "Germany", label : 'Germany'},{value: "Poland", label : 'Poland'},
                        {value: "China", label : 'China'},{value: "Mexico", label : 'Mexico'},
                        {value: "Tunisia", label : 'Tunisia'}];

const auth = useAuth();
const [team,setTeam] = useState('');

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
      const formData = new FormData();
      formData.append('label_checking_id', label_check_id); 
      formData.append('path', file);

      fetch('http://127.0.0.1:8000/api/add_lablel_image', {
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
  };
  
  const handleEditClick1 = () => {
    setIsEditing(true);
    const fileInput = document.getElementById('file-input1');
    fileInput.click();
    
  };
  
 
  

 //Get Label Checking ------------------------------------------------------------------------------------
 function getLabelCheck(){
  fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/label_checking_join`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setLabel_check(result);
        setLabel_check_id(result.id);
        setBontaz_plant(result.bontaz_plant);
        setSorting_method(result.sorting_method);

      },

      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
};
useEffect(() => {
  getLabelCheck();
  
}, [claim_id]);
//Get Image of Label Checking ---------------------------------------------------------------------------------------------

useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/label_checking/${label_check_id}/image`)
    .then(response => response.json())
    .then(data => {
      setImage1(data.path);
      setImage1_id(data.id);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
}, [label_check_id]);

  //Update Label Checking--------------------------------------------------------------------------------------------
    function updateLabelCheck(){
      try{
          fetch(`http://127.0.0.1:8000/api/label_checking/${label_check_id}`, {
            method: 'PUT',
            headers:{
              'Accept' : 'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({bontaz_plant, sorting_method })
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
          alert(label_check_id);
        console.log(err);
      }
    }
    
      
  return (
    <div className='main'>
        <Tab />
        <h2 >Label Checking</h2>
        <div className='border row' style={{alignItems:"center"}}>
          <div className='col-6' >
            <form className='container' >
            <div >
                <label  className="form-label">Customer Part Number :</label>
                <input type="text" className="form-control" disabled value={label_check.customer_part_number} required />
            </div>
            <div >
                <label  className="form-label">Customer Complaint n°:</label>
                <input type="text" className="form-control" disabled value={label_check.internal_ID} required />
            </div>
            <div>
                <label  className="form-label">Bontaz Part Number :</label>
                <input type="text" className="form-control" disabled value={label_check.product_ref} required />
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
            {
                image1 ? (
                  <img src={image1} style={{ width: '300px', height: '200px' }} alt="Uploaded" />
                ) : (
                  <div className="placeholder-image">No image uploaded</div>
                )
              }
              <input
                type="file"
                id="file-input1"
                accept="image/*"
                onChange={handleImageChange1}
                style={{ display: 'none' }}
              />
              <div>
                <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)}  onClick={handleEditClick1}><Edit /></Button>
              </div>
            </div>        
          </div>
          <div className='col-6'>
            <Button  disabled={!haveAccess || (auth.user.role!=='admin' && auth.user.name !== team.leader)}  onClick={updateLabelCheck}  variant='success'>Save</Button>
          </div>
        </div>
        
    </div>
  )
}
