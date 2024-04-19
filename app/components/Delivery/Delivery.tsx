import Image from 'next/image'
import React from 'react'
import DeliveryImg from '@/public/images/delivery.svg'
import { RiEBike2Fill } from 'react-icons/ri'
import { IoFastFood } from 'react-icons/io5'
import { BsDoorClosed, BsDoorOpen } from 'react-icons/bs'

const Delivery = () => {
  return (
    <div className='pt-[8rem] pb-[3rem]'>
        <div className='w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-[3rem]'>
        <div data-aos="fade-right"  data-aos-anchor-placement="top-center">
                <Image src={DeliveryImg} alt='deliverimage'/>
            </div>
            <div className=''>
                <h1 className='text-[30px] md:text-[40px] lg:text-[50px] uppercase xl:text-[60px] font-bold leading-[3rem] md:leading-[4rem]'>Your <span className='text-red-600'> Favorite Burger</span> On the Way</h1>
                <p className='mt-[2rem] text-black text-[17px] text-opacity-70 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati hic ipsam reiciendis at deleniti provident odit iste, modi nesciunt quam voluptatibus quis consequatur veniam repellendus dicta harum numquam ad similique accusamus! Reprehenderit nulla ducimus eius iste quam itaque facere, soluta similique eaque voluptatum? Illum, deleniti ex neque quam molestiae inventore.</p>
                <div className='flex items-center space-x-3 mt-[2rem] '>
                      <RiEBike2Fill className='w-[2rem] h-[2rem] text-red-600' />
                      <h1 className='text-[18px] font-medium text-black'>Delivery in 30 minute</h1>
                </div>
                <div className='flex items-center space-x-3 mt-[1rem] '>
                      <IoFastFood className='w-[2rem] h-[2rem] text-red-600' />
                      <h1 className='text-[18px] font-medium text-black'>Free shipping from ₹200</h1>
                </div>
                <div className='flex items-center space-x-3 mt-[1rem] '>
                      <BsDoorOpen className='w-[2rem] h-[2rem] text-red-600' />
                      <h1 className='text-[18px] font-medium text-black'>Delivery on your Doorstep</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Delivery