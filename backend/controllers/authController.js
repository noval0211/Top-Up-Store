import { PrismaClient } from "../generated/prisma/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const Register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exist = await prisma.userAccounts.findUnique({ where: { email } });
        if (exist) return res.status(400).json({ message: "Email Already Used" });

        const hashed = await hashPassword(password);

        const user = await prisma.userAccounts.create({
            data: { name, email, password: hashed }
        });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.json({
            message: "Register Successs",
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.userAccounts.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: "Email Not Registered" });

        const valid = await comparePassword(password, user.password);
        if (!valid) return res.status(401).json({ message: "Wrong Password . . ." });

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login Success",
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({
        message: "Logout Success"
    })
} 

export const Me = async (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.userAccounts.findUnique({
            where: { id: decode.id }
        });

        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch(err) {
        res.status(401).json({ message: "Invalid token" })
    }
}