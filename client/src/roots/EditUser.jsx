import React, { useState } from 'react'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import { editUser, fetchUser } from '../services/userService'


const EditUser = () => {
  const user = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className="bg-primary  vh-100 mt-2">
      <h1 className="alert alert-dark">Users</h1>
      <h2 >Edit User</h2>
      <div className=" col-3 container  card  bg-white  justify-content-center align-items-center mt-3 ">
        <div className="card mt-2">
          <div className="container mt-2">
            <Form method="put" >
              <fieldset>
                <label htmlFor="username" >Username</label>
                <input id="username" required
                  className="form-control"
                  type="text" name="username"
                  placeholder="username"
                  defaultValue={user?.username}
                />
              </fieldset>

              <fieldset>
                <label htmlFor="email" >Email</label>
                <input id="email" required
                  className="form-control"
                  type="text" name="email"
                  placeholder="email@gmail.com"
                  defaultValue={user?.email}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="Password" >Password</label>
                <input id="Password" required
                  className="form-control"
                  type="password" name="password"
                  placeholder="******"

                />
              </fieldset>

              <div className="mt-3 mb-3">

                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser

export async function loader({ params }) {

  const user = await fetchUser(params.id);

  return user
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  console.log(user)
  console.log(params.id)
  try {
     await editUser(params.id, user);

  } catch (err) {
    if (err.status === 422) {
      return err;
    }
    throw err;
  }
  return redirect("/root/users");

}