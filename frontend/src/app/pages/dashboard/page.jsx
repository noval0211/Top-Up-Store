
import Footer from "@/app/components/footer";
import HeroSection from "@/app/components/heroSection";
import DashboardClient from "./components/DashboardClient";

export default async function Dashboard() {

    return (
        <div className="w-full flex pt-16 flex-col gap-5 items-center text-[var(--light-color)]">
            {/* ADS / PROMO */}
            <section className="w-full h-fit">
                <HeroSection />
            </section>

            <section className="w-full h-fit flex flex-col gap-10 ">
                <DashboardClient />
            </section>
            <Footer />
        </div>
    )
}