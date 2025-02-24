import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDone } from "react-icons/md";
import Spinner from "../Spinner/Spinner";

export const Pendding = () => {
  const [loading, setLoading] = useState(true);

  const [groupedOrders, setGroupedOrders] = useState<any[]>([]);

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

  async function fetchOrders() {
    try {
      const response = await fetch("/api/admin-orders");
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const cartItems = await response.json();
      if (cartItems.orderData) {
        const filterdata = cartItems.orderData.filter(
          (cart: any) =>
            cart.orderstatus == false &&
            cart.payment == true &&
            cart.rejectorder == false &&
            cart.dispatchorder == false
        );
        const groupedOrders = groupOrdersByOrderId(filterdata);
        setGroupedOrders(groupedOrders);
        setLoading(false);
      }
      return cartItems;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cart items:", error);
      return { error: "An error occurred while fetching cart items" };
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const [loading1, setloading1] = useState<boolean>(false);
  const [loading2, setloading2] = useState<boolean>(false);

  const handleacceptedorder = async (
    UserID: string,
    OrderID: string,
    productIDs: any
  ) => {

    try {
      // Loop through each product ID in the order
      setloading1(true);
      for (const productId of productIDs) {
        const response = await fetch("/api/admin-orders", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: UserID,
            productId: productId.productId,
            orderId: OrderID,
            orderstatus: true,
          }),
        });

        if (!response.ok) {
          throw new Error(
            "Failed to update order status for product: " + productId
          );
        }
      }

      fetchOrders();
      toast.success("Order Accepted successfully");
      setloading1(false);
      return "Order status updated successfully";
    } catch (error) {
      setloading1(false);
      console.error("Error:", error);
      throw error;
    }
  };

  const handlerejectorders = async (
    UserID: string,
    OrderID: string,
    productIDs: any
  ) => {

    try {
      // Loop through each product ID in the order
      setloading1(true);
      for (const productId of productIDs) {
        const response = await fetch("/api/admin-orders", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: UserID,
            productId: productId.productId,
            orderId: OrderID,
            rejectorder: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to reject order status" + productId);
        }
      }

      fetchOrders();
      setloading1(false);
      toast.success("Order Rejected successfully");
      return "Order Reject successfully";
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {groupedOrders.length === 0 ? (
            <div className="w-full h-[610px] flex justify-center items-center text-[20px] sm:text-[22px]">
              No orders available.
            </div>
          ) : (
            <div>
              <h1 className="heading">
                Pending <span className="text-red-600">Orders</span>
              </h1>
              {[...groupedOrders]
                .reverse()
                .map((orders: any[], index: number) => (
                  <div
                    key={index}
                    className="flex sm:justify-center sm:items-center "
                  >
                    <div className="w-[95%] h-auto lg:w-[70%] xl:w-[60%] relative flex-col justify-center items-start sm:flex-row sm:gap-10 sm:h-auto p-4 bg-white m-2 flex lg:justify-between gap-2  rounded-lg border">
                      <div className="w-full h-full flex flex-col justify-start items-start sm:w-[40%] lg:w-[50%]">
                        {orders.map((order: any, orderIndex: number) => (
                          <div
                            key={orderIndex}
                            className="w-full h-full flex border rounded mb-2 justify-start items-center"
                          >
                            <div className="flex justify-start items-start">
                              <Image
                                src={order.image}
                                alt="not found"
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className="flex flex-col mr-2">
                              <span className=" text-[#B0B0B0] text-xl ">
                                {order.name}
                              </span>
                              <span className=" border text-[#B0B0B0] text-lg  border-[#B0B0B0] px-2 rounded-md w-[60px]">
                                Qun: {order.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                        {/* </Carousel> */}
                      </div>
                      <div className="w-[100%] lg:w-[40%]">
                        <div className="flex gap-1 sm:gap-4 pt-3 justify-evenly sm:justify-start items-center">
                          <div>
                            <h1 className="text-red-600 text-[17px] sm:text-[20px]">
                              Name
                            </h1>
                            <h1 className="text-red-600 text-[17px] sm:text-[20px]">
                              Email
                            </h1>
                            <h1 className="text-red-600 text-[17px] sm:text-[20px]">
                              Payment ID:
                            </h1>
                            <h1 className="text-red-600 text-[17px] sm:text-[20px]">
                              Order ID:
                            </h1>

                            <h1 className="text-red-600 text-[17px] sm:text-[20px]">
                              Total:
                            </h1>
                          </div>
                          <div>
                            <h1 className="font-semibold text-green-700 text-[17px] sm:text-[20px]">
                              {/* {getUserById(orders[0].userId)?.name || 'User not found'} */}
                              {orders[0].user.name}
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] sm:text-[20px]">
                              {orders[0].user.email}
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] sm:text-[20px]">
                              {orders[0].paymentID}
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] sm:text-[20px]">
                              {orders[0].orderId}
                            </h1>
                            <h1 className="font-semibold text-green-700 text-[17px] sm:text-[20px]">
                              {" "}
                              ₹
                              {orders.reduce(
                                (acc: number, item: any) =>
                                  acc + item.price * item.quantity,
                                0
                              )}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-center gap-5 items-center sm:justify-start mt-5">
                          <button
                            disabled={loading1}
                            onClick={() => {
                              handleacceptedorder(
                                orders[0].userId,
                                orders[0].orderId,
                                orders
                              );
                            }}
                            className="px-5 py-1 rounded-lg mb-[1rem] text-[16px] w-[50%] bg-green-600 transition-all duration-200 hover:bg-blue-950 text-white"
                          >
                            Accepted Order
                          </button>
                          <button
                            onClick={() => {
                              handlerejectorders(
                                orders[0].userId,
                                orders[0].orderId,
                                orders
                              );
                            }}
                            className="px-5 py-1 rounded-lg mb-[1rem] text-[16px] w-[50%] bg-red-600 transition-all duration-200 hover:bg-blue-950 text-white"
                          >
                            Reject Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
