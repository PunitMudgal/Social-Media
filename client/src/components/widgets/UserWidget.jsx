import React from "react";
import avatar from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

function UserWidget({
  profileInfoEdit,
  friendProfile,
  picturePath,
  firstName,
  lastName,
  email,
  _id,
  friends,
  location,
  occupation,
  impressions,
  viewedProfile,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 w-[20%] p-5 rounded-xl relative shadow-md md:w-full">
      {!friendProfile && (
        <>
          {" "}
          <Tooltip title="Edit Info" placement="top">
            {" "}
            <EditNoteRoundedIcon
              className="float-left cursor-pointer"
              onClick={profileInfoEdit}
            />
          </Tooltip>
          <Tooltip title="Logout">
            <LogoutRoundedIcon
              onClick={handleLogout}
              className="float-right cursor-pointer"
            />
          </Tooltip>{" "}
        </>
      )}

      <div className="flex flex-col items-center mb-3">
        <img
          src={picturePath || avatar}
          alt="user"
          className="rounded-full h-32 w-32 border-2 border-purple-500 p-[1px] object-cover"
        />
        <Link to={`/profile/${_id}`}>
          <h3 className="capitalize">{`${firstName} ${
            lastName ? lastName : ""
          }`}</h3>
        </Link>

        <span className="text-xs text-gray-500">{email}</span>
        <span className="text-xs text-gray-500">{friends?.length} Friends</span>
      </div>
      <hr />

      <div className="flex flex-col gap-2 my-3 text-gray-500 text-sm">
        <p>
          <FmdGoodRoundedIcon fontSize="medium" /> {location || "Not Specified"}
        </p>
        <p>
          <WorkRoundedIcon /> {occupation || "Not Specified"}
        </p>
      </div>
      <hr />

      <div className="flex flex-wrap justify-between gap-2 items-center my-3 text-sm">
        <p className="text-gray-500">Total profile Views</p>{" "}
        <span>{viewedProfile}</span>
        <p className="text-gray-500">Impression to your profile</p>{" "}
        <span>{impressions}</span>
      </div>
      <hr />

      <div className="flex flex-wrap justify-between gap-2 items-center my-3">
        <h2>Other Social Media Profiles</h2>
        {/* <a href="" target="_blank"></a>
        <a href="" target="_blank"></a> */}
      </div>
    </div>
  );
}

export default UserWidget;
