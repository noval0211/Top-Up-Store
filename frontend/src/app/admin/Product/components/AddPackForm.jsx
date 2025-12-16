import { CircleX } from "lucide-react";

export default function AddPackForm({ setShowPackForm }) {
    return (
        <div className="relative w-full h-full flex justify-center  items-center">
            <div
                onClick={() => setShowPackForm(false)}
                className="absolute w-full h-full bg-black opacity-50"></div>

            <div className="relative z-10 w-120 h-fit bg-[var(--light-color)] text-[var(--background)] p-5 rounded-md">
                
                <div className="absolute top-0 right-0 hover:bg-red-500 rounded-full m-2 opacity-80">
                    <CircleX size={35} onClick={() => setShowPackForm(false)} className="cursor-pointer text-red-500 hover:text-white transition-all ease-in duration-100" />
                </div>

                <div className="w-fit bg-[var(--background)] px-4 py-2 rounded-md">
                    <a className="text-[var(--light-color)] ">Add Pack</a>
                </div>
                <form className="flex flex-col gap-2 mt-5 ">
                    <div className="flex flex-col bg-[var(--background)] p-2 gap-2 rounded-md">
                        <label htmlFor="name" className="w-fit px-3 outline-2 outline-[var(--light-color)] text-[var(--light-color)] rounded-md">Pack Name</label>
                        <input type="text" id="name" placeholder="Pack Name" className=" bg-[var(--light-color)] px-3 outline-2 outline-[var(--light-color)] rounded-md" />
                    </div>

                    <div className="flex flex-col bg-[var(--background)] p-2 gap-2 rounded-md">
                        <label htmlFor="price" className="w-fit px-3 outline-2 outline-[var(--light-color)] text-[var(--light-color)] rounded-md">Price</label>
                        <input type="text" id="price" placeholder="Price" className=" bg-[var(--light-color)] px-3 outline-2 outline-[var(--light-color)] rounded-md" />
                    </div>

                    <div className="flex flex-col gap-1 text-[var(--light-color)] font-bold ">
                        <input type="reset" className="bg-red-500 py-0.5 px-3 items-center rounded-md  cursor-pointer opacity-70 hover:opacity-100" />
                        <button type="button" className="bg-green-500 py-2 px-3 items-center rounded-md cursor-pointer opacity-70 hover:opacity-100" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}