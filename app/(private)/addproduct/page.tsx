import AddProduct from "@/app/components/AddProduct/AddProduct";
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
      <AddProduct />
    </Suspense>
  );
};

export default page;
