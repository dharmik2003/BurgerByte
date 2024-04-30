'use client'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { FaBurger } from 'react-icons/fa6'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const Resetpassword = () => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const paramsObject = useSearchParams()
    console.log("paramsObject", paramsObject)
    const paramsotp = paramsObject.get('otp');
    console.log("params", paramsotp)
    const paramsemail = paramsObject.get('email');
    console.log("params", paramsemail)

    useEffect(() => {
        if (paramsotp && paramsemail) {
            handlecheckdetails();
        } else {
            toast.error('Invalid OTP');
        }
    }, [paramsotp, paramsemail]);


    const handlecheckdetails = async () => {
        try {
            const response = await fetch('/api/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: paramsemail,
                    forgototp: paramsotp
                }),
            });
            console.log("response", response)
            if (response.ok) {
                const responseData = await response.json();
                console.log("responseData", responseData)
            } else if (response.status == 400) {
                toast.error('Some Technical Issue, Please try again');
                router.push("/login");
            } else {
                console.error('Error Forgot Passoword in user:', response.statusText);
            }
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    const router = useRouter()
    const updatepassword = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('/api/signup', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:paramsemail,
                    password: password,
                }),
            });
            console.log("response", response)
            if (response.ok) {
                router.push("/login")
                toast.success('Password Update successfully!');
                const responseData = await response.json()
                
            } else if (response.status == 400) {
                toast.error('password reset problem,Please try Again ');
                router.push("/login");
            } else {
                console.error('Error reset Passoword:', response.statusText);
            }
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

  return (
      <div className='w-full h-full bg-[#f4f1ea] overflow-hidden'>

          <div data-aos="fade-left" data-aos-anchor-placement="top-center" className={`w-full h-full pt-[5rem] pb-[6rem] bg-[#f4f1ea] flex justify-center items-center `}>
              <div className={` w-[90%]  sm:w-[50%] lg:w-[30%] flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center`}>
                  <div className='flex items-center space-x-2'>
                      <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500' />
                      <h1 className='text-[20px] sm:text-[30px] text-white font-semibold '>BurgerByte</h1>
                  </div>
                  <h1 className='text-[23px] font-semibold mb-[1rem] uppercase text-white mt-6'>Reset Password</h1>
                  <input type='password' placeholder='New Password' name="password" required value={password} onChange={(e) => setPassword(e.target.value)} className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                  <input type='password' placeholder='Confirm New Password' name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                  <div onClick={updatepassword} className='mt-[2rem] w-[80%] mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center'>
                      <button className='px-8  py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white'>Update Psssword</button>
                  </div>
              </div>

          </div>

      </div>
  )
}

export default Resetpassword