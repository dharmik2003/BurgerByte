// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { BiCycling, BiShoppingBag } from "react-icons/bi";
// import { FaBurger } from "react-icons/fa6";
// import { HiBars3BottomRight } from "react-icons/hi2";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { fetchCookie, haveCookie, haveCookiebool } from "@/app/utils/cookies";
// import { usePathname, useRouter } from "next/navigation";
// import { nanoid } from "@reduxjs/toolkit";
// import { setaddorderID } from "@/app/Redux/OrderID/OrderIDSlice";
// import { logout } from "@/app/Redux/User/User";
// import { AdminRoutes, AppRoutes, COOKIE_ADMIN, COOKIE_USER } from "@/constant";

// interface Props {
//   openNav: () => void;
// }

// const Navbar = ({ openNav }: Props) => {
//   const path = usePathname();
//   const [apiorderdata, setapiorderdata] = useState([]);

//     async function fetchCartItems() {
//       try {
//         const response = await fetch("/api/cart");
//         if (!response.ok) {
//           throw new Error("Failed to fetch cart items");
//         }
//         const cartItems = await response.json();
//         setapiorderdata(cartItems.cartItems);
//         return cartItems;
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         return { error: "An error occurred while fetching cart items" };
//       }
//     }

//   const admintoken = haveCookiebool(COOKIE_ADMIN);
//   console.log("admintoken", admintoken);

//   const userData = useSelector((state: any) => state.auth);
//   console.log("userData", userData);
//   const { orders } = useSelector((state: any) => state.orderdata);
//   const totlaorderlength = orders.length;

//   console.log(
//     "Cookies 6e ho bhai",
//     haveCookiebool(COOKIE_USER) || haveCookiebool(COOKIE_ADMIN)
//   );
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (haveCookiebool(COOKIE_USER) || haveCookiebool(COOKIE_ADMIN)) {
//       console.log(
//         "Cookies 6e ho bhai",
//         haveCookiebool(COOKIE_USER) || haveCookiebool(COOKIE_ADMIN)
//       );
//     } else {
//       dispatch(logout());
//     }
//   }, []);


//   const router = useRouter();

//   const handhomeClick = () => {
//     let orderId = nanoid();
//     dispatch(setaddorderID(orderId));
//     router.push(AppRoutes.DASHBOARD);
//   };

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className="h-[9vh] sm:h-[12vh] bg-white border">
//       <div className="sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between cursor-pointer">
//         <div className="flex items-center space-x-2 " onClick={handhomeClick}>
//           <FaBurger className="w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500" />
//           <h1 className="text-[20px] sm:text-[30px] font-semibold ">
//             BurgerByte
//           </h1>
//         </div>
//         <div>
//           <ul className="hidden lg:flex items-center space-x-10">
//             <li
//               className={`${
//                 path === AppRoutes.DASHBOARD ? "text-red-600 " : "text-black"
//               } text-[20px] font-medium hover:text-red-600`}
//             >
//               <Link href={AppRoutes.DASHBOARD}>Home</Link>
//             </li>
//             <li
//               className={`${
//                 path === (admintoken ? AdminRoutes.ORDERS : AppRoutes.MENU)
//                   ? "text-red-600 "
//                   : "text-black"
//               } text-[20px] font-medium hover:text-red-600`}
//             >
//               <Link href={admintoken ? AdminRoutes.ORDERS : AppRoutes.MENU}>
//                 {admintoken ? "Orders" : "Menu"}
//               </Link>
//             </li>
//             {/* <li className='text-[20px] font-medium hover:text-red-600'> */}
//             <li
//               className={`${
//                 path === AppRoutes.ABOUT ? "text-red-600 " : "text-black"
//               } text-[20px] font-medium hover:text-red-600`}
//             >
//               <Link href={AppRoutes.ABOUT}>About</Link>
//             </li>
//             <li
//               className={`${
//                 path ===
//                 (!admintoken ? AppRoutes.CONTACT : AdminRoutes.PRODUCTS)
//                   ? "text-red-600 "
//                   : "text-black"
//               } text-[20px] font-medium hover:text-red-600`}
//             >
//               <Link
//                 href={!admintoken ? AppRoutes.CONTACT : AdminRoutes.PRODUCTS}
//               >
//                 {!admintoken ? "Contact" : "Products"}
//               </Link>
//             </li>
//             <li
//               className={`${
//                 path ===
//                 (!admintoken ? AppRoutes.MY_ORDER : AdminRoutes.ADD_PRODUCTS)
//                   ? "text-red-600 "
//                   : "text-black"
//               } text-[20px] font-medium hover:text-red-600`}
//             >
//               <Link
//                 href={
//                   !admintoken ? AppRoutes.MY_ORDER : AdminRoutes.ADD_PRODUCTS
//                 }
//               >
//                 {!admintoken ? "My Orders" : "Add Items"}
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="flex items-center space-x-4 relative">
//           <div>
//             {userData?.user?.name ? (
//               <button
//                 onClick={() => router.push(AppRoutes.PROFILE)}
//                 className="px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 flex items-center rounded-md space-x-2 text-white"
//               >
//                 {/* <span><BiCycling className='w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]'/></span> */}
//                 Profile
//               </button>
//             ) : (
//               <button
//                 onClick={() => router.push(AppRoutes.LOGIN)}
//                 className="px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 flex items-center rounded-md space-x-2 text-white"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//           <div className="realtive">
//             {admintoken === false && (
//               <div>
//                 <button
//                   onClick={() => router.push(AppRoutes.CART)}
//                   className="sm:px-6 sm:py-3 px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center rounded-md text-white relative"
//                 >
//                   <BiShoppingBag className="w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]" />
//                 </button>
//                 {/* {orderlength > 0 && (
//                   <div
//                     className="w-[18px] h-[18px] sm:right-10 lg:-right-2 text-white text-md sm:-top-2 sm:py-3 sm:px-3 flex justify-center items-center absolute -top-1 right-11 z-[10] bg-green-700  rounded-full"
//                     style={{
//                       animation:
//                         orderlength > 0 ? "bounce 1s infinite" : "none",
//                     }}
//                   >
//                     {orderlength}
//                   </div>
//                 )} */}
//               </div>
//             )}
//           </div>
//           <HiBars3BottomRight
//             onClick={openNav}
//             className="lg:hidden w-[2rem] h-[2rem] text-black"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCycling, BiShoppingBag } from "react-icons/bi";
import { FaBurger } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCookie, haveCookie, haveCookiebool } from "@/app/utils/cookies";
import { usePathname, useRouter } from "next/navigation";
import { nanoid } from "@reduxjs/toolkit";
import { setaddorderID } from "@/app/Redux/OrderID/OrderIDSlice";
import { logout } from "@/app/Redux/User/User";
import { AdminRoutes, AppRoutes, COOKIE_ADMIN, COOKIE_USER } from "@/constant";

interface Props {
  openNav: () => void;
}

const Navbar = ({ openNav }: Props) => {
  const path = usePathname();
  const [mounted, setMounted] = useState(false);
  const [apiorderdata, setapiorderdata] = useState([]);

  const admintoken = haveCookiebool(COOKIE_ADMIN);
  const userData = useSelector((state: any) => state.auth);
  const { orders } = useSelector((state: any) => state.orderdata);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (haveCookiebool(COOKIE_USER) || haveCookiebool(COOKIE_ADMIN)) {
      console.log("Cookies present");
    } else {
      dispatch(logout());
    }
  }, []);

  async function fetchCartItems() {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const cartItems = await response.json();
      setapiorderdata(cartItems.cartItems);
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { error: "An error occurred while fetching cart items" };
    }
  }

  const handhomeClick = () => {
    let orderId = nanoid();
    dispatch(setaddorderID(orderId));
    router.push(AppRoutes.DASHBOARD);
  };

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="h-[9vh] sm:h-[12vh] bg-white border">
      <div className="sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between cursor-pointer">
        <div className="flex items-center space-x-2 " onClick={handhomeClick}>
          <FaBurger className="w-[1.2rem] h-[1.2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500" />
          <h1 className="text-[20px] sm:text-[30px] font-semibold ">
            BurgerByte
          </h1>
        </div>
        <div>
          <ul className="hidden lg:flex items-center space-x-10">
            <li
              className={`${
                path === AppRoutes.DASHBOARD ? "text-red-600 " : "text-black"
              } text-[20px] font-medium hover:text-red-600`}
            >
              <Link href={AppRoutes.DASHBOARD}>Home</Link>
            </li>
            <li
              className={`${
                path === (admintoken ? AdminRoutes.ORDERS : AppRoutes.MENU)
                  ? "text-red-600 "
                  : "text-black"
              } text-[20px] font-medium hover:text-red-600`}
            >
              <Link href={admintoken ? AdminRoutes.ORDERS : AppRoutes.MENU}>
                {admintoken ? "Orders" : "Menu"}
              </Link>
            </li>
            <li
              className={`${
                path === AppRoutes.ABOUT ? "text-red-600 " : "text-black"
              } text-[20px] font-medium hover:text-red-600`}
            >
              <Link href={AppRoutes.ABOUT}>About</Link>
            </li>
            <li
              className={`${
                path === (!admintoken ? AppRoutes.CONTACT : AdminRoutes.PRODUCTS)
                  ? "text-red-600 "
                  : "text-black"
              } text-[20px] font-medium hover:text-red-600`}
            >
              <Link href={!admintoken ? AppRoutes.CONTACT : AdminRoutes.PRODUCTS}>
                {!admintoken ? "Contact" : "Products"}
              </Link>
            </li>
            <li
              className={`${
                path === (!admintoken ? AppRoutes.MY_ORDER : AdminRoutes.ADD_PRODUCTS)
                  ? "text-red-600 "
                  : "text-black"
              } text-[20px] font-medium hover:text-red-600`}
            >
              <Link href={!admintoken ? AppRoutes.MY_ORDER : AdminRoutes.ADD_PRODUCTS}>
                {!admintoken ? "My Orders" : "Add Items"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 relative">
          <div>
            {mounted && (
              <button
                onClick={() => 
                  router.push(userData?.user?.name ? AppRoutes.PROFILE : AppRoutes.LOGIN)
                }
                className="px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 flex items-center rounded-md space-x-2 text-white"
              >
                {userData?.user?.name ? "Profile" : "Login"}
              </button>
            )}
          </div>
          <div className="relative">
            {admintoken === false && (
              <div>
                <button
                  onClick={() => router.push(AppRoutes.CART)}
                  className="sm:px-6 sm:py-3 px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center rounded-md text-white relative"
                >
                  <BiShoppingBag className="w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]" />
                </button>
              </div>
            )}
          </div>
          <HiBars3BottomRight
            onClick={openNav}
            className="lg:hidden w-[2rem] h-[2rem] text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;