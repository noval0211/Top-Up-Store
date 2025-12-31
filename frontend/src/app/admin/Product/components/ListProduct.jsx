import { useState } from "react";
import { DeleteProductById } from "@/lib/api/product/product.api";
import { Settings, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function ListProduct({
    currentPageData,
    setSelectProduct,
    setPreviewProduct,
    previewProduct,
    selectProduct,
    page, limit
}) {
    const [statusProduct, setStatusProduct] = useState(false)

    const deleteProductById = async (id) => {
        const res = await DeleteProductById(id)
        if (res.error) {
            toast.error(res.message);
            return
        }
        toast.success(res.message)
        location.reload()
    }

    const handleProduct = (productId) => {
        setSelectProduct(productId)
        if (previewProduct && selectProduct == productId) {
            setPreviewProduct(false)
        } else {
            setPreviewProduct(true)
        }
    }

    const toggleStatus = (productId) => {
        setStatusProduct(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }))
    }

    return (
        <div className="flex justify-between">
            <ul className="flex flex-col gap-3 w-full">
                {currentPageData.map((items, index) => (
                    <li key={index} className="flex gap-3">
                        <div className="outline-2 p-2 text-center min-w-10 flex items-center justify-center max-w-10 rounded-md truncate">{(page - 1) * limit + index + 1}</div>
                        <div className='w-full flex items-center relative'>
                            <div
                                onClick={() => handleProduct(items.id)}
                                className="z-10 flex items-center w-full gap-3 outline-2 p-2 rounded-md cursor-pointer hover:opacity-50 transition-all ease-in duration-100">
                                <Settings />
                                <div className="border-l-2 w-full flex items-center h-8 pl-3 truncate">
                                    {items.name}
                                </div>
                            </div>
                            <div className="z-20 absolute right-2 h-full flex items-center gap-5">
                                <div
                                    onClick={() => toggleStatus(items.id)}
                                    className='relative w-12 h-[50%] p-0.5 outline-2 outline-[var(--light-color)] rounded-full flex items-center cursor-pointer'>
                                    <div className={`absolute  ${!statusProduct[items.id] ? 'bg-red-500 left-0.5' : 'bg-green-500 right-0.5'} p-2.5 w-fit rounded-full`}></div>
                                </div>
                                <Trash className="text-red-500 cursor-pointer" onClick={() => deleteProductById(items.id)} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}