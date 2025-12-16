import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBanner = async (req, res) => {
    try {
        const imageBuffer = req.file ? req.file.buffer : null;
        const banner = await prisma.banner.create({
            data: { image: imageBuffer }
        })

        res.status(201).json({ message: "Success Add", banner })
    } catch (err) {
        res.status(500).json({ message: "Error Adding Banner", error: err.message })
    };
}

export const removeBanner = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: "Failed to Remove Banner", error: err.message })
    }
}

export const showBanner = async (req, res) => {
    try {
        const data = await prisma.banner.findMany();
        const dataWithBase64 = data.map(p => ({
            ...p,
            image: p.image ? Buffer.from(p.image).toString("base64") : null
        }));
    res.status(200).json(dataWithBase64);

    } catch (err) {
        res.status(500).json({ message: "Error Showing Banner", error: err.message })
    }
}