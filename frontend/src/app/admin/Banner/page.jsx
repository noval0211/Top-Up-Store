"use client"

import { useState } from "react"
import AddBannerForm from "./components/AddBannerForm"
import { Plus, X } from "lucide-react"
import ListBanner from "./components/ListBanner"


export default function BannerPromo() {

    const [showForm, setShowForm] = useState(false)
    const [reload, setReload] = useState(false)

    return (
        <div className="relative w-full h-full flex flex-col gap-5 items">
            <div className="flex flex-col gap-5 p-10">
                
                <div className="w-full flex gap-2 justify-center">
                    <h2 className="text-2xl font-extrabold border-b-4 w-fit px-3 py-1">B a n n e r</h2>
                </div>
                
                <div
                    onClick={() => setShowForm(true)}
                    className="flex gap-2 bg-[var(--light-color)] w-fit h-fit px-3 py-1 mt-10 text-[var(--background)] rounded-2xl cursor-pointer hover:opacity-80">
                    <a className="font-bold">Add</a>
                    <Plus />
                </div>

                {/* COMPONENT FOR LISTING BANNER*/}
                <ListBanner reload={reload} />
            </div>

            <div className={`absolute w-full h-full  ${!showForm ? 'hidden' : 'flex '} items-center justify-center  backdrop-blur-xs`}>
                <div className="relative z-10 w-fit h-fit outline-2 p-5 rounded-2xl bg-[var(--foreground)]">
                    {/* COMPONENT ADD BANNER */}
                    <AddBannerForm setShowForm={setShowForm} setReload={setReload} />
                    <div onClick={() => setShowForm(false)}
                        className="absolute top-1/2 -translate-y-1/2 -right-0 translate-x-1/2 [writing-mode:vertical-lr] font-bold px-3 py-1 bg-red-500 rounded-md cursor-pointer hover:outline-2">CLOSE</div>
                </div>
                <div onClick={() => setShowForm(false)}
                    className="absolute w-full h-full" />
            </div>

        </div>
    )
}