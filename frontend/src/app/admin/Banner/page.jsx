"use client"

import { useState, useRef } from "react"
import InputForm from "@/app/components/InputForm";
import { AddBanner } from "@/lib/api/banner/banner.api";
export default function BannerPromo() {

    const [bannerImage, setBannerImage] = useState(null);
    const fileInputRef = useRef(null)

    const clearInput = () => {
        setBannerImage(null)
        
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const addBanner = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append('image', bannerImage);

            const response = await AddBanner(formData)

            if (response.ok) clearInput();

        } catch (err) {
            console.log("Failed connect to server :" + err.message)
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-5 items">

            <div className="w-full flex gap-2 justify-center">
                <h2 className="text-2xl font-extrabold border-b-4 w-fit px-3 py-1">B a n n e r</h2>
                <h2 className="text-2xl font-extrabold border-b-4 w-fit px-3 py-1">P r o m o</h2>
            </div>

            <div className="w-full flex flex-col items-center justify-between">
                <div className="w-full h-full flex flex-col items-center">
                    <div className="flex flex-col items-center bg-[var(--light-color)] outline-2 outline-[var(--light-color)] rounded-xl hover:scale-110 ease-in duration-100 transition-all ">
                        <h3 className="font-bold text-xl text-[var(--background)]">Preview</h3>
                        <div className="relative group hover:scale-100">
                            <div className="w-40 h-52 bg-[var(--background)] outline-2 outline-[var(--light-color)] rounded-xl cursor-pointer">
                                {bannerImage ? (
                                    <img
                                        src={URL.createObjectURL(bannerImage)}
                                        alt="Preview"
                                        className="w-40 h-52 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <a className="text-2xl">?</a>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-fit p-2 mt-5">
                    <form onSubmit={addBanner}
                        className="flex flex-col gap-5 w-[400px] ">
                        <InputForm
                            position={"flex"}
                            rounded={"none"}
                            labelW={"medium"}
                            label={"Image"}
                            id={"banner-image"}
                            name={"image"}
                            type={"file"}
                            inputRef={fileInputRef}
                            placeholder={"banner-image"}
                            onChange={(e) => setBannerImage(e.target.files[0])} />

                        <div className="flex gap-2 justify-end text-[var(--background)] font-bold">
                            <input
                                onClick={clearInput}
                                type="button"
                                value="Reset"
                                className="bg-[var(--light-color)] px-5 py-1 rounded-2xl cursor-pointer"
                            />
                            <input
                                type="submit"
                                value="Add"
                                className="bg-[var(--light-color)] px-5 py-1 rounded-2xl cursor-pointer"
                            />
                        </div>
                    </form>
                </div>


            </div>


        </div>
    )
}