
"use client"

import Navbar from "@/app/components/Navbar";
import MainLayout from "@/app/layouts/MainLayout";
import AdminLayout from "@/app/layouts/AdminLayout";
import Pesanan from "@/app/pages/user/Pesanan"; 
import { useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("main");
  return (
    <div className="relative">
      <Navbar onChangePage={setActivePage}/>
      <div className="z-0 absolute top-0 w-full h-screen">
        {activePage === "main" && <MainLayout />}
        {activePage === "pesanan" && <Pesanan />}
        {activePage === "admin-control" && <AdminLayout />}
      </div>
    </div>
  );
}
