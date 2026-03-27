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
  subtitle: string;
  price: number;
  sizes?: string[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const LEFT_PRODUCTS: Product[] = [
  {
    id: "card-holder",
    name: "Card Holder",
    subtitle: "4 Card Slots · Slim Profile",
    price: 295,
  },
  {
    id: "bifold-wallet",
    name: "Bifold Wallet",
    subtitle: "8 Card Slots · 2 Bill Compartments",
    price: 485,
  },
];

const RIGHT_PRODUCTS: Product[] = [
  {
    id: "dress-belt",
    name: "Dress Belt",
    subtitle: "3.5 cm Width · Gold Buckle",
    price: 595,
    sizes: ["30", "32", "34", "36", "38", "40"],
  },
  {
    id: "travel-wallet",
    name: "Travel Wallet",
    subtitle: "Passport Slot · 6 Card Slots",
    price: 685,
  },
];

// ── Corner brackets ───────────────────────────────────────────────────────────
function CornerBrackets() {
  const s: React.CSSProperties = { position: "absolute", width: 8, height: 8 };
  const line = "1px solid rgba(61,61,61,0.15)";
  return (
    <>
      <span style={{ ...s, top: 6, left: 6, borderTop: line, borderLeft: line }} />
      <span style={{ ...s, top: 6, right: 6, borderTop: line, borderRight: line }} />
      <span style={{ ...s, bottom: 6, left: 6, borderBottom: line, borderLeft: line }} />
      <span style={{ ...s, bottom: 6, right: 6, borderBottom: line, borderRight: line }} />
    </>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  leatherName,
}: {
  product: Product;
  leatherName: string;
}) {
  const [size, setSize] = useState(product.sizes?.[2] ?? null);
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <div>
      {/* Image placeholder */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          backgroundColor: "rgba(42,42,42,0.5)",
          border: "1px solid rgba(61,61,61,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CornerBrackets />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(61,61,61,0.2)",
          }}
        >
          Product Image
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 300,
          color: "#F5F0EB",
          letterSpacing: "0.04em",
          marginTop: 12,
        }}
      >
        {product.name}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(61,61,61,0.4)",
          marginTop: 4,
        }}
      >
        {product.subtitle}
      </div>

      {/* Price */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "rgba(245,240,235,0.8)",
          marginTop: 8,
        }}
      >
        ${product.price.toLocaleString()}
      </div>

      {/* Leather color label */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(196,162,101,0.4)",
          marginTop: 4,
        }}
      >
        {leatherName}
      </div>

      {/* Size selector */}
      {product.sizes && (
        <div style={{ marginTop: 10, display: "flex", gap: 4, flexWrap: "wrap" }}>
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                width: 28,
                height: 22,
                border: s === size
                  ? "1px solid rgba(196,162,101,0.7)"
                  : "1px solid rgba(61,61,61,0.25)",
                backgroundColor: s === size ? "rgba(196,162,101,0.1)" : "transparent",
                color: s === size ? "rgba(196,162,101,0.9)" : "rgba(245,240,235,0.25)",
                fontFamily: "var(--font-body)",
                fontSize: 8,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* View link */}
      <div
        style={{ marginTop: 12 }}
        onMouseEnter={() => setArrowHovered(true)}
        onMouseLeave={() => setArrowHovered(false)}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: arrowHovered ? "rgba(196,162,101,0.9)" : "rgba(196,162,101,0.4)",
            cursor: "pointer",
            transition: "color 400ms ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          View
          <span
            style={{
              display: "inline-block",
              transform: arrowHovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 400ms ease",
            }}
          >
            →
          </span>
        </span>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  side,
  products,
  leatherName,
  className,
}: {
  side: "left" | "right";
  products: Product[];
  leatherName: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        height: "100%",
        backgroundColor: "#111111",
        borderRight: side === "left" ? "1px solid rgba(61,61,61,0.08)" : undefined,
        borderLeft: side === "right" ? "1px solid rgba(61,61,61,0.08)" : undefined,
        overflowY: "auto",
        scrollbarWidth: "none",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "rgba(184,160,128,0.5)",
          marginBottom: 32,
        }}
      >
        Products
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} leatherName={leatherName} />
        ))}
      </div>
    </div>
  );
}

// ── Panel progress dots ────────────────────────────────────────────────────────
function PanelProgress({ active, total }: { active: number; total: number }) {
  return (
    <div
      style={{
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
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 1.5,
            width: i === active ? 40 : 24,
            backgroundColor: i === active ? "rgba(184,160,128,0.6)" : "rgba(61,61,61,0.15)",
            transition: "width 400ms ease, background-color 400ms ease",
          }}
        />
      ))}
    </div>
  );
}

// ── Panel 1: Cover ────────────────────────────────────────────────────────────
function PanelCover({ leather }: { leather: NonNullable<ReturnType<typeof leathers.find>> }) {
  return (
    <div
      className="storybook-panel"
      style={{
        minWidth: "100%",
        height: "100%",
        flexShrink: 0,
        scrollSnapAlign: "start",
        backgroundColor: "#0E0E0E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 48px",
        position: "relative",
      }}
    >
      <div className="cover-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 30, height: 1, backgroundColor: "rgba(196,162,101,0.4)", marginBottom: 24 }} />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#F5F0EB",
            letterSpacing: "0.06em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {leather.name}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: "1.125rem",
            color: "rgba(245,240,235,0.35)",
            margin: "8px 0 0",
          }}
        >
          {leather.nameEn}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "rgba(184,160,128,0.5)",
            margin: "16px 0 0",
          }}
        >
          {leather.collection} · {leather.origin}
        </p>

        <div style={{ width: 30, height: 1, backgroundColor: "rgba(196,162,101,0.4)", marginTop: 24 }} />
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: "rgba(61,61,61,0.25)",
            animation: "hint-pulse 2s ease-in-out infinite",
            display: "inline-block",
          }}
        >
          →
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(61,61,61,0.2)",
          }}
        >
          Continue
        </span>
      </div>
    </div>
  );
}

// ── Panel 2: The Leather ──────────────────────────────────────────────────────
function PanelLeather({ leather }: { leather: NonNullable<ReturnType<typeof leathers.find>> }) {
  const story = `Drawn from a single riverside harvest in equatorial West Africa, this hide was
selected for the exceptional regularity of its scale pattern — each polygon measuring within a
fraction of a millimetre of its neighbours. The tanning process unfolds over eleven weeks in the
hill-town workshops north of Florence, where third-generation artisans draw on formulas recorded
in ledgers that predate the republic. Pigment is applied in nine successive layers, each buffed to
a finish that amplifies natural light without reflecting it — a quality the workshops call
morbidezza, softness. The result ages in the direction of the owner: pressure points develop a
quiet burnish, fold lines deepen, and the overall character of the hide grows more singular with
every year of use.`;

  return (
    <div
      style={{
        minWidth: "100%",
        height: "100%",
        flexShrink: 0,
        scrollSnapAlign: "start",
        backgroundColor: "#101010",
        display: "flex",
        alignItems: "center",
        padding: "0 64px",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 48,
          alignItems: "center",
          maxWidth: 700,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Text */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(184,160,128,0.5)",
              marginBottom: 20,
            }}
          >
            The Leather
          </div>
          <p
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "0.9375rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(245,240,235,0.75)",
              margin: 0,
              maxWidth: "45ch",
            }}
          >
            {story}
          </p>
        </div>

        {/* Image */}
        <div>
          <div
            style={{
              width: 240,
              aspectRatio: "3 / 4",
              backgroundColor: leather.color,
              backgroundImage: `url('${leather.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(61,61,61,0.1)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(61,61,61,0.25)",
              marginTop: 12,
              textAlign: "center",
            }}
          >
            Natural light · Studio
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Panel 3: Specifications ───────────────────────────────────────────────────
function PanelSpecs({ leather }: { leather: NonNullable<ReturnType<typeof leathers.find>> }) {
  const finish = leather.collection.includes("Lucido") ? "High-gloss lacquer" : "Matte wax";

  const specs: [string, string][] = [
    ["Origin",       leather.origin],
    ["Tannage",      "Vegetable-chrome hybrid"],
    ["Finish",       finish],
    ["Scale grade",  "AAA — export select"],
    ["CITES",        "Appendix II certified"],
  ];

  return (
    <div
      style={{
        minWidth: "100%",
        height: "100%",
        flexShrink: 0,
        scrollSnapAlign: "start",
        backgroundColor: "#0C0C0C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(184,160,128,0.5)",
            marginBottom: 32,
          }}
        >
          Specifications
        </div>

        {specs.map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid rgba(61,61,61,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(61,61,61,0.5)",
              }}
            >
              {key}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(245,240,235,0.8)",
                fontWeight: 300,
                textAlign: "right",
              }}
            >
              {value}
            </span>
          </div>
        ))}

        {/* Pull quote */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid rgba(196,162,101,0.12)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "rgba(245,240,235,0.4)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            "No two pieces from this colour<br />will ever be entirely alike."
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Panel 4: Provenance ───────────────────────────────────────────────────────
function PanelProvenance() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        minWidth: "100%",
        height: "100%",
        flexShrink: 0,
        scrollSnapAlign: "start",
        backgroundColor: "#0E0E0E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
        textAlign: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 300,
            color: "rgba(245,240,235,0.6)",
            letterSpacing: "0.06em",
          }}
        >
          Crafted in Italy
        </div>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(61,61,61,0.4)",
            marginTop: 16,
          }}
        >
          Complimentary shipping · Made to order · 4–6 weeks
        </div>

        <div style={{ marginTop: 32 }}>
          <Link
            href="/leathers"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "1rem",
              color: hovered ? "rgba(245,240,235,0.6)" : "rgba(245,240,235,0.3)",
              textDecoration: "none",
              transition: "color 400ms ease",
            }}
          >
            ← Back to Archive
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LeatherDetailPage() {
  const { id } = useParams<{ id: string }>();
  const leather = leathers.find((l) => l.id === id);

  const containerRef  = useRef<HTMLDivElement>(null);
  const storyRef      = useRef<HTMLDivElement>(null);
  const leftSideRef   = useRef<HTMLDivElement>(null);
  const rightSideRef  = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const PANEL_COUNT = 4;

  // ── Wheel → snap to next/prev panel (one panel per gesture) ─────────────
  const wheelLocked = useRef(false);
  const activePanelRef = useRef(0);

  const snapToPanel = useCallback((index: number) => {
    const el = storyRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(index, 0), PANEL_COUNT - 1);
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    activePanelRef.current = clamped;
    setActivePanel(clamped);
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (wheelLocked.current) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 5) return; // ignore tiny jitter
    wheelLocked.current = true;
    snapToPanel(activePanelRef.current + (delta > 0 ? 1 : -1));
    // unlock after the smooth scroll has time to settle (~600ms)
    setTimeout(() => { wheelLocked.current = false; }, 600);
  }, [snapToPanel]);

  // ── Track active panel via scroll position ────────────────────────────────
  const handleStoryScroll = useCallback(() => {
    const el = storyRef.current;
    if (!el) return;
    // Only update from scroll events when NOT driven by snapToPanel
    // (snapToPanel already sets state; this catches touch/trackpad momentum)
    const panel = Math.round(el.scrollLeft / el.clientWidth);
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

    // Sidebars slide in
    gsap.set(leftSideRef.current,  { x: "-100%" });
    gsap.set(rightSideRef.current, { x: "100%" });

    tl.to([leftSideRef.current, rightSideRef.current], {
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Cover content fades up
    tl.from(".cover-content > *", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    }, "-=0.5");

    // Progress fades in
    tl.from(".panel-progress", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");

  }, { scope: containerRef });

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!leather) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          gap: "1.5rem",
        }}
      >
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.05em" }}>
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
          gridTemplateColumns: "280px 1fr 280px",
          position: "relative",
        }}
      >
        {/* ── Left sidebar ── */}
        <div ref={leftSideRef} style={{ height: "100%", overflow: "hidden" }}>
          <Sidebar side="left" products={LEFT_PRODUCTS} leatherName={leather.name} />
        </div>

        {/* ── Center storybook ── */}
        <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
          {/* Top nav strip */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 30,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              background: "linear-gradient(to bottom, rgba(14,14,14,0.95) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(245,240,235,0.2)" }}>
              AMAL
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,235,0.15)" }}>
              {activePanel + 1} / {PANEL_COUNT}
            </span>
          </div>

          {/* Panels */}
          <div
            ref={storyRef}
            onWheel={onWheel}
            style={{
              display: "flex",
              height: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
            }}
          >
            <PanelCover    leather={leather} />
            <PanelLeather  leather={leather} />
            <PanelSpecs    leather={leather} />
            <PanelProvenance />
          </div>

          {/* Panel progress */}
          <div className="panel-progress">
            <PanelProgress active={activePanel} total={PANEL_COUNT} />
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div ref={rightSideRef} style={{ height: "100%", overflow: "hidden" }}>
          <Sidebar side="right" products={RIGHT_PRODUCTS} leatherName={leather.name} />
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }

        @keyframes hint-pulse {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(5px); }
        }

        /* Tablet */
        @media (max-width: 1023px) and (min-width: 768px) {
          .leather-detail-root {
            grid-template-columns: 220px 1fr 220px !important;
          }
        }

        /* Mobile — single column */
        @media (max-width: 767px) {
          .leather-detail-root {
            grid-template-columns: 1fr !important;
            height: auto !important;
            overflow: auto !important;
          }
          .leather-sidebar-left,
          .leather-sidebar-right {
            height: auto !important;
            overflow-y: visible !important;
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
          .leather-storybook {
            height: 100vh !important;
            overflow-x: auto !important;
          }
        }
      `}</style>
    </>
  );
}
