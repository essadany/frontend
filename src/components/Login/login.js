

import React, { useState} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
 import './login.css'
const Login = ( {onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
            localStorage.setItem('token', data.token); // Assuming the response includes a token
            navigate('/dashboard'); // Redirect to the dashboard page
          console.log('Login successful');
          onLogin(); // Trigger authentication in the parent component
        } else {
          // Authentication failed, display error message
          setError('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred');
      });
  };

  return (
    <div className='login'>
      <h1>Login Page</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} >
            <div class="form-group">
                <label for="exampleInputLogin1">Login</label>
                <input type="text" class="form-control" value={email} onChange={handleEmailChange}  id="exampleInputLogin1" aria-describedby="textHelp" placeholder="Enter login" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" value={password} onChange={handlePasswordChange} id="exampleInputPassword1" placeholder="Password" />
            </div>
            <Button  type="submit" variant="primary" >Login</Button>
            </form>
    </div>
  );
};

export default Login;
