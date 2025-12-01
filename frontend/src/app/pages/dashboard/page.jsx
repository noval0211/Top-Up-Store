
'use client'

import { useState } from "react";
import HeroSection from "@/app/feature/heroSection";
import Footer from "@/app/components/footer";
import ProductCard from "@/app/components/productCard";

export default function Dashboard() {

    const [filter, setFilter] = useState("");
    
    return (
        <div className="w-full flex pt-16 flex-col gap-5 items-center text-[var(--light-color)]">
            {/* ADS / PROMO */}
            <section className="w-full h-[250px]">
                <HeroSection />
            </section>

            <section className="w-full h-fit flex flex-col gap-10 ">
                {/* LIST */}
                <div className="flex justify-center gap-2 sm:gap-3 md:gap-5 px-2 py-1 rounded-sm text-xs sm:text-sm list-none">
                    <li
                        onClick={() => setFilter('')}
                        className="w-20 sm:w-25 md:w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 rounded-2xl">
                        <a>All</a>
                    </li>
                    <li
                        onClick={() => setFilter('games')}
                        className="w-20 sm:w-25 md:w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 rounded-2xl">
                        <a>Games</a>
                    </li>
                    <li
                        onClick={() => setFilter('voucher')}
                        className="w-20 sm:w-25 md:w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 rounded-2xl">
                        <a>Voucher</a>
                    </li>
                    <li
                        onClick={() => setFilter('other')}
                        className="w-20 sm:w-25 md:w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 rounded-2xl">
                        <a>Other</a>
                    </li>
                </div>

                {/* ITEM LISTS */}
                <div className="w-full min-h-screen flex justify-center">
                    <ProductCard filter={filter} />
                </div>
            </section>
            <Footer />
        </div>
    )
}