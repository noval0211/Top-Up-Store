
import Navbar from "@/app/components/Navbar";
import UserLayout from "./pages/layouts/UserLayout";
import AdminLayout from "./pages/layouts/AdminLayout";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <div className="z-0 absolute top-0 w-full h-screen  ">
        <AdminLayout />
      </div>
    </div>
  );
}
