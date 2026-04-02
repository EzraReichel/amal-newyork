"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { leathers } from "@/lib/leathers";
import { products } from "@/data/products";

// ── Leather swatch (inline, stripped of routing for homepage embed) ──────────
function HomeSwatch({ color, image, name, nameEn }: {
  color: string; image: string; name: string; nameEn: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ width: "100%", height: "100%", perspective: "900px", cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: color,
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover", backgroundPosition: "center",
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(0,0,0,0.15)", pointerEvents: "none" }} />
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "var(--t-bg-card)",
          border: "1px solid rgba(196,162,101,0.15)",
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "8px", textAlign: "center",
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(11px,1.4vw,18px)", fontWeight: 300, color: "var(--t-text)", letterSpacing: "0.04em" }}>{name}</span>
          <span style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "clamp(9px,0.8vw,12px)", color: "var(--t-text-soft)", marginTop: 3, opacity: 0.6 }}>{nameEn}</span>
        </div>
      </div>
    </div>
  );
}

// ── Section dot nav ───────────────────────────────────────────────────────────
const SECTIONS = [
  { label: "Cover",           id: "section-cover" },
  { label: "Editorial",       id: "section-editorial" },
  { label: "Leather Archive", id: "section-leathers" },
  { label: "Film",            id: "section-video" },
  { label: "About",           id: "section-about" },
  { label: "Contact",         id: "section-contact" },
];

function SectionNav({ activeIndex }: { activeIndex: number }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {SECTIONS.map((s, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "7px 0",
            }}
          >
            {/* Dot */}
            <div style={{
              width: isActive ? "7px" : "5px",
              height: isActive ? "7px" : "5px",
              borderRadius: "50%",
              backgroundColor: isActive
                ? "var(--t-accent)"
                : "var(--t-nav-logo)",
              opacity: isActive ? 1 : 0.3,
              transition: "all 300ms ease",
              flexShrink: 0,
            }} />
            {/* Label */}
            <span style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: isActive ? "var(--t-accent)" : "var(--t-nav-logo)",
              opacity: open ? (isActive ? 1 : 0.55) : 0,
              transform: open ? "translateX(0)" : "translateX(-6px)",
              transition: "opacity 250ms ease, transform 250ms ease",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              fontWeight: 300,
            }}>
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Section refs helper ───────────────────────────────────────────────────────
const INTRO_KEY = "amal_intro_seen";

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLElement>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // On mount: check if user has seen the intro before
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(INTRO_KEY)) {
      setIntroComplete(true);
      window.dispatchEvent(new CustomEvent("amal:intro-complete"));
    }
  }, []);

  // Track scroll: when section 6 is visible, mark intro complete
  useEffect(() => {
    if (introComplete) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          localStorage.setItem(INTRO_KEY, "1");
          setIntroComplete(true);
          window.dispatchEvent(new CustomEvent("amal:intro-complete"));
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (section6Ref.current) observer.observe(section6Ref.current);
    return () => observer.disconnect();
  }, [introComplete]);

  // Section observer — track which section is most visible
  useEffect(() => {
    const ids = SECTIONS.map(s => s.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Belt products with real images for editorial grid
  const beltProducts = products.filter(p => p.category === "belts").slice(0, 6);
  const featured = [
    products.find(p => p.id === "himalayan-croc-belt-110cm"),
    products.find(p => p.id === "bone-croc-belt-navy"),
    products.find(p => p.id === "exotic-caviar-stingray-belt-strap-black"),
    products.find(p => p.id === "bone-croc-belt-purple"),
    products.find(p => p.id === "exotic-croc-belt-strap-orange"),
    products.find(p => p.id === "calf-hair-animal-print-belt"),
  ].filter(Boolean) as typeof beltProducts;

  return (
    <div ref={pageRef} style={{ backgroundColor: "var(--t-bg)" }}>

      <SectionNav activeIndex={activeSection} />

      {/* ── SECTION 1: Magazine Cover ──────────────────────────────────── */}
      <section id="section-cover" style={{
        position: "relative", width: "100%", height: "100vh",
        overflow: "hidden", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Hero image with slow Ken Burns */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/products/hero/collection-hero.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          animation: "hero-zoom 18s ease-in-out infinite alternate",
          zIndex: 0,
        }} />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)", zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "10px", textTransform: "uppercase",
            letterSpacing: "0.45em", color: "rgba(185,165,130,0.85)",
            marginBottom: "40px", fontWeight: 400,
          }}>
            Issue No. 01 — Spring / Summer 2026
          </p>
          <h1 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(5rem, 16vw, 13rem)",
            fontWeight: 300, lineHeight: 0.9,
            letterSpacing: "0.12em",
            color: "#FAFAF8",
            margin: 0,
          }}>
            AMAL
          </h1>
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "clamp(9px, 1.1vw, 13px)",
            textTransform: "uppercase",
            letterSpacing: "0.6em",
            color: "rgba(250,247,242,0.85)",
            marginTop: "28px", fontWeight: 400,
          }}>
            New York
          </p>
          <div style={{
            width: "40px", height: "1px",
            backgroundColor: "rgba(196,162,101,0.5)",
            margin: "28px auto 0",
          }} />
          <p style={{
            fontFamily: "var(--font-editorial), Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(16px, 2.1vw, 26px)",
            color: "rgba(200,184,154,0.9)",
            marginTop: "24px", letterSpacing: "0.04em",
            fontWeight: 400,
          }}>
            Exotic leathers, handcrafted in Italy.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "40px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "8px", zIndex: 2,
        }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "9px",
            textTransform: "uppercase", letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 400,
          }}>Scroll</p>
          <div style={{
            width: "1px", height: "48px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            animation: "scroll-travel 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* ── SECTION 2: Editorial Grid ──────────────────────────────────── */}
      <section id="section-editorial" style={{ backgroundColor: "var(--t-bg)", padding: "0" }}>
        {/* Header */}
        <div style={{
          padding: "100px 80px 60px",
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--t-border)",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "10px",
              textTransform: "uppercase", letterSpacing: "0.35em",
              color: "var(--t-accent)", marginBottom: "16px",
            }}>
              SS 26 Collection
            </p>
            <h2 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: "0.04em", color: "var(--t-text)", margin: 0,
            }}>
              The Art of<br />Exotic Leather
            </h2>
          </div>
          <Link href="/shop" style={{
            fontFamily: "var(--font-body)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.2em",
            color: "var(--t-text-soft)", borderBottom: "1px solid var(--t-border)",
            paddingBottom: "4px",
          }}>
            Shop All →
          </Link>
        </div>

        {/* Magazine grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto",
          gap: "2px",
          backgroundColor: "var(--t-border)",
        }}>
          {/* Large hero cell — top left, 7 cols × 2 rows */}
          <div style={{ gridColumn: "1 / 8", gridRow: "1 / 3", position: "relative", aspectRatio: "16/10" }}>
            {"imageCoiled" in (featured[0] ?? {}) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={(featured[0] as { imageCoiled: string }).imageCoiled}
                alt={featured[0]?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 32px 28px",
              background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--t-accent)", marginBottom: "8px" }}>
                {featured[0]?.leather}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.5vw, 2rem)", fontWeight: 300, color: "#FAFAF8", letterSpacing: "0.04em" }}>
                {featured[0]?.name}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>
                ${featured[0]?.price?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right column — 5 cols, 2 cells stacked */}
          <div style={{ gridColumn: "8 / 13", gridRow: "1 / 2", position: "relative", aspectRatio: "4/3" }}>
            {"imageCoiled" in (featured[1] ?? {}) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={(featured[1] as { imageCoiled: string }).imageCoiled}
                alt={featured[1]?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "24px 20px 16px",
              background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
            }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem, 1.8vw, 1.4rem)", fontWeight: 300, color: "#FAFAF8" }}>{featured[1]?.name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>${featured[1]?.price?.toLocaleString()}</p>
            </div>
          </div>

          <div style={{ gridColumn: "8 / 13", gridRow: "2 / 3", position: "relative", aspectRatio: "4/3" }}>
            {"imageUnrolled" in (featured[2] ?? {}) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={(featured[2] as { imageUnrolled: string }).imageUnrolled}
                alt={featured[2]?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "24px 20px 16px",
              background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
            }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem, 1.8vw, 1.4rem)", fontWeight: 300, color: "#FAFAF8" }}>{featured[2]?.name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>${featured[2]?.price?.toLocaleString()}</p>
            </div>
          </div>

          {/* Bottom row — 4 equal cells */}
          {[featured[3], featured[4], featured[5], featured[1]].map((p, i) => p && (
            <div key={i} style={{ gridColumn: `${i * 3 + 1} / ${i * 3 + 4}`, position: "relative", aspectRatio: "1/1" }}>
              {"imageUnrolled" in p && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={(p as { imageUnrolled: string }).imageUnrolled}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "20px 16px 14px",
                background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
              }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--t-accent)", marginBottom: "4px" }}>{p.leather}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.75rem,1.5vw,1.1rem)", fontWeight: 300, color: "#FAFAF8" }}>{p.color}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div style={{
          padding: "80px",
          borderTop: "1px solid var(--t-border)",
          display: "flex", alignItems: "center",
          gap: "60px",
        }}>
          <div style={{ width: "1px", height: "80px", backgroundColor: "var(--t-accent)", flexShrink: 0 }} />
          <p style={{
            fontFamily: "var(--font-editorial), Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
            fontWeight: 300, lineHeight: 1.4,
            color: "var(--t-text)", maxWidth: "680px",
          }}>
            "Every skin tells the story of where it came from. Our job is to let that story continue."
          </p>
        </div>
      </section>

      {/* ── SECTION 3: Leather Archive ─────────────────────────────────── */}
      <section id="section-leathers" style={{ backgroundColor: "var(--t-bg-card)", position: "relative" }}>
        {/* Header */}
        <div style={{
          padding: "80px 80px 48px",
          borderBottom: "1px solid var(--t-border)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "10px",
              textTransform: "uppercase", letterSpacing: "0.35em",
              color: "var(--t-accent)", marginBottom: "16px",
            }}>
              Material Archive
            </p>
            <h2 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300, lineHeight: 1,
              letterSpacing: "0.04em", color: "var(--t-text)", margin: 0,
            }}>
              The Leather Archive
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "13px",
              color: "var(--t-text-soft)", marginTop: "12px", fontWeight: 300,
            }}>
              40 exotic skins. Sourced from Italy. Each one a living material.
            </p>
          </div>
          <Link href="/leathers" style={{
            fontFamily: "var(--font-body)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.2em",
            color: "var(--t-text-soft)", borderBottom: "1px solid var(--t-border)",
            paddingBottom: "4px",
          }}>
            View Full Archive →
          </Link>
        </div>

        {/* Quilt grid — inline, not fixed */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
          width: "100%",
          height: "70vh",
          gap: 0,
        }}>
          {leathers.map((l) => (
            <HomeSwatch key={l.id} color={l.color} image={l.image} name={l.name} nameEn={l.nameEn} />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: Video Moment ────────────────────────────────────── */}
      <section id="section-video" style={{
        position: "relative",
        width: "100%", height: "100vh",
        backgroundColor: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Cinematic letterbox bars */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "10%", backgroundColor: "#000", zIndex: 2 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10%", backgroundColor: "#000", zIndex: 2 }} />

        {/* Background still from hero image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/products/hero/collection-hero.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.3, filter: "grayscale(100%)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 40px" }}>
          <div style={{
            width: "72px", height: "72px",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 40px",
            cursor: "pointer",
          }}>
            <div style={{
              width: 0, height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "18px solid rgba(255,255,255,0.7)",
              marginLeft: "4px",
            }} />
          </div>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            textTransform: "uppercase", letterSpacing: "0.45em",
            color: "rgba(255,255,255,0.35)", marginBottom: "16px",
          }}>
            Behind the Craft
          </p>
          <h2 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2rem, 6vw, 5rem)",
            fontWeight: 300, color: "#FAFAF8",
            letterSpacing: "0.06em", lineHeight: 1.1,
          }}>
            From the Tannery<br />to Your Hands
          </h2>
          <p style={{
            fontFamily: "var(--font-editorial), Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(13px, 1.6vw, 18px)",
            color: "rgba(255,255,255,0.4)",
            marginTop: "20px",
          }}>
            A film about materials, patience, and craft.
          </p>
        </div>
      </section>

      {/* ── SECTION 5: About ───────────────────────────────────────────── */}
      <section id="section-about" style={{
        backgroundColor: "var(--t-bg)",
        borderTop: "1px solid var(--t-border)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}>
          {/* Left — large display text */}
          <div style={{
            padding: "120px 80px",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            borderRight: "1px solid var(--t-border)",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "10px",
              textTransform: "uppercase", letterSpacing: "0.35em",
              color: "var(--t-accent)", marginBottom: "40px",
            }}>
              About Amal
            </p>
            <h2 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: "0.04em", color: "var(--t-text)", margin: 0,
            }}>
              Crafted<br />in Italy.
            </h2>
            <div style={{ width: "48px", height: "1px", backgroundColor: "var(--t-accent)", margin: "48px 0" }} />
            <p style={{
              fontFamily: "var(--font-editorial), Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: "var(--t-text-soft)", lineHeight: 1.55,
              maxWidth: "400px",
            }}>
              "Every piece is a statement about what luxury means when you strip away the marketing."
            </p>
          </div>

          {/* Right — story text */}
          <div style={{
            padding: "120px 80px",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              lineHeight: 1.85, color: "var(--t-text-soft)",
              fontWeight: 300, marginBottom: "28px",
            }}>
              Amal New York was founded on a single conviction: that the most extraordinary materials in the world deserve to be worn, not displayed. We source exotic leathers directly from the finest tanneries in Italy — Himalayan crocodile, caviar stingray, Nile river monitor — and transform them into objects that age with you.
            </p>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              lineHeight: 1.85, color: "var(--t-text-soft)",
              fontWeight: 300, marginBottom: "28px", opacity: 0.75,
            }}>
              Each piece is made by hand. No two are alike. The patina that develops over years of use is not a flaw — it is the point. Leather remembers every place it has been.
            </p>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              lineHeight: 1.85, color: "var(--t-text-soft)",
              fontWeight: 300, opacity: 0.6,
            }}>
              We are based in New York. Our atelier is in Florence.
            </p>

            <div style={{ marginTop: "56px", display: "flex", gap: "24px" }}>
              <Link href="/collections" style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                textTransform: "uppercase", letterSpacing: "0.2em",
                color: "var(--t-text)",
                border: "1px solid var(--t-border)",
                padding: "14px 28px",
                transition: "border-color 300ms",
              }}>
                View Collections
              </Link>
              <Link href="/world" style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                textTransform: "uppercase", letterSpacing: "0.2em",
                color: "var(--t-accent)",
                borderBottom: "1px solid var(--t-accent)",
                padding: "14px 0",
              }}>
                Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Contact + Newsletter ────────────────────────────── */}
      <section
        id="section-contact"
        ref={section6Ref}
        style={{
          backgroundColor: "var(--t-bg-card)",
          borderTop: "1px solid var(--t-border)",
        }}
      >
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "70vh",
        }}>
          {/* Left — Newsletter */}
          <div style={{
            padding: "100px 80px",
            borderRight: "1px solid var(--t-border)",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "10px",
              textTransform: "uppercase", letterSpacing: "0.35em",
              color: "var(--t-accent)", marginBottom: "24px",
            }}>
              The Archive
            </p>
            <h3 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              fontWeight: 300, color: "var(--t-text)",
              letterSpacing: "0.04em", lineHeight: 1.1, margin: "0 0 16px",
            }}>
              First Access.<br />No Noise.
            </h3>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "14px",
              color: "var(--t-text-soft)", lineHeight: 1.7,
              fontWeight: 300, marginBottom: "40px", maxWidth: "380px",
            }}>
              New drops, editorial features, and leather education — delivered when something is worth saying.
            </p>

            {submitted ? (
              <div>
                <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "18px", color: "var(--t-accent)" }}>Thank you.</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--t-text-soft)", marginTop: "8px", letterSpacing: "0.05em" }}>You're on the list.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                style={{ display: "flex", gap: "0" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "13px",
                    color: "var(--t-text)", backgroundColor: "transparent",
                    border: "1px solid var(--t-border)", borderRight: "none",
                    padding: "14px 20px", outline: "none", width: "300px",
                    letterSpacing: "0.03em",
                  }}
                />
                <button type="submit" style={{
                  fontFamily: "var(--font-body)", fontSize: "10px",
                  textTransform: "uppercase", letterSpacing: "0.25em",
                  color: "var(--t-bg)", backgroundColor: "var(--t-accent)",
                  border: "1px solid var(--t-accent)",
                  padding: "14px 24px", cursor: "pointer",
                  transition: "opacity 300ms",
                }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Right — Contact */}
          <div style={{
            padding: "100px 80px",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "10px",
              textTransform: "uppercase", letterSpacing: "0.35em",
              color: "var(--t-accent)", marginBottom: "24px",
            }}>
              Contact
            </p>
            <h3 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              fontWeight: 300, color: "var(--t-text)",
              letterSpacing: "0.04em", lineHeight: 1.1, margin: "0 0 40px",
            }}>
              Get in Touch.
            </h3>

            {[
              { label: "General Inquiries", value: "hello@amalnewyork.com" },
              { label: "Bespoke & Custom Orders", value: "atelier@amalnewyork.com" },
              { label: "Press & Partnerships", value: "press@amalnewyork.com" },
              { label: "Instagram", value: "@amalnewyork" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                paddingBottom: "20px", marginBottom: "20px",
                borderBottom: "1px solid var(--t-border)",
              }}>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "9px",
                  textTransform: "uppercase", letterSpacing: "0.3em",
                  color: "var(--t-text-soft)", marginBottom: "6px", opacity: 0.6,
                }}>{label}</p>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "14px",
                  color: "var(--t-text)", letterSpacing: "0.04em",
                }}>{value}</p>
              </div>
            ))}

            <Link href="/contact" style={{
              display: "inline-block", marginTop: "8px",
              fontFamily: "var(--font-body)", fontSize: "11px",
              textTransform: "uppercase", letterSpacing: "0.2em",
              color: "var(--t-text-soft)", borderBottom: "1px solid var(--t-border)",
              paddingBottom: "4px",
            }}>
              Full Contact Page →
            </Link>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{
          padding: "32px 80px",
          borderTop: "1px solid var(--t-border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.08em", color: "var(--t-muted)" }}>
            © 2026 Amal New York
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", letterSpacing: "0.3em", color: "var(--t-text)", fontWeight: 300 }}>
            AMAL
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.08em", color: "var(--t-muted)" }}>
            Handcrafted in Italy
          </span>
        </div>
      </section>

      <style jsx global>{`
        @keyframes hero-zoom {
          0%   { transform: scale(1);    }
          100% { transform: scale(1.06); }
        }
        @keyframes scroll-travel {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
