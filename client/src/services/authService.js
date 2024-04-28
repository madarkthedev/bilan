import axios from "axios";


export const login = async (user) => {
  try {
    const response = await axios.post(`/api/auth/login`, user);
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

export const fetchMe = async () => {
  const token = sessionStorage.getItem("token");

  return await axios
    .get("/api/auth/status", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Response("Can not submit the data!", {
        status: 500,
      });
    });
};

export const logout = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("Token is missing.");
    return; // Exit early if token is missing
  }

  try {
    // Include token in request headers
    const response = await axios.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Check if the response is successful (status code 2xx)
    if (response.status === 200) {
      // Clear session storage
      sessionStorage.clear();
      // Redirect to login page

    } else {
      console.error("Logout failed:", response.data);
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
