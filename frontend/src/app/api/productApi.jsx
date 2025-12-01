

export async function getFilterProductById(filter) {
    const res = await fetch(`http://localhost:2000/product/get${filter ? `?type=${filter}` : ""}`  ,{
        method: "GET",
        credentials: 'include'
    })
    const data = await res.json() 
    return data
}

export async function getProductById(id){
    const res = await fetch(`http://localhost:2000/product/get/${id}`  ,{
        method: "GET",
        credentials: 'include'
    })
    const data = await res.json() 
    return data
}
