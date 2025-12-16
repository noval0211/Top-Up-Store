'use client'
import app from "@/app/auth/Firebase/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const auth = getAuth(app)

        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUser(null)
                setLoading(false)
                return
            }

            const token = await user.getIdToken();

            const res = await fetch("http://localhost:2000/auth/me", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            })

            if (!res.ok) return null

            const data = await res.json()
            setUser(data)
            setLoading(false)
        })
        return () => unsub()
    }, [])

    return { user, loading }
}