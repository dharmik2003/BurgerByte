import React from 'react'
import { BurderData } from './burder'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { BiShoppingBag } from 'react-icons/bi'

interface Props{
  title:string;
  image:string;
  price:string;
  reviews:string;

}

const Burger = ({title,price,image,reviews}:Props) => {
  return (
    <div className='bg-white p-6 rounded-lg m-3'>
        <div className='w-[200px] mx-auto h-[200px]'>
            <Image src={image} alt={"image"} width={200} height={200} className='w-[100%] h-[100%] object-cover' />
        </div>
        <h1 className='mt-[1.3rem] text-[22px] text-black font-semibold '>{title}</h1>
        <div className='flex items-center mt-[0.5rem] space-x-3'>
          <div className='flex items-center'>
            <FaStar className='w-[1rem] h-[1rem] text-yellow-600'/>
            <FaStar className='w-[1rem] h-[1rem] text-yellow-600'/>
            <FaStar className='w-[1rem] h-[1rem] text-yellow-600'/>
            <FaStar className='w-[1rem] h-[1rem] text-yellow-600'/>
          </div>
          <div className='text-black opacity-80'>({reviews})</div>
        </div> 
        <p className='mt-[0.5rem] text-black text-opacity-70'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <div className='flex justify-between items-center mt-[1.4rem]'>
        <h1 className='text-[25px] font-bold text-red-600'>₹{price}</h1>
          <button className='px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white'>
            <BiShoppingBag className='w-[1.3rem] h-[1.3rem]'/>
          </button>
        </div>
      </div>


  )
}

export default Burger


// return (
//   <div className='w-full flex overflow-x-auto'>
//     {BurderData.map((burger, index) => (
//       <div className='bg-white p-6 rounded-lg m-3 flex'>
//         <div className='w-[200px] mx-auto h-[350px]'>

//           <div key={index} className="burger-item">
//             <Image src={burger.image} alt={burger.title} width={100} height={100} className='w-[100%] h-[100%] object-cover' />
//             <h1 className='mt-[1.3rem] text-[22px] text-black font-semibold '>{burger.title}</h1>
//             <div className='flex items-center mt-[0.5rem] space-x-3'>
//               <div className='flex items-center'>
//                 <FaStar className='w-[1rem] h-[1rem] text-yellow-600' />
//                 <FaStar className='w-[1rem] h-[1rem] text-yellow-600' />
//                 <FaStar className='w-[1rem] h-[1rem] text-yellow-600' />
//                 <FaStar className='w-[1rem] h-[1rem] text-yellow-600' />
//               </div>
//               <div className='text-black opacity-80'>{burger.review}</div>
//             </div>
//             <p className='mt-[0.5rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

//             <div className='flex justify-between items-center mt-[1.4rem]'>
//               <h1 className='text-[25px] font-bold text-red-600'>{burger.price}</h1>
//               <button className='px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white'>
//                 <BiShoppingBag className='w-[1.3rem] h-[1.3rem]' />
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// )