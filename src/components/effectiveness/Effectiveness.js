import React, { useState } from 'react'
import Tab from '../tabs/Tab'
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { Add } from '@material-ui/icons';
import moment from 'moment';
import { useEffect } from 'react';

export default function Effectiveness({haveAccess}) {
  const {claim_id} = useParams();

  const [effetiveness,setEffetiveness]=useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addB,setAddB] = useState('');
  const [editB,setEditB] = useState('');
  const [description,setDescription] = useState('');
  const [update_date,setUpdate_date] = useState('');
  const [id,setId] = useState('');


  //Get Effectiveness
  function getEffectivness(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/effectiveness`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEffetiveness(result);
          const date = moment(result.updated_at).format("YYYY-MM-DD");
          setUpdate_date(date);
          setId(result.id);
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
  useEffect(()=>{
    getEffectivness();

  },[claim_id])
  //Update Containement
  function UpdateEffectiveness(){
            
    fetch(`http://127.0.0.1:8000/api/effectiveness/${id}`, {
      method: 'PUT',
      headers:{
        'Accept' : 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({description : description})
    }).then((result) => {
        if(result.ok){
          alert("Effectiveness Updated Successfully");
        }else{
          result.json().then((resp) => {
            console.warn(resp);
         
        })
        } 
      }) 
    }
  return (
    <div className='main'>
        <Tab />
        <h2 ><img className='report_icon' src='../icons/effect.png'/>  Detailled Proof of Effectiveness For Long Term Action</h2>
        <div className='border'>
          <form className='row container '>
            <div className='col-2'>
              <label>Update date : </label>
              <input type='date' className='form-control form-control-sm' value={update_date} />
            </div>
            <div className='col-10'></div>
            <div>
              <label>Details : </label>
              <textarea rows={10} className='form-control ' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div  style={{textAlign:'center'}}>
            <Button disabled={haveAccess===true? false : true}  onClick={()=>{setAddB(false);setEditB(true);UpdateEffectiveness()}} variant='success'> Save</Button>
            </div>

          </form>
        </div>
    </div>
  )
}
