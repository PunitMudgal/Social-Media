import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hook/fetchHook";
import { PostLoading } from "../components/Loading";
import UserWidget from "../components/widgets/UserWidget";
import UploadPhotoWidget from "../components/widgets/UploadPhotoWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import { useSelector } from "react-redux";

function Profile() {
  const { userId } = useParams();

  // const [{ isLoading, serverError }] =
  useFetch(userId);
  const user = useSelector((state) => state.auth.user);

  // early return
  // if (serverError)
  //   return (
  //     <div className="bg-rose-500 rounded-lx p-3 text-white">
  //       Error Occured!
  //     </div>
  //   );
  // if (isLoading) return <PostLoading />;
  return (
    <div className="flex flex-col gap-4 justify-center items-center my-4">
      <UserWidget friendProfile={true} {...user} />
      <div className="flex flex-col flex-1 gap-4">
        {/* <UploadPhotoWidget /> */}
        <PostsWidget userId={userId} isProfile={true} />
      </div>
    </div>
  );
}

export default Profile;
