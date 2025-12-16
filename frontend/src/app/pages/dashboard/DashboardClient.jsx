'use client'
import ProductCard from "@/app/components/ProductCard";
import { useState } from "react";
export default function DashboardClient() {

    const [filter, setFilter] = useState("");

    const menuList = ["All", "Games", "Voucher", "Other"]

    return (
        <>
            {/* LIST */}
            <ul className="flex justify-center gap-2 sm:gap-3 md:gap-5 px-2 py-1 rounded-sm font-semibold text-xs sm:text-sm list-none">
                {menuList.map((items, index) => {
                    return (
                        <li
                            onClick={() => setFilter(index === 0 ? '' : items)}
                            key={index}
                            className="w-20 sm:w-25 md:w-30 py-1 bg-orange-400 text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 rounded-2xl">
                            <a>{items}</a>
                        </li>
                    )
                })}
            </ul>

            {/* ITEM LISTS */}
            <div className="w-full min-h-30 flex justify-center">
                <ProductCard filter={filter} />
            </div>
        </>
    )
}