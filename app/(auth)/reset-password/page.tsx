import Resetpassword from "@/app/components/Auth/Resetpassword";
import React from "react";

const Page = () => {
  const otp = 111111;
  const email = "dk33@gmail.com";

  return <Resetpassword otp={otp} email={email} />;
};

export default Page;
