'use client'
import React, { useEffect } from 'react'
import Hero from './Hero/Hero'
import Feature from './Feature/Feature'
import PropulerBurger from './PropulerProduct/PropulerBurger'
import Delivery from './Delivery/Delivery'
import Team from './Team/Team'
import Reservation from './Reservation/Reservation'
import NewsLetters from './NewsLetters/NewsLetters'
import AOS from 'aos'
import 'aos/dist/aos.css'


const Home = () => {
  

  useEffect(()=>{

    const initAos=async()=>{
      await import('aos')
      AOS.init({
        duration:2000,
        easing:'ease',
        once:true,
        anchorPlacement:"top-center"
      })
    }
    initAos()
  },[])  

  return (
      <div className='overflow-hidden'>
        <Hero/>
        <Feature/>
        <PropulerBurger />
        <Delivery/>
        <Team/>
        <Reservation/>
      <NewsLetters/>

    </div>
  )
}

export default Home