"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-purple-500 transition"
        >
          Cotton<span className="text-purple-500">Core</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-500 font-light tracking-wide">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative transition ${
                pathname === href
                  ? "text-black after:w-full"
                  : "hover:text-black"
              } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all hover:after:w-full`}
            >
              {label}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-light tracking-wide px-4 py-2 rounded-lg border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-700 font-light tracking-wide transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="text-sm text-gray-500 hover:text-black font-light tracking-wide transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Cart & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Cart Icon always visible */}
          <Link href="/cart" className="text-gray-500 hover:text-black">
            <ShoppingBag size={22} />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          <div className="px-6 py-4 flex flex-col gap-4 text-gray-500 font-light tracking-wide">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`${
                  pathname === href ? "text-black" : "hover:text-black"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-light tracking-wide px-4 py-2 rounded-lg border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition"
              >
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-sm text-red-500 hover:text-red-700 font-light tracking-wide"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-500 hover:text-black font-light tracking-wide"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
