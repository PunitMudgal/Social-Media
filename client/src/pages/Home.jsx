import React, { useState } from "react";
import UserWidget from "../components/widgets/UserWidget";
import EditUser from "../components/EditUser";
import PostWidget from "../components/widgets/PostWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import useFetch from "../hook/fetchHook";
import Loading from "../components/Loading";

function Home() {
  const [{ isLoading, serverError }] = useFetch();
  const [infoEdit, setInfoEdit] = useState(false);

  const profileInfoEdit = async () => {
    setInfoEdit(true);
  };

  if (serverError)
    return (
      <div className="bg-rose-500 rounded-lx p-3 text-white">
        Error Occured!
      </div>
    );
  if (isLoading) return <Loading />;
  return (
    <>
      {infoEdit && <EditUser setInfoEdit={setInfoEdit} />}
      <div
        className={`m-[2%] ${infoEdit && "blur-sm"} flex justify-between gap-5`}
      >
        <UserWidget profileInfoEdit={profileInfoEdit} />

        <div className="flex-1">
          <PostWidget />
        </div>
        <FriendListWidget />
      </div>
    </>
  );
}

export default Home;
