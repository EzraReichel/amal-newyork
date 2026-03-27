"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers, Leather } from "@/lib/leathers";

gsap.registerPlugin(useGSAP);

// ── Responsive bookmark dimensions ──────────────────────────────────────────
function useBookmarkSize() {
  const [size, setSize] = useState({ width: 80, height: "75vh" });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768)       setSize({ width: 50, height: "60vh" });
      else if (w < 1024) setSize({ width: 60, height: "70vh" });
      else               setSize({ width: 80, height: "75vh" });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// ── Single bookmark ──────────────────────────────────────────────────────────
function LeatherBookmark({
  leather,
  index,
  defaultWidth,
  defaultHeight,
  onHover,
  isTouchDevice,
}: {
  leather: Leather;
  index: number;
  defaultWidth: number;
  defaultHeight: string;
  onHover: (leather: Leather | null) => void;
  isTouchDevice: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [expanded, setExpanded] = useState(false); // touch toggle
  const router = useRouter();

  const isActive = isTouchDevice ? expanded : hovered;

  const handleClick = () => {
    if (isTouchDevice) {
      if (!expanded) {
        setExpanded(true);
        onHover(leather);
      } else {
        router.push(`/leathers/${leather.id}`);
      }
    } else {
      router.push(`/leathers/${leather.id}`);
    }
  };

  // Close expanded on click elsewhere handled by parent
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setHovered(true);
      onHover(leather);
    }
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setHovered(false);
      onHover(null);
    }
  };

  const expandedWidth = 220;
  const currentWidth = isActive ? expandedWidth : defaultWidth;

  return (
    <div
      className="leather-bookmark"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-block",
        flexShrink: 0,
        width: currentWidth,
        height: defaultHeight,
        margin: "0 3px",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "width 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isActive
          ? `scale(${pressed ? 0.97 : 1.02})`
          : "scale(1)",
        boxShadow: isActive
          ? "0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(0,0,0,0.3)"
          : "none",
        border: isActive ? "1px solid rgba(196,162,101,0.2)" : "1px solid transparent",
        willChange: isActive ? "transform" : "auto",
        verticalAlign: "middle",
      }}
    >
      {/* Leather photo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: leather.color,
          backgroundImage: `url('${leather.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Bottom shadow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 35%)",
          pointerEvents: "none",
        }}
      />

      {/* Spine number — always visible, rotated along left edge */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 4,
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: 8,
          fontFamily: "var(--font-body)",
          color: "rgba(255,255,255,0.2)",
          writingMode: "vertical-lr",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.1em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Expanded info — fades in after expansion */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 12px",
          opacity: isActive ? 1 : 0,
          transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? "200ms" : "0ms"}`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.9rem",
            fontWeight: 300,
            color: "#F5F0EB",
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {leather.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(245,240,235,0.4)",
            marginTop: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {leather.collection}
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LeathersV2Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const { width: bkW, height: bkH } = useBookmarkSize();

  // Hover state — which leather is currently highlighted
  const [hoveredLeather, setHoveredLeather] = useState<Leather | null>(null);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // ── Scroll shadow visibility ───────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 20);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Drag-to-scroll ────────────────────────────────────────────────────────
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0 });
  const rafRef    = useRef<number | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      velX: 0,
      lastX: e.pageX,
      lastT: Date.now(),
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const d = dragState.current;
    if (!d.dragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const now  = Date.now();
    const dx   = e.pageX - (el.offsetLeft + d.startX);
    const dt   = now - d.lastT || 1;
    d.velX     = (e.pageX - d.lastX) / dt;
    d.lastX    = e.pageX;
    d.lastT    = now;
    el.scrollLeft = d.scrollLeft - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    const d = dragState.current;
    if (!d.dragging) return;
    d.dragging = false;
    // Momentum coast
    let vel = d.velX * 14;
    const coast = () => {
      const el = scrollRef.current;
      if (!el || Math.abs(vel) < 0.5) return;
      el.scrollLeft -= vel;
      vel *= 0.92;
      rafRef.current = requestAnimationFrame(coast);
    };
    rafRef.current = requestAnimationFrame(coast);
  }, []);

  const onMouseLeaveContainer = useCallback(() => {
    dragState.current.dragging = false;
  }, []);

  // ── GSAP entrance ─────────────────────────────────────────────────────────
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".leather-bookmark");
      if (!items.length) return;
      gsap.set(items, { opacity: 0, x: 40 });
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        clearProps: "x",
      });
    },
    { scope: containerRef }
  );

  // ── Collapse touch-expanded bookmark when clicking outside ────────────────
  const handleContainerClick = () => {
    // bubbles — individual bookmarks handle their own logic
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0A0A0A",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Floating labels ── */}
      <Link
        href="/"
        style={{
          position: "fixed",
          top: 24, left: 24,
          zIndex: 50,
          fontFamily: "var(--font-display)",
          fontSize: "0.875rem",
          letterSpacing: "0.3em",
          color: "rgba(245,240,235,0.3)",
          textDecoration: "none",
        }}
      >
        AMAL
      </Link>
      <span
        style={{
          position: "fixed",
          top: 28, right: 24,
          zIndex: 50,
          fontFamily: "var(--font-body)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "rgba(245,240,235,0.3)",
        }}
      >
        Leather Archive V2
      </span>

      {/* ── Header: hovered leather name ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 12,
          flexShrink: 0,
        }}
      >
        {/* Default label */}
        <span
          style={{
            position: "absolute",
            fontFamily: "var(--font-body)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(61,61,61,0.9)",
            opacity: hoveredLeather ? 0 : 1,
            transition: "opacity 300ms ease",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Drag to Explore
        </span>

        {/* Hovered leather name */}
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            opacity: hoveredLeather ? 1 : 0,
            transition: "opacity 300ms ease",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 300,
              color: "#F5F0EB",
              letterSpacing: "0.06em",
              lineHeight: 1.1,
            }}
          >
            {hoveredLeather?.name ?? ""}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(184,160,128,0.6)",
              marginTop: 4,
            }}
          >
            {hoveredLeather?.collection ?? ""}
          </div>
        </div>
      </div>

      {/* ── Bookmark shelf ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          position: "relative",
          perspective: "1200px",
          perspectiveOrigin: "center center",
          minHeight: 0,
        }}
      >
        <div
          ref={scrollRef}
          onClick={handleContainerClick}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeaveContainer}
          style={{
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            paddingLeft: "15vw",
            paddingRight: "15vw",
            cursor: dragState.current.dragging ? "grabbing" : "grab",
            userSelect: "none",
            // Hide scrollbar
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {leathers.map((leather, i) => (
            <LeatherBookmark
              key={leather.id}
              leather={leather}
              index={i}
              defaultWidth={bkW}
              defaultHeight={bkH}
              onHover={setHoveredLeather}
              isTouchDevice={isTouchDevice}
            />
          ))}
        </div>

        {/* ── Left fade gradient ── */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: 80, height: "100%",
            background: "linear-gradient(to right, #0A0A0A, transparent)",
            pointerEvents: "none",
            zIndex: 20,
            opacity: showLeft ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        />

        {/* ── Right fade gradient ── */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0,
            width: 80, height: "100%",
            background: "linear-gradient(to left, #0A0A0A, transparent)",
            pointerEvents: "none",
            zIndex: 20,
            opacity: showRight ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        />

        {/* ── Right scroll hint chevron ── */}
        {showRight && (
          <div
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 30,
              pointerEvents: "none",
              fontFamily: "var(--font-body)",
              fontSize: 20,
              color: "rgba(61,61,61,0.9)",
              animation: "scroll-pulse 2s ease-in-out infinite",
            }}
          >
            ›
          </div>
        )}
      </div>

      {/* ── Bottom spacer ── */}
      <div style={{ height: 32, flexShrink: 0 }} />

      {/* ── Hide webkit scrollbar ── */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
