"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { belts, Belt } from "@/lib/belts";

gsap.registerPlugin(useGSAP);

// ── Belt bookmark ─────────────────────────────────────────────────────────────

function BeltBookmark({
  belt,
  index,
  isActive,
  onClickIndex,
  beltRef,
}: {
  belt: Belt;
  index: number;
  isActive: boolean;
  onClickIndex: (i: number) => void;
  beltRef: (el: HTMLDivElement | null) => void;
}) {
  const activeWidth  = 260;
  const defaultWidth = 100;
  const height       = "80vh";

  return (
    <div
      ref={beltRef}
      className="belt-bookmark"
      onClick={() => onClickIndex(index)}
      style={{
        display: "inline-block",
        flexShrink: 0,
        width: isActive ? activeWidth : defaultWidth,
        height,
        margin: "0 2px",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: [
          "width 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          "box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        ].join(", "),
        transform: isActive ? "translateZ(60px) scale(1.02)" : "scale(0.97)",
        boxShadow: isActive
          ? "0 10px 60px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.3)"
          : "none",
        borderBottom: isActive ? "2px solid rgba(196,162,101,0.2)" : "2px solid transparent",
        scrollSnapAlign: "center",
        verticalAlign: "middle",
      }}
    >
      {/* TODO: Replace gradient placeholders with real belt photography */}
      {/* Belt gradient — vertical, simulates leather surface */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, ${belt.gradientFrom} 0%, ${belt.gradientTo} 100%)`,
        }}
      />

      {/* Buckle end — top vignette */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "15%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Tip end — bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "15%",
          background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Subtle leather texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.03) 8px, rgba(0,0,0,0.03) 9px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Index number on spine */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 4,
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: 7,
          fontFamily: "var(--font-body)",
          color: "rgba(255,255,255,0.15)",
          writingMode: "vertical-lr",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.1em",
          zIndex: 3,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Sold indicator */}
      {!belt.inStock && (
        <div
          style={{
            position: "absolute",
            bottom: 12, left: 8,
            fontFamily: "var(--font-body)",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(245,240,235,0.4)",
            background: "rgba(0,0,0,0.6)",
            padding: "2px 6px",
            zIndex: 10,
          }}
        >
          Sold
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BeltsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile]       = useState(false);

  const bookmarkRefs  = useRef<(HTMLDivElement | null)[]>(Array(belts.length).fill(null));
  const refCallbacks  = useRef(belts.map((_, i) => (el: HTMLDivElement | null) => { bookmarkRefs.current[i] = el; }));
  const rafPending    = useRef(false);
  const hasDragged    = useRef(false);
  const drag = useRef({ on: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0 });
  const coastRaf = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateActive = useCallback(() => {
    const vpCenter = window.innerWidth / 2;
    let minDist = Infinity, closest = 0;
    bookmarkRefs.current.forEach((el, i) => {
      if (!el) return;
      const { left, width } = el.getBoundingClientRect();
      const dist = Math.abs(left + width / 2 - vpCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => { updateActive(); rafPending.current = false; });
  }, [updateActive]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(updateActive, 80);
    el.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => { clearTimeout(t); el.removeEventListener("scroll", scheduleUpdate); window.removeEventListener("resize", scheduleUpdate); };
  }, [scheduleUpdate, updateActive]);

  const handleClickIndex = useCallback((index: number) => {
    if (hasDragged.current) return;
    if (index === activeIndex) return; // navigate handled via Link on active belt
    const el = bookmarkRefs.current[index];
    const container = scrollRef.current;
    if (!el || !container) return;
    const { left, width } = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    container.scrollTo({ left: container.scrollLeft + (left - cRect.left) + width / 2 - container.clientWidth / 2, behavior: "smooth" });
  }, [activeIndex]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    hasDragged.current = false;
    drag.current = { on: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, velX: 0, lastX: e.pageX, lastT: Date.now() };
    if (coastRaf.current) cancelAnimationFrame(coastRaf.current);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const d = drag.current;
    if (!d.on) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const now = Date.now();
    const dx = e.pageX - (el.offsetLeft + d.startX);
    if (Math.abs(dx) > 4) hasDragged.current = true;
    d.velX = (e.pageX - d.lastX) / Math.max(now - d.lastT, 1);
    d.lastX = e.pageX; d.lastT = now;
    el.scrollLeft = d.scrollLeft - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    let vel = d.velX * 12;
    const coast = () => {
      const el = scrollRef.current;
      if (!el || Math.abs(vel) < 0.5) return;
      el.scrollLeft -= vel; vel *= 0.92;
      coastRaf.current = requestAnimationFrame(coast);
    };
    coastRaf.current = requestAnimationFrame(coast);
  }, []);

  // GSAP entrance
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".belt-bookmark");
    if (!items.length) return;
    gsap.set(items, { opacity: 0, x: 60, rotateY: -40 });
    gsap.to(items, { opacity: 1, x: 0, rotateY: 0, duration: 0.5, stagger: 0.04, ease: "power3.out", clearProps: "x,rotateY" });
  }, { scope: containerRef });

  const active = belts[activeIndex];

  // ── Mobile layout ─────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", paddingTop: "80px" }}>
        <div style={{ textAlign: "center", padding: "16px 0 24px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "0.3em", fontWeight: 300, color: "rgba(245,240,235,0.25)" }}>Belts</p>
        </div>
        {belts.map((belt) => (
          <Link key={belt.id} href={`/shop/${belt.id}`} style={{ display: "block", marginBottom: "16px", position: "relative" }}>
            <div style={{
              width: "100%", aspectRatio: "1/3",
              background: `linear-gradient(to bottom, ${belt.gradientFrom}, ${belt.gradientTo})`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 20px 20px", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 300, color: "#F5F0EB" }}>{belt.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.6)", marginTop: "4px" }}>{belt.leather} · {belt.color}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(245,240,235,0.6)", marginTop: "6px" }}>${belt.price.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // ── Desktop Cover Flow ───────────────────────────────────────────────────

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#0A0A0A", position: "relative" }}>

      {/* Floating header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "70px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "0.3em", fontWeight: 300, color: "rgba(245,240,235,0.25)" }}>Belts</p>
      </div>

      {/* Bookmark shelf */}
      <div
        style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center",
          position: "relative",
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { drag.current.on = false; }}
          style={{
            width: "100%", height: "100%",
            overflowX: "auto", overflowY: "hidden",
            display: "flex", alignItems: "center",
            paddingLeft: "20vw", paddingRight: "20vw",
            cursor: "grab",
            userSelect: "none",
            scrollbarWidth: "none",
            scrollSnapType: "x proximity",
          }}
        >
          {belts.map((belt, i) => (
            <BeltBookmark
              key={belt.id}
              belt={belt}
              index={i}
              isActive={i === activeIndex}
              onClickIndex={handleClickIndex}
              beltRef={refCallbacks.current[i]}
            />
          ))}
        </div>

        {/* Left fade */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: "100%", background: "linear-gradient(to right, #0A0A0A 20%, transparent)", pointerEvents: "none", zIndex: 20 }} />
        {/* Right fade */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: "100%", background: "linear-gradient(to left, #0A0A0A 20%, transparent)", pointerEvents: "none", zIndex: 20 }} />
      </div>

      {/* Active belt info — bottom bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 40,
          background: "linear-gradient(to top, rgba(10,10,10,0.9) 60%, transparent)",
          paddingTop: "64px", paddingBottom: "32px",
          padding: "64px 64px 32px",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        {/* Left */}
        <div key={activeIndex} style={{ animation: "belt-info-in 300ms ease forwards", pointerEvents: "auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.05em", margin: 0 }}>
            {active.name}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(184,160,128,0.6)", marginTop: "6px" }}>
            {active.leather} · {active.color}
          </p>
          <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "13px", color: "rgba(245,240,235,0.35)", marginTop: "8px", maxWidth: "420px", lineHeight: 1.6 }}>
            {active.description}
          </p>
        </div>

        {/* Right */}
        <div key={`r-${activeIndex}`} style={{ textAlign: "right", animation: "belt-info-in 300ms ease forwards", pointerEvents: "auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 300, color: "#F5F0EB", margin: 0 }}>
            ${active.price.toLocaleString()}
          </p>
          {active.inStock ? (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(61,61,61,0.8)", marginTop: "8px" }}>
              {active.sizes.join(" · ")}
            </p>
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(61,61,61,0.6)", marginTop: "8px" }}>
              Sold Out
            </p>
          )}
          <Link
            href={`/shop/${active.id}`}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)", fontSize: "10px",
              textTransform: "uppercase", letterSpacing: "0.2em",
              color: "rgba(184,160,128,0.5)",
              marginTop: "12px",
              transition: "color 400ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(184,160,128,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(184,160,128,0.5)")}
          >
            View in Shop →
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes belt-info-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
