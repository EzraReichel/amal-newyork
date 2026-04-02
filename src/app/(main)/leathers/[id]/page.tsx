"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers } from "@/lib/leathers";

gsap.registerPlugin(useGSAP);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  price: number;
}

const LEFT_PRODUCTS: Product[] = [
  { id: "card-holder",   name: "Card Holder",   price: 295 },
  { id: "bifold-wallet", name: "Bifold Wallet",  price: 485 },
];

const RIGHT_PRODUCTS: Product[] = [
  { id: "dress-belt",    name: "Dress Belt",     price: 595 },
  { id: "travel-wallet", name: "Travel Wallet",  price: 685 },
];

// ── Compact product card ───────────────────────────────────────────────────────
function ProductCard({ product, leatherColor, leatherImage }: {
  product: Product;
  leatherColor: string;
  leatherImage: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderLeft: hovered ? "2px solid rgba(196,162,101,0.6)" : "2px solid transparent",
        paddingLeft: hovered ? 10 : 10,
        transition: "border-color 250ms ease",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{
        width: "100%",
        aspectRatio: "4 / 5",
        backgroundColor: leatherColor,
        backgroundImage: `url('${leatherImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: hovered ? 0.9 : 0.65,
        transition: "opacity 250ms ease",
      }} />

      {/* Name */}
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: 13,
        fontWeight: 500,
        color: "#F5F0EB",
        letterSpacing: "0.03em",
        marginTop: 10,
      }}>
        {product.name}
      </div>

      {/* Price */}
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color: "rgba(196,162,101,0.8)",
        marginTop: 3,
      }}>
        ${product.price.toLocaleString()}
      </div>

      {/* View link */}
      <div style={{
        marginTop: 8,
        fontFamily: "var(--font-body)",
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: hovered ? "rgba(196,162,101,0.9)" : "rgba(196,162,101,0.35)",
        transition: "color 250ms ease",
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}>
        View
        <span style={{
          display: "inline-block",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 250ms ease",
        }}>→</span>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ side, products, leather }: {
  side: "left" | "right";
  products: Product[];
  leather: NonNullable<ReturnType<typeof leathers.find>>;
}) {
  return (
    <div style={{
      height: "100%",
      backgroundColor: "#111111",
      borderRight: side === "left" ? "1px solid rgba(42,42,42,0.8)" : undefined,
      borderLeft: side === "right" ? "1px solid rgba(42,42,42,0.8)" : undefined,
      overflowY: "auto",
      scrollbarWidth: "none",
      paddingTop: 90,
      paddingBottom: 40,
      paddingLeft: 16,
      paddingRight: 16,
    }}>
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.3em",
        color: "rgba(184,160,128,0.4)",
        marginBottom: 28,
      }}>
        Products
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            leatherColor={leather.color}
            leatherImage={leather.image}
          />
        ))}
      </div>
    </div>
  );
}

// ── Panel progress ─────────────────────────────────────────────────────────────
function PanelProgress({ active, total }: { active: number; total: number }) {
  return (
    <div style={{
      position: "absolute",
      bottom: 24,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      pointerEvents: "none",
      zIndex: 20,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 1.5,
          width: i === active ? 40 : 20,
          backgroundColor: i === active ? "rgba(196,162,101,0.7)" : "rgba(255,255,255,0.1)",
          transition: "width 400ms ease, background-color 400ms ease",
        }} />
      ))}
    </div>
  );
}

// ── Panel 1: Cover ────────────────────────────────────────────────────────────
function PanelCover({ leather }: { leather: NonNullable<ReturnType<typeof leathers.find>> }) {
  return (
    <div
      style={{
        minWidth: "100%",
        height: "100%",
        flexShrink: 0,
        scrollSnapAlign: "start",
        backgroundColor: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 40px 60px",
        position: "relative",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      <div
        className="cover-content"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
      >
        {/* Leather name — hero */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 6vw, 5rem)",
          fontWeight: 300,
          color: "#F5F0EB",
          letterSpacing: "0.08em",
          lineHeight: 1,
          margin: 0,
        }}>
          {leather.name}
        </h1>

        {/* English translation */}
        <p style={{
          fontFamily: "var(--font-editorial)",
          fontStyle: "italic",
          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          color: "#B8A080",
          margin: "16px 0 0",
        }}>
          {leather.nameEn}
        </p>

        {/* Leather type + origin */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(11px, 0.85vw, 14px)",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "#D4C5B0",
          margin: "24px 0 0",
          fontWeight: 500,
        }}>
          {leather.collection} · {leather.origin}
        </p>

        {/* Large leather image */}
        <div style={{
          width: "min(60%, 360px)",
          aspectRatio: "3 / 4",
          marginTop: 36,
          backgroundColor: leather.color,
          backgroundImage: `url('${leather.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          border: "1px solid rgba(196,162,101,0.12)",
        }} />

        {/* Scroll hint */}
        <div style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}>
          <span style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.2)",
            animation: "hint-pulse 2s ease-in-out infinite",
            display: "inline-block",
            letterSpacing: "0.1em",
          }}>→</span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.15)",
          }}>Continue</span>
        </div>
      </div>
    </div>
  );
}

// ── Panel 2: The Leather (story) ──────────────────────────────────────────────
function PanelStory() {
  const story = [
    `Drawn from a single riverside harvest in equatorial West Africa, this hide was selected for the exceptional regularity of its scale pattern — each polygon measuring within a fraction of a millimetre of its neighbours.`,
    `The tanning process unfolds over eleven weeks in the hill-town workshops north of Florence, where third-generation artisans draw on formulas recorded in ledgers that predate the republic. Pigment is applied in nine successive layers, each buffed to a finish that amplifies natural light without reflecting it — a quality the workshops call morbidezza, softness.`,
    `The result ages in the direction of the owner: pressure points develop a quiet burnish, fold lines deepen, and the overall character of the hide grows more singular with every year of use.`,
  ];

  return (
    <div style={{
      minWidth: "100%",
      height: "100%",
      flexShrink: 0,
      scrollSnapAlign: "start",
      backgroundColor: "#101010",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 48px 60px",
      overflowY: "auto",
      scrollbarWidth: "none",
    }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        {/* Section label */}
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#C4A265",
          marginBottom: 12,
        }}>
          The Leather
        </div>
        {/* Gold rule */}
        <div style={{ width: 40, height: 1, backgroundColor: "rgba(196,162,101,0.5)", marginBottom: 28 }} />

        {/* Body text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {story.map((para, i) => (
            <p key={i} style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#F5F0EB",
              margin: 0,
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        <div style={{
          marginTop: 40,
          paddingTop: 32,
          borderTop: "1px solid rgba(196,162,101,0.1)",
          fontFamily: "var(--font-editorial)",
          fontStyle: "italic",
          fontSize: "clamp(18px, 1.5vw, 22px)",
          color: "#B8A080",
          lineHeight: 1.55,
        }}>
          &ldquo;No two pieces from this colour will ever be entirely alike.&rdquo;
        </div>
      </div>
    </div>
  );
}

// ── Panel 3: Specifications ───────────────────────────────────────────────────
function PanelSpecs({ leather }: { leather: NonNullable<ReturnType<typeof leathers.find>> }) {
  const finish = leather.collection.includes("Lucido") ? "High-gloss lacquer" : "Matte wax";
  const specs: [string, string][] = [
    ["Origin",      leather.origin],
    ["Tannage",     "Vegetable-chrome hybrid"],
    ["Finish",      finish],
    ["Grade",       "AAA — export select"],
    ["CITES",       "Appendix II certified"],
  ];

  return (
    <div style={{
      minWidth: "100%",
      height: "100%",
      flexShrink: 0,
      scrollSnapAlign: "start",
      backgroundColor: "#0C0C0C",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "clamp(80px, 18vh, 140px) 48px 60px",
      overflowY: "auto",
      scrollbarWidth: "none",
    }}>
      <div style={{ width: "100%", maxWidth: 500 }}>
        {/* Section label */}
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#C4A265",
          marginBottom: 12,
        }}>
          Specifications
        </div>
        {/* Gold rule */}
        <div style={{ width: 40, height: 1, backgroundColor: "rgba(196,162,101,0.5)", marginBottom: 28 }} />

        {/* Specs table */}
        {specs.map(([key, value]) => (
          <div key={key} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
            borderBottom: "1px solid #2A2A2A",
          }}>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#B8A080",
            }}>
              {key}
            </span>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              color: "#F5F0EB",
              fontWeight: 400,
              textAlign: "right",
            }}>
              {value}
            </span>
          </div>
        ))}

        {/* Back to archive */}
        <div style={{ marginTop: 40 }}>
          <Link
            href="/leathers"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(196,162,101,0.45)",
              textDecoration: "none",
              transition: "color 300ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(196,162,101,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(196,162,101,0.45)")}
          >
            ← Back to Archive
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Prev / Next nav bar ───────────────────────────────────────────────────────
function LeatherNavBar({ side, leather, label }: {
  side: "left" | "right";
  leather: typeof leathers[number] | undefined;
  label: "prev" | "next";
}) {
  const [hovered, setHovered] = useState(false);

  if (!leather) {
    return (
      <div style={{
        width: "72px",
        height: "100%",
        backgroundColor: "#0A0A0A",
        borderRight: side === "left" ? "1px solid #1A1A1A" : undefined,
        borderLeft: side === "right" ? "1px solid #1A1A1A" : undefined,
        flexShrink: 0,
      }} />
    );
  }

  return (
    <Link
      href={`/leathers/${leather.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "72px",
        height: "100%",
        backgroundColor: hovered ? "rgba(196,162,101,0.06)" : "#0E0E0E",
        borderRight: side === "left" ? "1px solid #1E1E1E" : undefined,
        borderLeft: side === "right" ? "1px solid #1E1E1E" : undefined,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        textDecoration: "none",
        transition: "background-color 300ms ease",
        cursor: "pointer",
      }}
    >
      {/* Chevron arrow */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{
          color: hovered ? "rgba(196,162,101,0.9)" : "rgba(184,160,128,0.35)",
          transition: "color 250ms ease, transform 250ms ease",
          transform: hovered
            ? (label === "prev" ? "translateX(-3px)" : "translateX(3px)")
            : "translateX(0)",
          flexShrink: 0,
        }}
      >
        {label === "prev"
          ? <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          : <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        }
      </svg>

      {/* Leather name — rotated */}
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: 8,
        textTransform: "uppercase",
        letterSpacing: "0.22em",
        color: hovered ? "rgba(196,162,101,0.7)" : "rgba(255,255,255,0.15)",
        transition: "color 250ms ease",
        writingMode: "vertical-rl",
        transform: label === "prev" ? "rotate(180deg)" : "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxHeight: "130px",
        textOverflow: "ellipsis",
      }}>
        {leather.name}
      </span>

      {/* Prev / Next micro label */}
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: 7,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: hovered ? "rgba(196,162,101,0.4)" : "rgba(255,255,255,0.07)",
        transition: "color 250ms ease",
        writingMode: "vertical-rl",
        transform: label === "prev" ? "rotate(180deg)" : "none",
      }}>
        {label === "prev" ? "Prev" : "Next"}
      </span>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const PANEL_COUNT = 3;

export default function LeatherDetailPage() {
  const { id } = useParams<{ id: string }>();
  const leather = leathers.find((l) => l.id === id);
  const currentIdx = leathers.findIndex((l) => l.id === id);
  const prevLeather = currentIdx > 0 ? leathers[currentIdx - 1] : undefined;
  const nextLeather = currentIdx < leathers.length - 1 ? leathers[currentIdx + 1] : undefined;

  const containerRef    = useRef<HTMLDivElement>(null);
  const storyRef        = useRef<HTMLDivElement>(null);
  const leftSideRef     = useRef<HTMLDivElement>(null);
  const rightSideRef    = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  // ── Wheel → one panel per gesture ────────────────────────────────────────
  const wheelLocked    = useRef(false);
  const activePanelRef = useRef(0);

  const snapToPanel = useCallback((index: number) => {
    const el = storyRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(index, 0), PANEL_COUNT - 1);
    // Use el.offsetWidth (the rendered width of the scroll container)
    // NOT el.clientWidth which may differ if scrollbar is visible
    el.scrollTo({ left: clamped * el.offsetWidth, behavior: "smooth" });
    activePanelRef.current = clamped;
    setActivePanel(clamped);
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (wheelLocked.current) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 5) return;
    wheelLocked.current = true;
    snapToPanel(activePanelRef.current + (delta > 0 ? 1 : -1));
    setTimeout(() => { wheelLocked.current = false; }, 650);
  }, [snapToPanel]);

  // ── Track active panel via native scroll (touch / trackpad) ──────────────
  const handleStoryScroll = useCallback(() => {
    const el = storyRef.current;
    if (!el) return;
    const panel = Math.round(el.scrollLeft / el.offsetWidth);
    const clamped = Math.min(Math.max(panel, 0), PANEL_COUNT - 1);
    if (clamped !== activePanelRef.current) {
      activePanelRef.current = clamped;
      setActivePanel(clamped);
    }
  }, []);

  useEffect(() => {
    const el = storyRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleStoryScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleStoryScroll);
  }, [handleStoryScroll]);

  // ── GSAP entrance ─────────────────────────────────────────────────────────
  useGSAP(() => {
    if (!leftSideRef.current || !rightSideRef.current) return;
    const tl = gsap.timeline();

    gsap.set(leftSideRef.current,  { x: "-100%" });
    gsap.set(rightSideRef.current, { x: "100%" });

    tl.to([leftSideRef.current, rightSideRef.current], {
      x: 0, duration: 0.8, ease: "power3.out",
    });

    tl.from(".cover-content > *", {
      y: 16, opacity: 0, duration: 0.65, stagger: 0.09,
      ease: "power3.out", clearProps: "transform,opacity",
    }, "-=0.4");

    tl.from(".panel-progress", {
      opacity: 0, duration: 0.4, ease: "power2.out",
    }, "-=0.2");
  }, { scope: containerRef });

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!leather) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#0A0A0A", gap: "1.5rem",
      }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 300, color: "#F5F0EB" }}>
          Leather not found
        </p>
        <Link href="/leathers" style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(184,160,128,0.6)", textDecoration: "none" }}>
          ← Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0A0A0A",
          display: "grid",
          gridTemplateColumns: "72px 15% 1fr 15% 72px",
          position: "relative",
        }}
      >
        {/* ── Prev leather nav ── */}
        <LeatherNavBar side="left" leather={prevLeather} label="prev" />

        {/* ── Left sidebar ── */}
        <div ref={leftSideRef} style={{ height: "100%", overflow: "hidden" }}>
          <Sidebar side="left" products={LEFT_PRODUCTS} leather={leather} />
        </div>

        {/* ── Center storybook ── */}
        <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
          {/* Top strip */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "18px 24px",
            background: "linear-gradient(to bottom, rgba(13,13,13,0.9) 0%, transparent 100%)",
            pointerEvents: "none",
          }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(245,240,235,0.2)" }}>AMAL</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,235,0.15)" }}>
              {activePanel + 1} / {PANEL_COUNT}
            </span>
          </div>

          {/* Scroll-right edge hint (panel 1 only) */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 60,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none", zIndex: 10,
            opacity: activePanel === 0 ? 1 : 0,
            transition: "opacity 500ms ease",
          }}>
            <span style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.07)",
              animation: "hint-pulse 2s ease-in-out infinite",
              display: "block",
              lineHeight: 1,
            }}>›</span>
          </div>

          {/* Panels container */}
          <div
            ref={storyRef}
            onWheel={onWheel}
            style={{
              display: "flex",
              height: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollBehavior: "auto",
              scrollbarWidth: "none",
              // Ensure all 3 panels lay out at full container width
              // (no min-content collapse)
              width: "100%",
            }}
          >
            <PanelCover  leather={leather} />
            <PanelStory />
            <PanelSpecs  leather={leather} />
          </div>

          {/* Panel progress */}
          <div className="panel-progress">
            <PanelProgress active={activePanel} total={PANEL_COUNT} />
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div ref={rightSideRef} style={{ height: "100%", overflow: "hidden" }}>
          <Sidebar side="right" products={RIGHT_PRODUCTS} leather={leather} />
        </div>

        {/* ── Next leather nav ── */}
        <LeatherNavBar side="right" leather={nextLeather} label="next" />
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }

        @keyframes hint-pulse {
          0%, 100% { transform: translateX(0); opacity: 0.6; }
          50%       { transform: translateX(6px); opacity: 1; }
        }

        /* Mobile — vertical stack */
        @media (max-width: 767px) {
          .leather-detail-root {
            grid-template-columns: 1fr !important;
            height: auto !important;
            overflow: auto !important;
          }
        }
      `}</style>
    </>
  );
}
