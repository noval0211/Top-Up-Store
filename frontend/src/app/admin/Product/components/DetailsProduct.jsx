import { useState, useEffect } from "react";
import { getProductById } from "@/lib/api/product/product.api";
import { CircleX, SquarePen, Plus, Trash } from "lucide-react"
import Image from "next/image"

export default function DetailsProduct({ selectProduct, previewProduct, setPreviewProduct, setShowPackForm }) {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!selectProduct) return
        async function fetchData() {
            try {
                const data = await getProductById(selectProduct)
                console.log(data)
                setProducts(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [selectProduct]);


    return (
        <>
            {products && (
                <div className={`sticky top-25 max-w-100 min-w-100 h-fit ${previewProduct ? 'flex' : 'hidden'} transition-all ease-in-out duration-1000 flex-col gap-3 items-center px-5 py-10 bg-[var(--light-color)] text-[var(--background)] rounded-2xl`}>
                    <div className="absolute top-0 right-0 hover:bg-red-500 rounded-full m-2 opacity-80">
                        <CircleX size={35} onClick={() => setPreviewProduct(false)} className="cursor-pointer text-red-500 hover:text-white transition-all ease-in duration-100" />
                    </div>
                    <div className="w-30 h-40 bg-[var(--background)] rounded-md shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_1)]">
                        <Image src={`data:image/jpeg;base64,${products.image}`}
                            width={100}
                            height={100}
                            alt="items-image"
                            className="relative w-full h-full rounded-md object-cover" />
                    </div>
                    <div className="flex text-center p-1 px-3 rounded-md bg-[var(--background)] text-[var(--light-color)] min-w-50 max-w-[90%]">
                        <a className='w-full truncate'>
                            {products.name} 
                        </a>
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-5 ">
                        <div className="flex w-full items-center justify-between pl-5">
                            <a className="">
                                List Pack
                            </a>
                            <div 
                            onClick={() => setShowPackForm(true)}
                            className="w-fit bg-orange-300 py-1 px-2 rounded-md cursor-pointer flex hover:opacity-80">
                                <Plus />
                                <span>Add Pack</span>
                            </div>
                        </div>
                        <hr></hr>
                        <ul className="flex flex-col gap-2">
                            <li className="flex gap-2 p-2 rounded-md bg-[var(--background)] text-[var(--light-color)]">
                                <div className="px-1 pr-2 border-r-2 border-[var(--light-color)]">ID</div>
                                <div className="w-[70%] max-w-[70%] truncate">Product Name</div>
                                <div className="w-[30%] max-w-[30%] truncate">Price</div>
                                <SquarePen className="text-green-500 cursor-pointer hover:opacity-60" />
                                <Trash className="text-red-500 cursor-pointer hover:opacity-60" />
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}