"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      let response = await axios.get("/api/users/logout");
      console.log(response);
      if (response.data.statusCode === 200) {
        toast.success("Logout successfull");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <h1>Profile</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
export default Profile;
