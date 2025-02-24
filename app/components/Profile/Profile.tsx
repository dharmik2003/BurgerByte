"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineControlPoint } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { haveCookiebool, removeCookie } from "@/app/utils/cookies";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import { login, logout } from "@/app/Redux/User/User";
import { AppRoutes, COOKIE_ADMIN, COOKIE_USER } from "@/constant";
import { Camera, Edit, LogOut, Mail, MapPin, User } from "lucide-react";

const Profile = () => {
  const admintoken = haveCookiebool(COOKIE_ADMIN);

  const [loading, setLoading] = useState(false);

  const userData = useSelector((state: any) => state.auth);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dispatch = useDispatch();

  // const handleImageSelect = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //     try {
  //       const response = await fetch("/api/profile", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: userData.user.email,
  //           //errror userData.userphotos
  //           image: URL.createObjectURL(file),
  //         }),
  //       });

  //       if (response.ok) {
  //         toast.success("Upload Photo Successfully");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const router = useRouter();
  const handlelogout = () => {
    if (admintoken) {
      removeCookie(COOKIE_ADMIN);
    } else {
      removeCookie(COOKIE_USER);
    }
    dispatch(logout());
    router.push(AppRoutes.DASHBOARD);
  };

  const handleResetPhotos = () => {
    document.getElementById("fileInput")?.click();
  };

  const [newname, setnewname] = useState("");
  const [newaddress, setnewAddress] = useState("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newname || userData.user.name,
          address: newaddress || userData.user.address,
          email: userData.user.email,
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        const { user } = responseData;
        dispatch(login({ user }));
        toast.success("Profile Update successfully!");
        setShowPopup(false);
        setLoading(false);
      } else if (response.status == 400) {
        toast.error("Email already exists!");
        setLoading(false);
      } else {
        console.error("Error signing up user:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      setLoading(false);
    } finally {
      setShowPopup(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[590px] bg-[#f4f1ea] p-6 pt-8">
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div>
          {userData?.user ? (
            <>
              <div className="max-w-2xl mx-auto">
                <div className="pb-0">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      {/* <div className="w-24 h-24 border-4 border-white shadow-lg">
                       <AvatarImage
                            src="/placeholder.svg"
                            alt={userData?.user?.name || "User"}
                          />
                          <AvatarFallback className="text-2xl bg-[#2563EB] text-white">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar> 
                        <button className="absolute bottom-0 right-0 p-1.5 bg-[#2563EB] text-white rounded-full shadow-lg hover:bg-[#1D4ED8] transition-colors">
                          <Camera className="w-5 h-5" />
                        </button>
                      </div> */}
                      {/* <h2 className="text-2xl font-bold text-center">
                        {userData?.user?.name}
                      </h2> */}
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex items-center space-x-4 p-4 bg-[#F9FAFB] rounded-lg">
                          <div className="p-2 bg-[#DBEAFE] rounded-lg">
                            <User className="w-6 h-6 text-[#2563EB]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#6B7280]">Name</p>
                            <p className="font-medium">
                              {userData?.user?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-[#F9FAFB] rounded-lg">
                          <div className="p-2 bg-[#DBEAFE] rounded-lg">
                            <Mail className="w-6 h-6 text-[#2563EB]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#6B7280]">Email</p>
                            <p className="font-medium">
                              {userData?.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-[#F9FAFB] rounded-lg">
                        <div className="p-2 bg-[#DBEAFE] rounded-lg">
                          <MapPin className="w-6 h-6 text-[#2563EB]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280]">Address</p>
                          <p className="font-medium">
                            {userData?.user?.address}
                          </p>
                        </div>
                      </div>
                      {/* <Separator className="my-6" /> */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={openPopup}
                          className="flex-1 gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-11 flex justify-center items-center rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                          Update Profile
                        </button>
                        <button
                          onClick={handlelogout}
                          className="flex-1 gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white h-11 flex justify-center items-center rounded-lg"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showPopup && (
                <div className="fixed p-5 top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center">
                  <div className="w-full max-w-[400px] sm:w-[400px] h-auto gap-5 border rounded-xl bg-[#FCFEFC] px-3 py-6 flex flex-col justify-center items-center">
                    <h1 className="w-full text-center  text-green-600 text-3xl font-bold">
                      Update Profile
                    </h1>

                    <div className="w-full flex flex-col gap-3">
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setnewname(e.target.value)}
                        placeholder="Enter New Name"
                        required
                        className="w-full py-1 h-[40px] border border-green-600  rounded pl-4"
                      />

                      <textarea
                        rows={6}
                        name="address"
                        onChange={(e) => setnewAddress(e.target.value)}
                        placeholder="Enter New Address"
                        required
                        className="w-full py-1  border border-green-600 rounded pl-4"
                      />
                    </div>

                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => setShowPopup(false)}
                        className="flex justify-center items-center px-3 py-2 rounded-lg h-[40px]  text-[16px] lg:text-[20px] w-full hover:bg-blue-950 transition-all duration-200 bg-red-600 text-white"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={closePopup}
                        className="flex justify-center items-center px-3 py-2 rounded-lg h-[40px] text-[16px] lg:text-[20px] w-full bg-green-600 hover:bg-blue-950 transition-all duration-200  text-white"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center gap-5">
              <div className="w-full h-full flex flex-col gap-5 max-w-[300px] justify-center items-center">
                <div className="text-2xl h-full w-full flex justify-center items-center">
                  Please Login
                </div>
                <button
                  onClick={() => {
                    router.push(AppRoutes.LOGIN);
                  }}
                  className="flex justify-center items-center px-3 py-2 rounded-lg h-[40px] text-[16px] lg:text-[20px] w-full bg-green-600 hover:bg-blue-950 transition-all duration-200  text-white"
                >
                  Login Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
