"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="Optique Maison de l'Œil"
              width={200}
              height={70}
              priority
              style={{
                height: "70px",
                width: "auto",
                background: "transparent",
                border: "none",
                padding: 0,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-[#C9A227] transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/catalogue"
              className="text-sm text-gray-700 hover:text-[#C9A227] transition-colors font-medium"
            >
              Catalogue
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-700 hover:text-[#C9A227] transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/panier" className="relative p-1">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-[#C9A227] transition-colors" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A227] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-1 text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-[#C9A227] font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/catalogue"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-[#C9A227] font-medium"
            >
              Catalogue
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-[#C9A227] font-medium"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
