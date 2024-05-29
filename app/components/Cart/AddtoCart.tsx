'use client'
import { addmyOrder, resetmyOrders } from '@/app/Redux/Myorder/Myorder';
import { addorderid,  BurgerItem, resetOrders, updateOrders } from '@/app/Redux/Order/OrderSlice';
import { addpaymentid, setaddorderID } from '@/app/Redux/OrderID/OrderIDSlice';
import { fetchCookie } from '@/app/utils/cookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const AddtoCart = () => {
    // const { orders } = useSelector((state: any) => state.orderdata);
    // const { myorders } = useSelector((state: any) => state.myorderdata);


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const { orderID } = useSelector((state: any) => state.orderID)
    const [apiorderdata, setapiorderdata] = useState([]);
    const [datadisplay, setdatadisplay] = useState<Boolean>(false);
    const [orders, setorders] = useState([]);
    // const orderiddatabase = "k1NEHAZYbVwLd0NnWmUjO";

    async function fetchCartItems() {
        try {
            const response = await fetch('/api/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const cartItems = await response.json();
            if (cartItems.cartItems){
                const userID = fetchCookie("userDetails")
                const orderuserID = await getuserid(userID)
                const filterdata = cartItems.cartItems.filter((cart:any)=>{
                    return cart.userId == orderuserID && cart.orderId == orderID
                })
                setorders(filterdata)
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

    useEffect(() => {
    }, [apiorderdata]);
    const dispatch = useDispatch();

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

    const [totalAmount, setTotalAmount] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false); // State to manage pop-up view visibility

    useEffect(() => {
        // Calculate total amount whenever orders change
        const calculateTotalAmount = () => {
            let total = 0;
            orders.forEach((order: BurgerItem) => {
                total += order.price * order.quantity;
            });
            setTotalAmount(total.toFixed(2));
        };

        calculateTotalAmount();
    }, [orders]);


    const handleIncreaseQuantity = async (id: string) => {
        const userID = fetchCookie("userDetails");
        const orderuserID = await getuserid(userID);

        let newquantity: number | undefined; 

        try {
            
            const updatedOrders:any = apiorderdata.find((order: any) =>
                order.productId == id && order.userId == orderuserID && order.orderId == orderID
            );

            if (updatedOrders) {
                newquantity = updatedOrders.quantity + 1;
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
                    orderId:orderID,
                    quantity: newquantity, 
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
        const orderuserID = await getuserid(userID);
        console.log("userID", orderuserID)

        let newquantity: number | undefined;

        try {
            const updatedOrders = apiorderdata.find((order: any) =>
                order.productId == id && order.userId == orderuserID && order.orderId == orderID
            ) as any;

            if (updatedOrders) {
                newquantity = updatedOrders.quantity - 1;

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

    const [loadingspinner, setloadingspinner]=useState(false)
    const openPopup =async () => {

        try{
            setloadingspinner(true)
            const response = await fetch('/api/razorpay',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderID,
                })
            })
            if (response.ok) {
                const data = await response.json();
                dispatch(addpaymentid(data.paymentID))
                router.push(data.paymenturl);
                setloadingspinner(false)
                setShowPopup(true);
            }
        }catch(error){
            setloadingspinner(false)
        }
        
        // setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setorders([]);
        let orderId = nanoid();
        setapiorderdata([]);
        dispatch(setaddorderID(orderId))
        dispatch(addmyOrder([orders] as any))
        dispatch(resetOrders())

    };
    const router = useRouter()
    const gotohomepage = () => {
        // dispatch(resetmyOrders())
        dispatch(resetOrders())
        router.push('/')
    };


    return (
        <div className='w-full h-full bg-[#f4f1ea] p-6'>
            {                
                loading?(
                    <div className = 'w-full h-[610px] flex justify-center items-center' > <Spinner /></div>

                ): 
                parseFloat(totalAmount) === 0 ? (
                    <div className='w-full h-[540px] flex flex-col justify-center items-center '>
                        <Image src={'https://supershopping.lk/images/home/Cart-empty.gif'} alt='emapty cart' width={600} height={600} className='rounded-xl mb-5' />
                        <button onClick={gotohomepage} className='px-8 py-3 rounded-lg mb-[3rem] text-[16px] lg:text-[20px] w-[80%] sm:w-[50%] lg:w-[30%] bg-green-700 transition-all duration-200 mt-7 hover:bg-red-600 text-white'>Home</button>
                    </div>

                   
                ):(
                            <div>
                        <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {orders.map((item: any) => (
                                
                                <div key={item.id} className='bg-white p-6 rounded-lg border'>
                                    {/* <h1>{orderID }</h1> */}
                                    <div className='w-[200px] h-[200px] mx-auto'>
                                        <Image src={item.image} alt={item.name} width={200} height={200} className='w-full h-full object-cover' />
                                    </div>
                                    <h1 className='mt-4 text-[22px] text-black font-semibold'>{item.name}</h1>
                                    <div className='flex justify-between items-center mt-4'>
                                        <h1 className='text-[25px] font-bold text-red-600'>₹{item.price}</h1>
                                        <div className='flex'>
                                            <button onClick={() => handleDecreaseQuantity(item.productId)} className='px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white'>
                                                <FaMinus />
                                            </button>
                                            <h1 className='text-md px-3 py-1'>{item.quantity}</h1>
                                            <button onClick={() => handleIncreaseQuantity(item.productId)} className='px-3 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white'>
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
        </div>
                        {
    }
    <div className='flex justify-center items-center py-2 px-3'>
        <div className='w-full h-auto w-80% sm:w-[70%] lg:w-[45%] border rounded-xl bg-white  px-3'>
            <h1 className='text-green-700 heading'>Bill</h1>

            <div className='w-full h-full mb-2 px-5 lg:px-6 '>
                {
                    orders.map((order: any) => (
                        <div className='flex justify-between items-center border-b pb-2 border-b-text-red-600' key={order.id}>
                            <h1 className='text-red-600 text-md sm:text-[22px]'>{order.name}</h1>
                            <div>
                                <h3 className='font-semibold text-green-700 text-md sm:text-[20px]'>{order.quantity}  x  {order.price}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between items-center px-3'>
                <h1 className='text-red-600 text-lg sm:text-2xl px-2 font-bold'>Total Amount :</h1>
                <h1 className='text-red-600 text-lg sm:text-2xl px-3 font-bold'>₹{totalAmount}</h1>
            </div>
            <div className='mt-[2rem] w-[80%] mx-auto text-center'>
                {
                    !loadingspinner?(
                        <button onClick={openPopup} className='px-8 py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-green-700 transition-all duration-200 hover:bg-blue-950 text-white'>Pay Now</button>

                     ) : (

                            <ButtonSpinner />
                        ) 

                }
            </div>
        </div>
    </div>

                    </div >
                )
            }
        </div>
    );
};

export default AddtoCart;
