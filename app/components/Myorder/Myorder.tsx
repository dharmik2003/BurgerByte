"use client";
import { fetchCookie } from "@/app/utils/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";
import { AppRoutes, COOKIE_USER } from "@/constant";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Myorder = () => {
  const [loading, setLoading] = useState(true);
  const [groupedOrders, setGroupedOrders] = useState<any[]>([]);
  const router = useRouter();

  const handleorderid = (id: string) => {
    router.push(AppRoutes.MY_ORDER_DETAILS(id));
  };

  const groupOrdersByOrderId = (orders: any[]): any[][] => {
    const grouped: { [key: string]: any[] } = {};
    orders.forEach((order: any) => {
      if (!grouped[order.orderId]) {
        grouped[order.orderId] = [];
      }
      grouped[order.orderId].push(order);
    });
    return Object.values(grouped);
  };

  const fetchToken = async () => {
    const token = fetchCookie(COOKIE_USER);
    if (!token) {
      toast.error("Please Login again");
      router.push(AppRoutes.LOGIN);
    } else {
      return token;
    }
  };

  const fetchOrders = async () => {
    try {
      const token = await fetchToken();
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const cartItems = await response.json();
      if (cartItems.cartItems) {
        const filterdata = cartItems.cartItems.filter(
          (cart: any) => cart.payment == true
        );
        // Group orders by orderId
        const groupedOrders = groupOrdersByOrderId(filterdata);
        setGroupedOrders(groupedOrders);
        setLoading(false);
      }
      return cartItems;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cart items:", error);
      return { error: "An error occurred while fetching cart items" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full h-full bg-[#f4f1ea] p-6">
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          {" "}
          <Spinner />
        </div>
      ) : groupedOrders.length === 0 ? (
        <div className="w-full h-[610px] flex justify-center items-center text-[20px] sm:text-[22px]">
          No orders available.
        </div>
      ) : (
        <div className="min-h-[610px]">
          <h1 className="heading">
            Order <span className="text-red-600">History</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
            {[...groupedOrders]
              .reverse()
              .map((orders: any[], index: number) => (
                <div
                  key={index}
                  className="flex sm:justify-center sm:items-center "
                >
                  <div className="w-full h-auto lg:gap-5 relative flex-col justify-center items-center sm:flex-row sm:h-[230px] p-2 sm:p-4 lg:pl-10 bg-white flex lg:justify-start gap-2 sm:gap-0 rounded-lg border">
                    <div className="w-full sm:w-[40%] lg:w-[30%]">
                      <Carousel
                        additionalTransfrom={0}
                        arrows={false}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        centerMode={false}
                        infinite
                        responsive={responsive}
                        itemClass="item"
                        showDots={false}
                      >
                        {orders.map((order: any, orderIndex: number) => (
                          <div
                            key={orderIndex}
                            className="w-full h-full flex justify-center items-center lg:justify-center"
                          >
                            <Image
                              src={order.image}
                              alt="not found"
                              width={210}
                              height={210}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <div className="w-full lg:w-2/5 px-2">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 pt-3 justify-evenly sm:justify-start items-center">
                        <div>
                          <div className="flex gap-3 items-center">
                            <h1 className="text-red-600 text-[17px] ">
                              Payment:
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] ">
                              {orders[0].paymentID}
                            </h1>
                          </div>
                          <div className="flex gap-3 items-center">
                            <h1 className="text-red-600 text-[17px] ">
                              Order ID:
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] ">
                              {orders[0].orderId}
                            </h1>
                          </div>
                          <div className="flex gap-3 items-center">
                            <h1 className="text-red-600 text-[17px] ">Date:</h1>
                            <h1 className="font-semibold text-green-700 text-[17px] ">
                              {new Date(orders[0].createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}{" "}
                              |{" "}
                              {new Date(orders[0].createdAt).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </h1>
                          </div>
                          <div className="flex gap-3 items-center">
                            <h1 className="text-red-600 text-[17px] ">
                              Items:
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] ">
                              {orders[0].orderId}
                            </h1>
                          </div>
                          <div className="flex gap-3 items-center">
                            <h1 className="text-red-600 text-[17px] ">
                              Total:
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] ">
                              ₹
                              {orders.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                              )}{" "}
                              (Items: {orders.length})
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => handleorderid(orders[0].orderId)}
                        className="flex justify-center sm:justify-start items-center mt-5"
                      >
                        <button className="w-full px-5 py-2 rounded-lg mb-4 text-base bg-red-600 hover:bg-blue-950 transition-all duration-200 text-white">
                          View More
                        </button>
                      </div>
                    </div>

                    {!orders[0].orderstatus && (
                      <div className="absolute top-3 left-3 transform rounded  text-sm bg-yellow-500 text-white py-0 px-2">
                        Pending
                      </div>
                    )}
                    {orders[0].orderstatus && !orders[0].dispatchorder && (
                      <div className="absolute top-3 left-3 transform rounded  text-sm bg-blue-500 text-white py-0 px-2">
                        Accepted
                      </div>
                    )}
                    {orders[0].rejectorder && (
                      <div className="absolute top-3 left-3 transform rounded  text-sm bg-red-500 text-white py-0 px-2">
                        Reject Orders
                      </div>
                    )}
                    {orders[0].dispatchorder && (
                      <div className="absolute top-3 left-3 transform rounded  text-sm bg-green-600 text-white py-0 px-2">
                        Done
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Myorder;
