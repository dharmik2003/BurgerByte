'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiCycling, BiShoppingBag } from 'react-icons/bi'
import { FaBurger } from 'react-icons/fa6'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { setlogout } from '@/app/Redux/User/User'
import { Cookienamether, fetchCookie, haveCookie, haveCookiebool, haveCookieClient } from '@/app/utils/cookies'
import { usePathname, useRouter } from 'next/navigation'


interface Props{
    openNav:()=>void
}

const Navbar = ({openNav}:Props) => {

    const path=usePathname()


    const { orderID } = useSelector((state: any) => state.orderID)
    const [apiorderdata, setapiorderdata] = useState([]);

    async function fetchCartItems() {
        try {
            const response = await fetch('/api/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const cartItems = await response.json();
            setapiorderdata(cartItems.cartItems);
            return cartItems;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return { error: 'An error occurred while fetching cart items' };
        }
    }

    const filterlengthorder = apiorderdata.filter((item: any) => item.orderId ==orderID)
    const orderlength = filterlengthorder.length
    useEffect(() => {
        fetchCartItems();
    },[]);



    const admintoken = Cookienamether('adminDetails');
    console.log("admintokenadmintoken", admintoken)


    const { username, isLogin ,admin} = useSelector((state: any) => state.auth);
    const { orders } = useSelector((state: any) => state.orderdata);
    const totlaorderlength=orders.length


    console.log("Cookies 6e ho bhai", (haveCookiebool('userDetails') || haveCookiebool('adminDetails')))
    const dispatch = useDispatch()
    useEffect(() => {
        if (haveCookiebool('userDetails') || haveCookiebool('adminDetails')) {
            console.log("Cookies 6e ho bhai", (haveCookiebool('userDetails') || haveCookiebool('adminDetails')))
                // dispatch(setlogout());
        }    
        else{
            dispatch(setlogout());
        }    
    },[]);

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

    // useEffect(()=>{
        // const cookiethere = haveCookie('',"adminDetails")
        // console.log("cookies there", cookiethere)
        // if(cookiethere){
        //     dispatch(setlogout())
        // }


    // },[])
    // useEffect(()=>{
    //     const cookiethere = haveCookie("", "userDetails")
    //     console.log("cookies there", cookiethere)
    //     if (cookiethere) {
    //         dispatch(setlogout())
    //     }
    // },[])

    // useEffect(() => {
    //     const userDetailsExists = haveCookieClient("userDetails");
    //     const adminDetailsExists = haveCookieClient("adminDetails");

    //     console.log("User details cookie present:", userDetailsExists);
    //     console.log("Admin details cookie present:", adminDetailsExists);

    //     if (!userDetailsExists || !adminDetailsExists) {
    //         dispatch(setlogout());
    //     }
    // }, []);


  return (
    <div className='h-[9vh] sm:h-[12vh] bg-white border'>
        <div className='sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between cursor-pointer'>

              <div className='flex items-center space-x-2 ' onClick={handhomeClick}>
                  <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500'/>
                  <h1 className='text-[20px] sm:text-[30px] font-semibold '>BurgerByte</h1>
            </div>
             
            <div>
                  <ul className='hidden lg:flex items-center space-x-10'>
                      <li className={`${path === '/' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                          <Link href='/'>Home</Link>
                      </li>
                      {/* <li className={`${path === '/menu' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-700`}>
                          <Link href='/menu'>Menu</Link>
                      </li> */}

                      {
                          !admintoken ? (
                              <li className={`${path === '/contact' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                                  <Link href='/menu'>Menu</Link>
                              </li>

                          ) : (
                              <li className={`${path === '/product' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                                    <Link href='/orders'>Orders</Link>
                              </li>

                          )
                      }
                      {/* <li className='text-[20px] font-medium hover:text-red-600'> */}
                      <li className={`${path === '/about' ? 'text-red-600 ': 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                          <Link href='/about'>About</Link>
                      </li>
                     
                    {
                          !admintoken ?(
                              <li className={`${path === '/contact' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                                  <Link href='/contact'>Contact</Link>
                              </li>
                     
                        ):(
                                  <li className={`${path === '/product' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                                <Link href='/product'>Products</Link>
                              </li>
                                 
                        )
                    }
                    {
                          !admintoken ?(
                              <li className={`${path === '/myorder' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
                          <Link href='/myorder'>Myorder</Link>
                            </li>
                     
                        ):(
                                  <li className={`${path === '/addproduct' ? 'text-red-600 ' : 'text-black'} text-[20px] font-medium hover:text-red-600`}>
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
                                  {
                                      orderlength > 0? (<div className='w-[18px] h-[18px] sm:right-10 lg:-right-2 border-black text-md sm:-top-2 sm:py-3 sm:px-3 flex justify-center items-center absolute -top-1 right-11 z-[10] bg-white border rounded-full' style={{ animation: orderlength > 0 ? 'bounce 1s infinite' : 'none' }}>
                                          {orderlength}
                                      </div>):(<div></div>)
                                  }

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