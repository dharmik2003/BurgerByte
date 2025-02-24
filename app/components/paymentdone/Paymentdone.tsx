"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { resetOrders } from "@/app/Redux/Order/OrderSlice";
import { setresetpaymentid } from "@/app/Redux/OrderID/OrderIDSlice";
import { CheckCircle, XCircle } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import { AppRoutes, COOKIE_USER } from "@/constant";
import { fetchCookie } from "@/app/utils/cookies";
import toast from "react-hot-toast";

const PaymentConfirmation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathName = useSearchParams();
  const payment_ID = pathName.get("razorpay_payment_id");

  const fetchToken = async () => {
    const token = fetchCookie(COOKIE_USER);
    if (!token) {
      toast.error("Please Login again");
      router.push(AppRoutes.LOGIN);
    } else {
      return token;
    }
  };


  const handleVerifyPayment = async (id: string) => {
    const token = await fetchToken();
    try {
      setIsLoading(true);
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_payment_id: id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Payment was successful!");
        dispatch(resetOrders());
        dispatch(setresetpaymentid());
        router.push("/paymentdone");
      } else {
        setIsSuccess(false);
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSuccess(false);
      toast.error("An error occurred while verifying the payment.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (payment_ID) {
      handleVerifyPayment(payment_ID);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[610px] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-[500px] md:h-[710px] flex items-center justify-center">
      <div className="max-w-[400px] w-full p-5 bg-white rounded-lg shadow-md text-center">
        {isSuccess ? (
          <CheckCircle className="mx-auto mb-4 text-green-500 w-16 h-16" />
        ) : (
          <XCircle className="mx-auto mb-4 text-red-500 w-16 h-16" />
        )}
        <h2
          className={`text-2xl font-bold mb-4 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Payment Successful" : "Payment Failed"}
        </h2>

        {isSuccess && <p className="text-gray-600 mb-6">Thank you for Order</p>}
        {isSuccess ? (
          <button
            onClick={() => router.push(AppRoutes.MY_ORDER)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-blue-950 transition duration-300"
          >
            Go to My Orders
          </button>
        ) : (
          <button
            onClick={() => router.push(AppRoutes.HOME)}
            className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
