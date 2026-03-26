"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers, Leather } from "@/lib/leathers";

gsap.registerPlugin(useGSAP);

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Simple luminance check — no external utility needed here
function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

// ── Single swatch — outer div is the GSAP target, inner card flips ──
function LeatherSwatch({ leather, index }: { leather: Leather; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const numColor = isLight(leather.color) ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.2)";

  const handleTap = () => {
    if (!touched) {
      setTouched(true);   // first tap: flip
    } else {
      router.push(`/leathers/${leather.id}`); // second tap: navigate
    }
  };

  return (
    // Outer wrapper — GSAP animates opacity + scale on this element
    <div
      className="leather-swatch"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Perspective container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          perspective: "1000px",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={handleTap}
      >
        {/* The card — rotates on hover/touch */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: hovered || touched ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ── FRONT FACE: solid color ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: leather.color,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Grain texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: NOISE,
                backgroundRepeat: "repeat",
                opacity: 0.06,
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}
            />
            {/* Definition border */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(0,0,0,0.15)",
                pointerEvents: "none",
              }}
            />
            {/* Swatch number */}
            <span
              style={{
                position: "absolute",
                bottom: 5,
                left: 6,
                fontSize: 8,
                fontFamily: "var(--font-body)",
                color: numColor,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── BACK FACE: leather info ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#1A1A1A",
              border: "1px solid rgba(196,162,101,0.15)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              textAlign: "center",
            }}
            onClick={() => router.push(`/leathers/${leather.id}`)}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(9px, 1.0vw, 15px)",
                fontWeight: 300,
                color: "#F5F0EB",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
              }}
            >
              {leather.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(7px, 0.6vw, 9px)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(184,160,128,0.7)",
                marginTop: 5,
                lineHeight: 1.3,
              }}
            >
              {leather.origin}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(6px, 0.55vw, 8px)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(61,61,61,0.9)",
                marginTop: 5,
              }}
            >
              {leather.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────
export default function LeathersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 8, rows: 5 });

  // Responsive grid columns — JS-driven so inline styles can respond
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setGrid({ cols: 4, rows: 10 });
      else if (w < 1024) setGrid({ cols: 5, rows: 8 });
      else setGrid({ cols: 8, rows: 5 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // GSAP entrance — targets outer .leather-swatch wrappers only,
  // never touches the flip card transform
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".leather-swatch");
      if (!items.length) return;
      gsap.set(items, { opacity: 0, scale: 0.92 });
      gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.025,
        ease: "power2.out",
        clearProps: "transform", // clear so hover state controls inner card freely
      });
    },
    { scope: containerRef }
  );

  const isMobile = grid.cols === 4;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0A0A0A",
        overflowX: "hidden",
        overflowY: isMobile ? "auto" : "hidden",
      }}
    >
      {/* Brand label — top left */}
      <Link
        href="/"
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 50,
          fontFamily: "var(--font-display)",
          fontSize: "0.875rem",
          letterSpacing: "0.3em",
          color: "rgba(245,240,235,0.3)",
          textDecoration: "none",
        }}
      >
        AMAL
      </Link>

      {/* Archive label — top right */}
      <span
        style={{
          position: "fixed",
          top: 28,
          right: 24,
          zIndex: 50,
          fontFamily: "var(--font-body)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "rgba(245,240,235,0.3)",
        }}
      >
        Leather Archive
      </span>

      {/* The quilt — fully inline grid, no CSS class dependency */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          width: "100vw",
          height: isMobile ? `${grid.rows * 80}px` : "100vh",
          minHeight: "100vh",
          gap: 0,
        }}
      >
        {leathers.map((leather, i) => (
          <LeatherSwatch key={leather.id} leather={leather} index={i} />
        ))}
      </div>
    </div>
  );
}
