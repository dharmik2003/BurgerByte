export const AppRoutes = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  MENU: "/menu",
  CART: "/cart",
  PROFILE: "/profile",
  MY_ORDER: "/myorder",
  MY_ORDER_DETAILS: (id: string) => `/myorder/${id}`,
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
};

export const AdminRoutes = {
  ORDERS: "/orders",
  ADD_PRODUCTS: "/addproduct",
  PRODUCTS: "/products",
};

export const COOKIE_USER = "user";
export const COOKIE_ADMIN = "admin";

// export const USER_ID = "67aaf45a0784b3ccefacceae";
