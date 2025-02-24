import Image from "next/image";
import React, { ReactNode } from "react";
import { FaBurger } from "react-icons/fa6";
import burger2 from "@/public/images/b2.png";

interface LayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left side: Welcome message and website details */}
      <div className="w-full h-full hidden md:w-1/2 bg-green-700 p-8 justify-center items-center text-center md:flex">
        <div className="max-w-[600px] flex flex-col gap-2 items-center justify-center h-gull w-full">
          <div className="flex gap-2 items-center justify-center">
            <FaBurger className="h-20 w-20 text-orange-500" />
            <h1 className="text-5xl font-bold text-white">
              Welcome to BurgerByte
            </h1>
            <div className="flex justify-center items-center space-x-2"></div>
          </div>
          <div className="text-md text-white">
            <p>
              Welcome to BurgerByte, where every bite is a burst of flavor!
              We&apos;re thrilled to have you here. Whether you&apos;re a burger
              enthusiast or just craving something tasty, we&apos;ve got you
              covered!
            </p>
          </div>
          <Image src={burger2} alt="bur1" className="hidden md:block" />
        </div>
      </div>

      {/* Right side: Authentication forms */}
      <div className="w-full h-full md:w-1/2 bg-[#f4f1ea] p-8 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
