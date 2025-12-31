
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateProduct = async (req, res) => {

    try {
        const { name, type } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        const products = await prisma.product.create({
            data: {
                name,
                type,
                image: imageBuffer
            },
        });

        res.status(201).json({ message: "Product Created", products })
    } catch (err) {
        res.status(400).json({ message: "Error Creating Product", error: err.message })
    }
}

export const DeleteProductById = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!productId) return res.status(400).json({ message: 'Product Id Required' });

        const exists = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!exists) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await prisma.product.delete({
            where: { id: productId }
        });

        res.status(200).json({ message: 'Delete Product Success' });
    } catch (err) {
        res.status(404).json({
            message: "Product Not Found",
            error: err.message
        });
    }
}

export const GetProduct = async (req, res) => {
    try {
        const data = await prisma.product.findMany({
            orderBy: { name: "asc" }
        })
        const dataWithBase64 = data.map(p => ({
            ...p,
            image: p.image ? Buffer.from(p.image).toString("base64") : null
        }))
        res.json(dataWithBase64);
    } catch (err) {
        res.status(400).json({ message: "Error Load Product", error: err.message })
    }
}

export const GetProductByType = async (req, res) => {
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
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const data = await prisma.product.findUnique({
            where: { id: id }
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

export const CreateProductPacks = async (req, res) => {
    try {
        const { id, name, price } = req.body;

        const exists = await prisma.productPacks.findUnique({
            where: { productId: id }
        })

        if (exists) return res.status(302).json({ message: 'Pack was created' });

        const result = await prisma.productPacks.create({
            data: {
                productId: id,
                name: name,
                price: price
            },
            select: {
                productId: true,
                name: true,
                price: true
            }
        })

        res.status(201).json({
            message: 'Pack Created',
            data: {
                id: result.productId,
                name: result.name,
                price: result.price
            }
        })
    } catch (err) {
        res.status(400).json({ message: 'Error Create Packs', error: err.message })
    }
}