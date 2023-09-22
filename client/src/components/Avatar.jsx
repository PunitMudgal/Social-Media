import React from "react";

function Avatar({ picturePath }) {
  return (
    <img
      src={picturePath}
      alt="profile"
      className="w-12 object-cover h-12 rounded-full"
    />
  );
}

export default Avatar;
