
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const CreateProduct = async (req, res) => {

    try {
        const { name, type} = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        const products = await prisma.product.create({
            data: {
                name,
                type,
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
        const { type } = req.query;

        const data = await prisma.product.findMany({
            where: type ? { type } : {}
        });
        const dataWithBase64 = data.map(p => ({
            ...p,
            image: p.image ? Buffer.from(p.image).toString("base64") : null
        }));
        res.json(dataWithBase64);
        
    } catch (err) {
        res.status(400).json({ message: "Error Load Product", error: err.message })
    }
}

export const GetProductById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const data = await prisma.product.findUnique({
            where: { id: Number(id) }
        })
        
        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        const dataWithBase64 = {
            ...data,
            image: data.image ? Buffer.from(data.image).toString("base64") : null
        }

        res.json(dataWithBase64)
    } catch (err) {
        res.status(400).json({ message: "Error Load Product", error: err.message })
    }
}