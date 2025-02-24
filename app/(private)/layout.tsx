import React, { ReactNode } from "react";
import Responsive from "../components/Nav/Responsive";
import Footer from "../components/Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Responsive />
      {children}
      <Footer />
    </div>
  );
};

export default PrivateLayout;
