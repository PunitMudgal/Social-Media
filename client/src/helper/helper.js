import axios from "axios";

// axios.defaults.baseURL = process.env.BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:5000";

export async function registerUser(data) {
  try {
    const {
      data: { msg },
    } = await axios.post(`/auth/register`, data);

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** LOGIN FUNCTION */
export async function Login({ email, password }) {
  try {
    if (email) {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password Doesn't Match!" });
  }
}

/** UPDATE PROFILE */
export async function updateProfile(userData) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/auth/updateUser", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile!" });
  }
}
