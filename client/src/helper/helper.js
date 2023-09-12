import axios from "axios";
import jwt_decode from "jwt-decode";
// axios.defaults.baseURL = process.env.BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:5000";

export async function getEmailFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token Not Found!");
  let decode = await jwt_decode(token);
  return decode;
}

export async function registerUser(userData) {
  try {
    await axios.post(`/auth/register`, userData);

    return Promise.resolve();
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
    const data = await axios.patch("/users/updateUser", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile!" });
  }
}
