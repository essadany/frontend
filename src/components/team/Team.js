import React from 'react'
import Tab from '../tabs/Tab'
import { Button } from 'react-bootstrap'
import Select from 'react-select';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function Team() {
  const { claim_id } = useParams();


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users,setUsers] = useState([]);
  const [users_of_team,setusers_of_team] = useState([]);
  const [name,setName] = useState("");
  const [deleted,setDeleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [user_id,setUser_id] = useState("");
  //Get list of users in select options
  function getUsers(){
    fetch("http://127.0.0.1:8000/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
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
    getUsers();
  }, [])

  // Get Users of Team 
  function getUsersOfTeam(){
    fetch("http://127.0.0.1:8000/api/users_by_team/1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setusers_of_team(result);
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

  // Delete User from team ------------------------------------------------------------------------------------------------------------------------
  function deleteUserFromTeam(id){
    try{
        fetch(`http://127.0.0.1:8000/api/team_user/${id}`, {
          method: 'PUT',
          headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(deleted)
        }).then((result) => {
            if (result.ok){
              getUsers();
              alert("User Deleted successfully");
            }else{
              result.json().then((resp) => {
                console.warn(resp)
                alert("Some error occured!");

              })
            }
            
          })
        
      } catch (err) {
      console.log(err);
    }
  }

  //Add a user to team
  const handleAddUserToTeam = () => {
    // Make the API request to add the selected user to the team
    axios.post(`/api/teams/${teamId}/users/${selectedUser}`)
    try{
      fetch(`http://127.0.0.1:8000/api/team/${teamId}/user/${selectedUser}`, {
        method: 'PUT',
        headers:{
          'Accept' : 'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(item)
      })
      
    } catch (err) {
    console.log(err);
  }
  };
  // Filter Team --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = users.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );
  return (
    <div className='main'>
        <Tab />
        <h2 >Problem Solving Team {claim_id}</h2>
        <div className='border'>
          <div className='row'>
          <div className='col-md-2'></div>
            <div className='col-md-4 '> 
              <legend style={{borderRadius:20}}>Add a leader</legend>
              <form className='g-3  '>
                  <div class="">
                      <label for="validationCustom02" class="form-label">Leader* :</label>
                      <select value={selectedUser}  className='form-select' onChange={(e)=>{setName(e.label);setUser_id(e.value)}} >
                        {users.map((item)=>(<option value={item.id} >{item.name}</option>))}
                      </select>
                  </div>     
                  <Button style={{marginTop:10}} variant='primary'>Add</Button>
              </form>
            </div>
            <div className='col-md-4 '>
              <legend style={{borderRadius:20}}>Add a member</legend>
              <form class="g-3 ">
                    <div className=' '>
                      <label className='form-label'>Member name* :</label> 
                      <select className='form-select' onChange={(e)=>{setName(e.label);setUser_id(e.value)}} >
                        {users.map((item)=>(<option value={item.id} >{item.name}</option>))}
                      </select>
                    </div>
                    <Button  style={{marginTop:10}}  variant='primary'>Add</Button>
                  
                </form>
            </div>
           
          </div>
          <div>
            <legend>Team members</legend>
          <div className='row md-4 filter'>
                <div  className='col-md-4'></div>
                <div  className='col-md-4'></div>
                <div  className='col-md-4'>
                  <input  className="form-control " type="text" placeholder="Filter table" />
                </div>
            </div>
              <div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th >Name </th>
                            <th >Function</th>  
                            <th></th> 
                        </tr>                   
                    </thead>
                    <tbody>
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.fonction}</td>
                                <td><Button  variant='danger' >Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
              </div>
          </div>
            

            </div>
        
        </div>
  )
}
