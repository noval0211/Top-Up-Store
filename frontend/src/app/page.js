
"use client"

import Navbar from "@/app/components/Navbar";
import MainLayout from "./layouts/MainLayout";

export default function Home() {
  const [activePage, setActivePage] = useState("main");
  return (
    <div className="relative">
      <Navbar />
      <MainLayout />
    </div>
  );
}
