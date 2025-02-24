"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBurger } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const ForgotPassword = () => {
  const [forgotmail, setforgotmail] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const gotoforgotlogin = () => {};
  const forgotmainsend = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotmail,
        }),
      });
      if (response.ok) {
        toast.success("Please Check Email");
        setLoading(false);
      } else if (response.status == 400) {
        toast.error("This email not existing");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error Forgotpassword:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-[500px] w-full relative gap-7  flex flex-col  rounded-lg justify-center items-center`}
    >
      {/* <div
        className="absolute top-3 left-2 text-white text-3xl cursor-pointer"
        onClick={gotoforgotlogin}
      >
        <IoIosArrowRoundBack />
      </div> */}
      <h1 className="text-[48px] font-semibold  uppercase text-black">
        Forgot Password
      </h1>

      <input
        type="email"
        onChange={(e) => setforgotmail(e.target.value)}
        placeholder="Email"
        name="email"
        className="w-full h-12 rounded-md pl-4 border"
      />

      {!loading ? (
        <div className="w-full border-b-[2px] border-b-gray-300 border-opacity-50 text-center cursor-pointer">
          <button
            className="px-8  py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-green-700 hover:bg-blue-950 transition-all duration-200 text-white"
            onClick={forgotmainsend}
          >
            Send Mail
          </button>
        </div>
      ) : (
        <ButtonSpinner />
      )}

      <p className="text-center flex gap-2 text-lg text-black ">
        <span
          className="opacity-50 text-black hover:underline cursor-pointer"
          onClick={gotoforgotlogin}
        >
          Login now
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
