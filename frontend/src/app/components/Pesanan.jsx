
import Image from "next/image";

export default function Pesanan() {
    return (
        <div className="w-fit h-fit flex items-center justify-center">

            <div className="relative w-[50vw] py-1 flex items-center px-4 outline-2 outline-[var(--light-color)] rounded-4xl bg-[var(--light-color)]">
                <Image src={"/search.png"} alt="search-icon" width={15} height={15}
                    className="bg-blue absolute " />
                <input className="w-full pl-4 px-2 py-0.5 outline-none font-normal" type="search" placeholder="ID Pesanan . . ." />
            </div>
        </div>
    );
}