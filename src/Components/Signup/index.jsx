import React, { useState } from 'react';
import './style.css';

import makeRequest from '../../utils/requests';
import PropTypes from 'prop-types';

import { SIGNUP as SIGNUP_ENDPOINT } from '../../constants/apiEndpoints';
import { SIGNUP as SIGNUP_METHOD } from '../../constants/apiMethods';

const Signin = ({ setCurrentTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const signup = async () => {
    try {
      if (email.trim() === '') {
        alert('email is required');
        return;
      }
      if (password.trim() === '') {
        alert('password is required');
        return;
      }
      if (password.trim() !== confirmPassword.trim()) {
        alert('passwords do not match');
        return;
      }
      const response = await makeRequest(SIGNUP_METHOD, SIGNUP_ENDPOINT, {
        username: email,
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      });
      setCurrentTab('signin');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signin-component">
      <span>Email</span> <br />
      <input onChange={(e) => setEmail(e.target.value)} /> <br />
      <span>Password</span>
      <br />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />{' '}
      <br />
      <span>Confirm Password</span>
      <br />
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />{' '}
      <br />
      <button onClick={signup}>Signup</button>
    </div>
  );
};

Signin.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Signin;
