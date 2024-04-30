'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBurger } from 'react-icons/fa6';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        review: '',
        price: '',
        rating: ''
    });

    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Product added successfully
                toast.success('Product added successfully')
                console.log('Product added successfully');
                setFormData({
                    title: '',
                    image: '',
                    review: '',
                    price: '',
                    rating: ''
                });
            } else {
                // Error adding product
                console.error('Error adding product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className='w-full h-full bg-[#f4f1ea] overflow-hidden'>
            {/* login */}
            <div data-aos="fade-left" data-aos-anchor-placement="top-center" className={`w-full h-full pt-[5rem] pb-[6rem] bg-[#f4f1ea] flex justify-center items-center `}>
                <div className={` w-[90%]  sm:w-[50%] lg:w-[30%] flex flex-col bg-green-700 p-6 rounded-lg justify-center items-center`}>
                    <div className='flex items-center space-x-2'>
                        <FaBurger className='w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500' />
                        <h1 className='text-[20px] sm:text-[30px] text-white font-semibold '>BurgerByte</h1>
                    </div>
                    <h1 className='text-[23px] font-semibold mb-[1rem] uppercase text-white mt-6'>Add Product</h1>
                    <input type='text' placeholder='Title' name="title" value={formData.title} onChange={handleInputChange} required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                    <input type='text' placeholder='Image URL' name="image" value={formData.image} onChange={handleInputChange} required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                    <input type='text' placeholder='Review' name="review" value={formData.review} onChange={handleInputChange} required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                    <input type='text' placeholder='Price' name="price" value={formData.price} onChange={handleInputChange} required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />
                    <input type='text' placeholder='Rating' name="rating" value={formData.rating} onChange={handleInputChange} required className='w-[80%] py-1 lg:w-[70%] lg:h-[2rem] rounded pl-4' /><br />

                    <div className='mt-[2rem] w-[80%] mx-auto relative border-b-[2px] border-b-gray-300 border-opacity-50 text-center'>
                        <button className='px-8  py-3 rounded-lg mb-[3rem] text-[16px] w-full bg-blue-950 transition-all duration-200 hover:bg-red-600 text-white' onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
