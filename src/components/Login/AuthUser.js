import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate('/Dashboard');
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const baseURL = 'http://127.0.0.1:8000/api';

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const http = async (url, method, data) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method,
        headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while making the request.');
    }
  };

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    http,
    logout,
  };
}
