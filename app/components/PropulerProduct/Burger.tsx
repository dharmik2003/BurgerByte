'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMinus, FaPencil, FaPlus, FaStar } from 'react-icons/fa6';
import { BiShoppingBag } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Cookienamether, fetchCookie } from '@/app/utils/cookies';
import { MdDelete } from 'react-icons/md';

export interface Producttype {
  orderid: String
  id: string;
  title: string;
  image: string;
  review: number;
  price: number;
  rating: number;
}

export interface Addtocarttype {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  orderId: String;
}

const Burger = ({ orderid, id, title, image, review, price, rating }: Producttype) => {
  const dispatch = useDispatch();
  const admintoken = Cookienamether('adminDetails');
  console.log("admintoken", admintoken)

  const { username, isLoading, admin } = useSelector((state: any) => state.auth);


  const [apiorderdata, setapiorderdata] = useState([]);
  const userId = "662a39a86867eee08946a7b7";
  const orderiddatabase = "k1NEHAZYbVwLd0NnWmUjO";

  async function fetchCartItems() {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const cartItems = await response.json();
      console.log(cartItems)
      setapiorderdata(cartItems.cartItems);
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return { error: 'An error occurred while fetching cart items' };
    }
  }

  useEffect(() => {
    fetchCartItems();
  },[]);

  useEffect(() => {
    console.log("apiorderdata", apiorderdata);
  }, [apiorderdata]);



  const getuserid = async (key: any) => {
    try {
      const response = await fetch('/api/jwtverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: key,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData", responseData)
        const userId = responseData.userId;

        console.log("---------------//", userId);
        return userId
      }
      else{
        alert("user id not existing please login")
      }

    } catch (error) {

    }
  }

  const { orderID } = useSelector((state: any) => state.orderID)
  console.log("orderID//////////////////////", orderID)
  
  const handleAddToCart = async () => {
    try {

      const userID = fetchCookie("userDetails")
      console.log("userId", userID)
      const orderuserID =await getuserid(userID)
      console.log("orderuserID", orderuserID)
    
      console.log("hello ji", orderuserID, id, image, title, price, orderid);

        const burgerItem: Addtocarttype = {
          id: id,
          image: image,
          name: title,
          price: price,
          quantity: 1,
          orderId: orderID,
        };
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: orderuserID,
              productId: id,
              image: image,
              name: title,
              price: price,
              quantity: 1,
              orderId: orderID,
            }),
          });

          console.log("response", response);

          if (!response.ok) {
            if(response.status==400){
              alert("orderId must be Need!")
            }
            else{

              throw new Error('Failed to add item to cart');

            }
          }
          toast.success('Item added to cart successfully!');
          // dispatch(addOrder(burgerItem));
          const data = await response.json();
        } catch (error) {
          console.error('Error adding item to cart:', error);
          toast.error('Failed to add item to cart');
        }
      }

    catch (error) {

    }
  }
  const handleIncreaseQuantity = async (id: string) => {
    const userID = fetchCookie("userDetails");
    console.log("userId", userID);
    const orderuserID = await getuserid(userID);
    console.log("orderuserID", orderuserID);

    let newquantity: number | undefined; // Declare newquantity outside the try-catch block

    try {
      const updatedOrders = apiorderdata.find((order: any) =>
        order.productId == id && order.userId == orderuserID && order.orderId == orderID
      ) as any;

      if (updatedOrders) {
        console.log("updatedOrders", updatedOrders);

        newquantity = updatedOrders.quantity + 1;
        console.log("newquantity", newquantity);
      } else {
        console.log("No matching order found for the given criteria.");
      }

      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: orderuserID,
          productId: id,
          orderId: orderID,
          quantity: newquantity, // Use newquantity here
        })
      });

      if (response.ok) {
        toast.success('Update Quantity');
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // dispatch(updateOrders(updatedOrders));
    // toast.success('Item added to cart successfully!');
  };
  const handleDecreaseQuantity = async (id: string) => {
    const userID = fetchCookie("userDetails");
    console.log("userId", userID);
    const orderuserID = await getuserid(userID);
    console.log("orderuserID", orderuserID);

    let newquantity: number | undefined;

    try {
      const updatedOrders = apiorderdata.find((order: any) =>
        order.productId == id && order.userId == orderuserID && order.orderId == orderID
      ) as any;

      if (updatedOrders) {
        console.log("updatedOrders", updatedOrders);

        newquantity = updatedOrders.quantity - 1;
        console.log("newquantity", newquantity);
        
        if (newquantity == 0) {
          // If new quantity is 0, delete the order
          const response = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: orderuserID,
              productId: id,
              orderId: orderID,
            })
          });

          if (response.ok) {
            toast.success('Order deleted successfully');
            return; // Exit function after deleting order
          } else {
            console.error("Failed to delete order");
            return; // Exit function to prevent further processing
          }
        }

      } else {
        console.log("No matching order found for the given criteria.");
      }

      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: orderuserID,
          productId: id,
          orderId: orderID,
          quantity: newquantity,
        })
      });

      if (response.ok) {
        toast.success('Update Decrease Quantity');
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // dispatch(updateOrders(updatedOrders));
    // toast.success('Item added to cart successfully!');
  };


  console.log("filter", id, userId, orderID)
  const quantitydata = apiorderdata.find((order: any) => order.productId == id && order.userId == userId && order.orderId == orderID)
  if (quantitydata){
  console.log("quantitydata", quantitydata.quantity)}



  return (
    <div className=" bg-white p-2 sm:p-6 rounded-lg m-3">
      <div className="w-[200px] mx-auto h-[200px] ">
        {/* <h1>{id}</h1>
        <h1>{orderID}</h1> */}
        <div className='w-full h-full'>
          <Image
            src={image}
            alt="image"
            width={150}
            height={150}
            className="w-[800%] h-[100%] object-center rounded-lg "
          />
        </div>
      </div>
      {/* <h1 className="mt-[1.3rem] sm:text-[20px] text-[18px] lg:text-[22px] text-black font-semibold ">{title}</h1> */}
      <h1 className="mt-[1.3rem] sm:text-[22px] text-[20px] lg:text-[22px] text-black font-semibold overflow-hidden whitespace-nowrap">{title}</h1>

      <div className="flex items-center mt-[0.5rem] space-x-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < rating ? "w-[1rem] h-[1rem] text-yellow-600" : "w-[1rem] h-[1rem] text-[#CCCCCC]"} />
          ))}
        </div>
        <div className="text-black opacity-80">({review})</div>
      </div>
      <p className="mt-[0.5rem] text-black text-opacity-70">{orderid}</p>
      <div className="flex justify-between items-center mt-[1.4rem]">
        <h1 className="text-[25px] font-bold text-red-600">₹{price}</h1>
        <div className='flex'>
         
          {
            !admintoken ?(
              <div className='flex'>
                {
                  apiorderdata.find((order: any) =>
                    order.productId === id &&
                    order.userId === userId &&
                    order.orderId === orderID
                  )?.quantity > 0 ? (
                    <>
                      <button onClick={() => handleDecreaseQuantity(id)} className='px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white'>
                        <FaMinus />
                      </button>
                      <h1 className='text-md px-3 py-1'>{apiorderdata.find((order: any) => order.productId == id && order.userId == userId && order.orderId == orderID)?.quantity || 0}</h1>
                      <button onClick={() => handleIncreaseQuantity(id)} className='px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white'>
                        <FaPlus />
                      </button>
                    </>
                  ) : (
                    <button onClick={handleAddToCart} className="px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white">
                      <BiShoppingBag className="w-[1.3rem] h-[1.3rem]" />
                    </button>
                  )
                }
              </div>
            ):(
              <div className='flex gap-2'>
                  {/* <button onClick={openPopup} className="px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white">
                    <FaPencil className="w-[1.3rem] h-[1.3rem]" />
                  </button>
                  <button onClick={handledeleteitems} className="px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white">
                    <MdDelete  className="w-[1.3rem] h-[1.3rem]" />
                  </button> */}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Burger;