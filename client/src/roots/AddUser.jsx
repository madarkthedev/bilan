import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";
const AddUser = () => {
const navigate = useNavigate();

  return  (
    <div className="bg-primary  vh-100 mt-2">
      <h1 className="alert alert-dark">Users</h1>
      <h2 >Add New User</h2>
      <div className=" col-3 container  card  bg-white  justify-content-center align-items-center mt-3 ">
        <div className="card mt-2">
          <div className="container mt-2">
            <Form method="post" action='/root/users/add' encType="multipart/form-data" >
              <fieldset>
                <label htmlFor="username" >Username</label>
                <input id="username" required
                  className="form-control"
                  type="text" name="username"
                  placeholder="username"
                />
              </fieldset>

              <fieldset>
                <label htmlFor="email" >Email</label>
                <input id="email" required
                  className="form-control"
                  type="text" name="email"
                  placeholder="email@gmail.com"
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
                  <button type="button" onClick={()=> navigate(-1)} className="btn btn-danger">
                    Back
                  </button>
              </div>

            </Form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddUser;
export async function action({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
console.log(user)
    try {
    const createdUser=   await createUser(user)
    console.log(createdUser)
    } catch (err) {
      if (err.status === 422) {
        return err;
      }
      throw err;
    }
    return redirect("/root/users");

  }