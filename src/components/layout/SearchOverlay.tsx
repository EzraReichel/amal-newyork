"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";
import { leathers, Leather } from "@/lib/leathers";
import { articles, Article } from "@/lib/articles";
import { belts, BeltProduct } from "@/data/products";
import { wallets } from "@/data/products";
import type { OtherProduct } from "@/data/products";

type Results = {
  products: Product[];
  belts: BeltProduct[];
  wallets: OtherProduct[];
  leathers: Leather[];
  articles: Article[];
};

const EMPTY: Results = { products: [], belts: [], wallets: [], leathers: [], articles: [] };

const SUGGESTIONS = [
  "Himalayan Crocodile",
  "Stingray",
  "Caviar Belt",
  "Bifold Wallet",
  "Ostrich",
  "Leopard",
  "Calf Hair",
];

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
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
      setResults(EMPTY);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const runSearch = useCallback((q: string) => {
    if (!q.trim()) { setResults(EMPTY); return; }
    const lq = q.toLowerCase();
    setResults({
      products: products.filter((p) =>
        [p.name, p.leather, p.color, p.category, ...p.tags].some((v) => v.toLowerCase().includes(lq))
      ).slice(0, 3),
      belts: belts.filter((b) =>
        [b.name, b.leather, b.color].some((v) => v.toLowerCase().includes(lq))
      ).slice(0, 3),
      wallets: (wallets as OtherProduct[]).filter((w) =>
        [w.name, w.leather, w.color].some((v) => v.toLowerCase().includes(lq))
      ).slice(0, 3),
      leathers: leathers.filter((l) =>
        [l.name, l.nameEn, l.collection].some((v) => v.toLowerCase().includes(lq))
      ).slice(0, 4),
      articles: articles.filter((a) =>
        [a.title, a.subtitle, a.category, a.excerpt].some((v) => v.toLowerCase().includes(lq))
      ).slice(0, 3),
    });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => runSearch(q), 220);
  }, [runSearch]);

  const hasResults =
    results.products.length > 0 || results.belts.length > 0 ||
    results.wallets.length > 0 || results.leathers.length > 0 ||
    results.articles.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          zIndex: 58,
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 320ms ease",
        }}
      />

      {/* Search panel — upper 1/3 of screen */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 59,
          height: "33.333vh",
          minHeight: "320px",
          backgroundColor: "var(--t-nav-bg-scrolled)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--t-nav-divider)",
          transform: isOpen ? "translateY(0)" : "translateY(-105%)",
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Large search input row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0 64px",
          height: "50%",
          borderBottom: "1px solid var(--t-nav-divider)",
          flexShrink: 0,
        }}>
          {/* Search icon */}
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--t-nav-link-hover)" strokeWidth="1" />
            <line x1="10" y1="10" x2="14" y2="14" stroke="var(--t-nav-link-hover)" strokeWidth="1" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search belts, leathers, articles…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              fontWeight: 300,
              color: "var(--t-text)",
              letterSpacing: "0.04em",
              caretColor: "var(--t-accent)",
            }}
          />

          {/* Cancel */}
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "11px", textTransform: "uppercase",
              letterSpacing: "0.2em", color: "var(--t-nav-link)",
              padding: "4px 0", flexShrink: 0,
              transition: "color 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-nav-link-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-nav-link)")}
          >
            Cancel
          </button>
        </div>

        {/* Lower half — suggestions or results */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 64px",
          display: "flex",
          alignItems: "flex-start",
        }}>

          {/* No query — suggestions */}
          {!query.trim() && (
            <div style={{ width: "100%" }}>
              <p style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "9px", textTransform: "uppercase",
                letterSpacing: "0.3em", color: "var(--t-nav-tagline)",
                marginBottom: "14px",
              }}>
                Popular Searches
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQuery(s);
                      inputRef.current?.focus();
                      runSearch(s);
                    }}
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "12px", letterSpacing: "0.08em",
                      color: "var(--t-nav-link)",
                      background: "none",
                      border: "1px solid var(--t-nav-divider)",
                      padding: "7px 14px", cursor: "pointer",
                      transition: "border-color 200ms, color 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--t-nav-link-hover)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--t-nav-link)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--t-nav-link)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--t-nav-divider)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Query — no results */}
          {query.trim() && !hasResults && (
            <p style={{
              fontFamily: "var(--font-editorial), Georgia, serif",
              fontStyle: "italic", fontSize: "16px",
              color: "var(--t-nav-tagline)",
            }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {/* Results — horizontal sections */}
          {query.trim() && hasResults && (
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", width: "100%" }}>
              {results.products.length > 0 && (
                <ResultGroup label="Shop">
                  {results.products.map((p) => (
                    <ResultRow key={p.id} left={p.name} right={`$${p.price.toLocaleString()}`} href={`/shop/${p.id}`} onClose={onClose} />
                  ))}
                </ResultGroup>
              )}
              {results.belts.length > 0 && (
                <ResultGroup label="Belts">
                  {results.belts.map((b) => (
                    <ResultRow key={b.id} left={b.name} right={`$${b.price.toLocaleString()}`} href="/belts" onClose={onClose} />
                  ))}
                </ResultGroup>
              )}
              {results.wallets.length > 0 && (
                <ResultGroup label="Wallets">
                  {results.wallets.map((w) => (
                    <ResultRow key={w.id} left={w.name} right={w.price ? `$${w.price.toLocaleString()}` : ""} href="/wallets" onClose={onClose} />
                  ))}
                </ResultGroup>
              )}
              {results.leathers.length > 0 && (
                <ResultGroup label="Leathers">
                  {results.leathers.map((l) => (
                    <ResultRow key={l.id} left={l.name} right={l.nameEn} href={`/leathers/${l.id}`} onClose={onClose} />
                  ))}
                </ResultGroup>
              )}
              {results.articles.length > 0 && (
                <ResultGroup label="Articles">
                  {results.articles.map((a) => (
                    <ResultRow key={a.id} left={a.title} right={a.category} href={`/world/${a.id}`} onClose={onClose} />
                  ))}
                </ResultGroup>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ResultGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ minWidth: "180px" }}>
      <p style={{
        fontFamily: "var(--font-body), system-ui, sans-serif",
        fontSize: "9px", textTransform: "uppercase",
        letterSpacing: "0.3em", color: "var(--t-nav-tagline)",
        marginBottom: "10px",
      }}>{label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>{children}</div>
    </div>
  );
}

function ResultRow({ left, right, href, onClose }: {
  left: string; right: string; href: string; onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        gap: "16px", padding: "8px 0",
        borderBottom: "1px solid var(--t-nav-divider)",
        transition: "opacity 200ms",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "13px", color: "var(--t-nav-link-hover)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>{left}</span>
      <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "11px", color: "var(--t-nav-tagline)", whiteSpace: "nowrap", flexShrink: 0 }}>{right}</span>
    </Link>
  );
}
