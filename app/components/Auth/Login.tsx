"use client";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addCookie } from "@/app/utils/cookies";
import { nanoid } from "nanoid";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import Spinner from "../Spinner/Spinner";
import { AppRoutes, COOKIE_ADMIN, COOKIE_USER } from "@/constant";
import { login } from "@/app/Redux/User/User";

const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const handleToggle = () => {
    router.push(AppRoutes.SIGNUP);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
  //   setLoading(true);
  //   event.preventDefault();

  //   let orderId = nanoid();

  //   // setFormData({
  //   //     email: '',
  //   //     password: ''
  //   // })
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });
  //     if (response.ok) {
  //       toast.success("User logged in successfully!");

  //       const responseData = await response.json();
  //       addCookie("userDetails", responseData.userdata.token);

  //       console.log("responseData", responseData);
  //       const users = responseData.userdata.user;
  //       const userpassword = responseData.userdata.password;
  //       const token = responseData.userdata.token;
  //       dispatch(login({ responseData.userdata.user, responseData.userdata.token }));

  //       if (users.admin) {
  //         addCookie(COOKIE_ADMIN, token);
  //       } else {
  //         addCookie(COOKIE_USER, token);
  //       }

  //       setLoading(false);
  //       // router.push(AppRoutes.DASHBOARD);
  //     } else if (response.status == 403) {
  //       setLoading(false);
  //       toast.error("User is not verified.");
  //     } else if (response.status == 404) {
  //       setLoading(false);
  //       toast.error("User not found.");
  //     } else if (response.status == 401) {
  //       // Incorrect password
  //       setLoading(false);
  //       toast.error("Incorrect password.");
  //     } else {
  //       // Other errors
  //       setLoading(false);
  //       console.error("Error logging in user:", response.statusText);
  //       // Handle other errors
  //     }
  //   } catch (error) {
  //     console.error("Error signing up user:", error);
  //   }
  // };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        const errorMessages: { [key: number]: string } = {
          403: "User is not verified.",
          404: "User not found.",
          401: "Incorrect password.",
        };
        const errorMessage =
          errorMessages[response.status] || `Error: ${response.statusText}`;
        toast.error(errorMessage);
        return;
      }

      const responseData = await response.json();
      const { user, token } = responseData.userdata;

      // Dispatch login action
      dispatch(login({ user }));

      // Manage cookies based on user role
      const roleCookieName = user.admin ? COOKIE_ADMIN : COOKIE_USER;
      addCookie(roleCookieName, token);

      // You can redirect the user after successful login
      toast.success("User logged in successfully!");
      router.push(AppRoutes.DASHBOARD);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error logging in user:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [forgotmail, setforgotmail] = useState<String>("");

  return (
    <div
      data-aos="fade-left"
      className={`w-full h-full flex flex-col gap-6 justify-center items-center overflow-x-hidden`}
    >
      <div className="w-full h-full max-w-[500px] flex flex-col justify-center items-center gap-7">
        <h1 className="text-[48px] font-semibold  uppercase text-black">
          Login
        </h1>

        <div className="w-full flex flex-col justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full h-12 rounded-md pl-4"
          />

          <div className="flex flex-col  gap-1"></div>
          <input
            type="passowrd"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            required
            className="w-full h-12  rounded-md pl-4"
          />
          <div
            className="w-full flex justify-end text-black cursor-pointer"
            onClick={() => router.push(AppRoutes.forgotPassword)}
          >
            <p className="">Forgot Password?</p>
          </div>
        </div>

        {!loading ? (
          <div className=" w-full relative border-b-[2px] border-b-gray-400 border-opacity-50 text-center">
            <button
              className="px-8  py-3 rounded-lg mb-[3rem] text-[16px] lg:text-xl w-full bg-green-700 transition-all duration-200 hover:bg-blue-950 text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              Login
            </button>
          </div>
        ) : (
          <ButtonSpinner />
        )}
        <p className="text-center flex gap-2 text-lg text-black ">
          <span className="opacity-50">New user? </span>{" "}
          <span
            className="text-black hover:underline cursor-pointer"
            onClick={handleToggle}
          >
            Signup now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
