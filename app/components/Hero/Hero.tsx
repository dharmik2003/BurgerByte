'use client'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import burger1 from '@/public/images/b1.png'
import burger2 from '@/public/images/b2.png'
import Image from "next/image";
import { BiCycling } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constant";

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



const Hero = () => {
    const router = useRouter()
    const gotomenuroutes = () => {
        router.push(AppRoutes.MENU)
    } 
  return (
    <div>
        <Carousel additionalTransfrom={0} arrows={true} autoPlay={true} autoPlaySpeed={4000} centerMode={false} infinite responsive={responsive} itemClass="item" showDots={false} >
             <div className="w-[100%] h-[88vh] flex items-center justify-center flex-col bg-red-950 md:clip_path">
                  <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-center items-center gep-[2rem] mx-auto">
                      <Image src={burger1} alt="bur1" className="hidden md:block" />
                    <div className="">
                        <h1 className="text-[40px] font-semibold text-yellow-400">Fast Food Burger</h1>
                        <h1 className="text-[90px] leading-[5rem] uppercase text-white font-bold">Best <br/> Burgers</h1>
                        <p className="mt-[1rem] text-white text-opacity-70 text-[18px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, explicabo!</p>
                          <button onClick={gotomenuroutes} className='mt-[2rem] px-8 py-3 text-[14px] sm:text-[16px] bg-green-500 transition-all duration-200 hover:bg-green-700 flex items-center rounded-md space-x-2 text-white'>
                              <span><BiCycling className='w-[1.7rem] h-[1.7rem]' /></span>
                              <span className='font-bold'>ORDER NOW</span>
                          </button>
                    </div>
                </div>
             </div>
              <div className="w-[100%] h-[88vh] flex items-center justify-center flex-col bg-blue-950 md:clip_path">
                  <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-center items-center gep-[2rem] mx-auto">
                      <Image src={burger2} alt="bur1" className="hidden md:block" />
                      <div className="">
                          <h1 className="text-[40px] font-semibold text-yellow-400">Tasty Burger</h1>
                          <h1 className="text-[90px] leading-[5rem] uppercase text-white font-bold">Top <br /> Burgers</h1>
                          <p className="mt-[1rem] text-white text-opacity-70 text-[18px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, explicabo!</p>
                          <button onClick={gotomenuroutes} className='mt-[2rem] px-8 py-3 text-[14px] sm:text-[16px] bg-blue-500 transition-all duration-200 hover:bg-green-700 flex items-center rounded-md space-x-2 text-white'>
                              <span><BiCycling className='w-[1.7rem] h-[1.7rem]' /></span>
                              <span className='font-bold'>ORDER NOW</span>
                          </button>
                      </div>
                  </div>
              </div>
        </Carousel>
    </div>
  )
}

export default Hero