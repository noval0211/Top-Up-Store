

import Image from "next/image"
import Squares from "./Background/Squares"
import { GetBanner } from "../../lib/api/bannerApi"

export default async function HeroSection() {

    const banner = await GetBanner()

    return (
        <div className="relative w-full h-full">
            <div className="z-0 absolute w-full h-full">
                <div className="absolute w-full h-full"></div>
                <Squares
                    speed={0.2}
                    squareSize={93}
                    direction='right' // up, down, left, right, diagonal
                    borderColor='#000'
                    hoverFillColor='#222'
                />
            </div>
            <div className="w-full h-full flex gap-6 py-4 scroll-smooth overflow-auto border-b-2  border-[var(--foreground)] [&::-webkit-scrollbar]:hidden">

                <div className=" w-fit h-full flex gap-6 animate-[var(--animated-scroll-slider)] text-black">
                    {banner.map((data) => (
                        <div
                            key={data.id}
                            className="h-full flex flex-[0_0_30em] items-center justify-center ">
                            <Image
                                src={`data:image/jpeg;base64,${data.image}`}
                                width={100}
                                height={100}
                                alt="banner"
                                className="w-full h-full rounded-xl shadow-[0px_0px_5px_0px_#ffffff] select-none"
                            />
                        </div>
                    ))}

                </div>
                <div aria-hidden className="w-fit h-full flex gap-6 animate-[var(--animated-scroll-slider)] text-black">
                    {banner.map((data) => (
                        <div
                            key={data.id}
                            className="h-full flex flex-[0_0_30em] items-center justify-center">
                            <Image
                                src={`data:image/jpeg;base64,${data.image}`}
                                width={100}
                                height={100}
                                alt="banner"
                                className="w-full h-full rounded-xl shadow-[0px_0px_5px_0px_#ffffff] select-none"
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )

}