import React, { useState } from 'react';
import './style.css';
import ls from 'local-storage';

import { useNavigate } from 'react-router-dom';

import makeRequest from '../../utils/requests';

import { SIGNIN as SIGNIN_ENDPOINT } from '../../constants/apiEndpoints';
import { SIGNIN as SIGNIN_METHOD } from '../../constants/apiMethods';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signin = async () => {
    try {
      if (email.trim() === '') {
        alert('email is required');
        return;
      }
      if (password.trim() === '') {
        alert('password is required');
        return;
      }
      const response = await makeRequest(SIGNIN_METHOD, SIGNIN_ENDPOINT, {
        username: email.trim(),
        password: password.trim(),
      });
      console.log('access token', response.data);
      ls.set('accessToken', response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Invalid credentials (May be): Check Logs');
    }
  };
  return (
    <div className="signin-component">
      <span>Email</span> <br />
      <input onChange={(e) => setEmail(e.target.value)} /> <br />
      <span>Password</span>
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />{' '}
      <br />
      <button onClick={signin}>Signin</button>
    </div>
  );
};
export default Signin;
