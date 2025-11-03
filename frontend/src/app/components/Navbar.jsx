"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

import Login from "@/app/auth/LogRegForm"
import Profile from "./Profile"

export default function Navbar({ onChangePage }) {

    const [isLogReg, setIsLogReg] = useState(false);
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/auth/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(() => setUser(null))
    }, [])

    useEffect(() => {
        if(!user) return HandlePageChange("main");
    }, [user])
    
    const HandlePageChange = (page) => {
        setShowProfile(false);
        setIsLogReg(false);
        onChangePage(page)
    }

    return (
        <>
            <div className="z-10 fixed top-0 left-0 bg-[var(--background)] border-b-[1px] border-[var(--foreground)] w-full h-12 text-[var(--light-color)] font-extrabold flex items-center justify-between px-10">
                {/* LEFT */}
                <h1
                    onClick={() => HandlePageChange("main")}
                    className="cursor-pointer">
                    N A M E . S T O R E
                </h1>

                {/* MID */}
                <div className="relative flex items-center px-4 outline-2 outline-[var(--light-color)] rounded-4xl w-[50%]">
                    <Image src={"/search.png"} alt="search-icon" width={15} height={15}
                        className="bg-blue absolute " />
                    <input className="w-full pl-8 px-2 py-0.5 outline-none font-normal" type="search" placeholder="Search . . ." />
                </div>

                {/* RIGHT */}
                <div className="flex gap-5 items-center text-sm">
                    {user?.role !== "admin" ? (
                        <a
                            onClick={() => HandlePageChange("pesanan")}
                            className="hover:border-b-2 cursor-pointer px-2 ease-in-out duration-65 transition-all">
                            Cek Pesanan
                        </a>
                    ) : (
                        <a
                            onClick={() => HandlePageChange("admin-control")}
                            className="hover:border-b-2 cursor-pointer px-2 ease-in-out duration-65 transition-all">
                            Admin Control
                        </a>
                    )}
                    {!user ? (
                        <a
                            onClick={() => setIsLogReg(true)}
                            className="bg-green-400 w-44 py-1 text-center rounded-2xl cursor-pointer text-white hover:opacity-70">
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
            </AnimatePresence>
        </>


    )
}