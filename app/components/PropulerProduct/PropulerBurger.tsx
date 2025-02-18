"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addorderid } from "@/app/Redux/Order/OrderSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Burger from "./Burger";
import { nanoid } from "nanoid";
import Spinner from "../Spinner/Spinner";
import { setaddorderID } from "@/app/Redux/OrderID/OrderIDSlice";

interface Product {
  _id: string;
  title: string;
  image: string;
  review: number;
  price: number;
  rating: number;
}

const PropulerProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderid, setorderid] = useState<String>("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products", { method: "GET" });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setProducts(data.products);
      } else {
        setLoading(false);
        console.error("Failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1430 },
      items: 4,
      slidesToSlide: 1,
    },
    minidesktop: {
      breakpoint: { max: 1430, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 580 },
      items: 2,
      slidesToSlide: 1,
    },
    minitablet: {
      breakpoint: { max: 580, min: 465 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handlegenerateid = () => {
    let orderId = nanoid();
    setorderid(orderId);

    // dispatch(addorderid(orderId));
    dispatch(setaddorderID(orderId));
  };

  return (
    <div className="pt-[3rem] pb-[3rem] relative bg-[#f4f1ea]">
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div>
          <h1 className="heading">
            Our Popular{" "}
            <span
              className="text-red-600 cursor-pointer"
              onClick={handlegenerateid}
            >
              Burgers
            </span>
          </h1>
          <div className="w-[80%] mt-[4rem] mx-auto">
            <Carousel
              additionalTransfrom={0}
              arrows={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              centerMode={false}
              infinite
              responsive={responsive}
              itemClass="item"
              showDots={false}
            >
              {products.map((product) => (
                <Burger
                  id={product._id}
                  orderid={orderid}
                  key={product._id}
                  {...product}
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropulerProduct;
