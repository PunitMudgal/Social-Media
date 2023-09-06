import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);
  // console.log("user----->>>", user);
  return <div>Home</div>;
}

export default Home;
