
import Image from "next/image";
import { useState, useEffect } from "react";
import { getFilterProductById } from "../../lib/api/productApi";
import slug from "slug";

export default function ProductCard({ filter }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getFilterProductById(filter)

                if (!Array.isArray(data)) {
                    setProducts([]);
                    return;
                }

                setProducts(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [filter]);

    if(products.length == 0) {
        return(
            <div className="opacity-70">
                No Products
            </div>
        )
    }

    return (
        <div className="w-fit h-full max-h-fit gap-7 list-none text-sm
        grid grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4
        lg:grid-cols-5 
        xl:grid-cols-6">
            {products.map((p) => (
                <a
                    key={p.id}
                    href={`/product/${p.id}`}
                    className=" relative w-35 h-50 xl:w-40 xl:h-55 group hover:scale-110 origin-center rounded-xl cursor-pointer
                            ease-in duration-100 transition-all
                            outline-2 outline-[var(--light-color)]">

                    <Image src={`data:image/jpeg;base64,${p.image}`}
                        width={100}
                        height={100}
                        alt="items-image"
                        className="relative w-full h-full rounded-xl object-cover" />

                    <div className="absolute bottom-0 bg-transparent backdrop-blur-md 
                                w-full h-14 outline-2 outline-[var(--light-color)] 
                                flex items-center justify-center 
                                group-hover:h-0 group-hover:outline-none 
                                ease-in-out duration-100 transition-all 
                                rounded-xl overflow-hidden">
                        <span className="text-wrap text-center px-2 leading-tight font-semibold">{p.name}</span>
                    </div>

                </a>
            ))}
        </div>
    )
}