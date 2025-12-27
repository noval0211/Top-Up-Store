
export async function GetBanner() {
    const res = await fetch("https://top-up-store-production.up.railway.app/banner/get", {
        method: "GET",
        credentials: 'include',
        cache: 'no-cache'
    })
    const data = await res.json()
    return data
}