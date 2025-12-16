'use client'
import { useState, useEffect } from "react";
import Profile from "../Profile"
import Login from "@/app/auth/LogRegForm";
import { motion, AnimatePresence } from 'motion/react'

export function NavbarUser({ user }) {

    const [isLogReg, setIsLogReg] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        setIsLogReg(false)
    }, [])

    return (
        <>
            {user ? (
                <div className="relative w-44 py-1 text-center rounded-2xl cursor-pointer text-[var(--background)]">
                    {showProfile && (
                        <div className="absolute top-0 w-full z0">
                            <Profile />
                        </div>
                    )}

                    <div className="z-0 w-fit flex items-center">
                        <span
                            className="bg-[var(--light-color)] text-[1rem] font-normal px-3 pr-5 -mr-3 rounded-l-2xl">
                            {user.role}
                        </span>
                        <div
                            onClick={() => setShowProfile(true)}
                            className="truncate w-30 max-w-30 bg-[var(--light-color)] text-[.9rem] px-3 py-1 rounded-2xl outline-2 outline-[var(--background)] transition-all ease-in duration-150 hover:bg-[var(--background)] hover:text-[var(--light-color)] hover:outline-[var(--light-color)] ">
                            {user.name}
                        </div>
                    </div>

                </div>
            ) : (
                <button
                    onClick={() => setIsLogReg(true)}
                    className="bg-green-400 w-44 py-2 text-center rounded-2xl cursor-pointer text-white hover:opacity-70">
                    Register / Login
                </button>
            )}



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
                                window.location.reload()
                            }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}