"use client";
import { haveCookie, haveCookiebool } from "@/app/utils/cookies";
import { AdminRoutes, AppRoutes, COOKIE_ADMIN } from "@/constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBurger } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { TbPointFilled } from "react-icons/tb";
import { useSelector } from "react-redux";

interface Props {
  showNav: boolean;
  closeNav: () => void;
}

// const router = useRouter()
// const handhomeClick = () => {
//   router.push('/');
// };

const MobileNav = ({ closeNav, showNav }: Props) => {
  const path = usePathname();

  const admintoken = haveCookiebool(COOKIE_ADMIN);

  const [token, setToken] = useState(false);

  useEffect(() => {
    if (admintoken) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [admintoken]);

  const { username, isLoading, admin } = useSelector(
    (state: any) => state.auth
  );

  const navstyle = showNav ? "translate-x-0" : "translate-x-[-100%]";
  return (
    <div
      className={`fixed ${navstyle} right-0 transition-all duration-500 left-0 top-0 bottom-0 h-[100vh] bg-[#000000e0] z-[1002]`}
    >
      <ImCross
        className="absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white"
        onClick={closeNav}
      />
      <div
        className={`${navstyle} bg-emerald-700 transition-all duration-500 delay-200 flex flex-col items-start gap-10  justify-start w-[70%] h-[100%]`}
      >
        <div className="w-full flex justify-center items-center mt-5 space-x-2">
          <FaBurger className="w-[2rem] h-[2rem] sm:h-[1.4rem] sm:w-[1.4rem] text-orange-500" />
          <h1 className="text-[30px] sm:text-[30px] text-white font-semibold ">
            BurgerByte
          </h1>
        </div>

        <ul className="space-y-3 pl-5">
          <li
            className={`${
              path === AppRoutes.DASHBOARD ? "text-yellow-400 " : "text-black"
            } text-[25px] font-medium hover:text-yellow-400 text-white`}
          >
            <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
            {/* Add icon */}
            <Link href={AppRoutes.DASHBOARD} onClick={closeNav}>
              Home
            </Link>
          </li>

          {/* <li className={`${path === (token ? '/product' : '/contact') ? 'text-yellow-400 ' : 'text-black'} text-[25px] font-medium hover:text-yellow-400 text-white`}>
            <TbPointFilled className='inline-block w-6 h-6 mr-2' />
            <Link href={token ? '/orders' : '/menu'} onClick={closeNav}>
              {token ? 'Orders' : 'Menu'}
            </Link>
          </li> */}

          {!token ? (
            <li
              className={`${
                path === AppRoutes.MENU ? "text-yellow-400 " : "text-black"
              } text-[25px] font-medium hover:text-yellow-400 text-white`}
            >
              <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
              {/* Add icon */}
              <Link href={AppRoutes.MENU} onClick={closeNav}>
                Menu
              </Link>
            </li>
          ) : (
            <li
              className={`${
                path === AdminRoutes.ORDERS ? "text-yellow-400 " : "text-black"
              } text-[25px] font-medium hover:text-yellow-400 text-white`}
            >
              <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
              {/* Add icon */}
              <Link href={AdminRoutes.ORDERS} onClick={closeNav}>
                Orders
              </Link>
            </li>
          )}

          <li
            className={`${
              path === AppRoutes.ABOUT ? "text-yellow-400 " : "text-black"
            } text-[25px] font-medium hover:text-yellow-400 text-white`}
          >
            <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
            {/* Add icon */}
            <Link href={AppRoutes.ABOUT} onClick={closeNav}>
              About
            </Link>
          </li>

          {!token ? (
            <li
              className={`${
                path === AppRoutes.CONTACT ? "text-yellow-400 " : "text-black"
              } text-[25px] font-medium hover:text-yellow-400 text-white`}
            >
              <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
              {/* Add icon */}
              <Link href={AppRoutes.CONTACT} onClick={closeNav}>
                Contact
              </Link>
            </li>
          ) : (
            <li
              className={`${
                path === AdminRoutes.PRODUCTS
                  ? "text-yellow-400 "
                  : "text-black"
              } text-[25px] font-medium hover:text-yellow-400 text-white`}
            >
              <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
              {/* Add icon */}
              <Link href={AdminRoutes.PRODUCTS} onClick={closeNav}>
                Products
              </Link>
            </li>
          )}
          {!token ? (
            <li
              className={`${
                path === AppRoutes.MY_ORDER ? "text-yellow-400 " : "text-black"
              } text-[25px] font-medium hover:text-yellow-400 text-white`}
            >
              <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
              {/* Add icon */}
              <Link href={AppRoutes.MY_ORDER} onClick={closeNav}>
                Myorder
              </Link>
            </li>
          ) : (
            <li
              className={`${
                path === AdminRoutes.ADD_PRODUCTS
                  ? "text-yellow-400 "
                  : "text-black"
              } text-[25px] font-medium hover:text-yellow-400 text-white`}
            >
              <TbPointFilled className="inline-block w-6 h-6 mr-2" />{" "}
              {/* Add icon */}
              <Link href={AdminRoutes.ADD_PRODUCTS} onClick={closeNav}>
                Add Products
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
