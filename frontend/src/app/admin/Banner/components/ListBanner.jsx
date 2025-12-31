import { GetBanner, RemoveBanner } from "@/lib/api/banner/banner.api"
import Image from "next/image";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";


export default function ListBanner({ reload }) {

    const [dataBanner, setDataBanner] = useState([])
    const [loadingIds, setLoadingIds] = useState([])

    useEffect(() => {
        async function fetchBanner() {
            const data = await GetBanner();
            setDataBanner(data)
        }
        fetchBanner()
    }, [reload])

    const handleRemove = async (bannerId) => {
        if (loadingIds.includes(bannerId)) return;
        
        setLoadingIds(prev => [...prev, bannerId])

        try {
            const data = await RemoveBanner(bannerId)
            toast.success(data.message)
            setDataBanner(prev => prev.filter(b => b.id !== bannerId))
        } catch (err) {
            toast.error("Failed to delete")
        } finally {
            setLoadingIds(prev => prev.filter(id => id !== bannerId))
        }

    }
    return (
        <>
            <div className="grid grid-cols-4 gap-5">
                {dataBanner.map((items) => (
                    <div
                        key={items.id}
                        className="outline-2 outline-[var(--light-color)] rounded-md">
                        <div
                            className="aspect-video">
                            <Image src={items.image ? `data:image/jpeg;base64,${items.image}` : '/noimg.png'}
                                width={100} height={100} alt="img"
                                className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-[var(--light-color)] pt-0.5">
                            <button
                                onClick={() => handleRemove(items.id)}
                                className="bg-red-500 w-full cursor-pointer hover:opacity-80">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}