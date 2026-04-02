"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { collections } from "@/lib/collections";
import { products } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

// Corner crop marks helper
function CropMarks() {
  const style: React.CSSProperties = { position: "absolute", width: 10, height: 10 };
  return (
    <>
      <div style={{ ...style, top: 8, left: 8, borderTop: "1px solid rgba(61,61,61,0.2)", borderLeft: "1px solid rgba(61,61,61,0.2)" }} />
      <div style={{ ...style, top: 8, right: 8, borderTop: "1px solid rgba(61,61,61,0.2)", borderRight: "1px solid rgba(61,61,61,0.2)" }} />
      <div style={{ ...style, bottom: 8, left: 8, borderBottom: "1px solid rgba(61,61,61,0.2)", borderLeft: "1px solid rgba(61,61,61,0.2)" }} />
      <div style={{ ...style, bottom: 8, right: 8, borderBottom: "1px solid rgba(61,61,61,0.2)", borderRight: "1px solid rgba(61,61,61,0.2)" }} />
    </>
  );
}

export default function CollectionsPage() {
  const current = collections.find((c) => c.current)!;
  const past = collections.filter((c) => !c.current);

  const manifestoRef = useRef<HTMLDivElement>(null);
  const sectionBRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionBRef.current) return;
    const paras = sectionBRef.current.querySelectorAll(".manifesto-para");
    paras.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });
  }, { scope: sectionBRef });

  const highlightProducts = products.filter((p) => p.isNew).slice(0, 2);

  return (
    <div style={{ backgroundColor: "var(--t-bg)", minHeight: "100vh" }}>

      {/* ── Section A: Hero ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Placeholder image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(26,26,26,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CropMarks />
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "9px",
            textTransform: "uppercase", letterSpacing: "0.25em",
            color: "rgba(61,61,61,0.3)",
          }}>Collection Hero Image</span>
        </div>

        {/* Gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)",
        }} />

        {/* Content */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          padding: "0 64px 64px",
          zIndex: 10,
        }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            textTransform: "uppercase", letterSpacing: "0.3em",
            color: "rgba(184,160,128,0.6)", marginBottom: "16px",
          }}>
            {current.season}
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            fontWeight: 300, color: "var(--t-text)",
            letterSpacing: "0.04em", lineHeight: 1.05, margin: 0,
          }}>
            {current.title}
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "11px",
            textTransform: "uppercase", letterSpacing: "0.25em",
            color: "rgba(245,240,235,0.4)", marginTop: "12px",
          }}>
            {current.subtitle}
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            textTransform: "uppercase", letterSpacing: "0.2em",
            color: "rgba(61,61,61,0.8)", marginTop: "8px",
          }}>
            {current.productCount} Pieces
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, zIndex: 10,
        }}>
          <div style={{ width: 1, height: 40, background: "rgba(245,240,235,0.15)" }} />
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "9px",
            textTransform: "uppercase", letterSpacing: "0.3em",
            color: "rgba(245,240,235,0.2)",
          }}>Explore</span>
        </div>
      </section>

      {/* ── Section B: Manifesto ── */}
      <section
        ref={sectionBRef}
        style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "var(--t-bg)",
          padding: "96px 32px",
        }}
      >
        <div style={{ maxWidth: "720px", textAlign: "center" }}>
          {current.longDescription.split(". ").reduce((acc: string[][], sentence, i) => {
            const paraIndex = Math.floor(i / 2);
            if (!acc[paraIndex]) acc[paraIndex] = [];
            acc[paraIndex].push(sentence);
            return acc;
          }, []).map((sentences, i) => (
            <p
              key={i}
              className="manifesto-para"
              style={{
                fontFamily: "var(--font-editorial)", fontStyle: "italic",
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                fontWeight: 300, lineHeight: 1.8,
                color: "rgba(245,240,235,0.6)",
                marginBottom: "1.5rem",
                opacity: 0,
              }}
            >
              {sentences.filter(Boolean).join(". ") + (sentences[sentences.length - 1]?.endsWith(".") ? "" : ".")}
            </p>
          ))}
        </div>
      </section>

      {/* ── Section C: Editorial Grid ── */}
      <section style={{ minHeight: "100vh", backgroundColor: "var(--t-bg-card)", padding: "80px 64px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto",
          gap: "12px",
        }} className="editorial-grid">
          {/* Item 1 — image, tall */}
          <div style={{ gridRow: "span 2", backgroundColor: "rgba(26,26,26,0.4)", position: "relative", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CropMarks />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.3)" }}>Editorial</span>
          </div>

          {/* Item 2 — pull quote */}
          <div style={{ backgroundColor: "rgba(26,26,26,0.1)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "160px" }}>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "15px", color: "rgba(245,240,235,0.3)", textAlign: "center", lineHeight: 1.7 }}>
              "Restraint is not absence. It is intention."
            </p>
          </div>

          {/* Item 3 — image */}
          <div style={{ backgroundColor: "rgba(26,26,26,0.4)", position: "relative", minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CropMarks />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.3)" }}>Editorial</span>
          </div>

          {/* Item 4 — product highlight */}
          {highlightProducts[0] && (
            <Link href={`/shop/${highlightProducts[0].id}`} style={{ display: "block", backgroundColor: "rgba(26,26,26,0.2)", padding: "24px", minHeight: "160px" }}>
              <div style={{ aspectRatio: "1/1", width: 80, margin: "0 auto", backgroundColor: "rgba(26,26,26,0.5)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "8px", color: "rgba(61,61,61,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Image</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(245,240,235,0.6)", textAlign: "center", marginTop: "12px", lineHeight: 1.4 }}>{highlightProducts[0].name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(245,240,235,0.4)", textAlign: "center", marginTop: "6px" }}>${highlightProducts[0].price.toLocaleString()}</p>
            </Link>
          )}

          {/* Item 5 — image tall */}
          <div style={{ gridRow: "span 2", backgroundColor: "rgba(26,26,26,0.4)", position: "relative", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CropMarks />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.3)" }}>Editorial</span>
          </div>

          {/* Item 6 — pull quote */}
          <div style={{ backgroundColor: "rgba(26,26,26,0.1)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "160px" }}>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "15px", color: "rgba(245,240,235,0.3)", textAlign: "center", lineHeight: 1.7 }}>
              "The leather remembers everything."
            </p>
          </div>

          {/* Item 7 — image */}
          <div style={{ backgroundColor: "rgba(26,26,26,0.4)", position: "relative", minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CropMarks />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.3)" }}>Editorial</span>
          </div>

          {/* Item 8 — product highlight */}
          {highlightProducts[1] && (
            <Link href={`/shop/${highlightProducts[1].id}`} style={{ display: "block", backgroundColor: "rgba(26,26,26,0.2)", padding: "24px", minHeight: "160px" }}>
              <div style={{ aspectRatio: "1/1", width: 80, margin: "0 auto", backgroundColor: "rgba(26,26,26,0.5)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "8px", color: "rgba(61,61,61,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Image</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(245,240,235,0.6)", textAlign: "center", marginTop: "12px", lineHeight: 1.4 }}>{highlightProducts[1].name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(245,240,235,0.4)", textAlign: "center", marginTop: "6px" }}>${highlightProducts[1].price.toLocaleString()}</p>
            </Link>
          )}
        </div>
      </section>

      {/* ── Section D: CTA ── */}
      <section style={{
        height: "60vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "var(--t-bg)",
      }}>
        <Link
          href="/shop"
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 300,
            color: "rgba(245,240,235,0.4)",
            letterSpacing: "0.05em",
            transition: "color 500ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(245,240,235,0.9)";
            const arrow = e.currentTarget.querySelector(".cta-arrow") as HTMLElement;
            if (arrow) arrow.style.transform = "translateX(5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(245,240,235,0.4)";
            const arrow = e.currentTarget.querySelector(".cta-arrow") as HTMLElement;
            if (arrow) arrow.style.transform = "translateX(0)";
          }}
        >
          Shop the Collection
          <span className="cta-arrow" style={{ transition: "transform 400ms ease", display: "inline-block" }}>→</span>
        </Link>
      </section>

      {/* ── Archive ── */}
      <section style={{
        borderTop: "1px solid rgba(61,61,61,0.08)",
        padding: "64px 64px 80px",
        backgroundColor: "var(--t-bg)",
      }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "2rem",
            fontWeight: 300, color: "rgba(245,240,235,0.5)",
            letterSpacing: "0.06em", margin: 0,
          }}>Archive</h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            textTransform: "uppercase", letterSpacing: "0.2em",
            color: "rgba(61,61,61,0.8)", marginTop: "8px",
          }}>Past collections</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginTop: "40px",
        }} className="archive-grid">
          {past.map((col) => (
            <Link key={col.id} href={`/collections/${col.id}`} style={{ display: "block" }}>
              <div
                style={{
                  aspectRatio: "3/2",
                  backgroundColor: "rgba(26,26,26,0.2)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  const inner = e.currentTarget.querySelector(".archive-img") as HTMLElement;
                  if (inner) inner.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  const inner = e.currentTarget.querySelector(".archive-img") as HTMLElement;
                  if (inner) inner.style.transform = "scale(1)";
                }}
              >
                <div className="archive-img" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 600ms ease" }}>
                  <CropMarks />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.25)" }}>Collection Image</span>
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.4)", marginTop: "16px" }}>{col.season}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "rgba(245,240,235,0.7)", marginTop: "4px" }}>{col.title}</p>
              <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "12px", color: "rgba(245,240,235,0.3)", marginTop: "4px" }}>{col.subtitle}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "9px", color: "rgba(61,61,61,0.7)", marginTop: "8px" }}>{col.productCount} Pieces</p>
            </Link>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1023px) {
          .editorial-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .archive-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .editorial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
