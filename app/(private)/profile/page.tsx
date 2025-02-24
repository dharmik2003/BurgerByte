import Profile from "@/app/components/Profile/Profile";
import Spinner from "@/app/components/Spinner/Spinner";
import React, { Suspense } from "react";
const page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <Profile />
    </Suspense>
  );
};

export default page;
