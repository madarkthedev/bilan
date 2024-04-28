import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Link, useLoaderData } from "react-router-dom";
import { deleteUser, fetchUsers } from "../services/userService";
const Users = () => {
  const users = useLoaderData()

  return (
    <div className="  bg-primary  vh-100">
      <h1 className="alert alert-dark">Users</h1>
      <h2 className="title">List of Users</h2>
      <Link to="/root/users/add" className="btn btn-success my-1 mt-1 mb-2">
        Add New
      </Link>
      <table className="table container">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td >
                <Link
                  to={`/root/users/${user.id}`}
                  className="btn btn-success"
                >
                  Edit
                </Link>
                <Form style={{ display: 'inline', margin: '0.1rem' }}
                  method="delete"
                  action={`/root/users/delete/${user.id}`}
                  onSubmit={(event) => {
                    if (
                      !confirm(
                        "Please confirm you want to delete this record."

                      )
                    ) {
                      event.preventDefault();
                      Swal.fire("Item is not deleted", "", "info");

                    } else {
                      Swal.fire("Deleted!", "", "success");

                    }

                  }}
                >
                  <button className='btn btn-danger' type="submit">Delete</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

export async function loader() {
  const users = await fetchUsers();

  return users
}




