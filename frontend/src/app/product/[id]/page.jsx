'use client'
import { getProductById } from "@/lib/api/product/product.api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StepBack } from "lucide-react"
import Footer from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import Loading from "@/app/components/Loading";
import OrderSummary from "@/app/product/[id]/components/OrderSummary";
import SummaryPreview from "@/app/product/[id]/components/SummaryPreview";
import { orderProduct as Order } from "./api/purchase.api";

export default function Product({ params }) {

    const [gameUID, setGameUID] = useState('')
    const [productData, setProductData] = useState(null)
    const [packSelected, setPackSelected] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [priceSelected, setPriceSelected] = useState(null)
    const [SummaryData, setSummaryData] = useState(null)

    const { id } = React.use(params)

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            const res = await getProductById(id)
            setProductData(res.data)
        }
        fetchData()
    }, [id])

    const orderProduct = async () => {
        if (!packSelected || !paymentMethod) return;
        try {
            const data = await Order(packSelected.id, packSelected.name, paymentMethod);
            setSummaryData(data.chargeResponse);
        } catch (error) {
            console.error("Error ordering product:", error);
        }
    }

    const EWallet = [
        { name: "dana", logo: "/dana.png" },
        { name: "ovo", logo: "/ovo.png" },
        { name: "gopay", logo: "/gopay.png" },
        { name: "shopeepay", logo: "/shopee.png" },
    ]

    if (!productData) {
        return (
            <main>
                <div className="w-full h-screen flex pt-26 gap-5 justify-center text-[var(--light-color)]">
                    <Loading />
                </div>
            </main>
        );
    }

    // EWallet Fee
    const paymentFee = {
        gopay: 2 / 100,
        ovo: 3 / 100,
        dana: 2.5 / 100,
        shopeepay: 3.5 / 100,
    }

    const calculatePrice = (price, method) => {
        if (!price || !method) return null;
        const fee = price * (paymentFee[method] || 0)
        const total = Number(price) + fee
        return { fee, total }
    }

    return (
        <div className="text-[var(--light-color)]">
            <Navbar />
            <div className="w-full min-h-screen h-fit flex flex-col md:flex-row py-20 gap-10 px-5 md:px-10 lg:px-20">
                <div className="w-full md:w-1/3 h-fit flex flex-col gap-5">
                    <a href={"/"}
                        className="w-fit text-sm flex gap-2 text-[var(--light-color)] hover:opacity-55 cursor-pointer">
                        <StepBack />
                        <span className="font-bold">Back to home</span>
                    </a>
                    <div className="flex gap-5">
                        <Image src={`data:image/*;base64,${productData.image}`} width={100} height={100} alt="items-image"
                            className="relative w-32 h-48 md:w-52 md:h-70 lg:w-70 lg:h-96 rounded-xl object-cover" />

                        <div className="md:hidden flex flex-col gap-2">
                            <h2 className="text-xl font-bold">{productData.name}</h2>
                            <p className=" px-5 text-sm opacity-60 ">
                                Top Up murah dan terpercaya hanya di NAME.STORE. Follow media social kami untuk mendapatkan informasi tentang promo-promo kami.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative w-full md:w-2/3 h-fit flex flex-col gap-3">
                    <div className="hidden md:flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{productData.name}</h2>
                        <p className=" px-5 text-sm opacity-60 ">
                            Top Up murah dan terpercaya hanya di NAME.STORE. Follow media social kami untuk mendapatkan informasi tentang promo-promo kami.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-0.5 md:mt-5">
                        <a className="px-3 py-1 bg-[var(--light-color)] text-[var(--background)] rounded-md">Game UID</a>
                        <span>:</span>
                        <input type="text" placeholder="1234567890" value={gameUID} onChange={(e) => setGameUID(e.target.value)} className="w-40 sm:w-80 p-1 outline-none border-b-2"></input>
                    </div>
                    <hr className="h-0.5 bg-[var(--light-color)] border-none rounded-full opacity-50" />

                    {/* List Pack  */}
                    <div className="text-black bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 outline-2 outline-white rounded-xl p-3">
                        <a className="ml-5 font-extrabold">- Packs</a>
                        <ul className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {productData.productPacks.length === 0 && (
                                <li className="text-sm opacity-50">No packs available</li>
                            )}
                            {productData.productPacks.map((pack) => (
                                <li
                                    key={pack.id}
                                    onClick={() => { setPackSelected(pack) }}
                                    className="px-3 bg-orange-900 outline-1 outline-white text-sm wrap-break-word rounded-md cursor-pointer hover:opacity-75 ease-in-out duration-75 transition-all">
                                    <div className="w-full flex justify-between my-1 py-0.5 text-white opacity-50">
                                        <a>{pack.name}</a>
                                        <a>Rp. {pack.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</a>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    </div>

                    {/* Payment */}
                    <div className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 outline-2 outline-white rounded-xl p-3">
                        <a className="ml-5 font-extrabold text-black">- Payments ( ! this is sandbox, looks description )</a>
                        <ul className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  flex-wrap gap-2 text-black">
                            {EWallet.map((items) => {
                                const price = packSelected?.price || 0;
                                const calc = calculatePrice(price, items.name)
                                return (
                                    <li
                                        key={items.name}
                                        onClick={() => {
                                            setPaymentMethod(items.name);
                                            setPriceSelected(calc?.total)
                                        }}
                                        className="flex justify-between items-center px-3 p-1 bg-white text-sm wrap-break-word rounded-md cursor-pointer hover:opacity-75 ease-in-out duration-75 transition-all">

                                        <img src={items.logo} alt={`${items.name},-logo`} className="w-fit h-5 object-cover my-1" />
                                        {calc && (
                                            <a>
                                                {calc.total.toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                })}
                                            </a>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <hr className="h-0.5 bg-[var(--light-color)] border-none rounded-full opacity-50" />

                    {/* Order Data */}
                    <SummaryPreview productData={productData} gameUID={gameUID} packSelected={packSelected} paymentMethod={paymentMethod} priceSelected={priceSelected} />

                    {/* Order Button */}
                    <div className="flex flex-col items-end md:pr-5">
                        <button
                            onClick={orderProduct}
                            className="w-fit px-5 py-2 bg-green-600 rounded-full text-white font-bold hover:opacity-75 ease-in-out duration-75 transition-all cursor-pointer">
                            Order Now
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className={`${SummaryData ? 'block' : 'hidden'} fixed top-0 left-0  w-full h-full mt-10`}>
                        <OrderSummary orderData={SummaryData} gameUID={gameUID} productData={packSelected} setSummaryData={setSummaryData} />
                    </div>
                    <hr className="h-0.5 bg-[var(--light-color)] border-none rounded-full opacity-50" />
                </div>

            </div>
            <Footer />
        </div>
    );
}
