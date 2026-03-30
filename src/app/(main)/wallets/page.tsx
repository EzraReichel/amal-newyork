"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { wallets, PILE_OFFSETS, Wallet } from "@/lib/wallets";

gsap.registerPlugin(useGSAP);

// Leather color map for gradient placeholders
function walletGradient(w: Wallet) {
  return `linear-gradient(145deg, ${w.gradientFrom} 0%, ${w.gradientTo} 100%)`;
}

// ── Wallet card ───────────────────────────────────────────────────────────────

function WalletCard({
  wallet,
  index,
  isHovered,
  anyHovered,
  pileHovered,
  onEnter,
  onLeave,
  cardRef,
}: {
  wallet: Wallet;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const offset = PILE_OFFSETS[index] ?? { x: 0, y: 0, rotate: 0 };

  let tx = offset.x;
  let ty = offset.y;
  let rotate = offset.rotate;
  let scale = 1;
  let zIndex = index + 1;
  let opacity = 1;
  let boxShadow = "0 2px 10px rgba(0,0,0,0.3)";

  if (isHovered) {
    tx = offset.x;
    ty = offset.y - 60;
    rotate = 0;
    scale = 1.12;
    zIndex = 50;
    boxShadow = "0 15px 50px rgba(0,0,0,0.5), 0 5px 20px rgba(0,0,0,0.3)";
  } else if (anyHovered) {
    ty = offset.y + 8;
    opacity = 0.45;
  }

  const transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`;

  return (
    <div
      ref={cardRef}
      className="wallet-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        width: 220,
        height: 290,
        left: "50%",
        top: "50%",
        marginLeft: -110,
        marginTop: -145,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        background: walletGradient(wallet),
        zIndex,
        opacity,
        boxShadow,
        transform,
        transition: [
          "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          "opacity 400ms ease",
          "box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        ].join(", "),
      }}
    >
      {/* TODO: Replace with real product photography */}

      {/* Subtle sheen overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
        pointerEvents: "none",
      }} />

      {/* Debossed brand mark */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--font-script)",
          fontSize: "48px",
          color: "rgba(255,255,255,0.06)",
          userSelect: "none",
        }}>A</span>
      </div>

      {/* Sold badge */}
      {!wallet.inStock && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          fontFamily: "var(--font-body)", fontSize: "7px",
          textTransform: "uppercase", letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.3)",
          background: "rgba(0,0,0,0.4)",
          padding: "2px 6px",
        }}>
          Sold
        </div>
      )}
    </div>
  );
}

// ── Detail panel ──────────────────────────────────────────────────────────────

function DetailPanel({ wallet }: { wallet: Wallet | null }) {
  return (
    <div style={{
      opacity: wallet ? 1 : 0,
      transform: wallet ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 300ms ease, transform 300ms ease",
      pointerEvents: wallet ? "auto" : "none",
      minWidth: 220,
      textAlign: "center",
    }}>
      {wallet ? (
        <>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.04em", margin: 0 }}>
            {wallet.name}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(184,160,128,0.5)", marginTop: "6px" }}>
            {wallet.type}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(61,61,61,0.9)", marginTop: "4px" }}>
            {wallet.leather} · {wallet.color}
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 300, color: "#F5F0EB", marginTop: "16px" }}>
            ${wallet.price.toLocaleString()}
          </p>
          <div style={{ height: 1, background: "rgba(61,61,61,0.15)", margin: "16px 0" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {wallet.features.map((f) => (
              <p key={f} style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(245,240,235,0.5)", padding: "4px 0", margin: 0 }}>
                — {f}
              </p>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "12px", color: "rgba(245,240,235,0.3)", marginTop: "16px", maxWidth: 250, lineHeight: 1.7 }}>
            {wallet.description}
          </p>
          {wallet.inStock ? (
            <Link
              href={`/shop/${wallet.id}`}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)", fontSize: "10px",
                textTransform: "uppercase", letterSpacing: "0.2em",
                color: "rgba(184,160,128,0.4)",
                marginTop: "16px",
                transition: "color 400ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(184,160,128,1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(184,160,128,0.4)")}
            >
              View in Shop →
            </Link>
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.6)", marginTop: "16px" }}>
              Sold Out
            </p>
          )}
        </>
      ) : (
        <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "14px", color: "rgba(245,240,235,0.15)" }}>
          Hover to explore
        </p>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WalletsPage() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const pileRef       = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>(Array(wallets.length).fill(null));
  const refCallbacks  = useRef(wallets.map((_, i) => (el: HTMLDivElement | null) => { cardRefs.current[i] = el; }));

  const [hoveredIndex, setHoveredIndex]   = useState<number | null>(null);
  const [pileHovered, setPileHovered]     = useState(false);
  const [isMobile, setIsMobile]           = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP entrance: fan from center stacked → resting pile positions
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".wallet-card");
    if (!cards.length) return;
    // Start: all stacked center, no offsets
    gsap.set(cards, { opacity: 0, scale: 0.9, x: 0, y: 0, rotate: 0 });
    cards.forEach((card, i) => {
      const offset = PILE_OFFSETS[i] ?? { x: 0, y: 0, rotate: 0 };
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        x: offset.x,
        y: offset.y,
        rotate: offset.rotate,
        duration: 0.6,
        delay: i * 0.08,
        ease: "power3.out",
        clearProps: "x,y,rotate,scale,opacity",
      });
    });
  }, { scope: containerRef });

  const hoveredWallet = hoveredIndex !== null ? wallets[hoveredIndex] : null;

  // ── Mobile layout ──────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", paddingTop: "80px" }}>
        <div style={{ textAlign: "center", padding: "16px 0 24px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "0.3em", fontWeight: 300, color: "rgba(245,240,235,0.25)" }}>Wallets</p>
        </div>
        {wallets.map((wallet, i) => (
          <div key={wallet.id} style={{ marginBottom: "24px" }}>
            <div
              onClick={() => setExpandedMobile(expandedMobile === i ? null : i)}
              style={{
                width: "100%", aspectRatio: "3/4",
                background: walletGradient(wallet),
                position: "relative", overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "var(--font-script)", fontSize: "80px", color: "rgba(255,255,255,0.06)" }}>A</span>
              </div>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "48px 20px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              }}>
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

  // ── Desktop pile ───────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw", height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "70px", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "0.3em", fontWeight: 300, color: "rgba(245,240,235,0.25)" }}>Wallets</p>
      </div>

      {/* Fanned spread + detail panel */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", position: "relative" }}>

        {/* Fanned spread */}
        <div
          ref={pileRef}
          onMouseEnter={() => setPileHovered(true)}
          onMouseLeave={() => { setPileHovered(false); setHoveredIndex(null); }}
          style={{
            position: "relative",
            width: 900,
            height: 520,
            flexShrink: 0,
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
              cardRef={refCallbacks.current[i]}
            />
          ))}
        </div>

        {/* Detail panel — below the spread */}
        <div style={{ width: 320, textAlign: "center" }}>
          <DetailPanel wallet={hoveredWallet} />
        </div>
      </div>

      {/* TODO: Add wallet interior flip-open animation */}
    </div>
  );
}
