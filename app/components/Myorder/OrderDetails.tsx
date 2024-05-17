'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { BurgerItem } from '@/app/Redux/Order/OrderSlice';
import { fetchCookie } from '@/app/utils/cookies';
import toast from 'react-hot-toast';
import { MdOutlineDone } from 'react-icons/md';

const OrderDetails = () => {

    // const { myorders } = useSelector((state: any) => state.myorderdata);
    // console.log("page myorders", myorders)

    const [apiorderdata, setapiorderdata] = useState<{ [key: string]: any[] }>({});
    const [myorderss, setmyorderss] = useState([]);

    const path=usePathname()
    console.log("params", path)
   
    const paramsObject = useParams()

    const params = paramsObject.id;
    console.log("params", params)

    // Assuming myorders is your data structure and params is the parameter you want to match

    const filteredData: any[] = [];

    // Outer loop for myorders
    // myorderss.forEach((orders: any) => {
    //     // Inner loop for arrays inside myorders
    //     orders.forEach((order: any) => {
    //         // Filtering data based on orderid === params
    //         const filteredOrder = order.filter((data: any) => data.orderId == params);

    //         // Concatenate the filteredOrder array into filteredData
    //         filteredData.push(...filteredOrder);
    //     });
    // });
    myorderss.forEach((orders: any) => {
        // Check if orders is an array
        if (Array.isArray(orders)) {
            // Inner loop for arrays inside myorders
            orders.forEach((order: any) => {
                // Filtering data based on orderid === params
                const filteredOrder = order.filter((data: any) => data.orderId == params);

                // Concatenate the filteredOrder array into filteredData
                filteredData.push(...filteredOrder);
            });
        } else {
            console.error("Invalid data structure: orders is not an array");
        }
    });



    const [totalAmount, setTotalAmount] = useState<string>("");
    useEffect(() => {
        // Calculate total amount whenever orders change
        const calculateTotalAmount = () => {
            let total = 0;
            myorderss.forEach((order: BurgerItem) => {
                total += order.price * order.quantity;
            });
            setTotalAmount(total.toFixed(2));
        };
        calculateTotalAmount();
    }, [myorderss]);


    //fetch data from api

    interface Order {
        paymentID: string;
        // other properties...
    }

    // Assuming myorderss is an array of Order objects
    let paymentid = (myorderss[0] as Order)?.paymentID;

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

    async function fetchCartItems() {
        try {
            const response = await fetch('/api/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const cartItems = await response.json();
            if (cartItems.cartItems) {
                const userID = fetchCookie("userDetails");
                const orderuserID = await getuserid(userID);
                const filterdata = cartItems.cartItems.filter((cart: any) => cart.orderId === params);  
                setmyorderss(filterdata)
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
    },[]);

    
    console.log("myorderss", myorderss)

    return (
        <div className='w-full h-auto bg-[#f4f1ea] p-6 relative'>

            <h1 className='heading'>Order <span className='text-red-600'>Detail</span></h1>
            <div className="lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                {myorderss.map((item: any) => (
                    <div key={item.id} className='bg-white p-3 sm:p-6 rounded-lg border'>
                        <div className='w-[200px] h-[200px] mx-auto'>
                            <Image src={item.image} alt={item.name} width={200} height={200} className='w-full h-full object-cover' />
                        </div>
                        <h1 className='mt-4 text-[22px] text-black font-semibold'>{item.name}</h1>
                        <div className='flex justify-between items-center mt-4'>
                            <h1 className='text-[25px] font-bold text-red-600'>₹{item.price}</h1>
                            <div className='flex border rounded-xl'>
                                <h1 className='text-lg font-semibold px-3 py-1'>Qty: {item.quantity}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='lg:w-[30%] lg:absolute  right-0 top-28 '>
                <div className='w-full flex justify-center'>
                    <div className='w-full h-auto w-80% sm:w-[70%] lg:w-[90%] lg:py-8 border rounded-xl bg-white  p-5'>

                        {/* <h1 className='text-green-700 text-1xl text-center py-2 sm:text-3xl px-3 font-bold'>Payment Done</h1> */}

                        {myorderss.length > 0 && (
                            <>
                                {!myorderss[0].orderstatus && !myorderss[0].rejectorder && (
                                    <div className='text-1xl text-center py-2 sm:text-3xl px-3 font-bold text-yellow-500 '>
                                        Pending Order
                                    </div>
                                )}
                                {
                                    myorderss[0].orderstatus && !myorderss[0].dispatchorder && (
                                        <div className='absolute top-3 left-3 transform rounded  text-sm bg-blue-500 text-white py-0 px-2'>
                                            Accepted 
                                           
                                        </div>
                                    )
                                }
                                {myorderss[0].rejectorder && (
                                    <div className='text-1xl text-center py-2 sm:text-3xl px-3 font-bold text-red-500'>
                                        Reject Orders
                                    </div>
                                )}
                                {myorderss[0].dispatchorder && (
                                    <div className='flex justify-center items-center'>
                                        <div className='text-1xl text-center py-2 sm:text-3xl px-3 pr-2 font-bold text-green-500'>
                                            Done

                                        </div>
                                        <div className='text-white bg-green-500  mt-[2px] w-[20px] flex justify-center items-center h-[20px] rounded-full'>
                                            <MdOutlineDone className='text-white text-[14px]' />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div>
                            {myorderss.length > 0 && (
                                <>
                                    {myorderss[0].createdAt && (
                                        <div className='text-1xl text-center py-2 sm:text-2xl px-3 font-bold text-[#B0B0B0]'>
                                            {new Date(myorderss[0].createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })} | {new Date(myorderss[0].createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    )}
                                </>
                            )}

                        </div>


                        <div className='flex flex-col justify-between items-center  mb-3'>
                            <h1 className='text-gray-300  text-left font-bold text-sm  sm:text-lg'>Order Id: {params}</h1>
                            <h1 className='text-gray-300 text-let font-bold text-sm  sm:text-lg'>Payment Id: {paymentid}</h1>
                        </div>

                        <div className='w-full h-auto mb-2 px-5 lg:px-6 '>
                            {
                                myorderss.map((order: any) => (
                                    <div className='flex justify-between items-center border-b pb-2' key={order.id}>
                                        <h1 className='text-green-700 text-md sm:text-[22px]'>{order.name}</h1>
                                        <div>
                                            <h3 className='font-semibold text-green-700 text-md sm:text-[20px]'>{order.quantity}  x  {order.price}</h3>
                                        </div>
                                    </div>
                                ))
                            }
                            {/* {
                            filteredData.map((order: any) => (
                                <div className='flex justify-between items-center border-b pb-2' key={order.id}>
                                    <h1 className='text-green-700 text-md sm:text-[22px]'>{order.name}</h1>
                                    <div>
                                        <h3 className='font-semibold text-green-700 text-md sm:text-[20px]'>{order.quantity}  x  {order.price}</h3>
                                    </div>
                                </div>
                            ))
                        } */}
                        </div>
                        <div className='flex justify-between items-center px-3 mb-1 lg:mb-2'>
                            <h1 className='text-green-700 text-xl sm:text-2xl px-2 font-bold'>Total Amount :</h1>
                            <h1 className='text-green-700 text-xl sm:text-2xl px-3 font-bold'>₹{totalAmount}</h1>
                        </div>



                    </div>
                </div>
            </div>

        </div>
  )
}

export default OrderDetails


    // <div>
    // <div className='w-full h-[590px] bg-[#f4f1ea] p-6'>
    //     {
    //         myorders.length == 0 ? (<div></div>) : (
    //             <div>
    //                 {myorders.map((orders: any, index: number) => (
    //                     <div key={index}>
    //                         {orders.map((order: any, orderIndex: number) => (
    //                             <div key={orderIndex}>
    //                                 {order.map((data: any, dataIndex: number) => (
    //                                     <div key={dataIndex}>
    //                                         <h1>Order ID: {data.orderid}</h1>
    //                                         <p>Name: {data.name}</p>
    //                                         <p>Image: {data.image}</p>
    //                                         <p>Price: {data.price}</p>
    //                                         <p>Quantity: {data.quantity}</p>
    //                                     </div>
    //                                 ))}
    //                             </div>
    //                         ))}
    //                     </div>
    //                 ))}
    //             </div>
    //         )
    //     }
    // </div>
    // </div>