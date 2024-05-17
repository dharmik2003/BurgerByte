'use client'
import { setlogout, setName, setPhotos, setresetPhotos } from '@/app/Redux/User/User';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdOutlineControlPoint } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Cookienamether, removeCookie } from '@/app/utils/cookies';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';

const Profile = () => {

  const admintoken = Cookienamether('adminDetails');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { username, useremail, userpassword, isLoading, userphotos,address } = useSelector((state: any) => state.auth); 

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dispatch=useDispatch()

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      dispatch(setPhotos(URL.createObjectURL(file)))
      try {       
        const response = await fetch('/api/signup', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: useremail,
            image: userphotos
          })
        });

        if (response.ok) {
          
          toast.success('Upload Photo Successfully');
        }
      } catch (error) {
        console.error("Error:", error);
      }      
    }
  };

  const router = useRouter()
  const handlelogout=()=>{
    dispatch(setlogout())
    // Cookies.remove('userDetails');
    if (admintoken) {
      removeCookie('adminDetails')
    }
    else {
      removeCookie('userDetails')
    }
    router.push('/');
  }
  const handleResetPhotos = () => {
    dispatch(setresetPhotos()); 
    document.getElementById('fileInput')?.click();
  };



  /*pop view code  */
  const [newname, setnewname] = useState(''); // State to manage pop-up view visibility
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to manage pop-up view visibility

  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup =async () => {
    try{

      const response = await fetch('/api/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newname,
          email: useremail,
        }),
      });
      if (response.ok) {
        toast.success('Profile Update successfully!');
        dispatch(setName(newname));
        setShowPopup(false)
      }
      else if (response.status == 400) {
        toast.error("Email already exists!")
      } else {
        console.error('Error signing up user:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up user:', error);
    }
  };

  /*Fetch api user */

  const [apiorderdata, setapiorderdata] = useState([]);
  const [orders, setorders] = useState([]);

  async function fetchCartItems() {
    try {
      const response = await fetch('/api/signup');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const cartItems = await response.json();
      if (cartItems){
        const data = cartItems.user.find((data: any) => data.email==useremail)
        
        setorders(data)
      }
      setapiorderdata(cartItems)
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return { error: 'An error occurred while fetching cart items' };
    }
  }

  useEffect(() => {
    fetchCartItems();
    
  },[]);

  useEffect(()=>{
    if(orders){
      setPhotos(orders.image)
    }
  }, [orders])


  return (
    <div className='w-full h-[590px] bg-[#f4f1ea] p-6 pt-8'>
      {
        loading ? (
          <div className='w-full h-[610px] flex justify-center items-center'> <Spinner /></div>

        ) : (
            <div>
              <div className='w-full flex flex-col sm:gap-20 gap-10  md:flex-row justify-center items-center'>
                <div className='relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]'>
                  {/* Display selected image or default circle */}
                  {userphotos ? (
                    <Image src={userphotos} alt="Selected" width={200} height={200} className="w-[200px] h-[200px] rounded-full border border-black sm:w-[300px] sm:h-[300px] object-cover" />
                  ) : (
                    <div
                      className="rounded-full border border-black w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-gray-200 flex items-center justify-center cursor-pointer"
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.586 8l-3-3H9.999C7.79 5 6 6.79 6 8v7c0 1.209.79 2 1.999 2H13c1.21 0 2-.791 2-2v-2.586l2-2V8h-2.414zM10 15c-.553 0-1-.447-1-1s.447-1 1-1 1 .447 1 1-.447 1-1 1z"
                          clipRule="evenodd"
                        />
                        <path d="M10 0a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                    </div>
                  )}

                  {/* File input */}
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <div className='py-2 px-2 sm:right-7 sm:top-4 sm:py-1 sm:px-1 flex justify-center items-center absolute top-2 right-6 cursor-pointer  bg-white border rounded-full'>
                    <button onClick={handleResetPhotos}><MdOutlineControlPoint className='sm:text-3xl ' /></button>
                  </div>
                </div>

                <div className='flex justify-center items-center flex-col'>
                  <div className='flex gap-2 text-2xl mb-3 sm:text-3xl'>
                    <div className='font-semibold'>
                      <h1>Name : </h1>
                      <h1>Email : </h1>
                      <h1>Password : </h1>
                      <h1>Address : </h1>
                    </div>
                    <div>
                      <h1>{username ? username : null}</h1>
                      <h1>{useremail ? useremail : null}</h1>
                      <h1>{userpassword ? userpassword : null}</h1>
                      <h1>{address ? address : null}</h1>
                    </div>
                  </div>
                  <div className='w-full h-full '>
                    <button onClick={openPopup} className='px-5 py-2 rounded-lg mb-[1rem] text-[22px] w-[80%] bg-blue-950 transition-all duration-200 hover:bg-green-600 text-white'>Update</button>
                    <button onClick={handlelogout} className='px-5 py-2 rounded-lg mb-[3rem] text-[22px] w-[80%] bg-red-600 transition-all duration-200 hover:bg-yellow-500 text-white'>Logout</button>
                  </div>
                </div>

              </div>
              {showPopup && (
                <div className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center'>
                  <div className='w-[80%] h-auto sm:w-[50%] lg:w-[25%] border rounded-xl bg-[#FCFEFC] px-3 py-6 flex flex-col justify-center items-center'>
                    <h1 className='text-green-600 text-2xl sm:text-2xl lg:text-3xl font-bold'>Update Porfile</h1>
                    <input
                      type='text'
                      name='name'
                      onChange={(e) => setnewname(e.target.value)} // Cast e.target as HTMLInputElement
                      placeholder='Name'
                      required
                      className='w-[80%] py-1 lg:w-[70%] lg:h-[3rem] border border-green-600 mt-5 rounded pl-4'
                    /><br />
                    <textarea
                    rows={6}
                      name='address'
                      onChange={(e) => setnewname(e.target.value)} // Cast e.target as HTMLInputElement
                      placeholder='Enter New Address'
                      required
                      className='w-[80%] py-1 lg:w-[70%] lg:h-[3rem] border border-green-600 mt-5 rounded pl-4'
                    /><br />

                    <button onClick={closePopup} className='px-3 py-2 rounded-lg sm:w-[80%] lg:w-[70%] mt-4 text-[16px] lg:text-[20px] w-[90%] bg-green-600 transition-all duration-200 hover:bg-red-600 text-white'>Update Profile</button>
                  </div>
                </div>
              )}
            </div>)}
    </div>    
  );
};


export default Profile