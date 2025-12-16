
export async function DeleteProductById(id) {
    const res = await fetch(`http://localhost:2000/product/delete/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
    return await res.json()
}

export async function getProduct() {
    const res = await fetch('http://localhost:2000/product', {
        method: "GET",
        credentials: 'include',
        cache: "no-store",
    })
    return await res.json()

}

export async function getFilterProductById(filter) {
    const res = await fetch(`http://localhost:2000/product/get${filter ? `?type=${filter}` : ""}`, {
        method: "GET",
        credentials: 'include',
        cache: "no-store",
    })
    return await res.json()

}

export async function getProductById(id) {
    const res = await fetch(`http://localhost:2000/product/get/${id}`, {
        method: "GET",
        credentials: 'include',
        cache: "no-store",
    })
    return await res.json()
}

export async function AddProduct(formData) {
    const res = await fetch('http://localhost:2000/product/add', {
        method: "POST",
        credentials: 'include',
        body: formData
    })
    return res
}