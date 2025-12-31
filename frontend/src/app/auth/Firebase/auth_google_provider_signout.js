import { getAuth, signOut } from "firebase/auth";

export default async function GoogleSignOut(){
    const auth = getAuth()
    const action = await signOut(auth)
    
    window.location.reload()
    return action
}