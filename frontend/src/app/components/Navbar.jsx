"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

import Login from "@/app/auth/LogRegForm"
import Profile from "./Profile"
import Pesanan from "./Pesanan"
import { Menu } from "lucide-react"
import Link from "next/link"

export default function Navbar() {

    const [isLogReg, setIsLogReg] = useState(false);
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showpesanan, setshowPesanan] = useState(false);

    const [productName, setProductName] = useState([]);
    const [searchSugest, setSearchSugest] = useState("")
    const [filteredNames, setFilteredNames] = useState([]);


    useEffect(() => {
        fetch("http://localhost:2000/auth/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(() => setUser(null))
    }, [])

    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const res = await fetch("http://localhost:2000/product/get")
                const data = await res.json();
                setProductName(data.map(item => item.name));
            } catch (err) {
                console.log(err)
            }
        }
        fetchProductName();
    }, [])

    useEffect(() => {
        const filtered = productName.filter(name =>
            name.toLowerCase().includes(searchSugest.toLowerCase())
        );
        setFilteredNames(filtered);
    }, [searchSugest, productName]);

    const selectSearch = (name) => {
        setSearchSugest(name)
        setTimeout(() => setFilteredNames([]), 100)
    }

    useEffect(() => {
        setIsLogReg(false)
    }, [])
    return (
        <>
            <div className="z-10 fixed top-0 left-0 bg-[var(--background)] w-full h-16 px-5 sm:px-10
            text-[var(--light-color)] font-extrabold
            flex items-center justify-start sm:justify-between gap-10 sm:gap-2
            border-b-[1px] border-[var(--foreground)]">

                {/* MOBILE */}
                <div className="flex md:hidden cursor-pointer">
                    <Menu color="#FAF8F1" size={30} />
                </div>

                {/* LEFT */}
                <Link
                    href={"/"}
                    className="cursor-pointer text-sm lg:text-md">
                    N A M E . S T O R E
                </Link>

                {/* MID */}
                <div className="hidden sm:flex relative w-[50%]">
                    <div className="w-full flex items-center px-4 outline-2 outline-[var(--light-color)] rounded-4xl">
                        <Image src={"/search.png"} alt="search-icon" width={15} height={15}
                            className="bg-blue absolute " />
                        <input
                            value={searchSugest}
                            onChange={(e) => setSearchSugest(e.target.value)}
                            className="w-full pl-8 px-2 py-1 md:py-2 outline-none font-normal" type="search" placeholder="Search . . ." />
                    </div>

                    {searchSugest && filteredNames.length > 0 && (
                        <div
                            className="absolute top-11 bg-[var(--light-color)] p-1 flex flex-col gap-1 rounded-md shadow-md w-full z-10">
                            {filteredNames.map((name, index) => (
                                <div
                                    key={index}
                                    onMouseDown={() => selectSearch(name)}
                                    className="bg-red px-5 py-2 bg-[var(--background)] text-[var(--light-color)] text-sm font-normal rounded-md cursor-pointer">
                                    {name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* RIGHT */}
                <div className="hidden md:flex gap-2 items-center text-sm tracking-widest">
                    {user?.role !== "admin" ? (
                        <div
                            onClick={() => setshowPesanan(true)}
                            className="hidden lg:flex flex-col items-center lg:flex-row hover:border-b-2 cursor-pointer px-2 ease-in-out duration-65 transition-all">
                            <span>Cek</span>
                            <span>Pesanan</span>
                        </div>

                    ) : (
                        <Link
                            href={"/admin"}
                            className="hover:border-b-2 cursor-pointer px-2 ease-in-out duration-65 transition-all">
                            Admin Control
                        </Link>
                    )}
                    {!user ? (
                        <a
                            onClick={() => setIsLogReg(true)}
                            className="bg-green-400 w-44 py-2 text-center rounded-2xl cursor-pointer text-white hover:opacity-70">
                            Register / Login
                        </a>
                    ) : (
                        <div
                            className="relative w-44 py-1 text-center rounded-2xl cursor-pointer text-[var(--background)]">

                            {showProfile && (
                                <div className="absolute top-0 w-full z0">
                                    <Profile setLogout={setUser} />
                                </div>
                            )}

                            <div className="z-10 relative">
                                <span
                                    className="bg-[var(--light-color)] text-[1rem] font-normal px-3 pr-5 -mr-3 rounded-l-2xl">
                                    {user.role}
                                </span>

                                <span
                                    onClick={() => setShowProfile(true)}
                                    className="bg-[var(--light-color)] text-[.9rem] px-3 py-1 rounded-2xl outline-2 outline-[var(--background)] transition-all ease-in duration-150 hover:bg-[var(--background)] hover:text-[var(--light-color)] hover:outline-[var(--light-color)] ">
                                    {user.name}
                                </span>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <AnimatePresence>
                {isLogReg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .75 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg"
                        onClick={() => setIsLogReg(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -80 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 80 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Login onClose={() => {
                                setIsLogReg(false);
                                setShowProfile(false);
                            }} setUser={setUser} />
                        </motion.div>
                    </motion.div>
                )}

                {showpesanan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .75 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg"
                        onClick={() => setshowPesanan(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -80 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 80 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Pesanan />
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </>


    )
}