'use client'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import { BiCycling } from "react-icons/bi";
import Burger from "./Burger";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const PropulerProduct = () => {
  return (
    <div className="pt-[3rem] pb-[3rem]">
      <h1 className="heading">
        Our Propuler  <span className="text-red-600">Burgers</span></h1>
        <div className="w-[80%] mt-[4rem] mx-auto">
          <Carousel additionalTransfrom={0} arrows={true} autoPlay={true} autoPlaySpeed={4000} centerMode={false} infinite responsive={responsive} itemClass="item" showDots={false} >
              {/* <Burger title="Beefy Bite" image="images/b1.png" review="6" price=" 10.88$"/> */}
              <Burger  title="Beefy Bite" price="105" image="/images/b1.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b2.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b3.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b4.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b5.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b6.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b7.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b8.png" reviews="6" />
              <Burger  title="Beefy Bite" price="105" image="/images/b9.png" reviews="6" />
          </Carousel>
        </div>
        
    </div>
  )
}

export default PropulerProduct