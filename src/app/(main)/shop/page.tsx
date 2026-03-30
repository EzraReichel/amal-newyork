"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

// ── Types ────────────────────────────────────────────────────────────────────

type FilterKey = "category" | "leather" | "size" | "availability";
type SortOption = "Featured" | "Price Low → High" | "Price High → Low" | "Newest" | "A-Z";

// ── Filter option sets ────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Belts", "Belt Straps", "Belt Buckles", "Wallets", "Bags"];
const LEATHERS   = ["All", "Crocodile", "Stingray", "Ostrich", "Calf Hair", "Shark", "Python", "Alligator"];
const SIZES      = ["All", "30", "31", "32", "33", "34", "36", "38", "40", "42", "OS"];
const AVAILABILITY = ["All", "In Stock", "Sold Out"];
const SORT_OPTIONS: SortOption[] = ["Featured", "Price Low → High", "Price High → Low", "Newest", "A-Z"];

// ── Dropdown component ────────────────────────────────────────────────────────

function FilterDropdown({
  label,
  filterKey,
  options,
  value,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  filterKey: FilterKey | "sort";
  options: string[];
  value: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (v: string) => void;
}) {
  const isActive = value !== "All" && value !== "Featured";

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={onToggle}
        style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontWeight: 300,
          padding: "8px 16px",
          border: isActive ? "1px solid rgba(184,160,128,0.3)" : "1px solid rgba(61,61,61,0.15)",
          background: isActive ? "rgba(245,240,235,0.05)" : "transparent",
          color: isActive ? "rgba(184,160,128,1)" : "rgba(245,240,235,0.5)",
          cursor: "pointer",
          transition: "all 300ms ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(61,61,61,0.3)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,235,0.7)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(61,61,61,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,235,0.5)";
          }
        }}
      >
        {label !== "Sort" ? label : `Sort: ${value}`}
        {label !== "Sort" && value !== "All" && ` · ${value}`}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 50,
            background: "#1A1A1A",
            border: "1px solid rgba(61,61,61,0.15)",
            minWidth: "160px",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "10px 16px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: opt === value ? "rgba(245,240,235,0.9)" : "rgba(245,240,235,0.6)",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,235,0.05)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,235,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = opt === value ? "rgba(245,240,235,0.9)" : "rgba(245,240,235,0.6)";
              }}
            >
              <span style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(184,160,128,0.8)",
                flexShrink: 0,
                opacity: opt === value ? 1 : 0,
              }} />
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/shop/${product.id}`} style={{ display: "block" }}>
      {/* Image area */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          background: "rgba(26,26,26,0.5)",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Placeholder content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 600ms ease",
          }}
        >
          {/* Corner crop marks */}
          {[
            { top: 8, left: 8, borderTop: "1px solid rgba(61,61,61,0.15)", borderLeft: "1px solid rgba(61,61,61,0.15)" },
            { top: 8, right: 8, borderTop: "1px solid rgba(61,61,61,0.15)", borderRight: "1px solid rgba(61,61,61,0.15)" },
            { bottom: 8, left: 8, borderBottom: "1px solid rgba(61,61,61,0.15)", borderLeft: "1px solid rgba(61,61,61,0.15)" },
            { bottom: 8, right: 8, borderBottom: "1px solid rgba(61,61,61,0.15)", borderRight: "1px solid rgba(61,61,61,0.15)" },
          ].map((style, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                ...style,
              }}
            />
          ))}
          <span style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(61,61,61,0.4)",
          }}>
            Product Image
          </span>
        </div>

        {/* New badge */}
        {product.isNew && (
          <div style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(184,160,128,1)",
            background: "rgba(0,0,0,0.6)",
            padding: "3px 8px",
          }}>
            New
          </div>
        )}

        {/* Sold badge */}
        {!product.inStock && (
          <div style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(245,240,235,0.5)",
            background: "rgba(0,0,0,0.6)",
            padding: "3px 8px",
          }}>
            Sold
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ marginTop: "12px" }}>
        <p style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "12px",
          color: "rgba(245,240,235,0.8)",
          fontWeight: 300,
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {product.name}
        </p>

        <p style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "10px",
          color: "rgba(61,61,61,0.8)",
          marginTop: "4px",
        }}>
          {product.color}
        </p>

        <p style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "13px",
          color: product.inStock ? "rgba(245,240,235,0.9)" : "rgba(61,61,61,0.5)",
          textDecoration: product.inStock ? "none" : "line-through",
          marginTop: "8px",
        }}>
          ${product.price.toLocaleString()}
        </p>

        {product.sizes.length > 1 && (
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "9px",
            color: "rgba(61,61,61,0.6)",
            marginTop: "4px",
            letterSpacing: "0.05em",
          }}>
            {product.sizes.join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}

// ── Mobile filter panel ────────────────────────────────────────────────────────

function MobileFilterPanel({
  open,
  onClose,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
}: {
  open: boolean;
  onClose: () => void;
  filters: { category: string; leather: string; size: string; availability: string };
  onFilterChange: (key: FilterKey, value: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const sections = [
    { key: "category" as FilterKey, label: "Category", options: CATEGORIES, value: filters.category },
    { key: "leather" as FilterKey, label: "Leather", options: LEATHERS, value: filters.leather },
    { key: "size" as FilterKey, label: "Size", options: SIZES, value: filters.size },
    { key: "availability" as FilterKey, label: "Availability", options: AVAILABILITY, value: filters.availability },
    { key: "sort" as "sort", label: "Sort", options: SORT_OPTIONS, value: sortBy },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 38,
            background: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 39,
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#1A1A1A",
          borderTop: "1px solid rgba(61,61,61,0.1)",
          borderRadius: "8px 8px 0 0",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: 32, height: 2, background: "rgba(61,61,61,0.4)", borderRadius: 2 }} />
        </div>

        {/* Title */}
        <div style={{ padding: "16px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "10px", textTransform: "uppercase",
            letterSpacing: "0.25em", color: "rgba(245,240,235,0.4)",
          }}>
            Filter & Sort
          </span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer",
              color: "rgba(245,240,235,0.4)", fontSize: "20px", fontWeight: 300, padding: "0 0 0 16px" }}
          >
            ✕
          </button>
        </div>

        {/* Sections */}
        <div style={{ padding: "8px 0 16px" }}>
          {sections.map(({ key, label, options, value }) => (
            <div key={key} style={{ borderBottom: "1px solid rgba(61,61,61,0.08)" }}>
              <button
                onClick={() => setExpanded(expanded === key ? null : key)}
                style={{
                  width: "100%", padding: "14px 24px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "none", border: "none", cursor: "pointer",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "10px", textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: value !== "All" && value !== "Featured" ? "rgba(184,160,128,1)" : "rgba(245,240,235,0.6)",
                }}>
                  {label}{value !== "All" && value !== "Featured" ? `: ${value}` : ""}
                </span>
                <span style={{ color: "rgba(245,240,235,0.3)", fontSize: "12px" }}>
                  {expanded === key ? "−" : "+"}
                </span>
              </button>

              {expanded === key && (
                <div style={{ padding: "0 24px 12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (key === "sort") onSortChange(opt);
                        else onFilterChange(key, opt);
                      }}
                      style={{
                        padding: "6px 14px",
                        border: opt === value ? "1px solid rgba(184,160,128,0.4)" : "1px solid rgba(61,61,61,0.2)",
                        background: opt === value ? "rgba(184,160,128,0.08)" : "transparent",
                        color: opt === value ? "rgba(184,160,128,1)" : "rgba(245,240,235,0.5)",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        fontSize: "10px", textTransform: "uppercase",
                        letterSpacing: "0.15em", cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 24px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px",
              background: "rgba(245,240,235,0.08)",
              border: "none", cursor: "pointer",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "11px", textTransform: "uppercase",
              letterSpacing: "0.2em", color: "rgba(245,240,235,0.8)",
            }}
          >
            Apply
          </button>
          <button
            onClick={() => {
              onFilterChange("category", "All");
              onFilterChange("leather", "All");
              onFilterChange("size", "All");
              onFilterChange("availability", "All");
              onSortChange("Featured");
            }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "10px", textTransform: "uppercase",
              letterSpacing: "0.15em", color: "rgba(61,61,61,0.8)",
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [activeCategory, setActiveCategory]     = useState("All");
  const [activeLeather, setActiveLeather]       = useState("All");
  const [activeSize, setActiveSize]             = useState("All");
  const [activeAvailability, setActiveAvailability] = useState("All");
  const [sortBy, setSortBy]                     = useState<SortOption>("Featured");
  const [openDropdown, setOpenDropdown]         = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile]                 = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Click outside to close dropdowns
  const filterBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeLeather !== "All")  list = list.filter((p) => p.leather === activeLeather);
    if (activeSize !== "All")     list = list.filter((p) => p.sizes.some((s) => s === activeSize || s.startsWith(activeSize)));
    if (activeAvailability === "In Stock")  list = list.filter((p) => p.inStock);
    if (activeAvailability === "Sold Out")  list = list.filter((p) => !p.inStock);

    // Sort
    switch (sortBy) {
      case "Price Low → High":  list.sort((a, b) => a.price - b.price); break;
      case "Price High → Low":  list.sort((a, b) => b.price - a.price); break;
      case "A-Z":               list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "Newest":            list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default:
        // Featured: in-stock first, new at top, then sold-out
        list.sort((a, b) => {
          if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
          if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
          return 0;
        });
    }

    return list;
  }, [activeCategory, activeLeather, activeSize, activeAvailability, sortBy]);

  const hasActiveFilters =
    activeCategory !== "All" || activeLeather !== "All" ||
    activeSize !== "All" || activeAvailability !== "All";

  const clearAll = () => {
    setActiveCategory("All");
    setActiveLeather("All");
    setActiveSize("All");
    setActiveAvailability("All");
  };

  const toggleDropdown = (key: string) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  const handleFilterChange = (key: FilterKey, value: string) => {
    if (key === "category") setActiveCategory(value);
    if (key === "leather")  setActiveLeather(value);
    if (key === "size")     setActiveSize(value);
    if (key === "availability") setActiveAvailability(value);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", paddingTop: "90px" }}>

      {/* ── Page header ── */}
      <div style={{
        padding: "32px 64px 24px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}
      className="shop-header"
      >
        <div>
          <h1 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            color: "#F5F0EB",
            letterSpacing: "0.05em",
            margin: 0,
          }}>
            Collection
          </h1>
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "rgba(61,61,61,0.8)",
            marginTop: "8px",
          }}>
            {products.length} Pieces
          </p>
        </div>
        <p style={{
          fontFamily: "var(--font-editorial), Georgia, serif",
          fontStyle: "italic",
          fontSize: "14px",
          color: "rgba(245,240,235,0.4)",
        }}>
          Exotic leather goods, handcrafted in Italy
        </p>
      </div>

      {/* ── Filter bar ── */}
      <div
        ref={filterBarRef}
        style={{
          position: "sticky",
          top: "70px",
          zIndex: 30,
          backgroundColor: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(61,61,61,0.08)",
          padding: "16px 64px",
        }}
        className="filter-bar"
      >
        {isMobile ? (
          <button
            onClick={() => setMobileFilterOpen(true)}
            style={{
              width: "100%",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: hasActiveFilters ? "rgba(184,160,128,1)" : "rgba(245,240,235,0.5)",
              border: hasActiveFilters ? "1px solid rgba(184,160,128,0.3)" : "1px solid rgba(61,61,61,0.15)",
              background: "transparent",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            {hasActiveFilters ? "Filters Active — Tap to Adjust" : "Filter & Sort"}
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FilterDropdown
                label="Category" filterKey="category"
                options={CATEGORIES} value={activeCategory}
                open={openDropdown === "category"}
                onToggle={() => toggleDropdown("category")}
                onSelect={(v) => { setActiveCategory(v); setOpenDropdown(null); }}
              />
              <FilterDropdown
                label="Leather" filterKey="leather"
                options={LEATHERS} value={activeLeather}
                open={openDropdown === "leather"}
                onToggle={() => toggleDropdown("leather")}
                onSelect={(v) => { setActiveLeather(v); setOpenDropdown(null); }}
              />
              <FilterDropdown
                label="Size" filterKey="size"
                options={SIZES} value={activeSize}
                open={openDropdown === "size"}
                onToggle={() => toggleDropdown("size")}
                onSelect={(v) => { setActiveSize(v); setOpenDropdown(null); }}
              />
              <FilterDropdown
                label="Availability" filterKey="availability"
                options={AVAILABILITY} value={activeAvailability}
                open={openDropdown === "availability"}
                onToggle={() => toggleDropdown("availability")}
                onSelect={(v) => { setActiveAvailability(v); setOpenDropdown(null); }}
              />
            </div>

            <FilterDropdown
              label="Sort" filterKey="sort"
              options={SORT_OPTIONS} value={sortBy}
              open={openDropdown === "sort"}
              onToggle={() => toggleDropdown("sort")}
              onSelect={(v) => { setSortBy(v as SortOption); setOpenDropdown(null); }}
            />
          </div>
        )}

        {/* Active filter pills */}
        {hasActiveFilters && !isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                style={{
                  padding: "3px 12px",
                  border: "1px solid rgba(184,160,128,0.2)",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "9px", textTransform: "uppercase",
                  letterSpacing: "0.15em", color: "rgba(184,160,128,0.7)",
                }}
              >
                Category: {activeCategory} ✕
              </button>
            )}
            {activeLeather !== "All" && (
              <button
                onClick={() => setActiveLeather("All")}
                style={{
                  padding: "3px 12px",
                  border: "1px solid rgba(184,160,128,0.2)",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "9px", textTransform: "uppercase",
                  letterSpacing: "0.15em", color: "rgba(184,160,128,0.7)",
                }}
              >
                Leather: {activeLeather} ✕
              </button>
            )}
            {activeSize !== "All" && (
              <button
                onClick={() => setActiveSize("All")}
                style={{
                  padding: "3px 12px",
                  border: "1px solid rgba(184,160,128,0.2)",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "9px", textTransform: "uppercase",
                  letterSpacing: "0.15em", color: "rgba(184,160,128,0.7)",
                }}
              >
                Size: {activeSize} ✕
              </button>
            )}
            {activeAvailability !== "All" && (
              <button
                onClick={() => setActiveAvailability("All")}
                style={{
                  padding: "3px 12px",
                  border: "1px solid rgba(184,160,128,0.2)",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "9px", textTransform: "uppercase",
                  letterSpacing: "0.15em", color: "rgba(184,160,128,0.7)",
                }}
              >
                {activeAvailability} ✕
              </button>
            )}
            <button
              onClick={clearAll}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "9px", textTransform: "uppercase",
                letterSpacing: "0.15em", color: "rgba(61,61,61,0.8)",
              }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ── Product grid ── */}
      <div style={{ padding: "32px 64px" }} className="product-grid-wrap">
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "96px 0" }}>
            <p style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "20px", fontWeight: 300,
              color: "rgba(245,240,235,0.4)",
            }}>
              No pieces match your criteria
            </p>
            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "10px", textTransform: "uppercase",
              letterSpacing: "0.2em", color: "rgba(61,61,61,0.8)",
              marginTop: "12px",
            }}>
              Try adjusting your filters
            </p>
            <button
              onClick={clearAll}
              style={{
                marginTop: "24px",
                padding: "10px 24px",
                border: "1px solid rgba(61,61,61,0.2)",
                background: "transparent", cursor: "pointer",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "10px", textTransform: "uppercase",
                letterSpacing: "0.2em", color: "rgba(245,240,235,0.5)",
                transition: "border-color 300ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(184,160,128,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(61,61,61,0.2)")}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ── Count footer ── */}
      {filtered.length > 0 && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <p style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "10px", textTransform: "uppercase",
            letterSpacing: "0.2em", color: "rgba(61,61,61,0.6)",
          }}>
            Showing {filtered.length} of {products.length} pieces
          </p>
        </div>
      )}

      {/* ── Mobile filter panel ── */}
      <MobileFilterPanel
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={{ category: activeCategory, leather: activeLeather, size: activeSize, availability: activeAvailability }}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={(v) => setSortBy(v as SortOption)}
      />

      <style jsx global>{`
        .shop-header {
          padding-left: 64px;
          padding-right: 64px;
        }
        .filter-bar {
          padding-left: 64px;
          padding-right: 64px;
        }
        .product-grid-wrap {
          padding-left: 64px;
          padding-right: 64px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px 16px;
          row-gap: 40px;
        }
        @media (max-width: 1279px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 767px) {
          .shop-header,
          .filter-bar,
          .product-grid-wrap {
            padding-left: 20px;
            padding-right: 20px;
          }
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 12px;
            row-gap: 32px;
          }
        }
      `}</style>
    </div>
  );
}
