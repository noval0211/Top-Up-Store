import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";



export default async function GoogleSignOut(){
    const auth = getAuth()
    const action = await signOut(auth)
    
    window.location.reload()
    return action
}