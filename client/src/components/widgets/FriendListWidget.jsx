import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../store/authSlice";
import Friend from "../Friend";
import { getEmailFromToken } from "../../helper/helper";

function FriendListWidget() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const getFriends = async () => {
    const token = localStorage.getItem("token");
    const { userId } = await getEmailFromToken();
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends(data));
    } catch (error) {
      return Promise.reject();
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 w-[20%] p-5 rounded-xl relative shadow-md max-h-fit md:w-full">
      {/* <div> */}
      <h3>Friend List</h3>
      {user?.friends.map((friend) => (
        <Friend key={friend._id} {...friend} friendId={friend._id} />
      ))}
      {/* </div> */}
    </div>
  );
}

export default FriendListWidget;
