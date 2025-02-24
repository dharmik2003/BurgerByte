"use client";
import React, { useEffect, useState } from "react";
import { GrRestaurant } from "react-icons/gr";
import Spinner from "../Spinner/Spinner";

const Contact = () => {
  return (
    <div className="w-full h-full bg-[#f4f1ea] p-6 sm:flex sm:flex-col justify-center items-center">
      <div className="w-full h-full bg-[#f4f1ea]  sm:flex sm:flex-col justify-center items-center">
        <div className="max-w-[600px] flex flex-col gap-5 w-full bg-green-700 p-4 sm:p-6 rounded-lg">
          <h1 className="w-full text-center font-bold uppercase text-[40px] lg:text-[50px] text-white">
            Contact
          </h1>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center w-full justify-between sm:space-x-3">
              <input
                type="text"
                placeholder="First Name"
                className="placeholder:text-white lg:text-xl px-2 w-full py-2 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100"
                name="people"
                id="people"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="placeholder:text-white lg:text-xl w-full px-2 sm:px-5 py-2 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100"
              />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Phone Number"
              className="px-2 sm:px-5 py-2.5 placeholder:text-white bg-transparent block w-full  rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-2 sm:px-5 py-2.5 placeholder:text-white bg-transparent block w-full  rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100"
            />
            <textarea
              placeholder="Description"
              rows={3}
              className="px-2 sm:px-5 py-2.5 placeholder:text-white bg-transparent block w-full rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100"
            />
          </div>
          <div className="w-full h-auto mx-auto text-center">
            <button className="px-8 py-3 rounded-lg mb-[rem] text-[16px] w-full bg-red-600 transition-all duration-200 hover:bg-blue-950 text-white">
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
