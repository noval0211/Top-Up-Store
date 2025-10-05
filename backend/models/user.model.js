import Router from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        res.json({
            message: "User created success",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

userRouter.get('/', async (req, res) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        res.json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

})

userRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        if (!user) return res.status(404).json({ message: "User Not Found" });
        res.json(user)

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

})


export default userRouter;