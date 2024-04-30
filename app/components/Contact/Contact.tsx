import React from 'react'
import { GrRestaurant } from 'react-icons/gr'

const Contact = () => {
    return (
        <div className='w-full h-full bg-[#f4f1ea] p-6 sm:flex sm:flex-col justify-center items-center'>
            {/* <div className='w-full h-[100px] bg-[#502314] rounded-xl flex mb-3 justify-center items-center'>
                <h1 className='heading text-white'>Contact</h1>
            </div> */}
            <div className='w-[100%] sm:w-[50%] lg:w-[40%] bg-green-700 p-2 sm:p-6 rounded-lg'>
                <h1 className='text-center font-bold uppercase text-[30px] md:text-[40px] lg:text-[50px] mt-[0.5rem] text-white'>Contact</h1>
                <div className='mt-[1rem] '>
                    <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center w-[95%] mx-auto justify-between sm:space-x-3'>
                        <input type='text' placeholder='First Name' className="placeholder:text-white lg:text-xl px-2 sm:px-5 w-[100%] py-2 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100" name="people" id="people"/>
                        <input type='text' placeholder='Last Name' className='placeholder:text-white lg:text-xl w-[100%] px-2 sm:px-5 py-2 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100' />
                    </div>
                    <input type='text' inputMode='numeric' pattern='\d*' placeholder='Phone Number' className='px-2 sm:px-5 py-2.5 placeholder:text-white bg-transparent block w-[95%] mx-auto mt-[1rem] rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100' />
                    <input type='email' placeholder='Email' className='px-2 sm:px-5 py-2.5 placeholder:text-white bg-transparent block w-[95%] mx-auto mt-[1rem] rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100' />
                    <textarea  placeholder='Description' rows={3} className='px-2 sm:px-5 py-2.5 placeholder:text-white bg-transparent block w-[95%] mx-auto mt-[1rem] rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100' />
                    <div className='mt-[2rem] w-[80%] h-auto mx-auto text-center'>
                        <button className='px-8 py-3 rounded-lg mb-[rem] text-[16px] w-full bg-red-600 transition-all duration-200 hover:bg-blue-950 text-white'>Contact Now</button>
                    </div>

                </div>
            </div>
       </div>
    )
}

export default Contact