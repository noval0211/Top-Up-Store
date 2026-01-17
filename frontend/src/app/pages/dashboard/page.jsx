
import Footer from "@/app/components/Footer";
import HeroSection from "@/app/components/HeroSection";
import DashboardClient from "./components/DashboardClient";

export default async function Dashboard() {

    return (
        <div className="w-full flex pt-14 flex-col gap-5 items-center text-[var(--light-color)]">
            {/* ADS / PROMO */}
            <section className="w-full h-fit">
                <HeroSection />
            </section>

            <hr className="outline-none bg-gray-500 border-none h-[1px] w-full " />
            <section className="w-full h-fit flex flex-col gap-10 ">
                <DashboardClient />
            </section>
            <Footer />
        </div>
    )
}