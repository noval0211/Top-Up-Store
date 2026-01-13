
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./firebase";

export default async function signInGoogle() {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    const result = await signInWithPopup(auth, provider)

    // The signed-in user info.
    const user = result.user;
    const idToken = await user.getIdToken()
    
    return { status: true, token: idToken,}
}
