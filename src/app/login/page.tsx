"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(true);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setuser((prev) => ({ ...prev, [name]: value }));
  };

  const LoginHandler = async () => {
    try {
      const response = await axios.post("/api/users/login", { ...user });
      console.log(response);
      if (response.data.statusCode == 200) {
        toast.success("Login successfull");
        router.push("/profile");
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.error);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setIsSignupButtonDisabled(false);
    } else {
      setIsSignupButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="flex flex-col mx-4 p-4 sm:p-8 w-full sm:max-w-[400px] rounded-md bg-gray-800">
        <h1 className="text-3xl mb-8 text-center font-semibold tracking-wide">
          Login
        </h1>
        <div className="flex flex-col mb-5">
          <input
            id="email"
            type="email"
            name="email"
            autoFocus
            value={user.email}
            required
            placeholder="Email"
            className="bg-gray-700 border border-gray-400 rounded-md py-4 px-3 text-sm w-full"
            onChange={handleUserChange}
          />
        </div>
        <div className="flex flex-col mb-5">
          <input
            id="password"
            name="password"
            value={user.password}
            type="password"
            placeholder="Password"
            className="bg-gray-700 border border-gray-400 rounded-md py-4 px-3 text-sm w-full"
            onChange={handleUserChange}
          />
        </div>

        <button
          disabled={isSignupButtonDisabled}
          onClick={LoginHandler}
          className="mt-5 w-full py-4 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition ease-in duration-100 disabled:bg-opacity-50 disabled:pointer-events-none"
        >
          Login
        </button>

        <h2 className="mt-3 text-center text-sm">
          Don't have an account{" "}
          <Link href="/signup" className="text-blue-300 font-bold">
            Signup
          </Link>
        </h2>
      </div>
    </div>
  );
};
export default Login;
