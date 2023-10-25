import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import FootNavbar from "../components/FootNavbar";
import SideBar from "../components/SideBar";

function MainLayout() {
  return (
    <>
      <div className="pupok" style={{ display: "flex", marginLeft: "320px" }}>
        <Navbar />
        <div>
          <Outlet />
          {/* <FootNavbar /> */}
        </div>
        <SideBar />
      </div>
    </>
  );
}

export default MainLayout;
