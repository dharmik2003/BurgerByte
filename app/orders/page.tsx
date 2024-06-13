// 'use client'
// import { fetchCookie } from '@/app/utils/cookies';
// import { headers } from 'next/headers';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import Spinner from '../components/Spinner/Spinner';
// import ButtonSpinner from '../components/Spinner/ButtonSpinner';
// import MiniButtonSpinner from '../components/Spinner/MiniButtonSpinner';

// import { Accepted, DispatchOrders, Pendding, Rejected } from '../components/Admin/Pendding';


// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1,
//     slidesToSlide: 1 // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 1,
//     slidesToSlide: 1 // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1 // optional, default to 1.
//   }
// };

// const page = () => {

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);


//   const [activediv, setActiveDiv] = useState('Pending Orders'); 
//   console.log("activedivactivediv--", activediv)


//   const button = ["Pending Orders", "Rejected Orders", "Accepted Orders", "Dispatch Orders"]

//   return (
//     <div className='w-full h-full bg-[#f4f1ea] p-6'>
//       {loading ? (
//         <div className='w-full h-[610px] flex justify-center items-center'> <Spinner /></div>
//       ) :(

//         <>

//             <div className='flex gap-2  mt-2 '>
//             {
//                 button.map(but=>(
//                   <button onClick={() => setActiveDiv(but)} className={`${activediv == but ? "bg-orange-600  text-white" :"bg-white text-black"} px-3 lg:mr-2 py-1 border border-[#B0B0B0] rounded-md  hover:bg-blue-950 text-sm lg:text-xl hover:text-white`}>{but}</button>
//                 ))
//             }

//           </div>
        
//             <div className="flex w-full flex-col">
//               <div aria-label="Options">
//                 <div
//                   key="Padding"
//                   title="Padding Orders"
//                   className={activediv == 'Pending Orders' ? 'block' : 'hidden'}
//                   data-key="Padding"
//                 >
//                   <div>
//                     <div>
//                       <Pendding />
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   key="Rejected"
//                   title="Rejected Orders"
//                   className={activediv == 'Rejected Orders' ? 'block' : 'hidden'}
//                   data-key="Rejected"
//                 >
//                   <div>
//                     <div>
//                       <Rejected />
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   key="Accepted"
//                   title="Accepted Orders"
//                   className={activediv == 'Accepted Orders' ? 'block' : 'hidden'}
//                   data-key="Accepted"
//                 >
//                   <div>
//                     <div>
//                       <Accepted />
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   key="Dispatch"
//                   title="Ready To Dispatch"
//                   className={activediv == 'Dispatch Orders' ? 'block' : 'hidden'}
//                 >
//                   <div>
//                     <div>
//                       <DispatchOrders />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
        
//         </>
       
         
//       )}
//     </div>

      
//   );


// };

// export default page;


'use client'
import { fetchCookie } from '@/app/utils/cookies';
import { headers } from 'next/headers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner/Spinner';
import ButtonSpinner from '../components/Spinner/ButtonSpinner';
import MiniButtonSpinner from '../components/Spinner/MiniButtonSpinner';

import { Accepted, DispatchOrders, Pendding, Rejected } from '../components/Admin/Pendding';

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

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [activediv, setActiveDiv] = useState('Pending Orders');
  console.log("activedivactivediv--", activediv)

  const button = ["Pending Orders", "Rejected Orders", "Accepted Orders", "Dispatch Orders"]

  return (
    <div className='w-full h-full bg-[#f4f1ea] p-6'>
      {loading ? (
        <div className='w-full h-[610px] flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='flex gap-2 mt-2'>
            {button.map((but, index) => (
              <button
                key={index}
                onClick={() => setActiveDiv(but)}
                className={`${activediv === but ? "bg-orange-600 text-white" : "bg-white text-black"} px-3 lg:mr-2 py-1 border border-[#B0B0B0] rounded-md hover:bg-blue-950 text-sm lg:text-xl hover:text-white`}
              >
                {but}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-col">
            <div aria-label="Options">
              <div
                key="Padding"
                title="Padding Orders"
                className={activediv === 'Pending Orders' ? 'block' : 'hidden'}
                data-key="Padding"
              >
                <Pendding />
              </div>
              <div
                key="Rejected"
                title="Rejected Orders"
                className={activediv === 'Rejected Orders' ? 'block' : 'hidden'}
                data-key="Rejected"
              >
                <Rejected />
              </div>
              <div
                key="Accepted"
                title="Accepted Orders"
                className={activediv === 'Accepted Orders' ? 'block' : 'hidden'}
                data-key="Accepted"
              >
                <Accepted />
              </div>
              <div
                key="Dispatch"
                title="Ready To Dispatch"
                className={activediv === 'Dispatch Orders' ? 'block' : 'hidden'}
                data-key="Dispatch"
              >
                <DispatchOrders />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
