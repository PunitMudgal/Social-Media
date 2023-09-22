import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../store/authSlice";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import { PersonAddAlt1Rounded, PersonRemoveRounded } from "@mui/icons-material";

function Friend({
  friendId,
  picturePath,
  firstName,
  lastName,
  location,
  createdAt,
}) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.auth.user.friends);
  const { _id } = useSelector((state) => state.auth.user);

  const isFriend = friends?.find((friend) => friend._id === friendId);
  const isSelf = friendId === _id;

  const patchFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends(data));
    } catch (error) {
      return Promise.reject();
    }
  };

  return (
    <div className="flex text-sm items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <Avatar picturePath={picturePath || avatar} />
        <div className="flex flex-col">
          <Link to={`/profile/${friendId}`}>
            {" "}
            <span className="font-semibold">{`${firstName} ${lastName}`}</span>
          </Link>
          <span className="text-xs font-light dark:text-gray-400">
            {location || "N/A"} <FmdGoodRoundedIcon fontSize="small" />
          </span>
        </div>
        <p className="text-gray-500 font-light text-xs self-start mt-1 ">
          {createdAt?.slice(0, 10)}
        </p>
      </div>
      {!isSelf && (
        <span
          onClick={patchFriend}
          className="rounded-full cursor-pointer p-1 hover:bg-gray-400 dark:hover:bg-gray-800"
        >
          {isFriend ? (
            <PersonRemoveRounded fontSize="medium" />
          ) : (
            <PersonAddAlt1Rounded fontSize="medium" />
          )}
        </span>
      )}
    </div>
  );
}

export default Friend;
