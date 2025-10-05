import Image from "next/image"
export default function dashboard() {    
    return(
        <div className="w-full flex py-12 flex-col gap-10 items-center text-[var(--light-color)]">

            {/* ADS / PROMO */}
            <div className="w-full bg-black h-[250px] flex snap-x snap-mandatory space-x-1 py-1 overflow-x-hidden scroll-smooth">
                <div className="bg-white min-w-[500px] h-full snap-center flex items-center justify-center">1</div>
                <div className="bg-white min-w-[500px] h-full snap-center flex items-center justify-center">2</div>
                <div className="bg-white min-w-[500px] h-full snap-center flex items-center justify-center">3</div>
                <div className="bg-white min-w-[500px] h-full snap-center flex items-center justify-center">4</div>
                <div className="bg-white min-w-[500px] h-full snap-center flex items-center justify-center">5</div>
            </div>

            {/* LIST */}
            <ul className="flex gap-2 px-2 py-1 rounded-sm text-sm">
                <li className="w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75">
                    <a>Games</a>
                </li>
                <li className="w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75">
                    <a>Voucher</a>
                </li>
                <li className="w-30 py-1 bg-[var(--foreground)] text-center outline-2 outline-[var(--light-color)] cursor-pointer hover:opacity-75 ">
                    <a>Other</a>
                </li>
            </ul>

            {/* ITEM LISTS */}
            <div className="w-fit h-fit grid grid-cols-6 gap-10 list-none text-sm">
                
                <li className="relative w-40 h-50 group hover:scale-110 ease-in duration-100 transition-all outline-2 outline-[var(--light-color)] rounded-xl cursor-pointer">
                    <Image src={"/download.jpg"} width={100} height={100} alt="items-image"
                    className="relative w-full h-full rounded-xl"/>
                    <div className="absolute bottom-0 bg-[var(--foreground)] w-full h-13 flex items-center justify-center outline-2 outline-[var(--light-color)] group-hover:h-0 group-hover:outline-none ease-in-out duration-100 transition-all rounded-b-xl overflow-hidden">
                        <a className="text-wrap text-center px-2 leading-tight">Mobile Legends: Bang Bang</a>
                    </div>
                </li>
                
            </div>
        </div>
    )
}