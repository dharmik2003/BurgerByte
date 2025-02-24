"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Spinner from "../Spinner/Spinner";

const AllProduct = () => {
  const [apiproductdata, setapiproductdata] = useState([]);

  /*admin update  items */
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const openPopup = (
    id: string,
    title: string,
    image: string,
    price: string
  ) => {
    setupdateitems({
      id,
      title,
      image,
      price,
    });
    setShowPopup(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setupdateitems((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const closePopup = async () => {
    await handleupdateitems();
  };
  const [updateitems, setupdateitems] = useState({
    id: "",
    title: "",
    image: "",
    price: "",
  });

  const handleupdateitems = async () => {
    try {
      const response = await fetch("api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updateitems.id,
          title: updateitems.title,
          image: updateitems.image,
          price: parseInt(updateitems.price),
        }),
      });
      if (response.ok) {
        setShowPopup(false);
        fetchProducts();
        toast.success("Food Update Successfully");
      }
    } catch (error) {
      console.log("error while in update items function");
    }
  };

  const handledeleteitems = async () => {
    try {
      const response = await fetch("api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteid,
        }),
      });
      if (response.ok) {
        setdeleteid("");
        setshowdeletepop(false);
        fetchProducts();
        toast.success("Food Delete Successfully");
      } else if (response.status == 404) {
        toast.error("Food Not Found");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error while in delete items function");
    }
  };

  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to fetch product items");
      }
      const Items = await response.json();
      setapiproductdata(Items.products);
      setLoading(false);
      return Items;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching product items:", error);
      return { error: "An error occurred while fetching product items" };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  /*admin delete items */
  const [showdeletepop, setshowdeletepop] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<string>("");

  const closePopup1 = async () => {
    await handledeleteitems();
  };
  const openPopup1 = (id: string) => {
    setdeleteid(id);
    setshowdeletepop(true);
  };
  const closecancelsPopup1 = () => {
    setdeleteid("");
    setshowdeletepop(false);
  };

  return (
    <div className="w-full h-full bg-[#f4f1ea] p-6 flex justify-center items-center ">
      {loading ? (
        <div className="w-full h-[610px] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {apiproductdata.map((product: any) => (
            <div key={product._id} className="lex flex-col justify-center">
              <div className="flex bg-white w-full h-[200px]  p-3 border rounded-lg justify-start items-center ">
                <div className="w-[45%] h-full flex justify-center items-center lg:justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={180}
                    height={180}
                    className="rounded-lg overflow-hidden"
                  />
                </div>
                <div className="sm:ml-5">
                  <h1 className="text-red-600 text-[17px] sm:text-[20px]">
                    {product.title}
                  </h1>
                  <h1 className="font-semibold text-green-700 text-[17px] sm:text-[20px]">
                    ₹{product.price}
                  </h1>
                  <div className="flex gap-2 sm:mt-5">
                    <button
                      onClick={() =>
                        openPopup(
                          product._id,
                          product.title,
                          product.image,
                          product.price
                        )
                      }
                      className="px-4 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                    >
                      <FaPencil className="w-[1.3rem] h-[1.3rem]" />
                    </button>
                    <button
                      onClick={() => openPopup1(product._id)}
                      className="px-4 py-1 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center justify-center rounded-md text-white"
                    >
                      <MdDelete className="w-[1.3rem] h-[1.3rem]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="w-[80%] h-auto sm:w-[50%] lg:w-[25%] border rounded-xl bg-[#FCFEFC] px-3 py-6 flex flex-col justify-center items-center">
            <h1 className="text-green-600 text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Update Food
            </h1>
            <input
              type="text"
              name="title"
              value={updateitems.title}
              placeholder="Title"
              className="w-[80%] py-1 lg:w-[70%] lg:h-[3rem] border border-green-600  rounded pl-4"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="image"
              value={updateitems.image}
              placeholder="Image"
              className="w-[80%] py-1 lg:w-[70%] lg:h-[3rem] border border-green-600 rounded pl-4"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="price"
              value={updateitems.price}
              placeholder="Price"
              className="w-[80%] py-1 lg:w-[70%] lg:h-[3rem] border border-green-600 rounded pl-4"
              onChange={handleChange}
            />
            <br />

            <button
              onClick={closePopup}
              className="px-3 py-2 rounded-lg sm:w-[80%] lg:w-[70%] mt-4 text-[16px] lg:text-[20px] w-[90%] bg-green-600 transition-all duration-200 hover:bg-red-600 text-white"
            >
              Update
            </button>
          </div>
        </div>
      )}
      {showdeletepop && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="w-[80%] h-auto sm:w-[50%] lg:w-[25%] border rounded-xl bg-[#FCFEFC] px-3 py-6 flex flex-col justify-center items-center">
            <h1 className="text-green-600 text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Delete Food
            </h1>
            <p>Are you sure you want to delete this item?</p>

            <div className="flex gap-2 w-full">
              <button
                onClick={closecancelsPopup1}
                className="px-4 py-2 rounded-lg sm:w-[80%] lg:w-[70%] mt-4 text-[16px] lg:text-[20px] w-[90%] bg-red-600 transition-all duration-200  text-white"
              >
                Cancel
              </button>
              <button
                onClick={closePopup1}
                className="px-4 py-2 rounded-lg sm:w-[80%] lg:w-[70%] mt-4 text-[16px] lg:text-[20px] w-[90%] bg-green-600 transition-all duration-200  text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
