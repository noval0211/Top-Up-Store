'use client'
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { History, X } from "lucide-react"
import { HistoryTransaction } from "./api/history.api";

export default function NavbarHistory() {

    const [isOpen, setIsOpen] = useState(false);

    const { data: historyData, isLoading, error } = useQuery({
        queryKey: ["transaction-history"],
        queryFn: HistoryTransaction,
        staleTime: 1 * 60 * 1000,
        enabled: isOpen
    })

    if (isLoading) return

    console.log(historyData)
    return (
        <div className="relative flex items-center justify-center">
            <div
                onClick={() => setIsOpen(prev => !prev)}
                className="text-[var(--light-color)] cursor-pointer ease-in-out duration-65 transition-all">
                {isOpen ? (
                    <X width={25} height={25} className="outline-2 rounded-full scale-75" />
                ) : (
                    <History width={25} height={25} />
                )}
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-12 right-0 translate-x-1/2 w-[430px] bg-[var(--background)] text-[var(--light-color)] outline-2 rounded-md`}>
                <div className="p-5 flex flex-col gap-3">
                    <h1 className="font-bold text-lg">History</h1>
                    <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">

                        {historyData?.data?.length == 0 && (
                            <a className="opacity-70 text-center">No Transaction</a>
                        )}

                        {historyData?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((items) => {
                                const price = Intl.NumberFormat('id-ID', {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(items.amount)
                                return (
                                    <div
                                        key={items.id}
                                        className="w-full px-3 py-2 bg-[var(--dark-color)] flex justify-between items-center border-l-2 border-b-2 rounded-bl-lg border-gray-500">
                                        <div className="flex flex-col">
                                            <span className="font-bold">{items.productPack}</span>
                                            <div className="flex gap-1 text-xs">
                                                <a>Order Id</a>
                                                <span>:</span>
                                                <a className="select-text  opacity-50">{items.id}</a>
                                            </div>
                                            <div className="flex gap-1 text-xs">
                                                <a>Order Status</a>
                                                <span>:</span>
                                                <a className="opacity-50">{items.status}</a>
                                            </div>
                                        </div>
                                        <span className="font-bold text-green-600">{price}</span>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>

    )
}
