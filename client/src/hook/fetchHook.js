import axios from "axios";
import { useEffect, useState } from "react";
import { getEmailFromToken } from "../helper/helper";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

// axios.defaults.baseURL = process.env.BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:5000";

/** CUSTOM HOOK TO FETCH USER DETAILS */
export default function useFetch() {
  const dispatch = useDispatch();
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { userId } = await getEmailFromToken();
        const { data, status } = await axios.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (status === 201) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status,
          }));
          dispatch(setUser(data));
        }
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, []);
  return [getData, setData];
}
