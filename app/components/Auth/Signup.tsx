"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBurger } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { MouseEventHandler } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { AppRoutes } from "@/constant";

const formatTime = (seconds: any) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const Signup = () => {
  const { username, useremail, userpassword } = useSelector(
    (state: any) => state.auth
  ); // Selecting state properties

  const [loading1, setLoading1] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleToggle = () => {
    router.push("/login");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [loadingspinner, setloadingspinner] = useState<boolean>(false);
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    try {
      setloadingspinner(true);

      for (const key in formData) {
        const value: any = formData[key as keyof typeof formData];
        if (value === "" || value === 0) {
          toast.error(`All fields ${key} are required!`);
          return;
        }
      }
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isVerified: true,
          admin: false,
          address: formData.address,
        }),
      });
      if (response.ok) {
        toast.success("User signed up successfully!");
        setloadingspinner(false);
        router.push(AppRoutes.LOGIN);
      } else if (response.status == 400) {
        toast.error("Email already exists!");
        setloadingspinner(false);
      } else {
        console.error("Error signing up user:", response.statusText);
        setloadingspinner(false);
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      setloadingspinner(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        data-aos="fade-right"
        className={`w-full h-full max-w-[500px] flex flex-col gap-7 justify-center items-center}`}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[48px] font-semibold  uppercase text-black">
            Signup
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="w-full h-12 rounded-md pl-4"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full h-12 rounded-md pl-4"
          />
          <input
            type="passowrd"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="w-full h-12 rounded-md pl-4"
          />
          <textarea
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Your Address"
            required
            className="w-full rounded-md pl-4 pt-1"
          />
        </div>

        {!loadingspinner ? (
          <div className="w-full border-b-[2px] border-b-gray-400 border-opacity-50 text-center">
            <button
              className="px-8 py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-green-700 hover:bg-blue-950 transition-all duration-200  text-white"
              onClick={handleSubmit}
              disabled={loadingspinner}
            >
              Signup
            </button>
          </div>
        ) : (
          <ButtonSpinner />
        )}

        <p className="w-full text-center flex justify-center gap-2 text-lg text-black ">
          <span className="opacity-50">Already user? </span>
          <span
            className="text-black hover:underline cursor-pointer"
            onClick={handleToggle}
          >
            Login now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
