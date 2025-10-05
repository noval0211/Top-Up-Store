

export default function AdminLayout() {
    return(
        <div className="">
            <div className="bg-[var(--background)] border-r-[1px] border-[var(--foreground)] w-50 h-screen py-12 text-[var(--light-color)] flex flex-col gap-1 items-center">   
                <ul className="w-full flex flex-col gap-2 pt-2">
                    
                    <li className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">Products</a>
                    </li>

                    <li className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">Referral Code</a>
                    </li>

                    <li className="px-3 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all ease-in-out duration-150 cursor-pointer">
                        <a className="border-l-2 border-[var(--light-color)] pl-2">History Purchase</a>
                    </li>
                </ul>
            </div>
            
        </div>
    );
}