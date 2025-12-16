'use client'
import AdminLayout from "../layouts/AdminLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Admin() {

    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (loading) return
        
        if (!user || user.role !== 'admin') {
            router.replace('/')
            return
        }
    }, [user, loading, router])
    
    if(!user || user.role !== 'admin') return null
    
    return <AdminLayout />
}