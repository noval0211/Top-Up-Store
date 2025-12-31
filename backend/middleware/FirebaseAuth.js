import admin from "../utils/FirebaseAdmin.js";

export async function FirebaseWare(req, res, next) {
    const session = req.cookies.session
    if (!session) return res.status(401).json(null)
    try {
        const decoded = await admin.auth().verifyIdToken(session)
        req.firebaseUser = decoded
        next()
    } catch (err) {
        return res.status(401).json(null)
    }
}