import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phone, setPhone] = useState();
    const [role, setRole] = useState();
    const [fonction, setFontction] = useState();


    let handleSubmit = async (e) => {
        e.preventDefault();
        // api call
        try{
            let res = await fetch('http://127.0.0.1:8000/api/user', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone, fonction, role}),
          })
          let resJson = await res.json();
          
          if (res.status === 200) {
            setEmail("");
            setPassword("");
            setFontction("");
            setName("");
            setPhone("");
            setRole("");
            alert("User Added successfully");
          } else {
            alert("Some error occured, try again!");
          }
        } catch (err) {
          console.log(err);
        }
    }

    return(
        <div className="row justify-content-left pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="test" className="form-control" placeholder="Enter name"
                            onChange={e=>setName(e.target.value)} value={name}
                        id="name" />
                    </div>
                    <div className="form-group">
                        <label>Function :</label>
                        <input type="test" className="form-control" placeholder="Enter function"
                            onChange={e=>setFontction(e.target.value)} value={fonction}
                        id="fct" />
                    </div>
                    <div className="form-group">
                        <label>Phone :</label>
                        <input type="test" className="form-control" placeholder="Enter phone"
                            onChange={e=>setPhone(e.target.value)} value={phone}
                        id="phone" />
                    </div>
                    <div className="form-group">
                        <label>Role :</label>
                        <input type="test" className="form-control" placeholder="admin, user"
                            onChange={e=>setRole(e.target.value)} value={role}
                        id="role" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address :</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)} value={email}
                        id="email" />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)} value={password}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary mt-4">Register</button>
                </div>
            </div>
        </div>
    )
}