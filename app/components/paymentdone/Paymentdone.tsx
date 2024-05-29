
'use client'
// paymentdone/Paymentdone.jsx



// import { nanoid } from '@reduxjs/toolkit';
// import Image from 'next/image'
// import React from 'react'
// import { useRouter } from 'next/navigation'
// import { useDispatch } from 'react-redux';
// import { resetOrders } from '@/app/Redux/Order/OrderSlice';
// import { setaddorderID } from '@/app/Redux/OrderID/OrderIDSlice';

// const Paymentdone = () => {
//     const dispatch = useDispatch();
//     const router = useRouter()

//     const closePopup = () => {
//         let orderId = nanoid();
//         dispatch(setaddorderID(orderId))
//         dispatch(resetOrders())

//         router.push('/')
//     };

//     return (
//         <>
//             <canvas
//                 data-generated="false"
//                 style={{
//                     pointerEvents: "none",
//                     height: "100% !important",
//                     zIndex: "1 !important",
//                     left: "0px !important",
//                     position: "fixed !important",
//                     top: "0px !important",
//                     width: "100% !important"
//                 }}
//                 aria-hidden="true"
//                 width="657"
//                 height="813"
//             ></canvas>
//             <div className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden'>
//                 <div className='w-[80%] h-auto sm:w-[50%] lg:w-[40%] border rounded-xl bg-[#FCFEFC] px-3 py-6 flex flex-col justify-center items-center'>
//                     <h1 className='text-[#75B13D] text-2xl sm:text-2xl lg:text-3xl font-bold'>Thank You For Order</h1>
//                     <Image src="https://c.tenor.com/BntXpMlrGuEAAAAC/check-correct.gif" alt={'gif'} width={200} height={200} />
//                     <button onClick={closePopup} className='px-3 py-2 rounded-lg sm:w-[80%] lg:w-[70%] mt-4 text-[16px] lg:text-[20px] w-[90%] bg-[#75B13D] transition-all duration-200 hover:bg-red-600 text-white'>Go To Home Page</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Paymentdone;



// paymentdone/Paymentdone.jsx

import { nanoid } from '@reduxjs/toolkit';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetOrders } from '@/app/Redux/Order/OrderSlice';
import { setaddorderID, setresetpaymentid } from '@/app/Redux/OrderID/OrderIDSlice';
import { useRouter } from 'next/navigation';
import { fetchCookie } from '@/app/utils/cookies';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import toast from 'react-hot-toast';

const Paymentdone = () => {
    const { orderID, paymentID } = useSelector((state: any) => state.orderID)

    const dispatch = useDispatch();
    const router = useRouter();

    console.log("paymentID",paymentID)


    const [apiorderdata, setapiorderdata] = useState([]);
    const [Productid, setProductid] = useState<any>([]);

    async function fetchCartItems() {
        try {
            const response = await fetch('/api/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const cartItems = await response.json();
            if (cartItems.cartItems) {
                const userID = fetchCookie("userDetails")
                const orderuserID = await getuserid(userID)
                const filterdata = cartItems.cartItems.filter((cart: any) => {
                    return cart.userId == orderuserID && cart.orderId == orderID
                })
                setProductid(filterdata)
            }
            setapiorderdata(cartItems.cartItems);
            return cartItems;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return { error: 'An error occurred while fetching cart items' };
        }
    }

    useEffect(() => {
        fetchCartItems();
    });


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
                const userId = responseData.userId;
                return userId
            }
            else {
                toast.error("Login Now")
            }

        } catch (error) {

        }
    }

    const [loading, setLoading] = useState(false);
    const closePopup = async () => {
        try {
            setLoading(true)
            const userID = fetchCookie("userDetails");
            const orderuserID = await getuserid(userID);

            const promises = Productid.map(async (product:any) => {
                try {
                    const response = await fetch('/api/cart', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: orderuserID,
                            productId: product.productId,
                            orderId: orderID,
                            payment: true,
                            paymentID: paymentID
                        }),
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        const userId = responseData.userId;
                        return userId;
                    } else {
                        throw new Error("User id not payment true, please login");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    throw error; 
                }
            });

            // Wait for all promises to resolve
            const userIds = await Promise.all(promises);
            console.log("userIds", userIds)

            // Proceed with other operations after all products are processed
            let orderId = nanoid();
            dispatch(setaddorderID(orderId));
            dispatch(resetOrders());
            dispatch(setresetpaymentid());
            
            router.push('/');
            setLoading(false)
        } catch (error) {
            console.error("Error:", error);
            setLoading(false)
        }
    };



    return (
        <>
            {/* <canvas
                data-generated="false"
                style={{
                    position: "fixed",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                aria-hidden="true"
                width="657"
                height="813"
            ></canvas> */}
            <canvas data-generated="false" className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" width="657" height="813"></canvas>

            <div className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden'>
                <div className='w-[80%] h-auto sm:w-[50%] lg:w-[40%] border rounded-xl bg-[#FCFEFC] px-3 py-6 flex flex-col justify-center items-center'>
                    <h1 className='text-[#75B13D] text-2xl sm:text-2xl lg:text-3xl font-bold'>Thank You For Order</h1>
                    <Image src="https://c.tenor.com/BntXpMlrGuEAAAAC/check-correct.gif" alt={'gif'} width={200} height={200} />
                    {!loading ?
                        (<div className='mt-[2rem] w-[80%] mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center'>
                            <button className='px-8  py-3 rounded-lg mb-[3rem] text-[16px] lg:text-xl w-full bg-[#75B13D] transition-all duration-200  text-white' onClick={closePopup}>Go Home</button>
                        </div>
                        ) : (

                            <ButtonSpinner />
                        )}                </div>
            </div>
        </>
    );
};

export default Paymentdone;
