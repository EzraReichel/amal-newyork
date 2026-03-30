"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
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

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Leather Archive", href: "/leathers" },
    { label: "Collections", href: "/journal" },
    { label: "World", href: "/world" },
  ];

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2, 4);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          transition: "background-color 500ms ease, backdrop-filter 500ms ease",
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* LEFT LINKS — desktop only */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px", flex: 1 }}>
          {leftLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color 400ms ease",
            }}
            className="nav-link-desktop"
            onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CENTER — AMAL */}
        <Link href="/" style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "20px",
          letterSpacing: "0.35em",
          fontWeight: 300,
          color: "rgba(255,255,255,0.9)",
          textDecoration: "none",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          AMAL
        </Link>

        {/* RIGHT LINKS — desktop only */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px", flex: 1, justifyContent: "flex-end" }}>
          {rightLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color 400ms ease",
            }}
            className="nav-link-desktop"
            onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* HAMBURGER — mobile only */}
        <button
          onClick={() => setMenuOpen(true)}
          className="hamburger-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            position: "absolute",
            left: "20px",
          }}
          aria-label="Open menu"
        >
          <div style={{ width: "22px", height: "1px", backgroundColor: "rgba(255,255,255,0.7)", marginBottom: "6px" }} />
          <div style={{ width: "22px", height: "1px", backgroundColor: "rgba(255,255,255,0.7)", marginBottom: "6px" }} />
          <div style={{ width: "22px", height: "1px", backgroundColor: "rgba(255,255,255,0.7)" }} />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          backgroundColor: "rgba(0,0,0,0.97)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "28px",
              fontWeight: 300,
            }}
            aria-label="Close menu"
          >
            ✕
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "32px",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 400ms ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,1)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "48px", width: "40px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <p style={{
            marginTop: "16px",
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.2)",
          }}>
            New York
          </p>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 1023px) {
          .nav-link-desktop {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
