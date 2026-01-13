
'use client'
import Image from "next/image"
import Squares from "./Background/Squares"
import { GetBanner } from "../../lib/api/banner/banner.api"
import { useEffect, useState } from "react"
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, scale: '2.5', position: 'absolute', right: '40px'}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, scale: '2.5', position: 'absolute', left: '40px', zIndex: '10' }}
            onClick={onClick}
        />
    );
}

export default function HeroSection() {

    const [banner, setBanner] = useState([])

    useEffect(() => {
        const fetchBanner = async () => {
            const res = await GetBanner()
            setBanner(res || [])
        }
        fetchBanner()
    }, [])

    if (banner.length == 0) return null

    const settings = {
        centerMode: true,
        centerPadding: "380px",
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    centerPadding: "150px",

                },
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: "40px",

                },
            },
            {
                breakpoint: 480,
                settings: {
                    centerPadding: "10px",
                },
            },
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ul style={{
                    display: "flex",
                    gap: "10px",
                }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "15px",
                    height: "15px",
                    display: "flex",
                    borderRadius: "100%",
                    outline: "1px solid white",
                }}
            ></div>
        )
    };

    return (
        <div className="relative slider-container pb-10 border-b-1">
            <div className="">
                <Slider {...settings}>
                    {banner.map((data) => (
                        <div
                            key={data.id}
                            className="px-2 py-4">
                            <div className="aspect-video cursor-pointer">
                                <Image
                                    src={data.image ? `data:image/jpeg;base64,${data.image}` : "/noimg.png"}
                                    width={100}
                                    height={100}
                                    alt="banner"
                                    unoptimized
                                    className="w-full h-full rounded-xl shadow-[0px_0px_5px_0px_#ffffff] select-none"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )

}

