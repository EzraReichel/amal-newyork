"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { wallets, PILE_OFFSETS, Wallet } from "@/lib/wallets";

function walletGradient(w: Wallet) {
  return `linear-gradient(145deg, ${w.gradientFrom} 0%, ${w.gradientTo} 100%)`;
}

// ── Single wallet card with overlay info ─────────────────────────────────────

function WalletCard({
  wallet,
  index,
  isHovered,
  anyHovered,
  onEnter,
  onLeave,
}: {
  wallet: Wallet;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const offset = PILE_OFFSETS[index] ?? { x: 0, y: 0, rotate: 0 };

  const tx     = offset.x;
  const ty     = isHovered ? offset.y - 55 : anyHovered ? offset.y + 6 : offset.y;
  const rotate = isHovered ? 0 : offset.rotate;
  const scale  = isHovered ? 1.1 : 1;
  const zIndex = isHovered ? 50 : index + 1;
  const opacity = anyHovered && !isHovered ? 0.4 : 1;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        width: 200,
        height: 265,
        left: "50%",
        top: "50%",
        marginLeft: -100,
        marginTop: -132,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        background: walletGradient(wallet),
        zIndex,
        opacity,
        boxShadow: isHovered
          ? "0 20px 60px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.4)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`,
        transition: [
          "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          "opacity 400ms ease",
          "box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        ].join(", "),
        willChange: "transform, opacity",
      }}
    >
      {/* TODO: Replace with real product photography */}

      {/* Sheen */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)",
      }} />

      {/* Brand mark */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--font-script)", fontSize: "44px", color: "rgba(255,255,255,0.06)", userSelect: "none" }}>A</span>
      </div>

      {/* Sold badge */}
      {!wallet.inStock && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          fontFamily: "var(--font-body)", fontSize: "7px",
          textTransform: "uppercase", letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.4)",
          padding: "2px 6px",
        }}>Sold</div>
      )}

    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WalletsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile]         = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Mobile ─────────────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", paddingTop: "80px" }}>
        {wallets.map((wallet, i) => (
          <div key={wallet.id} style={{ marginBottom: "16px" }}>
            <div
              onClick={() => setExpandedMobile(expandedMobile === i ? null : i)}
              style={{ width: "100%", aspectRatio: "3/4", background: walletGradient(wallet), position: "relative", overflow: "hidden", cursor: "pointer" }}
            >
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-script)", fontSize: "80px", color: "rgba(255,255,255,0.05)" }}>A</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 20px 20px", background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 300, color: "#F5F0EB" }}>{wallet.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.6)", marginTop: "4px" }}>{wallet.leather} · {wallet.color}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(245,240,235,0.6)", marginTop: "6px" }}>${wallet.price.toLocaleString()}</p>
              </div>
            </div>
            {expandedMobile === i && (
              <div style={{ padding: "20px", backgroundColor: "rgba(26,26,26,0.4)", borderTop: "1px solid rgba(61,61,61,0.1)" }}>
                {wallet.features.map((f) => (
                  <p key={f} style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(245,240,235,0.5)", padding: "3px 0" }}>— {f}</p>
                ))}
                <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "13px", color: "rgba(245,240,235,0.3)", marginTop: "12px", lineHeight: 1.7 }}>{wallet.description}</p>
                {wallet.inStock && (
                  <Link href={`/shop/${wallet.id}`} style={{ display: "inline-block", marginTop: "16px", fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.6)" }}>
                    View in Shop →
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ── Desktop ────────────────────────────────────────────────────────────────

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "#0A0A0A",
      paddingTop: "70px",              // clear navbar
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Info bar — above the spread */}
      <div style={{
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: 900,
        flexShrink: 0,
        paddingBottom: 16,
      }}>
        {hoveredIndex !== null ? (
          <>
            <div style={{
              opacity: 1,
              transform: "translateY(0)",
              transition: "opacity 300ms ease, transform 300ms ease",
            }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 300, color: "#F5F0EB", margin: 0, letterSpacing: "0.04em" }}>
                {wallets[hoveredIndex].name}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.6)", marginTop: "5px" }}>
                {wallets[hoveredIndex].leather} · {wallets[hoveredIndex].color}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "#F5F0EB", margin: 0 }}>
                ${wallets[hoveredIndex].price.toLocaleString()}
              </p>
              {wallets[hoveredIndex].inStock ? (
                <Link
                  href={`/shop/${wallets[hoveredIndex].id}`}
                  style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.5)", display: "inline-block", marginTop: "6px", transition: "color 400ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(184,160,128,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(184,160,128,0.5)")}
                >
                  View in Shop →
                </Link>
              ) : (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", marginTop: "6px" }}>
                  Sold Out
                </p>
              )}
            </div>
          </>
        ) : (
          <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "13px", color: "rgba(245,240,235,0.15)", margin: 0 }}>
            Hover a wallet to explore
          </p>
        )}
      </div>

      {/* Spread container — centered in the space below navbar */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          position: "relative",
          width: 900,
          height: 480,
          opacity: mounted ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      >
        {wallets.map((wallet, i) => (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            index={i}
            isHovered={hoveredIndex === i}
            anyHovered={hoveredIndex !== null}
            onEnter={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}
