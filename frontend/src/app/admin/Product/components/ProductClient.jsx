'use client'

import { useState, useEffect } from "react"
import { Plus, ArrowLeft, ArrowRight } from "lucide-react"
import { getProduct } from "@/lib/api/product/product.api"
import AddProductForm from "./AddProductForm"
import DetailsProduct from "./DetailsProduct"
import { useRouter, useSearchParams } from "next/navigation"
import ListProduct from "./ListProduct"
import AddPackForm from "./AddPackForm"

export default function ProductClient() {
    const [listProduct, setListProduct] = useState([])
    const [addProduct, setAddProduct] = useState(false)
    const [selectProduct, setSelectProduct] = useState()
    const [previewProduct, setPreviewProduct] = useState(false)
    const [showPackForm, setShowPackForm] = useState(false)

    const router = useRouter()
    const searchParam = useSearchParams()
    const page = Number(searchParam.get("page")) || 1
    const limit = 5

    const total = listProduct.length
    const totalPage = Math.ceil(total / limit)

    const start = (page - 1) * limit
    const end = start + limit

    const currentPageData = listProduct.slice(start, end)

    const changePage = (page) => {
        router.push(`?page=${page}`)
    }

    useEffect(() => {
        async function FetchDataProduct() {
            const res = await getProduct()
            setListProduct(res)
        }
        FetchDataProduct();
    }, [])

    const handleAddProduct = () => {
        if (!addProduct) {
            setAddProduct(true)
            setPreviewProduct(false)
        } else {
            setAddProduct(false)
        }
    }

    return (
        <div className="relative w-full h-full p-5 px-10 flex flex-col gap-5">

            <div className="w-full flex justify-center">
                <h2 className="text-2xl font-extrabold border-b-4 w-fit px-3 py-1">p r o d u c t s</h2>
            </div>

            <div className="flex w-full gap-5">
                <div className={`w-full transition-all ease-in duration-200 flex flex-col gap-3`}>
                    <div className="flex items-center justify-between">
                        <div className="h-fit text-[var(--background)] flex gap-2 ">
                            <label className="bg-[var(--light-color)] px-3 py-0.5">Filter</label>
                            <select className="bg-[var(--light-color)] px-5 outline-none">
                                <option hidden className="outline-white outline-2">-- All --</option>
                                <option>Games</option>
                                <option>Voucher</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div
                            onClick={handleAddProduct}
                            className="text-4xl bg-orange-300 p-2 px-3 scale-75 rounded-full cursor-pointer
                     flex justify-center items-center gap-2 hover:opacity-80">
                            <Plus />
                            <span className="text-[1.25rem]">
                                Add
                            </span>
                        </div>
                    </div>

                    <ListProduct
                        currentPageData={currentPageData}
                        setSelectProduct={setSelectProduct}
                        setPreviewProduct={setPreviewProduct}
                        setAddProduct={setAddProduct}
                        previewProduct={previewProduct}
                        selectProduct={selectProduct}
                        page={page}
                        limit={limit}
                    />

                    <div className="flex gap-3 justify-center mt-5">
                        <button
                            disabled={page <= 1}
                            onClick={() => changePage(page - 1)}
                            className="bg-[var(--light-color)] text-[var(--background)] rounded-md cursor-pointer hover:opacity-80" >
                            <ArrowLeft />
                        </button>

                        <span className="outline-background outline-2 px-3 text-[var(--light-color)] rounded-md">
                            {page} / {totalPage}
                        </span>

                        <button
                            disabled={page >= totalPage}
                            onClick={() => changePage(page + 1)}
                            className="bg-[var(--light-color)] text-[var(--background)] rounded-md cursor-pointer hover:opacity-80">

                            <ArrowRight />
                        </button>
                    </div>
                </div>

                <DetailsProduct selectProduct={selectProduct} previewProduct={previewProduct} setPreviewProduct={setPreviewProduct} setShowPackForm={setShowPackForm} />

                <AddProductForm addProduct={addProduct} setAddProduct={setAddProduct} />

            </div>
            <div className={`${!showPackForm ? 'hidden' : 'flex'} absolute z-40 top-0 left-0 w-full h-full`}>
                <AddPackForm setShowPackForm={setShowPackForm}/>
            </div>
        </div>
    )
}