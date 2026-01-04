import { AddPack } from "@/lib/api/product/product.api";
import { CircleX } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddPackForm({ setShowPackForm, product }) {

    const [packName, setPackName] = useState('')
    const [packPrice, setPackPrice] = useState('')

    const handleClear = () => {
        setPackName(''),
        setPackPrice('')
    }

    const handleSubmit = async () => {

        const formData = new FormData()
        formData.append('id', product.id)
        formData.append('name', packName)
        formData.append('price', packPrice)

        const res = await AddPack(formData)

        if(!res.success) {
            console.error(res.message)
            toast.error(res.message)
            return
        }
        toast.success(res.message)
        handleClear()
    }


    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <div
                onClick={() => setShowPackForm(false)}
                className="absolute w-full h-full bg-black/60 backdrop-blur-xs"></div>

            <div className="relative flex flex-col items-center z-10 w-1/2 h-fit bg-[var(--light-color)] text-[var(--background)] p-10 rounded-4xl">

                <div className="absolute top-0 right-0 hover:bg-red-500 rounded-full m-2 opacity-80">
                    <CircleX size={35} onClick={() => setShowPackForm(false)} className="cursor-pointer text-red-500 hover:text-white transition-all ease-in duration-100" />
                </div>

                <div className="px-4 py-1 border-b-2 ">
                    <a className="text-[var(--background)] text-2xl font-bold">Add Pack</a>
                </div>

                <div className="px-2 py-1  mt-1">
                    <a className="text-[var(--background)]">{product.name}</a>
                </div>
                <form className="w-full flex flex-col gap-4 mt-10">
                    <div className="flex gap-2 rounded-md">
                        <label htmlFor="name" className="min-w-28 px-3 py-2 flex items-center bg-[var(--background)] text-[var(--light-color)] rounded-md">Pack Name</label>
                        <input type="text" id="name" placeholder="Pack Name" value={packName} onChange={(e) => setPackName(e.target.value)} className="w-full text-[var(--background)] px-3 py-1 border-b-2 border-[var(--background)] outline-none" />
                    </div>
                    <div className="flex gap-2 rounded-md">
                        <label htmlFor="name" className="min-w-28 px-3 py-2 flex items-center bg-[var(--background)] text-[var(--light-color)] rounded-md">Price</label>
                        <input type="number" id="price" placeholder="Price" value={packPrice} onChange={(e) => setPackPrice(e.target.value)} className="w-full text-[var(--background)] px-3 py-1 border-b-2 border-[var(--background)] outline-none" />
                    </div>

                    <div className="flex flex-col gap-1 text-[var(--light-color)] font-bold ">
                        <input type="reset" className="bg-red-500 py-0.5 px-3 items-center rounded-md  cursor-pointer opacity-50 hover:opacity-100" />
                        <button onClick={handleSubmit} type="button" className="bg-green-500 py-2 px-3 items-center rounded-md cursor-pointer opacity-50 hover:opacity-100" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}