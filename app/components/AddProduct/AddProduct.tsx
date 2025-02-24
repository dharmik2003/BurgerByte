"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBurger, FaImage } from "react-icons/fa6";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import cloudinary from "cloudinary";
import axios from "axios";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const AddProduct = () => {
  const [formData1, setFormData] = useState<any>({
    title: "",
    image: "",
    review: "",
    price: "",
    rating: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData1, [e.target.name]: e.target.value });
  };

  const [loader, setloader] = useState<boolean>(false);

  // image store and then product add
  const handleSubmit = async () => {

      for (const key in formData1) {
          if (key === 'image') {
              continue;
          }

          if (formData1[key] === null || formData1[key] === '') {
              toast.error(`Please fill in the ${key} field.`);
              return;
          }
      }

      try {
          setloader(true)
          const formData = new FormData();

          // Step 1: Append the selected image to the FormData
          if (Imagee) {
              formData.append("image", Imagee);
          } else {
              console.error("No image selected");
              return;
          }

          // Step 2: Upload the image to Cloudinary
          const response1 = await axios.post("/api/imagestore", formData);
          const data = await response1.data;

          if (data.msg.secure_url) {

              // Step 3: Update formData1 with the Cloudinary image URL
              const updatedFormData1 = { ...formData1, image: data.msg.secure_url };

              // Step 4: Store product data in MongoDB
              const productResponse = await fetch('/api/products', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updatedFormData1),
              });

              if (productResponse.ok) {
                  // Product added successfully
                  toast.success('Product added successfully');

                  // Step 5: Reset the form data
                  setFormData({
                      title: '',
                      image: '',
                      review: '',
                      price: '',
                      rating: ''
                  });
                  setImagee(null)
                  setSelectedImage(null)
                  setloader(false)
              } else {
                  // Error adding product
                  console.error('Error adding product:', productResponse.statusText);
                  toast.error('Error adding product. Please try again later.');
              }
          } else {
              // Error uploading image to Cloudinary
              console.error("Error uploading image:", data.msg);
              toast.error('Error uploading image. Please try again later.');
          }
      } catch (error) {
          // General error handling
          console.error('Error handling form submission:', error);
          toast.error('An error occurred. Please try again later.');
      }
  };

//   const handleSubmit = async () => {
//     console.log(formData1);

//     try {
//       setloader(true);

//       const productResponse = await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData1),
//       });

//       if (productResponse.ok) {
//         // Product added successfully
//         toast.success("Product added successfully");
//         console.log("Product added successfully");

//         // Step 5: Reset the form data
//         setFormData({
//           title: "",
//           image: "",
//           review: "",
//           price: "",
//           rating: "",
//         });
//         setImagee(null);
//         setSelectedImage(null);
//         setloader(false);
//       } else {
//         // Error adding product
//         console.error("Error adding product:", productResponse.statusText);
//         toast.error("Error adding product. Please try again later.");
//       }
//     } catch (error) {
//       // General error handling
//       console.error("Error handling form submission:", error);
//       toast.error("An error occurred. Please try again later.");
//     }
//   };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [Imagee, setImagee] = useState<File | null>(null);
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  //image take and store cloudinary
  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];

          // Check if the file type is allowed
          if (!allowedTypes.includes(file.type)) {
              toast.error('Only JPG, JPEG, and PNG files are allowed.');
              return;
          }

          setImagee(file);
          setSelectedImage(URL.createObjectURL(file));
          toast.success('Upload Photo Successfully');
          // setFormData({ ...formData1, image: file });
      }
  };

  const handleResetPhotos = () => {
      setSelectedImage(null)
      document.getElementById('fileInput')?.click();
  };

  return (
    <div className="w-full h-full bg-[#f4f1ea] overflow-hidden">
      {/* login */}
      <div
        data-aos="fade-left"
        data-aos-anchor-placement="top-center"
        className={`w-full h-full pt-[5rem] pb-[6rem] bg-[#f4f1ea] flex justify-center items-center `}
      >
        <div
          className={`max-w-[500px] w-full  flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center`}
        >
          <h1 className="text-[33px] font-semibold mb-[1rem] uppercase text-white">
            Add Product
          </h1>

          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData1.title}
              onChange={handleInputChange}
              required
              className="w-full h-[40px] rounded pl-4"
            />
            {/* <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={formData1.image}
              onChange={handleInputChange}
              required
              className="w-full h-[40px] rounded pl-4"
            /> */}
            <input
              type="text"
              placeholder="Review"
              name="review"
              value={formData1.review}
              onChange={handleInputChange}
              required
              className="w-full h-[40px] rounded pl-4"
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={formData1.price}
              onChange={handleInputChange}
              required
              className="w-full h-[40px] rounded pl-4"
            />
            <input
              type="text"
              placeholder="Rating"
              name="rating"
              value={formData1.rating}
              onChange={handleInputChange}
              required
              className="w-full h-[40px] rounded pl-4"
            />
          </div>

          <div className="w-full flex mt-3 items-start">
            <div className=" w-[80%] flex justify-start ">
              <div className='' onClick={() => document.getElementById('fileInput')?.click()}>
                                {selectedImage?(
                                    <div className='w-[50px] h-[50px] flex justify-center items-center relative bg-white rounded-md lg:ml-5'>
                                        <CldImage src={selectedImage} alt="Selected" width={50} height={50} className="w-[50px] h-[50px] rounded-md  sm:w-[50px] sm:h-[50px] object-cover" crop={{
                                            type: 'auto',
                                            source: true
                                        }} />
                                        <MdCancel className='z-10 -top-2 -right-2 cursor-pointer' onClick={handleResetPhotos} />
                                    </div>
                                ):(
                                        <div className='w-[50px] h-[50px] flex justify-center items-center relative bg-white rounded-md  cursor-pointer'>
                                        <FaImage className = ' text-xl  ' />
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageSelect}
                                        />
                                    </div>
                                )}
                            </div>
            </div>
          </div>

          {!loader ? (
            <div className="mt-[2rem] w-full mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center">
              <button
                className="px-8  py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white"
                onClick={handleSubmit}
                disabled={loader || !formData1.title || !formData1.image || !formData1.review || !formData1.price || !formData1.rating}
              >
                Add Product
              </button>
            </div>
          ) : (
            <ButtonSpinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
