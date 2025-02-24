"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const About = () => {
  return (
    <div className="w-full h-full bg-[#f4f1ea] p-6">
      <div className="max-w-[1080px] mx-auto flex flex-col ">
        <div className="w-full h-[70px] sm:h-[100px] bg-[#502314]  rounded-lg sm:rounded-xl flex mb-3 justify-center items-center">
          <h1 className="heading text-white ">About</h1>
        </div>
        <div className="flex w-full flex-col justify-center items-center lg:mt-10">
          <div className="w-full flex flex-col">
            <h1 className="text-[#502314] text-[20px] lg:text-3xl font-bold">
              Great Food Comes First
            </h1>
            <p className="text-[#502314] text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              architecto nulla officia, et iure maiores provident, impedit
              eveniet dolorem tenetur minus corporis animi facere fugit
              quibusdam optio dolorum blanditiis? Nostrum quo, nemo mollitia
              expedita molestiae repudiandae enim et quam, ad doloribus quia.
              Vitae, fugit? Tempore consequatur exercitationem dicta ea
              voluptatum cupiditate, aperiam assumenda! Hic nemo dicta labore
              enim sapiente modi. Architecto veritatis eligendi neque incidunt
              voluptatem animi nobis modi exercitationem fugit iste odit,
              tenetur dolore laboriosam unde pariatur laudantium! Labore ducimus
              sunt maxime dignissimos necessitatibus eum qui, sapiente
              aspernatur tenetur! Debitis tenetur ut aut placeat ipsa nulla
              saepe exercitationem consequatur.
            </p>
          </div>
          <div className="w-full">
            <Image
              src={
                "https://i.pinimg.com/originals/7d/23/f8/7d23f8510a2e84372dcdaa8e4bb872bf.jpg"
              }
              alt="hotel photo"
              width={800}
              height={550}
              className="w-full lg:h-[500px] rounded-lg my-5"
            />
          </div>
          <div className="w-full relative  rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119015.60796178809!2d72.79779431857726!3d21.22241884588518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f2f81a3fb89%3A0x4838cdd0909f34d1!2sBurger%20King!5e0!3m2!1sen!2sin!4v1713881238073!5m2!1sen!2sin"
              // width="600"
              // height="450"
              className="w-full h-[400px] rounded-lg my-5"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
