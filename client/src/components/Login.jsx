
import '../roots/styles.css'
import classnames from 'classnames'
import { useState } from "react";
import { login } from "../services/authService";


const Login = () => {

    const date1 = new Date().getFullYear()
    const [credentials, setCredentials] = useState({
      username: '',
      password: '',
    });
    const [error, setError] = useState('');
    console.log(error)

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = await login(credentials);
        // Do something with token, like storing it in state or localStorage
       console.log(token)
      } catch (error) {
        setError(error.message);
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


        <div className=" d-flex justify-content-sm-center align-items-center vh-100 loginPage">

            <div className=" p-5 loginForm border">
                <h1 className="fs-4 card-title fw-bold mb-4 text-center">Login</h1>
                {error && <div className='text-danger mt-2 mb-2'>Error: {error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <label className="mb-2 text-muted" htmlFor="username"><strong>USERNAME*</strong></label>
                        <input
                           id="username"
                            type="text"
                            placeholder="username"
                            className={(classnames('form-control', { 'is-invalid': error }))}
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            autoFocus
                            onLoad={() => window.focus()} />
                    </div>

                    <div className="mb-3 ">
                        <label className="mb-2 text-muted" htmlFor="passord" ><strong>Password*</strong></label>
                        <input
                          type="password"
                          className={(classnames('form-control', { 'is-invalid': error }))}
                          placeholder="Password"
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                           />
                    </div>

                    <div className="d-flex row align-items-center">

                        <div className="col"><button type="submit" className="btn btn-success w-100 rounded-0 mb-2">
                            Login
                        </button></div>
                    </div>
                    <div className="text-center mt-5 text-muted">
                        Copyright &copy; {date1 - 1}-{date1} &mdash; ABHBC
                    </div>
                </form>
            </div>


        </div>



    );
};

export default Login;
