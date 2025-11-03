
"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import InputForm from "../components/InputForm";

export default function Login({ onClose, setUser }) {
    const [isLogin, setIsLogin] = useState(true);

    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [showPassword, setShowPassword] = useState("password");

    const togglePassword = () => {
        if (showPassword === "password")
            setShowPassword("text");
        else {
            setShowPassword("password")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) return;
        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: logEmail, password: logPassword })
            })

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                onClose();
            }
        } catch (err) {
            alert("Gagal konek ke server: " + err.message);
        }

    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!username || !email || !password) return;

        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
            })

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                onClose();

            }

        } catch (err) {
            alert("Gagal konek ke server: " + err.message);
        }
    }

    return (
        <div className="w-fit h-fit flex items-center justify-center overflow-hidden outline-2 outline-[var(--light-color)]  rounded-2xl">
            {/* LOGIN */}

            <AnimatePresence mode="wait">
                {isLogin ? (
                    <motion.div
                        key="login"
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: .75, ease: "easeInOut" }}

                        className="w-[400px] h-[460px] bg-[var(--background)] px-10 py-6 flex flex-col items-center gap-4 text-[var(--light-color)] ">

                        <h2 className="border-b-2 px-3 leading-10 font-extrabold">L o g i n</h2>

                        <form
                            onSubmit={handleLogin}
                            className="w-full mt-2 flex flex-col gap-4">

                            {/* LOGIN FIELD */}
                            <InputForm label="Email" id="login-email" name="email" type="email" placeholder="name@gmail.com" value={logEmail} onChange={(e) => setLogEmail(e.target.value)} />
                            <InputForm label="Password" id="login-password" name="password" type={showPassword} placeholder="Password" value={logPassword} onChange={(e) => setLogPassword(e.target.value)} />

                            {/* SHOW PASSWORD BUTTON */}
                             <div className="w-full flex items-center gap-2 ">
                                <div
                                    onClick={togglePassword}

                                    className={`w-5 h-5 rounded-full cursor-pointer
                                        ${showPassword === "password" ? "bg-white" : "bg-green-500 scale-75"}`
                                    } />
                                <a className="opacity-60">Show Password</a>
                            </div>

                            {/* SUBMIT LOGIN BUTTON */}
                            <input
                                type="submit"
                                value="Login"
                                className="w-full text-center bg-green-300 py-1.5 font-bold rounded-lg cursor-pointer hover:opacity-70" />
                        </form>

                        <a>
                            <span
                                onClick={() => setIsLogin(false)}
                                className="font-bold border-b-2 mr-1 cursor-pointer opacity-90 hover:opacity-60">Register</span>
                            <span className="opacity-50">if don't have account</span>
                        </a>

                    </motion.div>

                ) :
                    <motion.div
                        key="register"
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: .75, ease: "easeInOut" }}
                        className="w-[400px] h-[460px] bg-[var(--background)] px-10 py-6 flex flex-col items-center gap-4 text-[var(--light-color)] ">

                        <h2 className="border-b-2 px-3 leading-10 font-extrabold">R e g i s t e r</h2>

                        <form
                            onSubmit={handleRegister}
                            className="w-full mt-2 flex flex-col gap-4">

                            {/* REGISTER FIELD */}
                            <InputForm label="Username" id="register-name" name="name" type="text" placeholder="name" value={regName} onChange={(e) => setRegName(e.target.value)} />
                            <InputForm label="Email" id="register-email" name="email" type="email" placeholder="name@gmail.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                            <InputForm label="Password" id="register-password" name="password" type={showPassword} placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />

                            {/* SHOW PASSWORD BUTTON */}
                            <div className="w-full flex items-center gap-2 ">
                                <div
                                    onClick={togglePassword}

                                    className={`w-5 h-5 rounded-full cursor-pointer
                                        ${showPassword === "password" ? "bg-green-500 scale-75" : "bg-white"}`
                                    } />
                                <a className="opacity-60">Show Password</a>
                            </div>

                            {/* SUBMIT REGISTER BUTTON */}
                            <input
                                type="submit"
                                value="Register"
                                className="w-full text-center bg-green-300 py-1.5 font-bold rounded-lg cursor-pointer hover:opacity-70" />

                        </form>

                        <a>
                            <span
                                onClick={() => setIsLogin(true)}
                                className="font-bold border-b-2 mr-1 cursor-pointer opacity-90 hover:opacity-60">Login</span>
                            <span className="opacity-50">if already have account</span>
                        </a>
                    </motion.div>
                }
            </AnimatePresence>


            {/* REGISTER */}

        </div>
    );
}