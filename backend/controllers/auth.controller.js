import { PrismaClient } from "@prisma/client";

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
        const googlUser = req.firebaseUser;
        const user = await prisma.userAccounts.findUnique({
            where: { email: googlUser.email }
        })

        
        if (!user) {
            user = await prisma.userAccounts.create({
                data: {
                    uid: googlUser.uid,
                    name: googlUser.name,
                    email: googlUser.email,
                    avatar: googlUser.picture,
                    provider: googlUser.firebase.sign_in_provider
                }
            })
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}
