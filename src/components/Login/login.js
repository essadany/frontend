
import React, { useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
 import './login.css'
import { useAuth } from './AuthProvider';
import Device_demensions from '../../Device_demensions';
const Login = () => {
 
  
  
  //----------------
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState(null);

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (response.ok) {
      const { user, access_token } = await response.json();
      // Store the user and access_token in state or local storage
      console.log(user, access_token);
            
            auth.login(user)
            navigate(redirectPath, '/dashboard', {replace : true}); // Redirect to the dashboard page
          console.log('Login successful');

        } else {
          // Authentication failed, display error message
          setError('login or password incorrect !');
        }
      }catch (error) {
          console.error('An error occurred:', error);
      }
  };
 


  return (
    <div  className='container login'>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit} className='g-3 container' >
            <div class="">
                <label ><b>Email</b></label>
                <input type="text" class="form-control" value={email} onChange={handleEmailChange}  aria-describedby="textHelp" placeholder="Enter login" />
            </div>
            <div class=" ">
                <label><b>Password</b></label>
                <input type="password" class="form-control" value={password} onChange={handlePasswordChange}  placeholder="Password" />
            </div><br />
            <div className=''>          
              <Button className='form-control' type="submit" variant="primary" >Login</Button>
            </div>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}

    </div>
  );
};

export default Login;
