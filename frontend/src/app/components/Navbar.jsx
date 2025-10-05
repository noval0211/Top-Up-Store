import Image from "next/image"
export default function Navbar() {
    return(
        <div className="z-10 fixed top-0 bg-[var(--background)] border-b-[1px] border-[var(--foreground)] w-full h-12 text-[var(--light-color)] font-extrabold flex items-center justify-between px-10">
            {/* LEFT */}
            <h1>N A M E . S T O R E</h1>
            
            {/* MID */}
            <div className="relative flex items-center px-4 outline-2 outline-[var(--light-color)] rounded-4xl w-[50%]">
                <Image src={"/search.png"} alt="search-icon" width={15} height={15} 
                className="bg-blue absolute "/>
                <input className="w-full pl-8 px-2 py-0.5 outline-none font-normal" type="search" placeholder="Search . . ."/>
            </div>

            {/* RIGHT */}
            <div className="flex gap-5 items-center">
                <a className="hover:border-b-2 cursor-pointer px-2 ease-in-out duration-65 transition-all">Cek Pesanan</a>
                <a className="bg-green-400 px-5 py-1 rounded-2xl cursor-pointer text-white ">Register / Login</a>
            </div>
        </div>
    )
}