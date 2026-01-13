import { X } from 'lucide-react';

export default function OrderSummary({ orderData, gameUID, productData, setSummaryData }) {
    if (!orderData) return null;

    const action = orderData.actions.find(action => action.name === "generate-qr-code");

    const grossAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(orderData.gross_amount);

    return (
        <div className="relative w-full h-full flex justify-center bg-opacity-50">
            <div
                onClick={() => setSummaryData(null)}
                className="absolute w-full h-full backdrop-blur-xs" />

            <div className="relative scale-[.8] md:scale-75 z-10 w-fit h-fit px-10 bg-white text-black rounded-lg overflow-hidden outline-2 outline-black">

                <div
                    onClick={() => setSummaryData(null)}
                    className="absolute top-0 right-0 p-3 rounded-bl-lg outline-2 outline-black cursor-pointer hover:bg-gray-400">
                    <X color='red' />
                </div>

                <h1 className="text-2xl font-bold p-5 border-b border-gray-300">Order Summary</h1>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-5 py-1 mr-5">
                                <img
                                    src={action.url}
                                    alt="QR Code"
                                    className="w-40 h-40 object-contain"
                                />
                                <a className="hidden sm:block px-2 text-lg font-extrabold">N A M E.S T O R E</a>
                            </div>
                            <div className="pb-10 flex flex-col gap-2">
                                <h1 className="bg-blue-300 py-1 px-3 font-bold rounded-sm outline-1">Order Details</h1>
                                <ul className="flex flex-col sm:px-2">
                                    <li className="flex gap-2 border-b border-gray-300 py-1 px-3">
                                        <a className="w-32">Product Name</a>
                                        <span>:</span>
                                        <a>{productData.name}</a>
                                    </li>
                                    <li className="flex gap-2 border-b border-gray-300 py-1 px-3">
                                        <a className="w-32">Game Id</a>
                                        <span>:</span>
                                        <a>{gameUID}</a>
                                    </li>
                                    <li className="flex flex-col sm:flex-row gap-2 border-b border-gray-300 py-1 px-3">
                                        <div className='flex gap-2'>
                                            <a className="w-32">Order Id</a>
                                            <span>:</span>
                                        </div>
                                        <a className='w-full sm:w-max'>{orderData.order_id}</a>
                                    </li>
                                    <li className="flex gap-2 border-b border-gray-300 py-1 px-3">
                                        <a className="w-32">Price</a>
                                        <span>:</span>
                                        <a>{grossAmount}</a>
                                    </li>
                                    <li className="flex gap-2 border-b-2  py-1 px-3">
                                        <a className="w-32">Payment Method</a>
                                        <span>:</span>
                                        <a>{orderData.payment_type}</a>
                                    </li>
                                    <li className="flex flex-col gap-2 border-b border-gray-300 py-1 px-3">
                                        <div className="flex gap-2">
                                            <a className="w-32">Redirect Link</a>
                                            <span>:</span>
                                        </div>
                                        <a className="w-52 text-wrap">{orderData.actions.find(action => action.name === "deeplink-redirect")?.url}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}