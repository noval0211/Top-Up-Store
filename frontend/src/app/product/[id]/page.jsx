'use client'
import { getProductById } from "@/lib/api/productApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StepBack } from "lucide-react"
import Footer from "@/app/components/footer";

export default function Product({ params }) {

    const [productData, setProductData] = useState()
    const { id } = params

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            const data = await getProductById(id)
            setProductData(data)
        }
        fetchData()
    }, [id])

    if (!productData) {
        return (
            <main>
                <div className="w-full h-screen flex pt-26 gap-5 justify-center text-[var(--light-color)]">
                    <h1>Product not found</h1>
                </div>
            </main>
        );
    }

    return (
        <div className="text-[var(--light-color)]">
            <div className="w-full h-screen flex pt-24 gap-10 justify-center">
                <div className="w-70 h-fit flex flex-col gap-5">
                    <a
                        href={"/"}
                        className="w-fit flex gap-2 text-black hover:opacity-55">
                        <StepBack />
                        <span>Back to home</span>
                    </a>

                    <div className="bg-white w-70 h-90 rounded-xl">
                        <Image src={`data:image/jpeg;base64,${productData.image}`}
                            width={100}
                            height={100}
                            alt="items-image"
                            className="relative w-full h-full rounded-xl object-cover" />
                    </div>
                </div>
                <div className="w-170 h-fit flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{productData.name}</h2>
                        <p className=" px-5 text-sm opacity-60 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel similique consectetur hic veritatis reiciendis dolore, explicabo harum iure aliquid doloremque ducimus ullam adipisci omnis nisi, fugit incidunt, consequuntur laudantium magni.</p>
                    </div>

                    {/* List Pack  */}
                    <div>
                        <a className="pl-5">- Packs</a>
                        <ul className="p-3 flex flex-wrap gap-2">
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>

                        </ul>
                    </div>

                    {/* Payment */}
                    <div>
                        <a className="pl-5">- Payments</a>
                        <ul className="p-3 flex flex-wrap gap-2">
                            <li className="w-50 px-2 p-1 text-[var(--light-color)] text-sm wrap-break-word outline-[var(--light-color)] outline-2 rounded-md">A</li>

                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
