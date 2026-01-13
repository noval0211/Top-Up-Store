import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const HistoryClient = async (req, res) => {
    try {
        if (!req.firebaseUser.uid) {
            return res.status(400).json({ message: "User Id Required" });
        }

        // check if user id exist
        const existUserTransaction = await prisma.transactions.findMany({
            where: { userId: req.firebaseUser.uid }
        })

        if (!existUserTransaction) {
            return res.status(404).json({ message: "User Transaction NotFound" });
        }

        return res.status(200).json({ message: "Transaction Found", data: existUserTransaction })

    } catch (err) {
        return res.status(400).json({ message: "Error Get Transaction", error: err.message })
    }
}