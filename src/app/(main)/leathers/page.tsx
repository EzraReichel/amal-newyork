"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers, Leather } from "@/lib/leathers";
import { isLightColor } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Single swatch ───────────────────────────────────────────────
function LeatherSwatch({
  leather,
  index,
  isTouchDevice,
}: {
  leather: Leather;
  index: number;
  isTouchDevice: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();
  const numColor = isLightColor(leather.color)
    ? "rgba(0,0,0,0.25)"
    : "rgba(255,255,255,0.2)";

  const handleClick = () => {
    if (isTouchDevice && !flipped) {
      setFlipped(true);
      return;
    }
    router.push(`/leathers/${leather.id}`);
  };

  return (
    <div className="swatch-item" onClick={handleClick}>
      <div className={`swatch-inner${flipped ? " is-flipped" : ""}`}>

        {/* ── Front face: solid leather color ── */}
        <div className="swatch-face" style={{ backgroundColor: leather.color }}>
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
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ── Back face: leather info ── */}
        <div
          className="swatch-face swatch-back-face"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid rgba(196,162,101,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 8px",
            textAlign: "center",
            gap: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(9px, 1.1vw, 16px)",
              fontWeight: 300,
              color: "#F5F0EB",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
            }}
          >
            {leather.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(7px, 0.7vw, 10px)",
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
              fontSize: "clamp(6px, 0.6vw, 9px)",
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
  );
}

// ── Page ────────────────────────────────────────────────────────
export default function LeathersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const detect = () => setIsTouchDevice(true);
    window.addEventListener("touchstart", detect, { once: true });
    return () => window.removeEventListener("touchstart", detect);
  }, []);

  useGSAP(
    () => {
      const items = gridRef.current?.querySelectorAll(".swatch-item");
      if (!items?.length) return;

      gsap.set(items, { opacity: 0, scale: 0.9 });
      gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: {
          amount: 1.2,
          from: "start",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0A0A0A",
        overflow: "hidden",
      }}
    >
      {/* ── Brand label — top left ── */}
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

      {/* ── Archive label — top right ── */}
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

      {/* ── The quilt ── */}
      <div
        ref={gridRef}
        className="leather-grid"
        style={{ width: "100%", height: "100%" }}
      >
        {leathers.map((leather, i) => (
          <LeatherSwatch
            key={leather.id}
            leather={leather}
            index={i}
            isTouchDevice={isTouchDevice}
          />
        ))}
      </div>
    </div>
  );
}
