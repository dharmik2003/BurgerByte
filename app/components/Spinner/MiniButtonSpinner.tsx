// import React from 'react'

// const ButtonSpinner = () => {
//   return (
//     <div>
//           <button
//               type="button"
//               className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
//               disabled>
//               <div
//                   className="inline-block h-4 w-4 animate-spin ml-2 text-[20px] rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
//                   role="status"></div>
//               <span>Loading...</span>
//           </button>
//     </div>
//   )
// }

// export default ButtonSpinner


import React from 'react';

const MiniButtonSpinner = () => {
    return (
        <div className='mt-[2rem] w-[80%] mx-auto relative border-b-[2px] border-opacity-50 text-center' >
            <button
                type="button"
                className="pointer-events-none inline-block  rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white  bg-primary  py-2 text-lg font-medium uppercase leading-normal  shadow-primary-3 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                disabled
            >
                <div
                    className="inline-block h-4 w-4 animate-spin mr-2 text-xl rounded-full border-2 border-solid border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                ></div>
                <span>Loading...</span>
            </button>
        </div>
    );
};

export default MiniButtonSpinner;
