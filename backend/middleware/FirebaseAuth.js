import admin from "../utils/FirebaseAdmin.js";

export async function FirebaseWare(req, res, next) {
    const sessionCookie = req.cookies.session
    
    if (!sessionCookie) {
        return res.status(401).json({ message: "Invalid auth header" });
    }

    try {
        const decoded = await admin.auth().verifySessionCookie(sessionCookie)
        req.firebaseUser = decoded
        next()
    } catch (err) {
        return res.status(401).json(null)
    }
}