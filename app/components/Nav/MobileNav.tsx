'use client'
import { Cookienamether, haveCookie } from '@/app/utils/cookies'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaBurger } from 'react-icons/fa6'
import { ImCross } from 'react-icons/im'
import { TbPointFilled } from 'react-icons/tb'
import { useSelector } from 'react-redux'

interface Props{
    showNav:boolean
    closeNav:()=>void
}

// const router = useRouter()
// const handhomeClick = () => {
//   router.push('/');
// };

const MobileNav = ({closeNav ,showNav}:Props) => {

  const admintoken = Cookienamether('adminDetails');
  console.log("admintoken", admintoken)

  const { username, isLoading, admin } = useSelector((state: any) => state.auth);

    const navstyle = showNav ? "translate-x-0" :"translate-x-[-100%]"
  return (
    <div className={`fixed ${navstyle} right-0 transition-all duration-500 left-0 top-0 bottom-0 h-[100vh] bg-[#000000e0] z-[1002]`}>
      
        <ImCross className='absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white' onClick={closeNav}/>
        <div className={`${navstyle} bg-emerald-700 transition-all duration-500 delay-200 flex flex-col items-start gap-10  justify-start w-[70%] h-[100%]`}>
                  <div className='w-full flex justify-center items-center mt-5 space-x-2'>
                    <FaBurger className='w-[2rem] h-[2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500' />
                    <h1 className='text-[30px] sm:text-[30px] text-white font-semibold '>BurgerByte</h1>
                  </div>
       
                  <ul className='space-y-3 pl-5'>
                      <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
                      <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}
                      <Link href='/' onClick={closeNav}>Home</Link>
                      </li>
                      <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
            <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}

                      <Link href='/menu' onClick={closeNav}>Menu</Link>
                      </li>
                      <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
            <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}

                      <Link href='/about' onClick={closeNav}>About</Link>
                      </li>
        
                     {
            !admintoken ?(
              <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
                <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}

                <Link href='/contact' onClick={closeNav}>Contact</Link>
              </li>
                      
                      ):(
                <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
                  <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}

                  <Link href='/product' onClick={closeNav}>Products</Link>
                </li>
                      )
                     }
                     {
            !admintoken ?(
                         <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
            <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}

                      <Link href='/myorder' onClick={closeNav}>Myorder</Link>
                      </li>
                      
                      ):(
                <li className='text-[25px] font-medium hover:text-yellow-400 text-white'>
                  <TbPointFilled className='inline-block w-6 h-6 mr-2' /> {/* Add icon */}

                  <Link href='/addproduct' onClick={closeNav}>Add Items</Link>
                </li>
                      )
                     }
                      

                  </ul>
            
        </div>
    </div>
  )
}

export default MobileNav