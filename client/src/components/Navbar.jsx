import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import "../styles/navbar.css";

import { setMode } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.auth.darkMode);
  const userName = useSelector((state) => state.auth.user?.firstName);
  const token = localStorage.getItem("token");

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="bg-gray-100 px-5 py-7 md:py-5 dark:bg-gray-900">
      <div className="flex justify-around md:hidden">
        <div>
          <Link to="/home" className="logo">
            SOCIAL
          </Link>
        </div>
        {token && (
          <div className="border-2 border-gray-600 flex items-center rounded-lg px-3 bg-gray-200 dark:bg-slate-800">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none"
            />
            <SearchIcon className="cursor-pointer" />
          </div>
        )}
        <div className="flex gap-4 items-center">
          {darkMode ? (
            <LightModeRoundedIcon
              onClick={() => dispatch(setMode())}
              className="cursor-pointer rotate-center"
            />
          ) : (
            <NightlightRoundedIcon
              onClick={() => dispatch(setMode())}
              className="cursor-pointer rotate-center-rev"
            />
          )}
          <MessageRoundedIcon className="cursor-pointer" />
          <HelpCenterRoundedIcon className="cursor-pointer" />
          <NotificationsRoundedIcon className="cursor-pointer" />

          <select
            name="user"
            id=""
            className="bg-transparent p-1 border-2 border-gray-600 rounded-lg dark:bg-slate-800"
          >
            <option value="username">{userName || "User"}</option>
            <option disabled={!token} value="logout" onClick={userLogout}>
              logout
            </option>
          </select>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="hidden md:flex justify-between items-center">
        <Link to="/home" className="logo">
          SOCIAL
        </Link>
        <MenuRoundedIcon
          className="cursor-pointer"
          onClick={() => setMenu(true)}
        />
      </div>
      {menu && (
        <div
          className="flex flex-col items-center justify-center absolute top-0 right-0 p-16 bg-slate-200 dark:bg-slate-950 rounded-lg shadow-md z-20"
          onBlur={() => setMenu(false)}
        >
          <CloseRoundedIcon
            onClick={() => setMenu(false)}
            className="absolute top-2 right-2"
          />
          <div className="flex flex-col gap-8 items-center">
            {darkMode ? (
              <LightModeRoundedIcon onClick={() => dispatch(setMode(true))} />
            ) : (
              <NightlightRoundedIcon onClick={() => dispatch(setMode(false))} />
            )}
            <MessageRoundedIcon />
            <HelpCenterRoundedIcon />
            <NotificationsRoundedIcon />

            <select
              name="user"
              id=""
              className="bg-transparent p-1 border-2 border-gray-600 rounded-lg"
            >
              <option value="username">{userName || "User"}</option>
              <option value="logout" onClick={userLogout}>
                logout
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
