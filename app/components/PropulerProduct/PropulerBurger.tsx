"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addorderid } from "@/app/Redux/Order/OrderSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { nanoid } from "nanoid";
import Spinner from "../Spinner/Spinner";
import { setaddorderID } from "@/app/Redux/OrderID/OrderIDSlice";
import Image from "next/image";
import { fetchCookie } from "@/utils/cookies";
import { AppRoutes, COOKIE_USER } from "@/constant";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import { BiShoppingBag } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  image: string;
  review: number;
  price: number;
  rating: number;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1430 },
    items: 4,
    slidesToSlide: 1,
  },
  minidesktop: {
    breakpoint: { max: 1430, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 580 },
    items: 2,
    slidesToSlide: 1,
  },
  minitablet: {
    breakpoint: { max: 580, min: 465 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// Define the type for a CartItem
export interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  orderId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  payment: boolean;
  paymentID: string;
  orderstatus: boolean;
  rejectorder: boolean;
  dispatchorder: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PropulerProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const useDetails = useSelector((state: any) => state.auth);
  const [apiOrderData, setApiOrderData] = useState<CartItem[]>([]);
  const router = useRouter();

  const fetchToken = async () => {
    const token = fetchCookie(COOKIE_USER);
    if (!token) {
      toast.error("Please Login again");
      router.push(AppRoutes.LOGIN);
    } else {
      return token;
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products", { method: "GET" });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setProducts(data.products);
      } else {
        setLoading(false);
        console.error("Failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
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
      setApiOrderData(cartItems.cartItems);
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { error: "An error occurred while fetching cart items" };
    }
  };

  const handleAddToCart = async (id: string) => {
    const product: Product | undefined = products.find(
      (product) => product._id === id
    );

    // If the product is not found, return early
    if (!product) {
      console.error("Product not found");
      toast.error("Product not found");
      return;
    }

    const token = await fetchToken();

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          image: product.image,
          name: product.title,
          price: product.price,
          quantity: 1,
          orderId: "",
        }),
      });

      if (!response.ok) {
        if (response.status == 400) {
          // alert("orderId must be Need!")
        } else {
          throw new Error("Failed to add item to cart");
        }
      }
      if (response.ok) {
        await fetchCartItems();
        toast.success("Item added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleIncreaseQuantity = async (id: string) => {
    let newquantity: number | undefined;

    try {
      const updatedOrders = apiOrderData.find((order) => order.productId == id);

      if (updatedOrders) {
        newquantity = updatedOrders.quantity + 1;
      }

      const token = await fetchToken();

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
            toast.success("Order deleted successfully");
            return; // Exit function after deleting order
          } else {
            console.error("Failed to delete order");
            return; // Exit function to prevent further processing
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
        toast.success("Update Decrease Quantity");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // dispatch(updateOrders(updatedOrders));
    // toast.success('Item added to cart successfully!');
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="pt-[3rem] pb-[3rem] relative bg-[#f4f1ea]">
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div>
          <h1 className="heading">
            Our Popular{" "}
            <span className="text-red-600 cursor-pointer">Burgers</span>
          </h1>
          <div className="w-[80%] mt-[4rem] mx-auto">
            <Carousel
              additionalTransfrom={0}
              arrows={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              centerMode={false}
              infinite
              responsive={responsive}
              itemClass="item"
              showDots={false}
            >
              {products.map((product) => (
                <div key={product._id} className=" bg-white p-2 sm:p-6 relative rounded-lg m-3">
                  <div className="w-[200px] mx-auto h-[200px] ">
                    {/* <h1>{id}</h1>
                   <h1>{orderID}</h1>  */}
                    <div className="w-full h-full">
                      <Image
                        src={product.image}
                        alt="image"
                        width={150}
                        height={150}
                        className="w-[800%] h-[100%] object-center rounded-lg "
                      />
                    </div>
                  </div>
                  {/* <h1 className="mt-[1.3rem] sm:text-[20px] text-[18px] lg:text-[22px] text-black font-semibold ">{title}</h1> */}
                  <h1 className="mt-[1.3rem] sm:text-[22px] text-[20px] lg:text-[22px] text-black font-semibold overflow-hidden whitespace-nowrap">
                    {product.title}
                  </h1>

                  <div className="flex items-center mt-[0.5rem] space-x-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < product.rating
                              ? "w-[1rem] h-[1rem] text-yellow-600"
                              : "w-[1rem] h-[1rem] text-[#CCCCCC]"
                          }
                        />
                      ))}
                    </div>
                    <div className="text-black opacity-80">
                      ({product.review})
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-[1.4rem]">
                    <h1 className="text-[25px] font-bold text-red-600">
                      ₹{product.price}
                    </h1>
                    <div className="flex">
                      {!useDetails?.user?.admin && (
                        <div className="flex">
                          {apiOrderData.find(
                            (data) => data.productId === product._id
                          ) ? (
                            <>
                              <button
                                onClick={() => {
                                  handleDecreaseQuantity(product._id);
                                }}
                                className="px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                              >
                                <FaMinus />
                              </button>
                              <h1 className="text-md px-3 py-1">
                                {apiOrderData.find(
                                  (data) => data.productId === product._id
                                )?.quantity || 0}
                              </h1>
                              <button
                                onClick={() => {
                                  handleIncreaseQuantity(product._id);
                                }}
                                className="px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                              >
                                <FaPlus />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(product._id)}
                              className="px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                            >
                              <BiShoppingBag className="w-[1.3rem] h-[1.3rem]" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropulerProduct;
