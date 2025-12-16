'use client'

import { ThemeProvider } from "./context/themeContext";

export default function ClienProvider({children}) {
    return(
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}