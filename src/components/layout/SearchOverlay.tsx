"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";
import { leathers, Leather } from "@/lib/leathers";
import { articles, Article } from "@/lib/articles";

type Results = {
  products: Product[];
  leathers: Leather[];
  articles: Article[];
};

const EMPTY: Results = { products: [], leathers: [], articles: [] };

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Results>(EMPTY);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults(EMPTY);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!q.trim()) { setResults(EMPTY); return; }
      const lq = q.toLowerCase();
      setResults({
        products: products.filter((p) =>
          [p.name, p.leather, p.color, p.category, ...p.tags].some((v) => v.toLowerCase().includes(lq))
        ).slice(0, 5),
        leathers: leathers.filter((l) =>
          [l.name, l.nameEn, l.collection].some((v) => v.toLowerCase().includes(lq))
        ).slice(0, 4),
        articles: articles.filter((a) =>
          [a.title, a.subtitle, a.category, a.excerpt].some((v) => v.toLowerCase().includes(lq))
        ).slice(0, 3),
      });
    }, 250);
  }, []);

  const hasResults =
    results.products.length > 0 ||
    results.leathers.length > 0 ||
    results.articles.length > 0;

  const SectionHeader = ({ label }: { label: string }) => (
    <p style={{
      fontFamily: "var(--font-body), system-ui, sans-serif",
      fontSize: "9px", textTransform: "uppercase",
      letterSpacing: "0.3em", color: "rgba(184,160,128,0.4)",
      marginBottom: "12px", marginTop: 0,
    }}>
      {label}
    </p>
  );

  const ResultRow = ({
    left, right, href,
  }: { left: string; right: string; href: string }) => (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 8px",
        borderBottom: "1px solid rgba(61,61,61,0.08)",
        transition: "background 200ms",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,240,235,0.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "13px", color: "rgba(245,240,235,0.65)" }}>{left}</span>
      <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "12px", color: "rgba(245,240,235,0.3)" }}>{right}</span>
    </Link>
  );

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 70,
      backgroundColor: "rgba(0,0,0,0.98)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      overflowY: "auto",
    }}>
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "24px", right: "24px",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.5)", fontSize: "24px",
          fontWeight: 300, padding: "4px", lineHeight: 1,
          transition: "color 300ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        aria-label="Close search"
      >
        ✕
      </button>

      {/* Input */}
      <div style={{ marginTop: "18vh", padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          style={{
            width: "100%", maxWidth: "640px",
            background: "transparent", border: "none",
            textAlign: "center",
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 300, color: "#F5F0EB",
            letterSpacing: "0.1em",
            outline: "none",
            caretColor: "rgba(184,160,128,0.8)",
          }}
        />
        <div style={{ width: "100%", maxWidth: "640px", height: 1, background: "rgba(61,61,61,0.15)", marginTop: "16px" }} />
        <p style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "10px", textTransform: "uppercase",
          letterSpacing: "0.25em", color: "rgba(61,61,61,0.6)",
          marginTop: "16px",
        }}>
          Products, leathers, articles
        </p>
      </div>

      {/* Results */}
      <div style={{ maxWidth: "640px", margin: "40px auto 80px", padding: "0 32px" }}>
        {!query.trim() && (
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "10px", textTransform: "uppercase",
            letterSpacing: "0.2em", color: "rgba(61,61,61,0.4)",
            textAlign: "center", marginTop: "16px",
          }}>
            Popular: Himalayan · Stingray · Crocodile
          </p>
        )}

        {query.trim() && !hasResults && (
          <p style={{
            fontFamily: "var(--font-editorial), Georgia, serif",
            fontStyle: "italic", fontSize: "16px",
            color: "rgba(245,240,235,0.25)",
            textAlign: "center", marginTop: "40px",
          }}>
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {results.products.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <SectionHeader label="Products" />
            {results.products.map((p) => (
              <ResultRow key={p.id} left={p.name} right={`$${p.price.toLocaleString()}`} href={`/shop/${p.id}`} />
            ))}
          </div>
        )}

        {results.leathers.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <SectionHeader label="Leathers" />
            {results.leathers.map((l) => (
              <ResultRow key={l.id} left={l.name} right={l.collection} href={`/leathers/${l.id}`} />
            ))}
          </div>
        )}

        {results.articles.length > 0 && (
          <div>
            <SectionHeader label="Articles" />
            {results.articles.map((a) => (
              <ResultRow key={a.id} left={a.title} right={a.category} href={`/world/${a.id}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
