"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers, Leather } from "@/lib/leathers";

gsap.registerPlugin(useGSAP);

// ── Single swatch ────────────────────────────────────────────────
function LeatherSwatch({ leather, index }: { leather: Leather; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const handleTap = () => {
    if (!touched) {
      setTouched(true);
    } else {
      router.push(`/leathers/${leather.id}`);
    }
  };

  const flipped = hovered || touched;

  return (
    // Outer div — GSAP targets this for the entrance animation
    <div className="leather-swatch" style={{ width: "100%", height: "100%" }}>
      {/* Perspective shell */}
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
        {/* Flip card */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >

          {/* ── FRONT: leather photo ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              // Photo as background, hex color as fallback
              backgroundColor: leather.color,
              backgroundImage: `url('${leather.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Thin definition border between patches */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(0,0,0,0.18)",
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
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
                mixBlendMode: "overlay",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── BACK: leather info ── */}
          <div
            onClick={() => router.push(`/leathers/${leather.id}`)}
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
              padding: "10px 8px",
              textAlign: "center",
              gap: 0,
            }}
          >
            {/* Italian name */}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.6vw, 22px)",
                fontWeight: 300,
                color: "#F5F0EB",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
              }}
            >
              {leather.name}
            </span>
            {/* English translation */}
            <span
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "clamp(10px, 0.9vw, 14px)",
                color: "rgba(245,240,235,0.4)",
                marginTop: 3,
                lineHeight: 1.2,
              }}
            >
              {leather.nameEn}
            </span>
            {/* Collection */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(9px, 0.75vw, 12px)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(184,160,128,0.7)",
                marginTop: 7,
                lineHeight: 1.3,
              }}
            >
              {leather.collection}
            </span>
            {/* Origin */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(9px, 0.7vw, 12px)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(61,61,61,0.9)",
                marginTop: 4,
              }}
            >
              {leather.origin}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function LeathersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 8, rows: 5 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768)  setGrid({ cols: 4, rows: 10 });
      else if (w < 1024) setGrid({ cols: 5, rows: 8 });
      else setGrid({ cols: 8, rows: 5 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
        clearProps: "transform",
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
        backgroundColor: "#1A1A1A",
        overflowX: "hidden",
        overflowY: "auto",
        paddingTop: "70px",
      }}
    >
      {/* Quilt grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          width: "100vw",
          height: isMobile ? `${grid.rows * 80}px` : "calc(100vh - 70px)",
          minHeight: "calc(100vh - 70px)",
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
