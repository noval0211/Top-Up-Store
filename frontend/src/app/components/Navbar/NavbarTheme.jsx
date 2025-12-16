
'use client'
import { useContext } from "react"
import { ThemeContext } from "@/app/context/themeContext"
import { Sun, Moon } from 'lucide-react'
export default function NavbarTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <div onClick={toggleTheme}
            className={` outline-2 outline-[var(--light-color)] ${theme == 'dark' ? 'text-black' : 'text-white'}  p-0.5 rounded-md cursor-pointer`}>
            {theme == 'dark' ? <Moon /> : <Sun />}
        </div>
    )
}