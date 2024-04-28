import React from 'react'

import { redirect, useActionData } from 'react-router-dom';
import { deleteUser } from '../services/userService';

const DeleteUser = () => {
    const data = useActionData();
    return (
      <div>
        {data && data.status && <p>{data.message}</p>}
      </div>
  )
}

export default DeleteUser


export async function action({ params }) {




  try {
    await deleteUser(params.id);

  } catch (err) {
    if (err.status === 422) {
      return err;
    }
    throw err;
  }
  return redirect("/root/users");

}