import { getAuth, signOut } from "firebase/auth";
import { api } from "@/lib/api/axios";

export default async function GoogleSignOut() {
    const auth = getAuth()

    const action = await signOut(auth)

    await api.post('/auth/logout')

    window.location.reload()

    return action
}