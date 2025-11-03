
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const CreateProduct = async (req, res) => {

    try {
        const { name, description, price } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        const products = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                image: imageBuffer
            },
        });

        res.status(201).json({ message: "Product Created", products })
    } catch(err) {
        res.status(400).json({ message: "Error Creating Product", error: err.message })
    }
}

export const Product = async (req, res) => {
    try {
        const data = await prisma.product.findMany();
        const dataWithBase64 = data.map(p => ({
            ...p,
            image: p.image ? Buffer.from(p.image).toString("base64") : null
        }));
        res.json(dataWithBase64);
    } catch (err) {
        res.status(400).json({ message: "Error Load Product", error: err.message })
    }
}