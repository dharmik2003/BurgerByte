'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { BurgerItem } from '@/app/Redux/Order/OrderSlice';
import { fetchCookie } from '@/app/utils/cookies';

const OrderDetails = () => {

    const { myorders } = useSelector((state: any) => state.myorderdata);
    console.log("page myorders", myorders)


   
    const paramsObject = useParams()
    console.log("paramsObject", paramsObject)

    const params = paramsObject.id;
    console.log("params", params)

    // Assuming myorders is your data structure and params is the parameter you want to match

    const filteredData: any[] = [];

    // Outer loop for myorders
    myorders.forEach((orders: any) => {
        // Inner loop for arrays inside myorders
        orders.forEach((order: any) => {
            // Filtering data based on orderid === params
            const filteredOrder = order.filter((data: any) => data.orderId == params);

            // Concatenate the filteredOrder array into filteredData
            filteredData.push(...filteredOrder);
        });
    });

    console.log(filteredData);

    const [totalAmount, setTotalAmount] = useState<string>("");
    useEffect(() => {
        // Calculate total amount whenever orders change
        const calculateTotalAmount = () => {
            let total = 0;
            filteredData.forEach((order: BurgerItem) => {
                total += order.price * order.quantity;
            });
            setTotalAmount(total.toFixed(2));
        };

        calculateTotalAmount();
    }, [myorders]);


    //fetch data from api
    const [apiorderdata, setapiorderdata] = useState<{ [key: string]: any[] }>({});
    const [myorderss, setmyorderss] = useState([]);
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
            else {
                alert("user id not existing please login")
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
    }, []);

    useEffect(() => {
        console.log("apiorderdata", apiorderdata);
    }, [apiorderdata]);


    console.log("order details", myorderss)
    return (
        <div className='w-full h-auto bg-[#f4f1ea] p-6'>

            <h1 className='heading'>Order <span className='text-red-600'>Detail</span></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
            <div className='flex justify-center items-center py-2 px-3'>
                <div className='w-full h-auto w-80% sm:w-[70%] lg:w-[45%] border rounded-xl bg-white  px-3'>
                    <h1 className='text-red-600 text-center font-bold text-xl my-4 sm:text-2xl sm:my-5'>Order Id: {params}</h1>
                    <div className='w-full h-full mb-2 px-5 lg:px-6 '>
                        {
                            filteredData.map((order: any) => (
                                <div className='flex justify-between items-center border-b pb-2' key={order.id}>
                                    <h1 className='text-green-700 text-md sm:text-[22px]'>{order.name}</h1>
                                    <div>
                                        <h3 className='font-semibold text-green-700 text-md sm:text-[20px]'>{order.quantity}  x  {order.price}</h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex justify-between items-center px-3 mb-4 lg:mb-8'>
                        <h1 className='text-green-700 text-xl sm:text-2xl px-2 font-bold'>Total Amount :</h1>
                        <h1 className='text-green-700 text-xl sm:text-2xl px-3 font-bold'>₹{totalAmount}</h1>
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