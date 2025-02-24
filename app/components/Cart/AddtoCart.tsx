"use client";
import { addpaymentid } from "@/app/Redux/OrderID/OrderIDSlice";
import { fetchCookie } from "@/app/utils/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import Spinner from "../Spinner/Spinner";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { AppRoutes, COOKIE_USER } from "@/constant";
import { CartItem } from "../PropulerProduct/PropulerBurger";

export interface BurgerItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  orderId: string;
}

const AddtoCart = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.auth);
  const [apiOrderData, setApiOrderData] = useState<CartItem[]>([]);
  const [datadisplay, setdatadisplay] = useState<Boolean>(false);
  const [orders, setorders] = useState([]);
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loadingspinner, setloadingspinner] = useState(false);

  const fetchToken = async () => {
    const token = fetchCookie(COOKIE_USER);
    if (!token) {
      toast.error("Please Login again");
      router.push(AppRoutes.LOGIN);
    } else {
      return token;
    }
  };

  const fetchCartItems = async () => {
    try {
      setLoading(true);

      const token = await fetchToken();
      const response = await fetch("/api/cart", {
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

      if (cartItems) {
        setorders(cartItems.cartItems);
        setApiOrderData(cartItems.cartItems);
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
    fetchCartItems();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      orders.forEach((order: BurgerItem) => {
        total += order.price * order.quantity;
      });
      setTotalAmount(total.toFixed(2));
    };

    calculateTotalAmount();
  }, [orders]);

  const handlegenerateid = () => {
    let orderId = nanoid();
    return orderId;
  };

  const handleIncreaseQuantity = async (id: string) => {
    let newquantity: number | undefined;

    const token = await fetchToken();
    try {
      const updatedOrders = apiOrderData.find((order) => order.productId == id);

      if (updatedOrders) {
        newquantity = updatedOrders.quantity + 1;
      } 

      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          orderId: "",
          quantity: newquantity,
        }),
      });

      if (response.ok) {
        await fetchCartItems();
        toast.success("Update Quantity");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // dispatch(updateOrders(updatedOrders));
    // toast.success('Item added to cart successfully!');
  };
  const handleDecreaseQuantity = async (id: string) => {
    let newquantity: number | undefined;

    try {
      const updatedOrders = apiOrderData.find((order) => order.productId == id);
      const token = await fetchToken();
      if (updatedOrders) {
        newquantity = updatedOrders.quantity - 1;

        if (newquantity == 0) {
          const response = await fetch("/api/cart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: id,
              orderId: "",
            }),
          });

          if (response.ok) {
            await fetchCartItems();
            toast.success("Order Remove successfully");
            return;
          } else {
            console.error("Failed to delete order");
            return;
          }
        }
      } 

      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          orderId: "",
          quantity: newquantity,
        }),
      });

      if (response.ok) {
        await fetchCartItems();
        toast.success("Update Decrease Quantity");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePayment = async () => {
    const token = await fetchToken();
    try {
      setloadingspinner(true);
      const generateOrderId = handlegenerateid();
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: generateOrderId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(addpaymentid(data.paymentID));
        router.push(data.paymenturl);
        setloadingspinner(false);
        setShowPopup(true);
      }
    } catch (error) {
      setloadingspinner(false);
    } finally {
      setloadingspinner(false);
    }
  };

  const router = useRouter();
  const gotohomepage = () => {
    router.push(AppRoutes.DASHBOARD);
  };

  return (
    <div className="w-full h-full bg-[#f4f1ea] p-6">
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      ) : parseFloat(totalAmount) === 0 ? (
        <div className="w-full h-[540px] flex flex-col justify-center items-center ">
          <Image
            src={"https://supershopping.lk/images/home/Cart-empty.gif"}
            alt="emapty cart"
            width={600}
            height={600}
            className="rounded-xl mb-5"
          />
          <button
            onClick={gotohomepage}
            className="px-8 py-3 rounded-lg mb-[3rem] text-[16px] lg:text-[20px] w-[80%] sm:w-[50%] lg:w-[30%] bg-green-700 transition-all duration-200 mt-7 hover:bg-red-600 text-white"
          >
            Home
          </button>
        </div>
      ) : (
        <div className="w-full min-h-[610px] flex gap-2 flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-3 sm:p-6 overflow-y-auto">
            {orders.map((item: any) => (
              <div key={item.id} className="bg-white p-6 rounded-lg border">
                {/* <h1>{orderID }</h1> */}
                <div className="w-[200px] h-[200px] mx-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="mt-4 text-[22px] text-black font-semibold">
                  {item.name}
                </h1>
                <div className="flex justify-between items-center mt-4">
                  <h1 className="text-[25px] font-bold text-red-600">
                    ₹{item.price}
                  </h1>
                  <div className="flex">
                    <button
                      onClick={() => handleDecreaseQuantity(item.productId)}
                      className="px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                    >
                      <FaMinus />
                    </button>
                    <h1 className="text-md px-3 py-1">{item.quantity}</h1>
                    <button
                      onClick={() => handleIncreaseQuantity(item.productId)}
                      className="px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[28%]  h-full flex pt-6">
            <div className="w-full h-full min-h-[410px] justify-between flex flex-col  border rounded-xl px-3 sm:px-5 bg-white ">
              <h1 className="text-green-700 heading">Bill</h1>

              <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-full">
                  {orders.map((order: any) => (
                    <div
                      className="flex justify-between items-center border-b pb-2 border-b-text-red-600"
                      key={order.id}
                    >
                      <h1 className="text-red-600 text-md sm:text-[22px]">
                        {order.name}
                      </h1>
                      <div>
                        <h3 className="font-semibold text-green-700 text-md sm:text-[20px]">
                          {order.quantity} x {order.price}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center ">
                  <h1 className="text-red-600 text-lg sm:text-2xl  font-bold">
                    Total Amount :
                  </h1>
                  <h1 className="text-red-600 text-lg sm:text-2xl font-bold">
                    ₹{totalAmount}
                  </h1>
                </div>
              </div>

              <div className="mt-[2rem] w-full mx-auto text-center">
                {!loadingspinner ? (
                  <button
                    onClick={handlePayment}
                    className="px-8 py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-green-700 transition-all duration-200 hover:bg-blue-950 text-white"
                  >
                    Pay Now
                  </button>
                ) : (
                  <ButtonSpinner />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddtoCart;
