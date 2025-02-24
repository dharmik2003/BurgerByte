"use client";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { FaBurger } from "react-icons/fa6";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AppRoutes } from "@/constant";

interface ResetPasswordProps {
  otp: number | null;
  email: string | null;
}

const Resetpassword: React.FC<ResetPasswordProps> = ({ otp, email }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (otp && email) {
      handlecheckdetails();
    } else {
      toast.error("Invalid OTP");
    }
  }, [otp, email]);

  const handlecheckdetails = async () => {
    try {
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          forgototp: otp,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
      } else if (response.status == 400) {
        toast.error("Some Technical Issue, Please try again");
        router.push(AppRoutes.LOGIN);
      } else {
        console.error("Error Forgot Passoword in user:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const router = useRouter();
  const updatepassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        router.push(AppRoutes.LOGIN);
        toast.success("Password Update successfully!");
        const responseData = await response.json();
      } else if (response.status == 400) {
        toast.error("password reset problem,Please try Again ");
        router.push(AppRoutes.LOGIN);
      } else {
        console.error("Error reset Passoword:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-anchor-placement="top-center"
      className={`w-full max-w-[500px] h-full flex justify-center items-center `}
    >
      <div
        className={`w-full  flex flex-col gap-7 rounded-lg justify-center items-center`}
      >
        <h1 className="text-[48px] font-semibold  uppercase text-black">
          Reset Password
        </h1>
        <input
          type="password"
          placeholder="New Password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12  rounded-md pl-4 border"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full h-12  rounded-md pl-4 border"
        />
        <div
          onClick={updatepassword}
          className="w-full mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center"
        >
          <button className="px-8  py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-green-700 hover:bg-blue-950 transition-all duration-200 text-white">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
