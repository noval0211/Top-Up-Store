
export async function DeleteProductById(id) {
    const res = await fetch(`https://top-up-store-production.up.railway.app/product/delete/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
    return await res.json()
}

export async function getProduct() {
    const res = await fetch('https://top-up-store-production.up.railway.app/product', {
        method: "GET",
        credentials: 'include',
        cache: "no-store",
    })
    return await res.json()

}

export async function getFilterProductById(filter) {
    const res = await fetch(`https://top-up-store-production.up.railway.app/product/get${filter ? `?type=${filter}` : ""}`, {
        method: "GET",
        credentials: 'include',
        cache: "no-store",
    })
    return await res.json()

}

export async function getProductById(id) {
    const res = await fetch(`https://top-up-store-production.up.railway.app/product/get/${id}`, {
        method: "GET",
        credentials: 'include',
        cache: "no-store",
    })
    return await res.json()
}

export async function AddProduct(formData) {
    const res = await fetch('https://top-up-store-production.up.railway.app/product/add', {
        method: "POST",
        credentials: 'include',
        body: formData
    })
    return res
}