
"use client"

import Navbar from "@/app/components/Navbar";
import MainLayout from "./layouts/MainLayout";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <MainLayout />
    </div>
  );
}
