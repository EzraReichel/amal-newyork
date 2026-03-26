"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group inline-block">
    <span className="font-body uppercase text-[11px] tracking-luxury font-light text-amal-cream/70 hover:text-amal-cream transition-colors duration-[400ms] ease-out">
      {children}
    </span>
    <span className="absolute bottom-0 left-0 w-full h-px bg-amal-warm origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-out" />
  </Link>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-6 md:px-12 transition-all duration-[400ms] ease-out ${
          scrolled ? "bg-amal-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Left links */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <NavLink href="/journal">Journal</NavLink>
          <NavLink href="/world">World</NavLink>
        </div>

        {/* Center — Masthead */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-center">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl tracking-[0.35em] font-light text-amal-cream hover:text-amal-cream/80 transition-colors duration-[400ms] ease-out"
          >
            AMAL
          </Link>
        </div>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-[5px] items-center justify-center w-11 h-11"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <div className="w-5 h-px bg-amal-cream" />
          <div className="w-5 h-px bg-amal-cream" />
          <div className="w-5 h-px bg-amal-cream" />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-amal-black flex flex-col items-center justify-center transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ transform: menuOpen ? "translateY(0)" : "translateY(-8px)" }}
      >
        <button
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-amal-cream/70 hover:text-amal-cream transition-colors duration-[400ms]"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <div className="relative w-5 h-5">
            <div className="absolute top-1/2 left-0 w-full h-px bg-current rotate-45" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-current -rotate-45" />
          </div>
        </button>
        <nav className="flex flex-col items-center gap-8">
          {[
            { href: "/journal", label: "Journal" },
            { href: "/world", label: "World" },
            { href: "/collections", label: "Collections" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl tracking-wide font-light text-amal-cream/70 hover:text-amal-cream transition-colors duration-[400ms] ease-out"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
