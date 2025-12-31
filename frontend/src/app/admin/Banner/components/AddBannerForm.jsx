import { useState, useRef } from "react"
import { AddBanner } from "@/lib/api/banner/banner.api";
import InputForm from "@/app/components/InputForm";

export default function AddBannerForm({ setShowForm, setReload }) {

    const [bannerImage, setBannerImage] = useState(null);
    const fileInputRef = useRef(null)

    const clearInput = () => {
        setBannerImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setShowForm(false)
        setReload(prev => !prev)
    }

    const addBanner = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', bannerImage);
            const response = await AddBanner(formData)

            if (response) clearInput();
        } catch (err) {
            console.log("Failed connect to server :" + err.message)
        }
    }

    return (
        <>
            <div className='w-full h-full flex flex-col items-center justify-center'>

                <div className="flex flex-col items-center bg-[var(--light-color)] outline-2 outline-[var(--light-color)] rounded-xl ">
                    <h3 className="font-bold text-xl text-[var(--background)]">
                        Preview
                    </h3>
                    <div className="relative group hover:scale-100">
                        <div className="w-96 aspect-video bg-[var(--background)] outline-2 outline-[var(--light-color)] cursor-pointer rounded-b-xl">
                            {bannerImage ? (
                                <img
                                    src={URL.createObjectURL(bannerImage)}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-b-xl"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <a className="text-2xl">?</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-fit mt-5  rounded-2xl">
                    <form onSubmit={addBanner}
                        className="flex flex-col gap-5 w-[400px] ">
                        <InputForm
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
        </>
    )
}