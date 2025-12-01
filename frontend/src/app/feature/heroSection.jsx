

import Image from "next/image"
import { useState, useEffect } from "react";
import { Banner } from "../api/bannerApi";

export default function HeroSection() {

    const [banner, setBanner] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const data = await Banner()

                if(!Array.isArray(data)) {
                    setBanner([])
                    return
                }
                setBanner(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBanner();
    }, []);

    return (
        <div className="w-full h-full flex gap-4 py-4 scroll-smooth overflow-auto border-b border-[var(--foreground)] [&::-webkit-scrollbar]:hidden">
            <div className=" w-fit h-full flex gap-4 animate-[var(--animated-scroll-slider)] text-black">
                {banner.map((data) => (
                    <div
                        key={data.id}
                        className="h-full flex flex-[0_0_30em] items-center justify-center ">
                        <Image
                            src={`data:image/jpeg;base64,${data.image}`}
                            width={100}
                            height={100}
                            alt="banner"
                            className="w-full h-full rounded-4xl border-4 border-[var(--light-color)] shadow-[0px_0px_5px_0px_#ffffff] cursor-pointer "
                        />
                    </div>
                ))}

            </div>
            <div aria-hidden className="w-fit h-full flex gap-4 animate-[var(--animated-scroll-slider)] text-black">
                {banner.map((data) => (
                    <div
                        key={data.id}
                        className="h-full flex flex-[0_0_30em] items-center justify-center">
                        <Image
                            src={`data:image/jpeg;base64,${data.image}`}
                            width={100}
                            height={100}
                            alt="banner"
                            className="w-full h-full rounded-4xl border-4 border-[var(--light-color)] shadow-[0px_0px_5px_0px_#ffffff] cursor-pointer "
                        />
                    </div>
                ))}

            </div>
        </div>
    )

}