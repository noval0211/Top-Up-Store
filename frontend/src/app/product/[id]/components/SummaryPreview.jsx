
export default function SummaryPreview({ productData, gameUID, packSelected, paymentMethod, priceSelected }) {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="w-full flex flex-col gap-2 lg:p-5 bg-[var(--dark-color)] rounded-xl">
                <div className="w-full flex justify-between">
                    <span className="opacity-75">Product Name</span>
                    <span>{productData.name}</span>
                </div>
                <div className="w-full flex justify-between">
                    <span className="opacity-75">Game Id</span>
                    <span>{gameUID ? gameUID : "-"}</span>
                </div>
                <div className="w-full flex justify-between">
                    <span className="opacity-75">Pack Selected</span>
                    <span>{packSelected ? packSelected.name : "-"}</span>
                </div>
                <div className="w-full flex justify-between">
                    <span className="opacity-75">Payment Method</span>
                    <span>{paymentMethod ? paymentMethod : "-"}</span>
                </div>
                <div className="w-full flex justify-between">
                    <span className="opacity-75">Price</span>
                    <span>{priceSelected ? priceSelected : "-"}</span>
                </div>
            </div>
        </div>
    )
}