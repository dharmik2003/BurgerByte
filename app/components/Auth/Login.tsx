'use client'
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { FaBurger } from 'react-icons/fa6';
import { setName, setEmail, setPassword, setIsLogin, setadmin } from '@/app/Redux/User/User';
import { useDispatch } from 'react-redux';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { addCookie } from '@/app/utils/cookies';
import { setaddorderID } from '@/app/Redux/OrderID/OrderIDSlice';
import { nanoid } from 'nanoid';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import Spinner from '../Spinner/Spinner';

const Login = () => {

    const dispatch = useDispatch()

    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading1(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const router = useRouter()
    const handleToggle = () => {
        router.push("/signup"); 
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    console.log("formData", formData)

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);


const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true)
    event.preventDefault();
        
        console.log('Email:', formData.email);
        console.log('Password:', formData.password);
        let orderId = nanoid();


        // setFormData({
        //     email: '',
        //     password: ''
        // })
    try {
            console.log("////////////////", formData.email)
            const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    }),
                });
            console.log("response", response)
            if (response.ok) {
                toast.success('User logged in successfully!');
                
                const responseData = await response.json();
                console.log("responseData", responseData)
                const users = responseData.userdata.user;
                const userpassword = responseData.userdata.password;
                const token = responseData.userdata.token;
                console.log("token", token)

                dispatch(setName(users.name));
                dispatch(setEmail(users.email));
                dispatch(setPassword(userpassword));
                dispatch(setIsLogin(true));
                dispatch(setadmin(users.admin));
                dispatch(setaddorderID(orderId))
                if(users.admin){
                    addCookie('adminDetails', token)
                }
                else{
                    addCookie('userDetails', token)
                }
                setLoading(false)
                router.push("/");
            } else if (response.status == 403) {
                setLoading(false)
                toast.error('User is not verified.');
            } 
            else if (response.status == 404) {
                setLoading(false)
                toast.error('User not found.');
            }
            else if (response.status == 401) {
                // Incorrect password
                setLoading(false)
                toast.error('Incorrect password.');
            } else {
                // Other errors
                setLoading(false)
                console.error('Error logging in user:', response.statusText);
                // Handle other errors
            }
    
    } catch (error) {
        console.error('Error signing up user:', error);
       
    }
};

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [toggelforgot, settoggelforgot]=useState<boolean>(false)

    const [forgotmail, setforgotmail]=useState<String>('')
    const handleforgotpassword=async()=>{
        settoggelforgot(true)
    }
    const gotoforgotlogin = ()=>{
        settoggelforgot(false)
    }
    const forgotmainsend =async()=>{
        try{
            setLoading2(true)
            console.log("forgot email id", forgotmail)
            const response = await fetch('/api/forgotpassword',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email: forgotmail
                })
            })
            console.log("response", response)
            if(response.ok){
                toast.success('Please Check Email')
                settoggelforgot(false)
                setLoading2(false)

                
            } else if (response.status==400){
                toast.error('This email not existing')
                setLoading2(false)


            }
        } catch (error) {
            console.error('Error Forgotpassword:', error);
            setLoading2(false)

        }
        
    }

    return (
        <div className='w-full h-full bg-[#f4f1ea] relative overflow-hidden'>
            {/* login */}
            {
                loading1?(
                    <div className='w-full h-[610px] flex justify-center items-center'> <Spinner /></div>
                ):(

                        <div  className={`w-full h-full pt-[5rem] pb-[6rem] bg-[#f4f1ea] flex justify-center items-center `}>
                            <div data-aos="fade-left" className={`${toggelforgot ? ("hidden") : ("block")} w-[90%]  sm:w-[50%] lg:w-[30%] flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center`}>
                                <div className='flex items-center space-x-2'>
                                    <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500' />
                                    <h1 className='text-[20px] sm:text-[30px] text-white font-semibold '>BurgerByte</h1>
                                </div>
                                <h1 className='text-[23px] font-semibold mb-[1rem] uppercase text-white mt-6'>Login</h1>
                                <input type='email' placeholder='Email' name="email" value={formData.email} onChange={handleInputChange} required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                                <input type='text' placeholder='Password' value={formData.password}
                                    onChange={handleInputChange} name="password" required className='w-[80%] relative py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' />
                                <div className='w-[80%] flex justify-end text-white cursor-pointer' onClick={handleforgotpassword}>
                                    <p className=''>Forgot Password?</p>
                                </div>

                                {/* <div> */}
                                {!loading ?
                                    (<div className='mt-[2rem] w-[80%] mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center'>
                                        <button className='px-8  py-3 rounded-lg mb-[3rem] text-[16px] lg:text-xl w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white' onClick={handleSubmit}>Login</button>
                                    </div>
                                    ) : (

                                        <ButtonSpinner />
                                    )}
                                {/* </div> */}
                                <p className='text-center text-white  mt-[1.5rem]'><span className='opacity-50'>New user? </span><span className='text-white underline cursor-pointer' onClick={handleToggle}>Signup now</span></p>
                            </div>

                            <div className={`${toggelforgot ? ("block") : ("hidden")} w-[90%] relative   sm:w-[50%] lg:w-[30%] flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center`}>
                                <div className='absolute top-3 left-2 text-white text-3xl cursor-pointer' onClick={gotoforgotlogin}>
                                    <IoIosArrowRoundBack />
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500' />
                                    <h1 className='text-[20px] sm:text-[30px] text-white font-semibold '>BurgerByte</h1>
                                </div>
                                <h1 className='text-[23px] font-semibold mb-[1rem] uppercase text-white mt-6'>Forgot Password</h1>
                                <input type='email' onChange={(e) => setforgotmail(e.target.value)} placeholder='Email' name="email" className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />

                                    {
                                        !loading2?(
                                        <div className='mt-[2rem] w-[80%] mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center cursor-pointer'>
                                            <button className='px-8  py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white' onClick={forgotmainsend}>Send Mail</button>
                                        </div>

                                        ):(
                                            <ButtonSpinner/>
                                        )
                                    }
                            </div>
                        </div>

                )
            }
            
           
        </div>
    );
};

export default Login;
