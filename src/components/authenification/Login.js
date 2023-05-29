import React from 'react';
import   {useNavigate} from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic

    // Redirect to the desired page
    navigate('/Interface');
  };
  return (
    <div>
        <form >
            <div class="form-group">
                <label for="exampleInputLogin1">Login</label>
                <input type="text" class="form-control" id="exampleInputLogin1" aria-describedby="textHelp" placeholder="Enter login" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button onClick={handleLogin}  type="submit" class="btn btn-primary" >Submit</button>
            </form>
    </div>
  )
}
