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
  const [team,setTeam] = useState("");
  const [team_id,setTeam_id] = useState("");
  const [users,setUsers] = useState([]);
  const [users_of_team,setUsers_of_team] = useState([]);
  const [name,setName] = useState("");
  const [deleted,setDeleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

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
 

  const [user_id,setUser_id] = useState("");
  //Get Team of the Claim selected
  function getTeam(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team`)
      .then(res => res.json())
      .then(
        (result) => {
          setTeam(result);
          setTeam_id(result.id);
         setName(result.leader);
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
  
 
  
  // Get Users of Team 
  
  function getUsersOfTeam(){
    fetch(`http://127.0.0.1:8000/api/claim/${claim_id}/team_users`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
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
  

  useEffect(() => {
    getUsers();
  }, [])
  useEffect(()=>{
    getTeam();
   
  },[claim_id])
  useEffect(() => {

    getUsersOfTeam();
  }, [team_id]);

  // Delete User from team ------------------------------------------------------------------------------------------------------------------------
  function deleteUserFromTeam(user_id){
    try{
        fetch(`http://127.0.0.1:8000/api/team/${team_id}/user_disactivated/${user_id}`, {
          method: 'PUT',
          headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(deleted)
        }).then((result) => {
            if (result.ok){
              getUsersOfTeam();
              alert("User Deleted from successfully");
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
    let handleAddUserToTeam = async (e) => {
      e.preventDefault();
      console.log("team : ",team);
      console.log("team_id = ",team.id);
      console.log("user_id = ",user_id);
      try {
        let res = await fetch("http://127.0.0.1:8000/api/add-user-to-team", {
          method: "POST",
          headers: {
            'Accept' : 'application/json',
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({user_id : user_id , team_id : team.id}),
        })
        console.log(res.status);
        if (res.status === 200) {
          setUser_id("");
        const data = await res.json();
        alert(data.message);
        getUsersOfTeam();
          
        } else {
          alert("Some error occured, try again!");
        }
      } catch (err) {
        console.log(err);
       
      }
    };
    const [email,setEmail]=useState("");
    //Add a leader to team 
    let handleAddLeader = async (e) => {
      e.preventDefault();
      console.log("team : ", team);
      console.log("team_id = ", team.id);
      console.log("user_id = ", user_id);
      try {
        let res = await fetch("http://127.0.0.1:8000/api/add-leader", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user_id, team_id: team_id }),
        });
        console.log(res.status);
        if (res.status === 200) {
          console.warn("leader=", name);
          // Set the leader name
          const leaderName = users.find(user => user.id === parseInt(user_id))?.name || '';
          const email = users.find(user => user.id === parseInt(user_id))?.email || '';
          setName(leaderName);
          setEmail(email);
          
          // Update the leader name in the database
          fetch(`http://127.0.0.1:8000/api/team/${team_id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ leader: leaderName })
          })
            .then(() => {
              setUser_id("");
              getUsersOfTeam();
            })
            .catch((error) => {
              console.log(error);
              alert("Some error occurred, try again!");
            });
        } else {
          alert("Some error occurred, try again!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    
  // Filter Team --------------------------------------------------------------------------------------------------------------------------
  const [filter, setFilter] = useState("");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = users_of_team.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );
  return (
    <div className='main'>
        <Tab team_id={team_id} />
        <h2 >Problem Solving Team {claim_id}</h2>
        <div className='border'>
          <div className='row'>
          <div className='col-md-2'></div>
            <div className='col-md-4 '> 
              <legend style={{borderRadius:20}}>Add a leader</legend>
              <form className='g-3  container' onSubmit={handleAddLeader}>
                  <div class="">
                      <label for="validationCustom02" class="form-label">Leader* :</label>
                      <select  className='form-select' onChange={(e)=>{setName(e.label);setUser_id(e.target.value)}} required >
                      <option disabled selected>--- Select Leader ---</option>
                        {users.map((item)=>(<option key={item.id}  value={item.id} >{item.name}</option>))}
                      </select>
                  </div>     
                  <Button type='submit' style={{marginTop:10}} variant='primary'>Add</Button>
              </form>
            </div>
            <div className='col-md-4 '>
              <legend style={{borderRadius:20}}>Add a member</legend>
              <form class="g-3 container" onSubmit={handleAddUserToTeam}>
                    <div className=' '>
                      <label className='form-label'>Member name* :</label> 
                      <select data-live-search="true"  className='selectpicker form-select' onChange={(e)=>{setUser_id(e.target.value)}} required >
                        <option disabled selected>--- Select User ---</option>
                        {users.map((item)=>(<option key={item.id} value={item.id} >{item.name}</option>))}
                      </select>
                    </div>
                    <Button type='submit'  style={{marginTop:10}}  variant='primary'>Add</Button>
                  
                </form>
            </div>
           
          </div>
          <div>
            <legend>Team members</legend>
          <div className='row md-4 filter'>
                <div  className='col-md-4'>
                  <h6>Leader : {name} </h6> 
                </div>
                <div  className='col-md-4'>
                  <h6>Email : {email}</h6>
                </div>
                <div  className='col-md-4'>
                  <input  className="form-control " type="text" placeholder="Filter table" onChange={handleChange} />
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
                                <td><Button onClick={()=>deleteUserFromTeam(item.id)}  variant='danger' >Delete</Button></td>
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
