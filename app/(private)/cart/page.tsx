"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import AddtoCart from "@/app/components/Cart/AddtoCart";
import Spinner from "@/app/components/Spinner/Spinner";

const Cart = () => {
  const path = usePathname();
  return (
    <Suspense
      fallback={
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <AddtoCart />
    </Suspense>
  );
};

export default Cart;
