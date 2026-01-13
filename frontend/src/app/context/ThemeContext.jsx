
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext() 

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('EStore-Theme')
        if (savedTheme) setTheme(savedTheme);
    },[])

    useEffect(() => {
        const body = document.body;
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark')
        }
        localStorage.setItem('EStore-Theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}