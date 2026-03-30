"use client";

import Link from "next/link";
import { use } from "react";
import { products } from "@/lib/products";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", paddingTop: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "24px", fontWeight: 300, color: "rgba(245,240,235,0.4)" }}>
            Product not found
          </p>
          <Link href="/shop" style={{ display: "inline-block", marginTop: "24px", fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,235,0.4)" }}>
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", paddingTop: "90px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px" }}>

        {/* Back */}
        <Link
          href="/shop"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(245,240,235,0.3)",
            marginBottom: "48px",
            transition: "color 300ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,235,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,235,0.3)")}
        >
          ← Collection
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          {/* Placeholder image */}
          <div style={{
            aspectRatio: "3 / 4",
            background: "rgba(26,26,26,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            {[
              { top: 12, left: 12, borderTop: "1px solid rgba(61,61,61,0.15)", borderLeft: "1px solid rgba(61,61,61,0.15)" },
              { top: 12, right: 12, borderTop: "1px solid rgba(61,61,61,0.15)", borderRight: "1px solid rgba(61,61,61,0.15)" },
              { bottom: 12, left: 12, borderBottom: "1px solid rgba(61,61,61,0.15)", borderLeft: "1px solid rgba(61,61,61,0.15)" },
              { bottom: 12, right: 12, borderBottom: "1px solid rgba(61,61,61,0.15)", borderRight: "1px solid rgba(61,61,61,0.15)" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 12, height: 12, ...s }} />
            ))}
            <span style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "9px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(61,61,61,0.4)",
            }}>
              Product Image
            </span>
          </div>

          {/* Details */}
          <div>
            {product.isNew && (
              <p style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "10px", textTransform: "uppercase",
                letterSpacing: "0.25em", color: "rgba(184,160,128,0.8)",
                marginBottom: "16px",
              }}>
                New Arrival
              </p>
            )}

            <h1 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 300,
              color: "#F5F0EB",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              margin: 0,
            }}>
              {product.name}
            </h1>

            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "11px", textTransform: "uppercase",
              letterSpacing: "0.15em", color: "rgba(61,61,61,0.8)",
              marginTop: "8px",
            }}>
              {product.color} · {product.leather}
            </p>

            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "22px",
              color: product.inStock ? "rgba(245,240,235,0.9)" : "rgba(61,61,61,0.5)",
              textDecoration: product.inStock ? "none" : "line-through",
              marginTop: "24px",
            }}>
              ${product.price.toLocaleString()}
            </p>

            {/* Sizes */}
            {product.sizes[0] !== "OS" && (
              <div style={{ marginTop: "32px" }}>
                <p style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "10px", textTransform: "uppercase",
                  letterSpacing: "0.2em", color: "rgba(245,240,235,0.3)",
                  marginBottom: "12px",
                }}>
                  Size
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      style={{
                        padding: "8px 16px",
                        border: "1px solid rgba(61,61,61,0.2)",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        fontSize: "11px",
                        color: "rgba(245,240,235,0.5)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "13px", lineHeight: 1.7,
              color: "rgba(245,240,235,0.4)",
              marginTop: "32px",
            }}>
              {product.description}
            </p>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(61,61,61,0.1)", margin: "32px 0" }} />

            {/* Shopify placeholder */}
            <div style={{
              padding: "20px",
              border: "1px solid rgba(61,61,61,0.1)",
              background: "rgba(26,26,26,0.3)",
            }}>
              <p style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "10px", textTransform: "uppercase",
                letterSpacing: "0.2em", color: "rgba(184,160,128,0.5)",
                marginBottom: "6px",
              }}>
                Coming Soon
              </p>
              <p style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "11px", color: "rgba(245,240,235,0.25)",
                lineHeight: 1.6,
              }}>
                Shopify checkout integration in progress. To inquire about this piece, please contact us directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 767px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
