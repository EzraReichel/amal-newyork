"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { products } from "@/data/products";

// ── Types ──────────────────────────────────────────────────────────────────────

type DropdownSection = {
  heading: string;
  items: { label: string; href: string }[];
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownSection[];
};

// ── Nav data ───────────────────────────────────────────────────────────────────

const leftLinks: NavItem[] = [
  {
    label: "Shop All",
    href: "/shop",
    dropdown: [
      {
        heading: "Shop by Gender",
        items: [
          { label: "Men's",   href: "/shop?gender=mens" },
          { label: "Women's", href: "/shop?gender=womens" },
        ],
      },
      {
        heading: "Shop by Leather",
        items: [
          { label: "Crocodile", href: "/shop?leather=Crocodile" },
          { label: "Stingray",  href: "/shop?leather=Stingray" },
          { label: "Calf Hair", href: "/shop?leather=Calf+Hair" },
          { label: "Ostrich",   href: "/shop?leather=Ostrich" },
          { label: "Python",    href: "/shop?leather=Python" },
        ],
      },
      {
        heading: "Shop by Color",
        items: [
          { label: "Black",   href: "/shop?color=Black" },
          { label: "Navy",    href: "/shop?color=Navy" },
          { label: "Charcoal",href: "/shop?color=Charcoal" },
          { label: "Taupe",   href: "/shop?color=Taupe" },
          { label: "Orange",  href: "/shop?color=Orange" },
          { label: "Brown",   href: "/shop?color=Brown" },
        ],
      },
    ],
  },
  {
    label: "Wallets",
    href: "/wallets",
    dropdown: [
      {
        heading: "Wallets",
        items: [
          { label: "All Wallets",  href: "/wallets" },
          { label: "Bifolds",      href: "/wallets?type=Bifold" },
          { label: "Card Holders", href: "/wallets?type=Card+Holder" },
          { label: "Purses",       href: "/wallets?type=Purse" },
        ],
      },
    ],
  },
  {
    label: "Belts",
    href: "/belts",
    dropdown: [
      {
        heading: "Belts",
        items: [
          { label: "All Belts",     href: "/belts" },
          { label: "Belt Bands",    href: "/belts?type=Bands" },
          { label: "Belt Buckles",  href: "/belts?type=Buckles" },
        ],
      },
      {
        heading: "By Leather",
        items: [
          { label: "Crocodile", href: "/belts?leather=Crocodile" },
          { label: "Stingray",  href: "/belts?leather=Stingray" },
          { label: "Calf Hair", href: "/belts?leather=Calf+Hair" },
        ],
      },
    ],
  },
  {
    label: "Explore",
    href: "/world",
    dropdown: [
      {
        heading: "World",
        items: [
          { label: "All Stories",       href: "/world" },
          { label: "Behind the Craft",  href: "/world?category=Craft" },
          { label: "Leather Education", href: "/world?category=Education" },
          { label: "Style Notes",       href: "/world?category=Style" },
        ],
      },
      {
        heading: "Collections",
        items: [
          { label: "SS26 — Current",   href: "/collections" },
          { label: "AW25 — Archive",   href: "/collections?season=AW25" },
          { label: "Capsule Editions", href: "/collections?type=Capsule" },
        ],
      },
      {
        heading: "Leather Archive",
        items: [
          { label: "Full Archive",     href: "/leathers" },
          { label: "Leather Details",  href: "/leathers/lucido-nero" },
        ],
      },
      {
        heading: "More",
        items: [
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

const mobileLinks = [
  { label: "Shop All",        href: "/shop" },
  { label: "Wallets",         href: "/wallets" },
  { label: "Belts",           href: "/belts" },
  { label: "Explore",         href: "/world" },
  { label: "Collections",     href: "/collections" },
  { label: "Leather Archive", href: "/leathers" },
  { label: "Contact",         href: "/contact" },
];

const POPULAR_SEARCHES = [
  "Himalayan Crocodile",
  "Stingray Belt",
  "Ostrich Wallet",
  "Bone Crocodile",
  "Exotic Leather",
];

const COLLECTION_LINKS = [
  { label: "Belts",                 href: "/belts" },
  { label: "Wallets & Accessories", href: "/wallets" },
  { label: "All Products",          href: "/shop" },
];

// ── Dropdown panel (nav hover) ─────────────────────────────────────────────────

function NavDropdown({ sections, visible }: { sections: DropdownSection[]; visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: 0,
        right: 0,
        backgroundColor: "var(--t-nav-bg-scrolled)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--t-nav-divider)",
        borderBottom: "1px solid var(--t-nav-divider)",
        padding: "32px 80px",
        display: "flex",
        gap: "80px",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 200ms ease, transform 200ms ease",
        zIndex: 49,
      }}
    >
      {sections.map((section) => (
        <div key={section.heading}>
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "9px", textTransform: "uppercase",
            letterSpacing: "0.28em", fontWeight: 500,
            color: "var(--t-nav-tagline)",
            marginBottom: "14px", whiteSpace: "nowrap",
          }}>
            {section.heading}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "14px", letterSpacing: "0.08em", fontWeight: 400,
                  color: "var(--t-nav-link)", textDecoration: "none",
                  whiteSpace: "nowrap", transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-nav-link-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-nav-link)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── NavLink with dropdown ──────────────────────────────────────────────────────

function NavLinkItem({
  item,
  linkStyle,
  hidden,
}: {
  item: NavItem;
  linkStyle: React.CSSProperties;
  hidden: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  return (
    <div
      className="nav-link-desktop"
      style={{
        position: "relative",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 200ms ease",
      }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link
        href={item.href}
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-nav-link-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-nav-link)")}
      >
        {item.label}
      </Link>
      {item.dropdown && <NavDropdown sections={item.dropdown} visible={open && !hidden} />}
    </div>
  );
}

// ── Search result type ─────────────────────────────────────────────────────────

type SearchResult = { id: string; name: string; leather: string; price: number | null; href: string };

function getResults(q: string): SearchResult[] {
  if (!q.trim()) return [];
  const lq = q.toLowerCase();
  return products
    .filter((p) => [p.name, p.leather, p.color, p.category].some((v) => v.toLowerCase().includes(lq)))
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      name: p.name,
      leather: p.leather,
      price: p.price,
      href: `/shop/${p.slug}`,
    }));
}

// ── Desktop inline search ──────────────────────────────────────────────────────

function DesktopSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setResults(getResults(q)), 180);
  };

  const hasResults = results.length > 0;
  const noResults = query.trim() && !hasResults;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 58,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      {/* Dropdown panel */}
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          right: 0,
          zIndex: 59,
          backgroundColor: "var(--t-bg-card)",
          borderBottom: "1px solid var(--t-nav-divider)",
          padding: "28px 80px 32px",
          animation: "search-drop-in 200ms ease-out forwards",
        }}
      >
        {/* No query — popular + collections */}
        {!query.trim() && (
          <div style={{ display: "flex", gap: "80px" }}>
            {/* Popular searches */}
            <div style={{ flex: "0 0 auto" }}>
              <p style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "9px", textTransform: "uppercase",
                letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
                marginBottom: "18px", fontWeight: 500,
              }}>Popular Searches</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQuery(s);
                      inputRef.current?.focus();
                      setResults(getResults(s));
                    }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      textAlign: "left", padding: 0,
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "14px", letterSpacing: "0.04em",
                      color: "var(--t-nav-link)",
                      transition: "color 150ms ease, transform 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--t-accent)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--t-nav-link)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div style={{ flex: "0 0 auto" }}>
              <p style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "9px", textTransform: "uppercase",
                letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
                marginBottom: "18px", fontWeight: 500,
              }}>Collections</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {COLLECTION_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={onClose}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "14px", letterSpacing: "0.04em",
                      color: "var(--t-nav-link)", textDecoration: "none",
                      transition: "color 150ms ease, transform 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--t-accent)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--t-nav-link)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                    }}
                  >
                    {c.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "9px", textTransform: "uppercase",
              letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
              marginBottom: "14px", fontWeight: 500,
            }}>Results</p>
            {results.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "baseline",
                  justifyContent: "space-between", gap: "24px",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--t-nav-divider)",
                  textDecoration: "none",
                  transition: "opacity 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--t-nav-link-hover)" }}>{r.name}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--t-nav-tagline)", flexShrink: 0 }}>
                  {r.leather}{r.price ? ` · $${r.price.toLocaleString()}` : ""}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* No results */}
        {noResults && (
          <p style={{
            fontFamily: "var(--font-editorial), Georgia, serif",
            fontStyle: "italic", fontSize: "16px",
            color: "var(--t-nav-tagline)",
          }}>
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Hidden input ref — used only for focus; the real input is in the nav bar */}
      <input ref={inputRef} value={query} onChange={handleChange} style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }} tabIndex={-1} aria-hidden />
    </>
  );
}

// ── Mobile full-screen search overlay ─────────────────────────────────────────

function MobileSearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setResults(getResults(q)), 180);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 70,
      backgroundColor: "var(--t-nav-mobile-bg)",
      display: "flex", flexDirection: "column",
      padding: "0",
    }}>
      {/* Input row */}
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        padding: "20px 24px",
        borderBottom: "1px solid var(--t-nav-divider)",
      }}>
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
          <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--t-nav-link-hover)" strokeWidth="1" />
          <line x1="10" y1="10" x2="14" y2="14" stroke="var(--t-nav-link-hover)" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search…"
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "22px", fontWeight: 300,
            color: "var(--t-text)", caretColor: "var(--t-accent)",
          }}
        />
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--t-nav-link)", fontSize: "24px", fontWeight: 300, padding: "4px",
          }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        {!query.trim() && (
          <>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase",
              letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
              marginBottom: "16px", fontWeight: 500,
            }}>Popular Searches</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setResults(getResults(s)); }}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "13px",
                    color: "var(--t-nav-link)", background: "none",
                    border: "1px solid var(--t-nav-divider)",
                    padding: "7px 14px", cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "9px", textTransform: "uppercase",
              letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
              marginBottom: "16px", fontWeight: 500,
            }}>Collections</p>
            {COLLECTION_LINKS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--t-nav-divider)",
                  fontFamily: "var(--font-body)", fontSize: "16px",
                  color: "var(--t-nav-link)", textDecoration: "none",
                }}
              >
                {c.label}
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}>
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </>
        )}

        {results.length > 0 && results.map((r) => (
          <Link
            key={r.id}
            href={r.href}
            onClick={onClose}
            style={{
              display: "flex", alignItems: "baseline",
              justifyContent: "space-between", gap: "16px",
              padding: "12px 0",
              borderBottom: "1px solid var(--t-nav-divider)",
              textDecoration: "none",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--t-nav-link-hover)" }}>{r.name}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--t-nav-tagline)", flexShrink: 0 }}>
              {r.price ? `$${r.price.toLocaleString()}` : ""}
            </span>
          </Link>
        ))}

        {query.trim() && results.length === 0 && (
          <p style={{
            fontFamily: "var(--font-editorial)", fontStyle: "italic",
            fontSize: "16px", color: "var(--t-nav-tagline)",
          }}>
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

const INTRO_KEY = "amal_intro_seen";

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [visible, setVisible]         = useState(false);
  const [query, setQuery]             = useState("");
  const [results, setResults]         = useState<SearchResult[]>([]);
  const searchInputRef                = useRef<HTMLInputElement>(null);
  const timerRef                      = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (localStorage.getItem(INTRO_KEY)) {
      setVisible(true);
      return;
    }
    const onComplete = () => setVisible(true);
    window.addEventListener("amal:intro-complete", onComplete);
    return () => window.removeEventListener("amal:intro-complete", onComplete);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || mobileSearch ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, mobileSearch]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setQuery("");
    setResults([]);
    setTimeout(() => searchInputRef.current?.focus(), 60);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen, closeSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setResults(getResults(q)), 180);
  };

  const hasResults = results.length > 0;
  const noResults = query.trim() && !hasResults;

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-body), system-ui, sans-serif",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontWeight: 500,
    color: "var(--t-nav-link)",
    textDecoration: "none",
    transition: "color 400ms ease",
    display: "block",
    padding: "4px 0",
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 60,
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          backgroundColor: "var(--t-nav-bg-scrolled)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 600ms ease",
        }}
      >
        {/* LEFT — nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px", flex: 1 }}>
          {leftLinks.map((item) => (
            <NavLinkItem
              key={item.href}
              item={item}
              linkStyle={linkStyle}
              hidden={searchOpen}
            />
          ))}
        </div>

        {/* CENTER — logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "20px",
            letterSpacing: "0.35em",
            fontWeight: 300,
            color: "var(--t-nav-logo)",
            textDecoration: "none",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            transition: "opacity 200ms ease",
            opacity: searchOpen ? 0.3 : 1,
            pointerEvents: searchOpen ? "none" : "auto",
          }}
        >
          AMAL
        </Link>

        {/* RIGHT — search (expands inline on desktop) */}
        <div
          className="nav-link-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          {/* Collapsed icon */}
          {!searchOpen && (
            <button
              onClick={openSearch}
              aria-label="Search"
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px",
                color: "var(--t-nav-link)",
                opacity: 0.5,
                display: "flex", alignItems: "center",
                transition: "opacity 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}

          {/* Expanded search input */}
          {searchOpen && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "search-expand 300ms ease-out forwards",
              width: "55%",
              borderBottom: "1px solid var(--t-nav-divider)",
              paddingBottom: "4px",
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--t-nav-link-hover)" strokeWidth="1.2" />
                <line x1="10" y1="10" x2="14" y2="14" stroke="var(--t-nav-link-hover)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search belts, wallets, leathers…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none", outline: "none",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  color: "var(--t-text)",
                  caretColor: "var(--t-accent)",
                }}
              />
              <button
                onClick={closeSearch}
                aria-label="Close search"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--t-nav-link)", padding: "2px",
                  display: "flex", alignItems: "center",
                  opacity: 0.6, transition: "opacity 150ms",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* HAMBURGER — mobile */}
        <button
          onClick={() => setMenuOpen(true)}
          className="hamburger-btn"
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", position: "absolute", left: "20px",
          }}
          aria-label="Open menu"
        >
          <div style={{ width: "22px", height: "1px", backgroundColor: "var(--t-nav-ham)", marginBottom: "6px" }} />
          <div style={{ width: "22px", height: "1px", backgroundColor: "var(--t-nav-ham)", marginBottom: "6px" }} />
          <div style={{ width: "22px", height: "1px", backgroundColor: "var(--t-nav-ham)" }} />
        </button>

        {/* Mobile search icon */}
        <button
          onClick={() => setMobileSearch(true)}
          className="mobile-search-btn"
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", position: "absolute", right: "20px",
            color: "var(--t-nav-link)",
          }}
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* DESKTOP SEARCH DROPDOWN */}
      {searchOpen && (
        <>
          {/* Scrim */}
          <div
            onClick={closeSearch}
            style={{
              position: "fixed", inset: 0, zIndex: 58,
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              animation: "fade-in 200ms ease-out forwards",
            }}
          />

          {/* Dropdown */}
          <div
            className="nav-link-desktop"
            style={{
              position: "fixed",
              top: "70px", left: 0, right: 0,
              zIndex: 59,
              backgroundColor: "var(--t-bg-card)",
              borderBottom: "1px solid var(--t-nav-divider)",
              padding: "28px 80px 36px",
              animation: "search-drop-in 200ms ease-out forwards",
            }}
          >
            {!query.trim() && (
              <div style={{ display: "flex", gap: "80px" }}>
                <div>
                  <p style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "9px", textTransform: "uppercase",
                    letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
                    marginBottom: "18px", fontWeight: 500,
                  }}>Popular Searches</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {POPULAR_SEARCHES.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQuery(s);
                          setResults(getResults(s));
                          searchInputRef.current?.focus();
                        }}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          textAlign: "left", padding: 0,
                          fontFamily: "var(--font-body), system-ui, sans-serif",
                          fontSize: "14px", letterSpacing: "0.04em",
                          color: "var(--t-nav-link)",
                          transition: "color 150ms ease, transform 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--t-accent)";
                          (e.currentTarget as HTMLButtonElement).style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--t-nav-link)";
                          (e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)";
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "9px", textTransform: "uppercase",
                    letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
                    marginBottom: "18px", fontWeight: 500,
                  }}>Collections</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {COLLECTION_LINKS.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={closeSearch}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          fontFamily: "var(--font-body), system-ui, sans-serif",
                          fontSize: "14px", letterSpacing: "0.04em",
                          color: "var(--t-nav-link)", textDecoration: "none",
                          transition: "color 150ms ease, transform 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "var(--t-accent)";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "var(--t-nav-link)";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                        }}
                      >
                        {c.label}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
                          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {hasResults && (
              <div>
                <p style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "9px", textTransform: "uppercase",
                  letterSpacing: "0.25em", color: "var(--t-nav-tagline)",
                  marginBottom: "14px", fontWeight: 500,
                }}>Results</p>
                {results.map((r) => (
                  <Link
                    key={r.id}
                    href={r.href}
                    onClick={closeSearch}
                    style={{
                      display: "flex", alignItems: "baseline",
                      justifyContent: "space-between", gap: "24px",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--t-nav-divider)",
                      textDecoration: "none",
                      transition: "opacity 150ms",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--t-nav-link-hover)" }}>{r.name}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--t-nav-tagline)", flexShrink: 0 }}>
                      {r.leather}{r.price ? ` · $${r.price.toLocaleString()}` : ""}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {noResults && (
              <p style={{
                fontFamily: "var(--font-editorial), Georgia, serif",
                fontStyle: "italic", fontSize: "16px",
                color: "var(--t-nav-tagline)",
              }}>
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 65,
          backgroundColor: "var(--t-nav-mobile-bg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", top: "20px", right: "20px",
              background: "none", border: "none", cursor: "pointer",
              padding: "8px", color: "var(--t-nav-ham)",
              fontSize: "28px", fontWeight: 300,
            }}
            aria-label="Close menu"
          >
            ✕
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "32px", fontWeight: 300,
                  letterSpacing: "0.1em",
                  color: "var(--t-nav-link)",
                  textDecoration: "none",
                  transition: "color 400ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-nav-link-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-nav-link)")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "48px", width: "40px", height: "1px", backgroundColor: "var(--t-nav-divider)" }} />
          <p style={{ marginTop: "16px", fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--t-nav-tagline)" }}>New York</p>
        </div>
      )}

      {/* MOBILE SEARCH */}
      {mobileSearch && <MobileSearchOverlay onClose={() => setMobileSearch(false)} />}

      <style jsx global>{`
        @media (max-width: 1023px) {
          .nav-link-desktop { display: none !important; }
          .hamburger-btn { display: block !important; }
          .mobile-search-btn { display: flex !important; }
        }
        @keyframes search-expand {
          from { width: 0; opacity: 0; }
          to   { width: 55%; opacity: 1; }
        }
        @keyframes search-drop-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
