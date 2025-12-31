
"use client"
import Navbar from "../components/Navbar/Navbar";
import Products from "../admin/Product/page";
import CodeReferral from "../admin/Referral/page";
import BannerPromo from "../admin/Banner/page";
import HistoryPurchase from "../admin/PurchaseHistory/page";
import { useState } from "react";

export default function AdminLayout() {
    const [activePage, setActivePage] = useState("products")
    return (
        <div className="relative w-full flex">
            <Navbar />
            <div className=" fixed pt-16 bg-[var(--background)] border-r-[1px] border-[var(--foreground)] w-50 h-screen text-[var(--light-color)] flex flex-col gap-1 items-center">
                <ul className="w-full flex flex-col gap-2 pt-2">

                    <li
                        onClick={() => setActivePage("products")}
                        className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">Products</a>
                    </li>
                    <li
                        onClick={() => setActivePage("bannerPromo")}
                        className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">Banner Promo</a>
                    </li>

                    <li
                        onClick={() => setActivePage("codeReferral")}
                        className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">Referral Code</a>
                    </li>

                    <li
                        onClick={() => setActivePage("historyPurchase")}
                        className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">History Purchase</a>
                    </li>
                </ul>
            </div>
            <div className="text-[var(--light-color)] w-full h-screen pt-16 ml-50">
                {activePage === "products" && <Products />}
                {activePage === "bannerPromo" && <BannerPromo />}
                {activePage === "codeReferral" && <CodeReferral />}
                {activePage === "historyPurchase" && <HistoryPurchase />}
            </div>

        </div>
    );
}