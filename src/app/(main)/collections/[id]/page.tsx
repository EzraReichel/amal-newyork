"use client";

import { use, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { collections } from "@/lib/collections";
import { products } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

function CropMarks() {
  const s: React.CSSProperties = { position: "absolute", width: 10, height: 10 };
  return (
    <>
      <div style={{ ...s, top: 8, left: 8, borderTop: "1px solid rgba(61,61,61,0.2)", borderLeft: "1px solid rgba(61,61,61,0.2)" }} />
      <div style={{ ...s, top: 8, right: 8, borderTop: "1px solid rgba(61,61,61,0.2)", borderRight: "1px solid rgba(61,61,61,0.2)" }} />
      <div style={{ ...s, bottom: 8, left: 8, borderBottom: "1px solid rgba(61,61,61,0.2)", borderLeft: "1px solid rgba(61,61,61,0.2)" }} />
      <div style={{ ...s, bottom: 8, right: 8, borderBottom: "1px solid rgba(61,61,61,0.2)", borderRight: "1px solid rgba(61,61,61,0.2)" }} />
    </>
  );
}

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const collection = collections.find((c) => c.id === id);
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!storyRef.current) return;
    storyRef.current.querySelectorAll(".story-para").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });
  }, { scope: storyRef });

  if (!collection) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", paddingTop: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "rgba(245,240,235,0.4)" }}>Collection not found</p>
          <Link href="/collections" style={{ display: "inline-block", marginTop: "24px", fontFamily: "var(--font-body)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,235,0.4)" }}>← Back</Link>
        </div>
      </div>
    );
  }

  const allCollections = collections;
  const currentIndex = allCollections.findIndex((c) => c.id === id);
  const nextCollection = allCollections[(currentIndex + 1) % allCollections.length];
  const sampleProducts = products.slice(0, 6);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,26,26,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CropMarks />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(61,61,61,0.3)" }}>Collection Hero Image</span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.75) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, padding: "0 64px 64px", zIndex: 10 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(184,160,128,0.6)", marginBottom: "16px" }}>{collection.season}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.04em", lineHeight: 1.05, margin: 0 }}>{collection.title}</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(245,240,235,0.4)", marginTop: "12px" }}>{collection.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0A0A0A", padding: "96px 32px" }}>
        <div style={{ maxWidth: "720px", textAlign: "center" }}>
          {collection.longDescription.split(". ").filter(Boolean).map((sentence, i) => (
            <p key={i} className="story-para" style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(245,240,235,0.6)", marginBottom: "1.2rem", opacity: 0 }}>
              {sentence.endsWith(".") ? sentence : sentence + "."}
            </p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "80px 64px", backgroundColor: "#0E0E0E" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }} className="gallery-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ aspectRatio: i % 3 === 1 ? "2/3" : "3/4", backgroundColor: "rgba(26,26,26,0.3)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CropMarks />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.25)" }}>Editorial</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "80px 64px", backgroundColor: "#0A0A0A" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(61,61,61,0.8)", marginBottom: "32px" }}>From this Collection</p>
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px" }} className="products-scroll">
          {sampleProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`} style={{ flexShrink: 0, width: 200, display: "block" }}>
              <div style={{ aspectRatio: "3/4", backgroundColor: "rgba(26,26,26,0.4)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CropMarks />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(61,61,61,0.3)" }}>Image</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(245,240,235,0.7)", marginTop: "10px", lineHeight: 1.4 }}>{product.name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(245,240,235,0.45)", marginTop: "6px" }}>${product.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Next collection */}
      <section style={{ padding: "60px 64px", borderTop: "1px solid rgba(61,61,61,0.08)", display: "flex", justifyContent: "flex-end", backgroundColor: "#0A0A0A" }}>
        <Link href={`/collections/${nextCollection.id}`} style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "1.15rem", color: "rgba(245,240,235,0.3)", transition: "color 400ms" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,235,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,235,0.3)")}
        >
          Continue to {nextCollection.title} →
        </Link>
      </section>

      <style jsx global>{`
        .gallery-grid { }
        .products-scroll::-webkit-scrollbar { display: none; }
        .products-scroll { scrollbar-width: none; }
        @media (max-width: 767px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
