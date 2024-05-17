'use client'
import { fetchCookie } from '@/app/utils/cookies';
import { headers } from 'next/headers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import toast from 'react-hot-toast';
import { MdOutlineDone } from 'react-icons/md';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const Myorder = () => {


    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer); 
    }, []);

    const { myorders } = useSelector((state: any) => state.myorderdata);

    const routed=useRouter()
    const handleorderid=(id:string)=>{
        routed.push(`http://localhost:3000/myorder/${id}`) 
    }


    const [myorderss, setmyorderss] = useState([]);
    const [apiorderdata, setapiorderdata] = useState<{ [key: string]: any[] }>({});

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
                toast.error("Please Login!")
            }

        } catch (error) {

        }
    }
    const [groupedOrders, setGroupedOrders] = useState<any[]>([]);
    // Function to group orders by orderId
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
                const filterdata = cartItems.cartItems.filter((cart: any) => cart.userId === orderuserID && cart.payment == true);
                setmyorderss(filterdata);
                // Group orders by orderId
                const groupedOrders = groupOrdersByOrderId(filterdata);
                setGroupedOrders(groupedOrders);
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

    console.log("orders", groupedOrders)
    return (
        <div className='w-full h-full bg-[#f4f1ea] p-6'>
            {loading ? (
                <div className='w-full h-[610px] flex justify-center items-center'> <Spinner /></div>
            ) : groupedOrders.length === 0 ? (
                    <div className='w-full h-[610px] flex justify-center items-center text-[20px] sm:text-[22px]'>No orders available.</div>
            ) : (
                <div>
                    <h1 className='heading'>Order <span className='text-red-600'>History</span></h1>

                            {[...groupedOrders].reverse().map((orders: any[], index: number) => (
                        <div key={index} className='flex sm:justify-center sm:items-center '>
                            <div className='w-[95%] h-auto lg:w-[50%] lg:gap-10 relative flex-col justify-center items-center sm:flex-row sm:h-[230px] p-2 lg:pl-10 bg-white m-2 flex lg:justify-start gap-2 sm:gap-0 rounded-lg border'>
                                <div className='w-full sm:w-[40%] lg:w-[30%]'>
                                    {/* Render images carousel here */}
                                    <Carousel additionalTransfrom={0} arrows={false} autoPlay={true} autoPlaySpeed={4000} centerMode={false} infinite responsive={responsive} itemClass="item" showDots={false}>
                                        {orders.map((order: any, orderIndex: number) => (
                                            <div key={orderIndex} className='w-full h-full flex justify-center items-center lg:justify-center'>
                                                <Image src={order.image} alt='not found' width={210} height={210} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className='w-[100%] lg:w-[40%]'>
                                    <div className='flex gap-1 sm:gap-4 pt-3 justify-evenly sm:justify-start items-center'>
                                        <div>
                                            <h1 className='text-red-600 text-[17px] sm:text-[20px]'>Payment:</h1>
                                            <h1 className='text-red-600 text-[17px] sm:text-[20px]'>Order ID:</h1>
                                            <h1 className='text-red-600 text-[17px] sm:text-[20px]'>Date</h1>
                                            <h1 className='text-red-600 text-[17px] sm:text-[20px]'>Items</h1>
                                            <h1 className='text-red-600 text-[17px] sm:text-[20px]'>Total:</h1>
                                        </div>
                                        <div>
                                            <h1 className='font-semibold text-green-700 text-[16px] sm:text-[18px]'>{orders[0].paymentID}</h1>
                                            <h1 className='font-semibold text-green-700 text-[16px] sm:text-[18px]'>{orders[0].orderId}</h1>
                                            <h1 className='font-semibold text-green-700 text-[16px] sm:text-[18px]'>{new Date(orders[0].createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })} | {new Date(orders[0].createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</h1>
                                            <h1 className='font-semibold text-green-700 text-[16px] sm:text-[18px]'>{orders.length}</h1>
                                            <h1 className='font-semibold text-green-700 text-[16px] sm:text-[18px]'> ₹{orders.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)}    (Items:{orders.length})</h1>
                                        </div>
                                    </div>
                                    <div onClick={() => handleorderid(orders[0].orderId)} className='flex justify-center items-center sm:justify-start mt-5'>
                                        <button className='px-5 py-1 rounded-lg mb-[1rem] text-[16px] w-[50%] bg-red-600 transition-all duration-200 hover:bg-blue-950 text-white'>View More</button>
                                    </div>
                                </div>
                                {
                                        !orders[0].orderstatus && (
                                        <div className='absolute top-3 left-3 transform rounded  text-sm bg-yellow-500 text-white py-0 px-2'>
                                            Pending
                                        </div>
                                    )
                                }
                                {
                                    orders[0].orderstatus && !orders[0].dispatchorder &&(
                                                    <div className='absolute top-3 left-3 transform rounded  text-sm bg-blue-500 text-white py-0 px-2'>
                                                    Accepted
                                        </div>
                                    )
                                }
                                {
                                            orders[0].rejectorder &&  (
                                                <div className='absolute top-3 left-3 transform rounded  text-sm bg-red-500 text-white py-0 px-2'>
                                                    Reject Orders
                                                </div>
                                            )
                                }
                                {
                                            orders[0].dispatchorder &&  (
                                                <div className='absolute top-3 left-3 transform rounded  text-sm bg-green-600 text-white py-0 px-2'>
                                                    Done
                                                </div>
                                            )
                                }
                            </div>

                           

                        </div>
                    ))}
                </div>
            )}
        </div>
    );


};

export default Myorder;
