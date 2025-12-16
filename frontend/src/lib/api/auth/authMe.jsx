'use client'
import app from "@/app/auth/Firebase/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function AuthMe() {
  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return null

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
    })
    return () => unsub()
  }, [])
  
  return user
}