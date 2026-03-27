"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { leathers } from "@/lib/leathers";

// ── Placeholder products ──────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "bifold-wallet",
    name: "Bifold Wallet",
    subtitle: "8 card slots · 2 bill compartments",
    price: 485,
    sizes: null,
  },
  {
    id: "card-holder",
    name: "Card Holder",
    subtitle: "4 card slots · slim profile",
    price: 295,
    sizes: null,
  },
  {
    id: "dress-belt",
    name: "Dress Belt",
    subtitle: "3.5 cm width · gold buckle",
    price: 595,
    sizes: ["30", "32", "34", "36", "38", "40"],
  },
];

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  leatherName,
  leatherColor,
}: {
  product: (typeof PRODUCTS)[0];
  leatherName: string;
  leatherColor: string;
}) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[2] ?? null);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div
      style={{
        borderTop: "1px solid rgba(196,162,101,0.15)",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          position: "relative",
          backgroundColor: "rgba(255,255,255,0.02)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          overflow: "hidden",
        }}
      >
        {/* Subtle leather color wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: leatherColor,
            opacity: 0.06,
          }}
        />
        {/* Corner marks */}
        {[
          { top: 8, left: 8 },
          { top: 8, right: 8 },
          { bottom: 8, left: 8 },
          { bottom: 8, right: 8 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              borderTop: i < 2 ? "1px solid rgba(196,162,101,0.3)" : undefined,
              borderBottom: i >= 2 ? "1px solid rgba(196,162,101,0.3)" : undefined,
              borderLeft: i % 2 === 0 ? "1px solid rgba(196,162,101,0.3)" : undefined,
              borderRight: i % 2 === 1 ? "1px solid rgba(196,162,101,0.3)" : undefined,
              ...pos,
            }}
          />
        ))}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.12)",
          }}
        >
          Product Image
        </span>
      </div>

      {/* Name + leather tag row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "#F5F0EB",
            letterSpacing: "0.04em",
          }}
        >
          {product.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(196,162,101,0.5)",
            marginTop: 3,
          }}
        >
          {leatherName}
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.25)",
          marginBottom: 14,
        }}
      >
        {product.subtitle}
      </div>

      {/* Price */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.05rem",
          fontWeight: 300,
          color: "rgba(196,162,101,0.9)",
          letterSpacing: "0.04em",
          marginBottom: 16,
        }}
      >
        ${product.price.toLocaleString()}
      </div>

      {/* Size selector */}
      {product.sizes && (
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 8,
            }}
          >
            Size (inches)
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: 36,
                  height: 28,
                  border: s === size
                    ? "1px solid rgba(196,162,101,0.7)"
                    : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: s === size ? "rgba(196,162,101,0.12)" : "transparent",
                  color: s === size ? "rgba(196,162,101,0.9)" : "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  borderRadius: 1,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + Add to Cart */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Qty stepper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 1,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            style={{
              width: 28,
              height: 36,
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>
          <span
            style={{
              width: 28,
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: 10,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.05em",
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            style={{
              width: 28,
              height: 36,
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          style={{
            flex: 1,
            height: 36,
            backgroundColor: added ? "rgba(196,162,101,0.18)" : "transparent",
            border: added
              ? "1px solid rgba(196,162,101,0.6)"
              : "1px solid rgba(196,162,101,0.35)",
            color: added ? "rgba(196,162,101,1)" : "rgba(196,162,101,0.8)",
            fontFamily: "var(--font-body)",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            cursor: "pointer",
            transition: "all 250ms ease",
            borderRadius: 1,
          }}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          title="Save to wishlist"
          style={{
            width: 36,
            height: 36,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "border-color 200ms ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "rgba(196,162,101,0.8)" : "none"} stroke={wishlisted ? "rgba(196,162,101,0.8)" : "rgba(255,255,255,0.25)"} strokeWidth={1.5}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Shipping note */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.18)",
          marginTop: 10,
        }}
      >
        Complimentary shipping · Made to order · 4–6 weeks
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LeatherDetailPage() {
  const { id } = useParams<{ id: string }>();
  const leather = leathers.find((l) => l.id === id);

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
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 300,
            color: "#F5F0EB",
            letterSpacing: "0.05em",
          }}
        >
          Leather not found
        </p>
        <Link
          href="/leathers"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "rgba(184,160,128,0.6)",
            textDecoration: "none",
          }}
        >
          ← Back to Archive
        </Link>
      </div>
    );
  }

  const placeholderText = `Drawn from a single riverside harvest in equatorial West Africa,
this hide was selected for the exceptional regularity of its scale pattern — each polygon
measuring within a fraction of a millimetre of its neighbours. The tanning process unfolds
over eleven weeks in the hill-town workshops north of Florence, where third-generation
artisans draw on formulas recorded in ledgers that predate the republic. Pigment is applied
in nine successive layers, each buffed to a finish that amplifies natural light without
reflecting it — a quality the workshops call morbidezza, softness. The result ages in the
direction of the owner: pressure points develop a quiet burnish, fold lines deepen, and the
overall character of the hide grows more singular with every year of use. No two pieces from
this colour will ever be entirely alike.`;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A0A0A",
        color: "#F5F0EB",
        overflowX: "hidden",
      }}
    >
      {/* ── Top nav ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
          background: "linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.875rem",
            letterSpacing: "0.3em",
            color: "rgba(245,240,235,0.35)",
            textDecoration: "none",
          }}
        >
          AMAL
        </Link>
        <Link
          href="/leathers"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "rgba(245,240,235,0.3)",
            textDecoration: "none",
          }}
        >
          ← Leather Archive
        </Link>
      </div>

      {/* ── Main layout ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 40px 80px",
          display: "grid",
          gridTemplateColumns: "1fr minmax(320px, 420px) 1fr",
          gridTemplateRows: "auto 1fr",
          gap: "0 48px",
          alignItems: "start",
        }}
      >
        {/* ── Left: leather identity + description ── */}
        <div style={{ paddingTop: 8 }}>
          {/* Leather name — gold */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 300,
              color: "rgba(196,162,101,0.95)",
              letterSpacing: "0.06em",
              lineHeight: 1,
              margin: 0,
              marginBottom: 6,
            }}
          >
            {leather.name}
          </h1>

          {/* English translation */}
          <p
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "rgba(245,240,235,0.35)",
              margin: "0 0 4px",
            }}
          >
            {leather.nameEn}
          </p>

          {/* Collection */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(196,162,101,0.45)",
              margin: "0 0 48px",
            }}
          >
            {leather.collection} · {leather.origin}
          </p>

          {/* Divider */}
          <div
            style={{
              width: 40,
              height: 1,
              backgroundColor: "rgba(196,162,101,0.25)",
              marginBottom: 28,
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              lineHeight: 1.9,
              color: "rgba(245,240,235,0.45)",
              letterSpacing: "0.02em",
              margin: 0,
              maxWidth: 340,
            }}
          >
            {placeholderText}
          </p>

          {/* Material callouts */}
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["Origin", leather.origin],
              ["Tannage", "Vegetable-chrome hybrid"],
              ["Finish", leather.collection.includes("Lucido") ? "High-gloss lacquer" : "Matte wax"],
              ["Scale grade", "AAA — export select"],
              ["CITES", "Appendix II certified"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(245,240,235,0.5)", letterSpacing: "0.05em" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Center: large leather image ── */}
        <div style={{ position: "sticky", top: 100 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              backgroundColor: leather.color,
              backgroundImage: `url('${leather.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(196,162,101,0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          />
          {/* Caption beneath image */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              paddingTop: 10,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>
              Natural light · studio
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>
              Actual colour may vary
            </span>
          </div>
        </div>

        {/* ── Right: products ── */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(196,162,101,0.4)",
              marginBottom: 20,
              paddingTop: 8,
            }}
          >
            Available in {leather.name}
          </div>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              leatherName={leather.name}
              leatherColor={leather.color}
            />
          ))}

          {/* Bottom note */}
          <div
            style={{
              marginTop: 8,
              padding: "20px 0",
              borderTop: "1px solid rgba(196,162,101,0.1)",
              fontFamily: "var(--font-body)",
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.18)",
              lineHeight: 2,
            }}
          >
            All items are made to order in New York City.<br />
            Bespoke sizing available — contact atelier for details.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .leather-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
