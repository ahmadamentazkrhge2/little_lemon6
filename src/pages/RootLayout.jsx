import React from "react";
import { Outlet } from "react-router";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

export default function RootLayout() {
    return(
        <>
        <Header />
          <Outlet />
        <Footer />
      
        </>
    )
}