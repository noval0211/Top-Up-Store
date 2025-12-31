import { PrismaClient } from "@prisma/client";
import admin from "../utils/FirebaseAdmin.js";
const prisma = new PrismaClient()

export const getMe = async (req, res) => {
    try {
        const user = await prisma.userAccounts.findUnique({
            where: { uid: req.firebaseUser.uid }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export const GoogleAuth = async (req, res) => {
    try {
        const { token } = req.body
        
        if (!token) {
            return res.status(400).json({ message: "Token required" })
        }

        const dataUser = await admin.auth().verifyIdToken(token)

        res.cookie("session", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        const user = await prisma.userAccounts.findUnique({
            where: { email: dataUser.email }
        })

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
