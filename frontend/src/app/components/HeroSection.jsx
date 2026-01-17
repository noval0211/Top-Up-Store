
'use client'
import Image from "next/image"
import { GetBanner } from "../../lib/api/banner/banner.api"
import { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'

export default function HeroSection() {

    const [banner, setBanner] = useState([])
    const [activeDot, setActiveDot] = useState(0)

    const swiperRef = useRef(null)

    useEffect(() => {
        const fetchBanner = async () => {
            const res = await GetBanner()
            setBanner(res || [])
        }
        fetchBanner()
    }, [])

    if (banner.length == 0) return null

    const infiniteBanner = [...banner, ...banner, ...banner]

    const goToSlide = (idx) => {
        const middle = banner.length
        swiperRef.current?.slideTo(middle + idx)
    }

    return (
        <div className="px-2 sm:px-0">
            <div className="relative">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    centeredSlides
                    allowTouchMove={false}
                    initialSlide={banner.length}
                    loop
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                        setActiveDot(swiper.realIndex % banner.length)
                    }}

                    breakpoints={{
                        0: {
                            slidesPerView: 1.1,
                            spaceBetween: 40
                        },
                        640: {
                            slidesPerView: 2,
                        }
                    }}
                >
                    {infiniteBanner.map((data, index) => (
                        <SwiperSlide
                            key={`${data.id}-${index}`}>
                            {({ isActive }) => (
                                <div className={`${isActive ? 'cursor-pointer' : 'scale-y-[80%] brightness-[10%]'} scale-y-90 aspect-video `}>
                                    <Image
                                        src={data.image ? `data:image/jpeg;base64,${data.image}` : "/noimg.png"}
                                        width={100}
                                        height={100}
                                        alt="banner"
                                        unoptimized
                                        className="w-full h-full rounded-xl shadow-[0px_0px_5px_0px_#ffffff] select-none"
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute z-10 left-2 sm:left-1/5 top-1/2 -translate-y-1/2 bg-orange-400 p-1 md:p-2 rounded-md hover:opacity-70 cursor-pointer">
                    <ChevronLeft color="white" />
                </button>

                <button onClick={() => swiperRef.current?.slideNext()}
                    className="absolute z-10 right-2 sm:right-1/5 top-1/2 -translate-y-1/2 bg-orange-400 p-1 md:p-2 rounded-md hover:opacity-70 cursor-pointer">
                    <ChevronRight color="white" />
                </button>
            </div>

            <div className="flex justify-center gap-2 mb-5">
                {banner.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-5 h-3 rounded-full transition
              ${activeDot === idx ? 'bg-orange-500 scale-110' : 'bg-gray-400'} cursor-pointer`}
                    />
                ))}
            </div>
        </div>
    )

}

