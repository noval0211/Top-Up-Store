'use client'
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function RootLayout({ children }) {

  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <link rel="icon" href="/webicon.ico" />
      <body className={`antialiased`}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
              position="top-right"
              reverseOrder={false}
              containerStyle={{ top: 80 }} />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
