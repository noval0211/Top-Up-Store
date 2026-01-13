import { PrismaClient, Prisma } from "@prisma/client";
import { core } from "../utils/midtrans.core.js";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const CreatePayment = async (req, res) => {
    try {
        const { productPackId, productPackName, method } = req.body;

        // Validate required fields
        if (!productPackId || !productPackName || !method) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if Firebase user is available
        if (!req.firebaseUser || !req.firebaseUser.uid) {
            return res.status(401).json({ message: "Unauthorized: Firebase user not found" });
        }

        // Check if product pack exists
        const existProductPack = await prisma.productPacks.findUnique({
            where: {
                id: productPackId
            }
        });

        // If product pack does not exist, return 404
        if (!existProductPack) {
            return res.status(404).json({ message: "Product Pack not found" });
        }

        // Prepare payment parameters
        const randomString = bcrypt.genSaltSync(8).replace(/\W/g, '').slice(0, 8).toUpperCase();

        // Payment Fee
        const paymentFee = {
            gopay: 2 / 100,
            ovo: 3 / 100,
            dana: 2.5 / 100,
            shopeepay: 3.5 / 100,
        }

        // Calc Product Price After Fee
        const calcPrice = (price, method) => {
            const fee = price * (paymentFee[method] || 0)
            const total = price + fee
            return total
        }

        const price = calcPrice(existProductPack.price.toNumber(), method)

        let parameter = {
            "payment_type": method,
            "transaction_details": {
                "gross_amount": price,
                "order_id": `TOPUP-${Date.now()}-${randomString}`
            },
            "customer_details": {
                "user_id": req.firebaseUser.uid
            },
        }

        // Create a new transaction record
        const createOrder = await prisma.transactions.create({
            data: {
                id: parameter.transaction_details.order_id,
                productPack: productPackName,
                amount: price,
                userId: req.firebaseUser.uid,
                method: method,
            },
        });

        // If order creation fails, return 500
        if (!createOrder) {
            return res.status(500).json({ message: "Failed to create order" });
        }

        // Process the payment through the core payment module
        await core.charge(parameter)
            .then((chargeResponse) => {
                res.status(200).json({ message: "Payment Created", chargeResponse });
            })
            .catch((error) => {
                res.status(500).json({ message: "Payment Creation Failed", error: error.message });
            });
    } catch (err) {
        res.status(500).json({ message: "Error Creating Payment", error: err.message });
    }
}

export const GetPaymentStatus = async (req, res) => {
    try {
        const statusResponse = req.body;

        if (!statusResponse || !statusResponse.order_id) {
            return res.status(400).json({ message: "Invalid status response" });
        }

        // Update transaction status in the database
        await prisma.transactions.update({
            where: {
                id: statusResponse.order_id
            },
            data: {
                status: statusResponse.transaction_status
            }
        });

        res.status(200).send("OK");
    } catch (err) {
        res.status(500).json({ message: "Error Getting Payment Status", error: err.message });
    }
}