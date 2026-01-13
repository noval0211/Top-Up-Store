import { PrismaClient } from "@prisma/client";
import admin from "../utils/FirebaseAdmin.js";
const prisma = new PrismaClient()

// Get current user
export const GetMe = async (req, res) => {
    try {
        // Find user in database
        const user = await prisma.userAccounts.findUnique({
            where: { uid: req.firebaseUser.uid }
        });

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

// Anonymous Authentication
export const AnonymousAuth = async (req, res) => {
    {
        try {
            const authHeader = req.headers.authorization

            // Check if auth header is valid
            if (!authHeader?.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Invalid auth header" });
            }

            // Extract token from header
            const token = authHeader?.split("Bearer ")[1]

            // If no token, return 401
            if (!token) return res.status(401).json(null)

            // verify the ID token
            const userRecord = await admin.auth().verifyIdToken(token)

            // Create session cookie
            const sessionCookie = await admin.auth().createSessionCookie(token, {
                expiresIn: 1000 * 60 * 60 * 24 * 7
            });

            // Set cookie options
            res.cookie("session", sessionCookie, {
                httpOnly: true,
                //secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
            res.send('Cookie is set')

            // Create user in database
            const user = await prisma.userAccounts.create({
                data: {
                    uid: userRecord.uid,
                    name: "Anonymous",
                    email: null,
                    avatar: null,
                    provider: "anonymous"
                }
            });

            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: "Server error" });
        }
    }
}

// Google Authentication
export const GoogleAuth = async (req, res) => {
    try {
        const authHeader = req.headers.authorization

        // Check if auth header is valid
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid auth header" });
        }

        // Extract token from header
        const token = authHeader?.split("Bearer ")[1]

        // If no token, return 401
        if (!token) return res.status(401).json(null)

        // Verify the ID token
        const userRecord = await admin.auth().verifyIdToken(token)

        // Create session cookie
        const sessionCookie = await admin.auth().createSessionCookie(token, {
            expiresIn: 1000 * 60 * 60 * 24 * 7
        })

        // Set cookie options
        res.cookie("session", sessionCookie, {
            httpOnly: true,
            //secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.send('Cookie is set')

        // Check if user exists in database
        let user = await prisma.userAccounts.findUnique({
            where: { email: userRecord.email }
        })

        // If not, create new user
        if (!user) {
            user = await prisma.userAccounts.create({
                data: {
                    uid: dataUser.uid,
                    name: dataUser.name,
                    email: dataUser.email,
                    avatar: dataUser.picture,
                    provider: dataUser.firebase.sign_in_provider
                }
            })
        }
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie('session', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })

        res.status(200).json({ message: 'Logged Out' })

    } catch (err) {
        return res.status(400).json({ message: "Failed to logout" })
    }
}