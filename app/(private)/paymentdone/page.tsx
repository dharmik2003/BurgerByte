import Paymentdone from "@/app/components/paymentdone/Paymentdone";
import Spinner from "@/app/components/Spinner/Spinner";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <div className="w-full h-full overflow-hidden bg-[#f4f1ea] p-6">
        <Paymentdone />
      </div>
    </Suspense>
  );
};

export default Page;
