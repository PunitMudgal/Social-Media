import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsFromToken } from "./helper/helper";
import { setLogin } from "./store/authSlice";
import jwt_decode from "jwt-decode";

function App() {
  const darkMode = useSelector((state) => state.auth.darkMode);
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      async function getDetailsFromToken() {
        const token = localStorage.getItem("token");
        if (!token) return Promise.reject("cannot find token");
        let decode = await jwt_decode(token);
        dispatch(setLogin(decode.user));
      }
      getDetailsFromToken();
    }
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <main className={`${darkMode ? "dark text-white" : ""}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={token ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={token ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
