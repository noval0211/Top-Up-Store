'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { getProduct } from "@/lib/api/product/product.api";

export default function NavbarSearch() {
    const [productName, setProductName] = useState([])
    const [searchSugest, setSearchSugest] = useState("")
    const [filteredNames, setFilteredNames] = useState([]);
    const [product, setProduct] = useState([])

    useEffect(() => {
        setProductName(product.map(item => item.name));
    }, [])

    // Filter Product Find Search
    useEffect(() => {
        const filtered = productName.filter(name =>
            name.toLowerCase().includes(searchSugest.toLowerCase())
        );
        setFilteredNames(filtered);
    }, [searchSugest, productName]);

    // Product Filter Select
    const selectSearch = (name) => {
        setSearchSugest(name)
        setTimeout(() => setFilteredNames([]), 100)
    }

    useEffect(() => {
        async function fetchProduct() {
            const res = await getProduct()
            if (res?.ok) setProduct(res);
        }
        fetchProduct()
    }, [])

    return (
        <div className="hidden sm:flex relative w-full">
            <div className="w-full flex items-center px-4 outline-2 outline-[var(--light-color)] rounded-4xl">
                <Image src={"/search.png"} alt="search-icon" width={15} height={15}
                    className="bg-blue absolute " />
                <input
                    value={searchSugest}
                    onChange={(e) => setSearchSugest(e.target.value)}
                    className="w-full pl-8 px-2 py-1 md:py-2 outline-none font-normal" type="search" placeholder="Search . . ." />
            </div>

            {searchSugest && filteredNames.length > 0 && (
                <div
                    className="absolute top-11 bg-[var(--light-color)] p-1 flex flex-col gap-1 rounded-md shadow-md w-full z-10">
                    {filteredNames.map((name, index) => (
                        <div
                            key={index}
                            onMouseDown={() => selectSearch(name)}
                            className="bg-red px-5 py-2 bg-[var(--background)] text-[var(--light-color)] text-sm font-normal rounded-md cursor-pointer">
                            {name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}