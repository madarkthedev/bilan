import React, { useState } from 'react';
import classnames from 'classnames';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
const navigate=useNavigate()
    const date1 = new Date().getFullYear();
    const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(credentials);
      // Do something with token, like storing it in state or localStorage
      console.log(token);
      // Storing token in sessionStorage
      sessionStorage.setItem('token', token);
      setError(' ')
      navigate('/root')
    } catch (error) {
        if (error.response.status === 401) {
            setError('Invalid credentials');
          } else {
            setError('An error occurred. Please try again later.');
          }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <div className="p-5 loginForm border">
      <h1 className="fs-4 card-title fw-bold mb-4 text-center">Login</h1>
      <div className="text-danger mt-2 mb-2">{error}</div>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div className="mb-3">
          <label className="mb-2 text-muted" htmlFor="username">
            <strong>USERNAME*</strong>
          </label>
          <input
            type="text"
            id="username"
            className={classnames('form-control')}
            placeholder="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            autoFocus
          />
        </div>
        {/* Password input */}
        <div className="mb-3">
          <label className="mb-2 text-muted" htmlFor="password">
            <strong>Password*</strong>
          </label>
          <input
            type="password"
            id="password"
            className={classnames('form-control')}
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        {/* Submit button */}
        <div className="d-flex row align-items-center">
          <div className="col">
            <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="text-center mt-5 text-muted">
                        Copyright &copy; {date1 - 1}-{date1} &mdash; ABHBC
                    </div>
    </div>
  );
};

export default LoginForm;