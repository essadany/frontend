import { useState } from "react"
import AuthUser from "./AuthUser";
import { useNavigate, redirect } from "react-router";

export default function Login() {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const navigate = useNavigate();

    const  submitForm = async(e) =>{
        // api call
        e.preventDefault();
        let response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            navigate('/Interface');
            alert('Login successful');
          } else {
            // Handle login error
            console.log('Login failed:', data.message);
          }
    
    }

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
    )
}