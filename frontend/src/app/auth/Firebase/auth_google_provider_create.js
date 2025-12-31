
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./firebase";

export default async function signInGoogle() {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, provider)

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    const idToken = await user.getIdToken()
    
    window.location.reload()
    return {
        token: idToken,
    }
}
