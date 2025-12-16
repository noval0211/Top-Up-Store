
export async function GetBanner() {
    const res = await fetch("http://localhost:2000/banner/get", {
        method: "GET",
        credentials: 'include',
        cache: 'no-cache'
    })
    const data = await res.json()
    return data
}