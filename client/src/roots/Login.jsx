import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../roots/styles.css'

const Login = () => {

  return (
    <div className="d-flex justify-content-sm-center align-items-center vh-100 loginPage">
      <LoginForm  />

    </div>
  );
};

export default Login;