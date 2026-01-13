'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react'
import Pesanan from '../Pesanan';
export default function NavbarPesanan() {

    const [showpesanan, setshowPesanan] = useState(false);

    return (
        <>
            <div
                onClick={() => setshowPesanan(true)}
                className="hidden lg:flex flex-col items-center lg:flex-row hover:border-b-2 cursor-pointer px-2 py-0.5 ease-in-out duration-65 transition-all">
                <span>Cek</span>
                <span>Pesanan</span>
            </div>
            
            <AnimatePresence>
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