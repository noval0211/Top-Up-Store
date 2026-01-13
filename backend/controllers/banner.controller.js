import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add Banner
export const addBanner = async (req, res) => {
    try {
        const imageBuffer = req.file ? req.file.buffer : null;
        
        // Validate image
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
        const bannerId = Number(req.params.id)
        // Validate ID
        if (!bannerId) return res.status(404).json({ message: "Id Required" })

        // Check if banner exists
        const exists = await prisma.banner.findUnique({
            where: {
                id: bannerId
            }
        })
        // Confirm existence
        if (!exists) return res.status(404).json({ message: 'Id not found' });

        // Delete banner
        await prisma.banner.delete({
            where: {
                id: bannerId
            }
        })

        res.status(200).json({ message: 'Delete Success' });
    } catch (err) {
        res.status(500).json({ message: "Failed to Remove Banner", error: err.message })
    }
}

export const showBanner = async (req, res) => {
    try {
        // Fetch all banners
        const data = await prisma.banner.findMany();
        
        // Convert images to base64
        const dataWithBase64 = data.map(p => ({
            ...p,
            image: p.image ? Buffer.from(p.image).toString("base64") : null
        }));
        res.status(200).json(dataWithBase64);

    } catch (err) {
        res.status(500).json({ message: "Error Showing Banner", error: err.message })
    }
}