import { getAuth, signInAnonymously } from "firebase/auth";
import app from "./firebase";

export default async function signInAnonymouse() {
    // Initialize Firebase Auth
    const auth = getAuth(app);

    // Sign in anonymously
    const result = await signInAnonymously(auth)

    // The signed-in user info.
    const user = result.user;

    // Get ID token
    const idToken = await user.getIdToken();

    return { token: idToken }
}