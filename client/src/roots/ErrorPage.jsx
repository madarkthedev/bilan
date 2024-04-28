import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'
const ErrorPage = () => {
  const navigate = useNavigate()
  const error = useRouteError()
  console.log(error)
  return (
    <div>
      <main id="error-content" className=' container'>
        <h1 className='alert alert-danger mt-5 mb-5'>An error occurred!</h1>
        <div className='card mt-5 mb-5  alert alert-info'>
          <h2 className='mt-5 mb-5'>Status: {error.status}</h2>
          <h2 className='mt-5 mb-5'>Status Text: {error.statusText} </h2>
          <h2 className='mt-5 mb-5 bg-white'>Error:{error.data || error.message}</h2>
        </div>
        <div className=' d-flex justify-content-center align-items-center'>

          <button type='button' className='btn btn-danger  ' onClick={() => navigate(-1)}>Return</button>

        </div>
      </main>
    </div>
  )
}

export default ErrorPage