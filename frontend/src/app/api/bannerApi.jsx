
export async function Banner() {
    const res = await fetch("http://localhost:2000/banner/get", {
        method: "GET",
        credentials: 'include'
    })
    const data = await res.json()
    return data
}