'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { BiCycling, BiShoppingBag } from 'react-icons/bi'
import { FaBurger } from 'react-icons/fa6'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { setlogout } from '@/app/Redux/User/User'
import { Cookienamether, fetchCookie } from '@/app/utils/cookies'

interface Props{
    openNav:()=>void
}

const Navbar = ({openNav}:Props) => {




    const admintoken = Cookienamether('adminDetails');
    console.log("admintoken", admintoken)



    const { username, isLogin ,admin} = useSelector((state: any) => state.auth);
    const { orders } = useSelector((state: any) => state.orderdata);
    const totlaorderlength=orders.length


    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (!Cookies.get('userDetails')) {
    //         if (!Cookies.get('adminDetails')) {
    //             dispatch(setlogout());
    //         }
    //         else{
    //             dispatch(setlogout());
    //         }
    //     }
        
    // }, [Cookies]);

    const router=useRouter()
    const handleLoginClick = () => {
        router.push('/login');
    };
    const handleaddtocartClick = () => {
        router.push('/cart');
    };

    const handhomeClick = () => {
        router.push('/');
    };
    const profileinfo = () => {
        router.push('/profile');
    };

    

  return (
    <div className='h-[9vh] sm:h-[12vh] bg-white border'>
        <div className='sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between cursor-pointer'>

              <div className='flex items-center space-x-2 ' onClick={handhomeClick}>
                  <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500'/>
                  <h1 className='text-[20px] sm:text-[30px] font-semibold '>BurgerByte</h1>
            </div>
             
            <div>
                  <ul className='hidden lg:flex items-center space-x-10'>
                      <li className='text-[20px] font-medium hover:text-red-600'>
                          <Link href='/'>Home</Link>
                      </li>
                      <li className='text-[20px] font-medium hover:text-red-600'>
                          <Link href='/menu'>Menu</Link>
                      </li>
                      <li className='text-[20px] font-medium hover:text-red-600'>
                          <Link href='/about'>About</Link>
                      </li>
                     
                    {
                          !admintoken ?(
                              <li className='text-[20px] font-medium hover:text-red-600'>
                                  <Link href='/contact'>Contact</Link>
                              </li>
                     
                        ):(
                            <li className='text-[20px] font-medium hover:text-red-600'>
                                <Link href='/product'>Products</Link>
                              </li>
                                 
                        )
                    }
                    {
                          !admintoken ?(
                            <li className='text-[20px] font-medium hover:text-red-600'>
                          <Link href='/myorder'>Myorder</Link>
                            </li>
                     
                        ):(
                                  <li className='text-[20px] font-medium hover:text-red-600'>
                                      <Link href='/addproduct'>Add Items</Link>
                                  </li>
                        )
                    }
                      

                  </ul>
            </div>

              <div className='flex items-center space-x-4 relative'>
                  <div>
                      {isLogin ? (
                          <button
                              onClick={profileinfo}
                              className='px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 flex items-center rounded-md space-x-2 text-white'>
                              {/* <span><BiCycling className='w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]'/></span> */}
                              <span className='font-bold uppercase'>{username}</span>
                          </button>
                      ) : (
                          <button onClick={handleLoginClick} className='px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 flex items-center rounded-md space-x-2 text-white'>
                              <span className='font-bold'>Login</span>
                          </button>
                      )}
                  </div>
                  <div className='realtive'>
                      {
                          !admintoken?(
                            <div>
                                  <button onClick={handleaddtocartClick} className='sm:px-6 sm:py-3 px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center rounded-md text-white relative'>
                                      <BiShoppingBag className='w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]' />
                                  </button>
                                  {totlaorderlength > 0 ? (<div className='w-[18px] h-[18px]  sm:right-10 lg:-right-2 border-black text-md sm:-top-2 sm:py-3 sm:px-3 flex justify-center items-center absolute -top-1 right-11 z-[10]  bg-white border rounded-full' style={{ animation: totlaorderlength > 0 ? 'bounce 1s infinite' : 'none' }}>
                                      {totlaorderlength}
                                  </div>) : (
                                      <div></div>
                                  )}
                            </div>
                          ):(
                            <div>

                            </div>
                          )

                      }

                  </div>
                  
                  
                  <HiBars3BottomRight onClick={openNav} className='lg:hidden w-[2rem] h-[2rem] text-black' />
              </div>

        </div>
        
    </div>
  )
}

export default Navbar