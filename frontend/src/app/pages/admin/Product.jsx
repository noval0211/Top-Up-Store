import InputForm from "@/app/components/InputForm"
import { useState, useRef } from "react"

export default function Products() {
    const [productName, setProductName] = useState("")
    const [productType, setProductType] = useState("")
    const [productImage, setProductImage] = useState(null)
    const fileInputRef = useRef(null)

    const clearInput = () => {
        setProductName("")
        setProductType("")
        setProductImage(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const uploadProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("image", productImage)
            formData.append("name", productName)
            formData.append("type", productType)

            const res = await fetch("http://localhost:2000/product/add", {
                method: "POST",
                credentials: "include",
                body: formData,
            })

            if (res.ok) clearInput();

        } catch (err) {
            alert("Gagal konek ke server: " + err.message);
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-5 items">

            <div className="w-full flex justify-center">
                <h2 className="text-2xl font-extrabold border-b-4 w-fit px-3 py-1">p r o d u c t s</h2>
            </div>

            <div className="w-full flex flex-col items-center justify-between">
                <div className="w-full h-full flex flex-col items-center">
                    <div className="flex flex-col items-center bg-[var(--light-color)] outline-2 outline-[var(--light-color)] rounded-xl hover:scale-110 ease-in duration-100 transition-all ">
                        <h3 className="font-bold text-xl text-[var(--background)]">Preview</h3>
                        <div className="relative group hover:scale-100">
                            <div className="w-40 h-52 bg-[var(--background)] outline-2 outline-[var(--light-color)] rounded-xl cursor-pointer">
                                {productImage ? (
                                    <img
                                        src={URL.createObjectURL(productImage)}
                                        alt="Preview"
                                        className="w-40 h-52 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <a className="text-2xl">?</a>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 bg-[var(--foreground)] w-full h-13 flex items-center justify-center outline-2 outline-[var(--light-color)] group-hover:h-0 group-hover:outline-none ease-in-out duration-100 transition-all rounded-b-xl overflow-hidden">
                                <a className="text-wrap text-center px-2 leading-tight">
                                    {productName}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-fit p-2 mt-5">
                    <form onSubmit={uploadProduct}
                        className="flex flex-col gap-2 w-[400px] ">
                            
                        <InputForm
                            position={"flex"}
                            rounded={"none"}
                            labelW={"medium"}
                            label={"Name"}
                            id={"product-name"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Product-name"}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)} />

                        <div className={`flex flex-row gap-1 text-sm`}>
                            <label
                                className={`bg-[var(--light-color)] w-40 text-[var(--background)] font-bold px-3 py-0.5 outline-2 outline-[var(--light-color)] `}>
                                Type
                            </label>
                            <select
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                                className={`w-full px-3 py-0.5 outline-2 bg-[var(--background)] outline-[var(--light-color)]`}>
                                <option value="" disabled>- Pilih Tipe -</option>
                                <option value="games">Games</option>
                                <option value="voucher">Voucher</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <InputForm
                            position={"flex"}
                            rounded={"none"}
                            labelW={"medium"}
                            label={"Image"}
                            id={"product-image"}
                            name={"image"}
                            type={"file"}
                            inputRef={fileInputRef}
                            placeholder={"Product-image"}
                            onChange={(e) => setProductImage(e.target.files[0])} />

                        <div className="flex gap-2 justify-end text-[var(--background)] font-bold">
                            <input
                                onClick={clearInput}
                                type="button"
                                value="Reset"
                                className="bg-[var(--light-color)] px-5 py-1 rounded-2xl cursor-pointer"
                            />
                            <input
                                type="submit"
                                value="Add"
                                className="bg-[var(--light-color)] px-5 py-1 rounded-2xl cursor-pointer"
                            />
                        </div>
                    </form>
                </div>


            </div>


        </div>
    )
}