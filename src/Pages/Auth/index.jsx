import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import ls from 'local-storage';
import { useNavigate } from 'react-router-dom';

import { Signin, Signup } from '../../Components';
import loginImage from '../../Assets/images/login.png';

const AuthScreen = () => {
  const [currentTab, setCurrentTab] = useState('signin');
  const navigate = useNavigate();
  useEffect(() => {
    let token = ls.get('accessToken');

    // if token, verify token with Auth server
    // if token is valid, redirect to home page
    // else delete token from local storage
  }, []);
  return (
    <div className="auth-screen">
      <div className="auth-screen-left">
        <img src={loginImage} alt="auth-screen" />
      </div>
      <div className="auth-screen-right">
        <div className="auth-screen-right-top">
          <h1>{currentTab} to your CMS+ account</h1>
        </div>
        <div className="auth-screen-right-bottom">
          {currentTab === 'signin' ? (
            <Signin />
          ) : (
            <Signup setCurrentTab={setCurrentTab} />
          )}
          {currentTab === 'signin' ? (
            <span onClick={() => setCurrentTab('signup')}>
              Don t have an account? Signup
            </span>
          ) : (
            <span onClick={() => setCurrentTab('signin')}>
              Already have an account? Signin
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthScreen;
