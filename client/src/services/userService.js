import axios from "axios";
import Swal from "sweetalert2";

export const  fetchUsers=()=>{
const token = sessionStorage.getItem("token");
  return  axios.get('/api/users',
  {
    headers: {
      Authorization: "Bearer " + token,
    },
  }
  ).then(response => {

                  return response.data;
                }
          ).catch(err => {

             throw new Error(`Failed to fetch, this url: ${err.config.url} not found`);

            });
  }

  export const createUser = (user) => {
const token = sessionStorage.getItem("token");
    return axios.post(`/api/users`, user,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
    ).then(response => {
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "This user has been created",
        showConfirmButton: false,
        timer: 1500
      });
      return response.data

    }
    ).catch(err => {

      throw new Error("You can not create this user");

    });

  }
  export const  editUser=(id, user)=>{
const token = sessionStorage.getItem("token");
    return  axios.put(`/api/users/${id}`, user,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
).then(response => {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: "This user has been edited",
    showConfirmButton: false,
    timer: 1500
  });
                    return response.data

                  }
            ).catch(err => {

               throw new Error("You can not edit this user");

              });

    }


    export const  fetchUser=(id)=>{
const token = sessionStorage.getItem("token");
      return  axios.get('/api/users/'+id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      ).then(response => {

                      return response.data;
                    }
              ).catch(err => {
                 throw new Error(`Failed to fetch, this url: ${err.config.url} not found`);

                });
      }
      export const  deleteUser=(id)=>{
const token = sessionStorage.getItem("token");
        return  axios.delete(`/api/users/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then(response => {

        return response.data

        }).

        catch(err => {

                  throw new Error(`Failed to fetch, this url: ${err.config.url} not found`);

                  });
        }
