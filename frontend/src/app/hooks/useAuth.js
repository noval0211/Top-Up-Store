'use client'
import app from "@/app/auth/Firebase/firebase"
import { api } from "@/lib/api/axios"
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

            try {
                const res = await api.get('/auth/me')
                setUser(res.data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }

        })
        return () => unsub()
    }, [])

    return { user, loading }
}