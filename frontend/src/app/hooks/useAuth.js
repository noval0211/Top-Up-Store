'use client'
import app from "@/app/auth/Firebase/firebase"
import { api } from "@/lib/api/axios"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import signInAnonymouse from "../auth/Firebase/auth_anonymouse"
import { AnonymousAuth } from "./api/auth.anon.api"

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth(app)

        const unsub = onAuthStateChanged(auth, async (user) => {
            try {
                // If no user, sign in anonymously
                if (!user) {
                    const { token } = await signInAnonymouse()
                    const res = await AnonymousAuth(token)
                    setUser(res.data)
                    return
                }

                // If user exists, get user data from backend
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