'use client'
import { setName, setEmail, setPassword, setIsLogin } from '@/app/Redux/User/User';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBurger } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { MouseEventHandler } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const formatTime = (seconds:any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};


const Signup = () => {

    const { username, useremail, userpassword } = useSelector((state: any) => state.auth); // Selecting state properties

    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading1(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);



    const router=useRouter()
    const dispatch=useDispatch()
    const handleToggle = () => {
        router.push("/login")
        
    };

    const [toggleotp,settoggel]=useState<boolean>(false)


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    
    //counter (time)
    const [counter, setCounter] = useState(180); // 180 seconds = 3 minutes

    const deleteuser = async () => {
        try {

            if (!formData.email) {
                toast.error("All Field required")
                return
            }
            const response = await fetch('/api/signup', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });
            if (response.ok) {
                router.push('/login');
                settoggel(false);
            }
            else if (response.status == 404) {
                toast.error("User not found.")
            } else {
                console.error('Error signing up user:', response.statusText);
            }
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    }
    // update isveridate
    const updateusers = async () => {
        try {

            if (!formData.email) {
                toast.error("All Field required")
                return
            }
            const response = await fetch('/api/signup', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    isVerified: true
                }),
            });
            if (response.ok) {
                router.push('/');
                settoggel(false);
            }
            else if (response.status == 404) {
                toast.error("User not found.")
            } else {
                console.error('Error signing up user:', response.statusText);
            }
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    }
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (counter > 0) {
            intervalId = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);
        } else {
            const redirectTimer = setTimeout(deleteuser, 15000);
            return () => clearTimeout(redirectTimer);
        }

        return () => clearInterval(intervalId);
    }, [counter]);

    const startCounter = () => {
        setCounter(180);
    };

    
    const [loadingspinner1, setloadingspinner1]=useState<boolean>(false)
    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        try {
            setloadingspinner1(true)

            if (!formData.name || !formData.email || !formData.password){
                toast.error("All Field required")
                setTimeout(() => {
                    setloadingspinner1(false);
                }, 2000);
                return
            }
            startCounter();
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    isVerified:false,
                    admin:false
                }),
            });
            if (response.ok) {
                toast.success('User signed up successfully!');
                settoggel(true)
                setloadingspinner1(false)
            }
            else if(response.status==400){
                toast.error("Email already exists!")
                setloadingspinner1(false)
            } else {
                console.error('Error signing up user:', response.statusText);
                setloadingspinner1(false)
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            setloadingspinner1(false)
        }
    };


    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
       
    };   

    //otp

    const handleOtpInputChange = (index:number, e:any) => {
        const { value } = e.target;
        const updatedOtpDigits = [...otpDigits];
        updatedOtpDigits[index] = value;
        setOtpDigits(updatedOtpDigits);
    };

    const [loadingspinner2, setloadingspinner2]=useState<boolean>(false)
    const handleSubmitOtp =async () => {
        
        const enteredOtp = otpDigits.join('');

        try {

            setloadingspinner2(true)
            if (!formData.email || !enteredOtp) {
                toast.error("Enter OTP")
                setTimeout(() => {
                    setloadingspinner2(false);
                }, 1000);
                return
            }

            const response = await fetch('/api/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: enteredOtp
                }),
            });
            if (response.ok) {
                await updateusers();
                toast.success('signup successfully!');
                // dispatch(setName(formData.name));
                // dispatch(setEmail(formData.email));
                // dispatch(setPassword(formData.password));
                // dispatch(setIsLogin(true));
                // setCounter(0);
                router.push('/login')  
                setloadingspinner2(false)              
                // setTimeout(() => {
                //     settoggel(false);
                // }, 15000);
            }
            else if (response.status == 400) {
                toast.error("Email Not exists.!")
                setloadingspinner2(false)      
            }
            else if (response.status > 200) {
                toast.error("Invalid OTP!")
                setloadingspinner2(false)      
            } else {
                toast.error('Error OTP up user:');
                setloadingspinner2(false)      
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            setloadingspinner2(false)      
        }

       
    };

    const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '','','']);

    const otptosignup =async ()=>{
        await deleteuser()
        settoggel(false)        
    }
    return (
        <div className='w-full h-full bg-[#f4f1ea] overflow-hidden'>
            {
                loading1?(
                    <div className='w-full h-[610px] flex justify-center items-center'> <Spinner /></div>
                ):(
                        <div  className={`w-full h-full pt-[5rem] pb-[6rem] bg-[#f4f1ea] flex justify-center items-center`}>
                            <div data-aos="fade-right" className={` ${toggleotp ? ("hidden") : ("block")} w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center}`}>
                                <div className='flex justify-center items-center space-x-2'>
                                    <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500' />
                                    <h1 className='text-[20px] sm:text-[30px] text-white font-semibold '>BurgerByte</h1>
                                </div>

                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-[23px] font-semibold mb-[1rem] uppercase text-white mt-6'>Signup</h1>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <input type='text' name="name" value={formData.name} onChange={handleInputChange} placeholder='Name' required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                                    <input type='email' name="email" value={formData.email} onChange={handleInputChange} placeholder='Email' required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                                    <input type='text' name="password" value={formData.password} onChange={handleInputChange} placeholder='Password' required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' />
                                </div>

                             
                                    {
                                        !loadingspinner1 ? (
   <div className='mt-[2rem] w-[80%] mx-auto border-b-[2px] border-b-gray-300 border-opacity-50 text-center'>
                                        <button className='px-8 py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200  text-white' onClick={handleSubmit}>Signup</button>
                                        </div>
                                            ):(
                                                <ButtonSpinner />
                                            )
                                    }
                               

                                <p className='text-center text-white  mt-[1.5rem]'><span className='opacity-50'>Already user? </span><span className='text-white underline cursor-pointer' onClick={handleToggle}>Login now</span></p>
                            </div>
                            <div className={` ${toggleotp ? ("block") : ("hidden")} w-[90%] relative sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center`}>
                                <div className='absolute top-3 left-2 text-white text-3xl cursor-pointer ' onClick={otptosignup}>
                                    <IoIosArrowRoundBack />
                                </div>
                                <h1 className='text-[23px] font-semibold mb-[1rem] uppercase text-white mt-6'>Verify OTP</h1>

                                <div className='flex sm:gap-4 gap:2 justify-center items-center'>
                                    {otpDigits.map((digit, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            placeholder='X'
                                            value={digit}
                                            onChange={(e) => handleOtpInputChange(index, e)}
                                            pattern="[0-9]*"
                                            maxLength={1}
                                            className='w-8 h-8 sm:w-10 px-3 sm:px-4 mr-2 sm:mr-0 placeholder:text-gray-400  sm:h-10 flex justify-center items-center rounded-full'
                                        />
                                    ))}
                                </div>
                                <div className='text-white'>
                                    {formatTime(counter)}
                                </div>

                                <div className='mt-[2rem] w-[80%] mx-auto border-b-[2px] border-b-gray-300 border-opacity-50 text-center'>
                                    {
                                        !loadingspinner2?(
                                            <button className='px-8 py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white' onClick={handleSubmitOtp}>Signup</button>

                                        ):(
                                                <ButtonSpinner />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                )
            }
        </div>
    );
};

export default Signup;
