import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../hook/fetchHook";
import UserWidget from "../components/widgets/UserWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const { userId } = useParams();

  useFetch(userId);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 justify-center items-center my-4">
        <UserWidget friendProfile={true} {...user} />
        <div className="flex flex-col flex-1 gap-4">
          {/* <UploadPhotoWidget /> */}
          <PostsWidget userId={userId} isProfile={true} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
