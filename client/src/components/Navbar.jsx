import React, { useEffect, useState } from "react";
import {
  NightlightRounded,
  CloseRounded,
  MenuRounded,
  LightModeRounded,
  NotificationsRounded,
  HelpCenterRounded,
  MessageRounded,
  Search,
} from "@mui/icons-material";
import "../styles/navbar.css";

import { setMode } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchUsers } from "../helper/helper";
import Friend from "./Friend";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.auth.darkMode);
  const userName = useSelector((state) => state.auth.user?.firstName);
  const token = localStorage.getItem("token");

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const submitSearch = (e) => {
    if (searchText) {
      const searchPromise = searchUsers(searchText.toLowerCase());
      searchPromise.then((user) => setSearchResults(user.data));
    }
  };

  useEffect(() => {
    if (searchMenu) {
      const timer = setTimeout(() => submitSearch(), 300);

      // cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchText]);

  return (
    <div className="bg-gray-100 px-5 py-7 md:py-5 dark:bg-gray-900 relative">
      <div className="flex justify-around md:hidden">
        <div>
          <Link to="/home" className="logo">
            SOCIAL
          </Link>
        </div>

        {/* search bar  */}
        {token && (
          <div className="border-2 border-gray-600 flex items-center rounded-md px-3 bg-gray-200 dark:bg-slate-800 ">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none focus:w-96 "
              onFocus={() => setSearchMenu(true)}
              onBlur={() => setSearchMenu(false)}
            />
            <Search
              type="submit"
              onClick={submitSearch}
              className="cursor-pointer"
            />
          </div>
        )}
        {searchMenu && (
          <div className="absolute top-16 left-[26.6%] rounded-b-md p-2 dark:bg-slate-800 bg-gray-100 w-[26.6rem] z-40 border-x border-b border-gray-400 shadow-lg ">
            {searchResults.map((user) => (
              <div className="rounded-md hover:border border-teal-500">
                {" "}
                <Friend
                  key={user._id}
                  friendId={user._id}
                  {...user}
                  searchValue
                />
              </div>
            ))}
            {searchResults.length === 0 && (
              <p className="text-rose-500">
                No User Found with the name "{searchText}"!
              </p>
            )}
          </div>
        )}

        <div className="flex gap-4 items-center">
          {darkMode ? (
            <LightModeRounded
              onClick={() => dispatch(setMode())}
              className="cursor-pointer rotate-center"
            />
          ) : (
            <NightlightRounded
              onClick={() => dispatch(setMode())}
              className="cursor-pointer rotate-center-rev"
            />
          )}
          <MessageRounded className="cursor-pointer" />
          <HelpCenterRounded className="cursor-pointer" />
          <NotificationsRounded className="cursor-pointer" />

          <select
            name="user"
            id=""
            className="bg-transparent p-1 border-2 border-gray-600 rounded-lg dark:bg-slate-800 uppercase"
          >
            <option value="username">{userName || "User"}</option>
          </select>
          <button
            className="bg-transparent border border-rose-600 hover:bg-rose-500  rounded-md text-rose-500 hover:text-white px-2 py-1"
            onClick={userLogout}
          >
            Logout
          </button>
          <Link
            className="bg-transparent border border-purple-600 hover:bg-purple-500  rounded-md text-purple-500 hover:text-white px-2 py-1"
            to="/"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="hidden md:flex justify-between items-center">
        <Link to="/home" className="logo">
          SOCIAL
        </Link>

        {/* SEARCH BAR (MOBILE) */}
        {token && (
          <div className="border-2 border-gray-600 flex items-center rounded-lg px-3 bg-gray-200 dark:bg-slate-800 ">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none focus:w-40 w-32 "
              onFocus={() => setSearchMenu(true)}
              onBlur={() => setSearchMenu(false)}
            />
            <Search
              type="submit"
              onClick={submitSearch}
              className="cursor-pointer"
            />
          </div>
        )}

        {/* SEARCH MENU  */}
        {searchMenu && (
          <div className="absolute top-16 left-[31.95%] rounded-b-md p-2 dark:bg-slate-800 bg-gray-100 w-[26.6rem] z-30 border-x border-b border-gray-400 shadow-lg md:top-[3.3rem] md:w-[12.7rem] md:left-[37.2%] md:p-1">
            {searchResults.map((user) => (
              <div className="rounded-md hover:border border-teal-500">
                {" "}
                <Friend
                  key={user._id}
                  friendId={user._id}
                  {...user}
                  searchValue
                />
              </div>
            ))}
            {searchResults.length === 0 && (
              <p className="text-rose-500">
                No User Found with the name "{searchText}"!
              </p>
            )}
          </div>
        )}
        <MenuRounded className="cursor-pointer" onClick={() => setMenu(true)} />
      </div>

      {/* MAIN MENU  */}
      {menu && (
        <div
          className="flex flex-col items-center justify-center absolute top-0 right-0 p-16 bg-slate-200 dark:bg-slate-950 rounded-lg shadow-md z-40"
          onBlur={() => setMenu(false)}
        >
          <CloseRounded
            onClick={() => setMenu(false)}
            className="absolute top-2 right-2"
          />
          <div className="flex flex-col gap-8 items-center">
            {darkMode ? (
              <LightModeRounded onClick={() => dispatch(setMode(true))} />
            ) : (
              <NightlightRounded onClick={() => dispatch(setMode(false))} />
            )}
            <MessageRounded />
            <HelpCenterRounded />
            <NotificationsRounded />

            <select
              name="user"
              id=""
              className="bg-transparent p-1 border-2 border-gray-600 rounded-lg"
            >
              <option value="username">{userName || "User"}</option>
            </select>

            <button
              className="bg-transparent border border-rose-600 hover:bg-rose-500  rounded-md text-rose-500 hover:text-white px-2 py-1"
              onClick={userLogout}
            >
              Logout
            </button>
            <Link
              className="bg-transparent border border-purple-600 hover:bg-purple-500  rounded-md text-purple-500 hover:text-white px-2 py-1"
              to="/"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
