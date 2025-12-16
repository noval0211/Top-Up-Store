export async function GoogleAuth(token) {
    try {
        if (!token) return { ok: false, message: "No token provided" }

        const res = await fetch("http://localhost:2000/auth/firebase", {
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        if (!res.ok) {
            let message = "Failed to Register"
            return { ok: false, message }
        }

        const data = await res.json()
        return { ok: true, data }
    } catch (err) {
        console.error('Failed to connect server:', err.message)
        return { ok: false, message: "Failed to connect server" }
    }
}