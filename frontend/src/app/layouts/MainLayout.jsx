import { Navbar } from "../components/Navbar"
import Dashboard from "@/app/pages/dashboard/page"
import "@/app/layouts/index.css"

export default function MainLayout() {
    return (
        <div className="w-full">
            <Navbar />
            <Dashboard />
        </div>
    )
}