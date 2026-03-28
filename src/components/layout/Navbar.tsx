"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const desktopLeft = [
  { href: "/collection", label: "Collection" },
  { href: "/leather-archive", label: "Leather Archive" },
];

const desktopRight = [
  { href: "/amal-world", label: "World" },
  { href: "/journal", label: "Journal" },
];

const mobileLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/leather-archive", label: "Leather Archive" },
  { href: "/amal-world", label: "World" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group flex flex-col">
      <span className="font-body text-[11px] uppercase tracking-[0.2em] font-light text-white/50 group-hover:text-white/90 transition-colors duration-[400ms]">
        {children}
      </span>
      <span className="block h-px bg-white/40 w-full mt-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-in-out origin-center" />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const bgClass = scrolled
    ? "bg-black/85 backdrop-blur-md"
    : "bg-transparent";

  return (
    <>
      {/* ── Desktop Navbar (lg+) ─────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] h-[70px] px-10 lg:px-16 hidden lg:flex items-center justify-between transition-all duration-500 ease-in-out ${bgClass}`}
      >
        <div className="flex items-center gap-10">
          {desktopLeft.map(({ href, label }) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </div>

        <Link
          href="/"
          className="font-display text-xl tracking-[0.35em] font-light text-white/90 hover:text-white transition-colors duration-[400ms]"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          AMAL
        </Link>

        <div className="flex items-center gap-10">
          {desktopRight.map(({ href, label }) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </div>
      </nav>

      {/* ── Mobile Navbar (<lg) ──────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] h-[60px] px-6 flex lg:hidden items-center justify-between transition-all duration-500 ease-in-out ${bgClass}`}
      >
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="p-2 flex flex-col gap-[6px]"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span className="block w-[22px] h-[1px] bg-white/70 transition-all duration-300" />
          <span className="block w-[22px] h-[1px] bg-white/70 transition-all duration-300" />
          <span className="block w-[22px] h-[1px] bg-white/70 transition-all duration-300" />
        </button>

        <Link
          href="/"
          className="font-display text-lg tracking-[0.35em] font-light text-white/90"
          style={{ textDecoration: "none", color: "inherit", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
        >
          AMAL
        </Link>
      </nav>

      {/* ── Mobile Menu Overlay ──────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[210] flex flex-col backdrop-blur-xl lg:hidden"
        style={{
          background: "rgba(0,0,0,0.98)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 400ms ease",
        }}
      >
        {/* Overlay top bar */}
        <div className="h-[60px] px-6 flex items-center justify-between flex-shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="font-display text-lg tracking-[0.35em] font-light text-white/80"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            AMAL
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2 relative"
            style={{ background: "none", border: "none", cursor: "pointer", width: 36, height: 36 }}
          >
            <span
              className="block absolute w-[20px] h-[1px] bg-white/70"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(45deg)" }}
            />
            <span
              className="block absolute w-[20px] h-[1px] bg-white/70"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-45deg)" }}
            />
          </button>
        </div>

        {/* Centered links */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {mobileLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-[400ms]"
              style={{
                textDecoration: "none",
                color: "inherit",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 500ms ease ${i * 0.06}s, transform 500ms ease ${i * 0.06}s, color 400ms`,
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="flex flex-col items-center pb-16">
          <div className="w-12 h-px bg-white/10 mb-8" />
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/20">
            New York
          </span>
        </div>
      </div>
    </>
  );
}
