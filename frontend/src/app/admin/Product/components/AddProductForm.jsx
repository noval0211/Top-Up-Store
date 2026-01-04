'use client'
import Image from "next/image"
import { CircleX } from "lucide-react"
import { useState } from "react"
import { AddProduct } from "@/lib/api/product/product.api"
import toast from "react-hot-toast"
export default function AddProductForm({ setShowAddForm, setReload }) {

    const [productName, setProductName] = useState('')
    const [producType, setProductType] = useState('games')
    const [producImage, setProductImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleReset = () => {
        setProductName('')
        setProductType('games')
        setProductImage(null)
        setPreviewImage(null)

        document.getElementById("previewImage").value = null
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProductImage(file);

        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
    };

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("name", productName)
        formData.append("type", producType)
        formData.append("image", producImage)

        const res = await AddProduct(formData)

        if (!res.success) {
            console.error(res.message)
            toast.error(res.message)
            return
        }

        toast.success(res.message)
        handleReset()
        setShowAddForm(false)
        setReload(prev => !prev)
    }

    return (
        <div className={`sticky top-25 max-w-100 min-w-100 h-fit transition-all ease-in-out duration-1000 flex flex-col gap-3 items-center px-5 py-10 bg-[var(--light-color)] text-[var(--background)] rounded-2xl`}>

            <div className="absolute top-0 right-0 hover:bg-red-500 rounded-full m-2 opacity-80">
                <CircleX size={35} onClick={() => setShowAddForm(false)} className="cursor-pointer text-red-500 hover:text-white transition-all ease-in duration-100" />
            </div>
            <div className=" rounded-md bg-[var(--background)] text-[var(--light-color)] flex flex-col items-center justify-center outline-1 outline-background shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_1)]">
                <a>Preview</a>
                <Image src={previewImage || "/default.png"}
                    width={100}
                    height={100}
                    alt="items-image"
                    className="relative w-30 h-40 rounded-md object-cover" />
            </div>

            <div className="flex flex-col gap-1 ">
                <div className="flex bg-[var(--background)] text-[var(--light-color)] p-1 rounded-md">
                    <div className="w-30">Product Name</div>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" className="bg-[var(--light-color)] text-[var(--background)] rounded-md outline-none px-2" />
                </div>
                <div className="flex bg-[var(--background)] text-[var(--light-color)] p-1 rounded-md">
                    <div className="w-30 ">Type</div>
                    <select value={producType} onChange={(e) => setProductType(e.target.value)} className="w-40 bg-[var(--light-color)] text-[var(--background)] rounded-md px-1 outline-none cursor-pointer">
                        <option value={"games"}>Games</option>
                        <option value={"voucher"}>Voucher</option>
                        <option value={"other"}>Other</option>
                    </select>
                </div>
                <div className="flex bg-[var(--background)] text-[var(--light-color)] p-1 rounded-md">
                    <div className="w-30">Product Name</div>
                    <input type="file" id="previewImage" onChange={handleImageChange} placeholder="Product Name" className="w-50 truncate text-sm bg-[var(--light-color)] text-[var(--background)] rounded-md outline-none px-2" />
                </div>

                <div className="flex justify-center gap-2 text-[var(--light-color)] mt-5">
                    <input type="reset" onClick={handleReset} className="bg-red-500 w-fit px-3 items-center rounded-md cursor-pointer hover:opacity-70" />
                    <input type="submit" onClick={handleSubmit} className="bg-green-500 w-fit px-3 items-center rounded-md cursor-pointer hover:opacity-70" />
                </div>
            </div>
        </div>
    )
}