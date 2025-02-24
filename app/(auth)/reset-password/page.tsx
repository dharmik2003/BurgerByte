import Resetpassword from "@/app/components/Auth/Resetpassword";
import Spinner from "@/app/components/Spinner/Spinner";
import React, { Suspense } from "react";

const Page = () => {
  const otp = 111111;
  const email = "dk33@gmail.com";

  return (
    <Suspense
      fallback={
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <Resetpassword otp={otp} email={email} />
    </Suspense>
  );
};

export default Page;
