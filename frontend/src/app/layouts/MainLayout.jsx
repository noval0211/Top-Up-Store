import Image from "next/image"
import "./index.css"
import { useEffect, useState } from "react"
export default function dashboard() {

    const [products, setProducts] = useState([]);
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/product/get")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/banner/get")
            .then(res => res.json())
            .then(data => setBanner(data))
    }, []);


    return (
        <div className="w-full flex pt-12 flex-col gap-10 items-center text-[var(--light-color)]">

            {/* ADS / PROMO */}
            <section className="bg-[var(--light-color)] w-full h-[250px] flex gap-0.5 py-0.5 scroll-smooth overflow-auto [&::-webkit-scrollbar]:hidden">

                <div className="w-fit h-full flex gap-0.5 animate-[var(--animated-scroll-slider)] text-black">
                    {banner.map((data) => (
                        <div
                        key={data.id} 
                        className="bg-white h-full flex flex-[0_0_30em] items-center justify-center">
                            <Image 
                                src={`data:image/jpeg;base64,${data.image}`}
                                width={100}
                                height={100}
                                alt="banner"
                                className="w-full h-full"
                            />
                        </div>
                    ))}

                </div>
                <div aria-hidden className="w-fit h-full flex gap-0.5 animate-[var(--animated-scroll-slider)] text-black">
                    {banner.map((data) => (
                        <div
                        key={data.id} 
                        className="bg-white h-full flex flex-[0_0_30em] items-center justify-center">
                            <Image 
                                src={`data:image/jpeg;base64,${data.image}`}
                                width={100}
                                height={100}
                                alt="banner"
                                className="w-full h-full"
                            />
                        </div>
                    ))}

                </div>

                
            </section>

            <section className="w-full h-fit flex flex-col gap-10 ">
                {/* LIST */}
                <div className="flex justify-center px-2 py-1 rounded-sm text-sm list-none">
                    <li className="w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75">
                        <a>Games</a>
                    </li>
                    <li className="w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75">
                        <a>Voucher</a>
                    </li>
                    <li className="w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 ">
                        <a>Other</a>
                    </li>
                </div>

                {/* ITEM LISTS */}
                <div className="w-full min-h-screen max-h-fit grid grid-cols-7 px-5 gap-5 list-none text-sm">
                    {products.map((p) => (
                        <li
                            key={p.id}
                            className="relative w-40 h-52 group hover:scale-110 ease-in duration-100 transition-all outline-2 outline-[var(--light-color)] rounded-xl cursor-pointer
                            xs:w-20 xs:h-26">
                            <Image
                                src={`data:image/jpeg;base64,${p.image}`}
                                width={100}
                                height={100}
                                alt="items-image"
                                className="relative w-full h-full rounded-xl" />
                            <div className="absolute bottom-0 bg-[var(--foreground)] w-full h-13 flex items-center justify-center outline-2 outline-[var(--light-color)] group-hover:h-0 group-hover:outline-none ease-in-out duration-100 transition-all rounded-b-xl overflow-hidden">
                                <a className="text-wrap text-center px-2 leading-tight">{p.name}</a>
                            </div>
                        </li>

                    ))}

                </div>
            </section>

            <footer className="w-full h-fit flex flex-col gap-2 items-center justify-center bg-[var(--foreground)] ">

                <div className="flex p-10 gap-20">
                    <div className="w-[50%] h-fit flex flex-col gap-5 text-sm">
                        <h2 className="text-center text-lg font-bold border-b-2 pb-2 ">About Store</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo cum reprehenderit nesciunt, velit adipisci aut eveniet quibusdam laboriosam facere, hic in? Nobis mollitia perspiciatis, tempora aliquid voluptate repudiandae earum quas.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo cum reprehenderit nesciunt, velit adipisci aut eveniet quibusdam laboriosam facere, hic in? Nobis mollitia perspiciatis, tempora aliquid voluptate repudiandae earum quas.</p>
                    </div>
                    <div className="w-[50%] h-fit flex flex-col gap-5 text-sm">
                        <h2 className="text-center text-lg font-bold border-b-2 pb-2 ">Games</h2>
                        <ul className="w-full grid grid-flow-col grid-rows-2 gap-3">
                            <li className="border-b-1 p-1">Mobile Legends: Bang Bang</li>
                            <li className="border-b-1 p-1">Pubg</li>
                            <li className="border-b-1 p-1">Roblox</li>
                            <li className="border-b-1 p-1">Genshin Impact</li>
                            <li className="border-b-1 p-1">Honkai star Rail</li>
                            <li className="border-b-1 p-1">Zenless Zone Zero</li>
                        </ul>
                    </div>

                </div>
                <div className="text-white">
                    <p> Copyright &copy; 2025 NAME.STORE</p>
                </div>
            </footer>
        </div>
    )
}