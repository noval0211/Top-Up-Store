/*
  Navbar Component
  ----------------
  This component renders the main navigation bar for the application.
  It includes:
    1. Mobile Menu Button
    2. Brand name/logo link
    3. Search bar component
    4. Theme toggle component
    5. Conditional role-based actions:
       - Admin: "Admin Control" link
       - User: "Pesanan" (Order) component
    6. User profile component with user information

  This is a client-side component (`'use client'`) because it fetches
  authenticated user data and handles dynamic UI updates.
 
  Components used:
    - NavbarSearch: Search input field with autocomplete
    - NavbarTheme: Theme toggle button
    - NavbarPesanan: Order dropdown for regular users
    - NavbarUser: Displays user avatar and menu
 
  API:
    - AuthMe(): Fetches currently logged-in user information
 
  Props: None (fetches user internally)

  Usage:
    <Navbar />

  Notes:
    - User role is fetched on render; conditional links are based on `user.role`.
    - Responsive layout: brand + search bar + user actions visible on medium screens and above.
    - Uses TailwindCSS for styling and layout.
*/

'use client'
import { NavbarSearch, NavbarTheme, NavbarPesanan, NavbarUser } from '@/app/components/Navbar'
import { useAuth } from '@/app/hooks/useAuth'
import { Menu } from 'lucide-react'

export default function Navbar() {

  const { user } = useAuth()

  return (
    <div className="z-50 fixed top-0 left-0 bg-[var(--background)] w-full h-16 pr-5 sm:pr-10
            text-[var(--light-color)] font-extrabold
            flex items-center sm:justify-between gap-10
            border-b-[1px] border-[var(--foreground)]">

      <div className='flex w-full md:w-[60%] h-full items-center'>
        {/* MOBILE */}
        <div className='flex justify-center items-center md:hidden p-5 sm:p-0 sm:pl-5 sm:bg-linear-to-r from-orange-400 bg-orange-400 h-full'>
          <Menu width={30} height={30} />
        </div>

        {/* BRAND NAME */}
        <div className='sm:bg-linear-to-r from-orange-400 text-sm lg:text-md w-50 sm:w-80 h-full flex items-center justify-center'>
          <a href={"/"} className='cursor-pointer '>
            N A M E . S T O R E
          </a>
        </div>

        {/* SEARCH BAR */}
        <NavbarSearch />
      </div>

      <div className="hidden md:flex gap-5 items-center  text-sm">
        {/* THEME */}
        <NavbarTheme />

        {/* CONDITIONAL ROLE ACTION: ADMIN CONTROL(ADMIN) / PESANANAN(USER) */}
        {user?.role === 'admin' ? (
          <a
            href={"/admin"}
            className="text-center hover:border-b-2 cursor-pointer px-2 ease-in-out duration-65 transition-all">
            Admin Control
          </a>
        ) : (
          <NavbarPesanan />
        )}

        {/* USER */}
        <NavbarUser user={user} />
      </div>
    </div>
  )
}