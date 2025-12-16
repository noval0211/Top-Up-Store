import admin from "../utils/FirebaseAdmin.js";

export async function FirebaseWare(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid auth format" });
        }

        const token = authHeader.slice(7); // remove "Bearer "

        const decoded = await admin.auth().verifyIdToken(token);

        req.firebaseUser = decoded; // uid, email, name, picture, etc
        next();
    } catch (err) {
        console.error("Firebase auth error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}