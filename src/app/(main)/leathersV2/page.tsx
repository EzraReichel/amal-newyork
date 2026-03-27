"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers, Leather } from "@/lib/leathers";

gsap.registerPlugin(useGSAP);

// ── Responsive sizes ─────────────────────────────────────────────────────────
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

// ── Individual bookmark ──────────────────────────────────────────────────────
// • Renders its own <div> and exposes it to the parent via setRef
// • Width expansion is React-driven (hover state)
// • 3D transform is DOM-driven by the parent's scroll handler
function LeatherBookmark({
  leather,
  index,
  setRef,
  defaultWidth,
  defaultHeight,
  onHoverStart,
  onHoverEnd,
  hasDragged,
  isTouchDevice,
}: {
  leather: Leather;
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
  defaultWidth: number;
  defaultHeight: string;
  onHoverStart: (index: number) => void;
  onHoverEnd: (index: number) => void;
  hasDragged: React.RefObject<boolean>;
  isTouchDevice: boolean;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);   // hover (desktop) or tap-expanded (touch)
  const [pressed, setPressed] = useState(false);
  const router = useRouter();

  // Expose inner DOM node to parent
  useEffect(() => {
    setRef(innerRef.current);
    return () => setRef(null);
  }, [setRef]);

  const activate = useCallback(() => {
    setActive(true);
    onHoverStart(index);
  }, [index, onHoverStart]);

  const deactivate = useCallback(() => {
    setActive(false);
    onHoverEnd(index);
  }, [index, onHoverEnd]);

  const handleClick = useCallback(() => {
    if (hasDragged.current) return;            // ignore drag-release
    if (isTouchDevice) {
      if (!active) { activate(); return; }     // first tap: expand
    }
    router.push(`/leathers/${leather.id}`);    // second tap / desktop click: navigate
  }, [hasDragged, isTouchDevice, active, activate, leather.id, router]);

  const currentWidth = active ? 240 : defaultWidth;

  return (
    <div
      ref={innerRef}
      className="leather-bookmark"
      onMouseEnter={isTouchDevice ? undefined : activate}
      onMouseLeave={isTouchDevice ? undefined : deactivate}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={handleClick}
      style={{
        width: currentWidth,
        height: defaultHeight,
        margin: "0 3px",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        // Only width transitions here — transform is managed by the scroll handler
        transition: "width 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        border: active ? "1px solid rgba(196,162,101,0.2)" : "1px solid transparent",
        transform: pressed ? "scale(0.97)" : undefined, // click feedback
      }}
    >
      {/* Leather photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: leather.color,
        backgroundImage: `url('${leather.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} />

      {/* Bottom shadow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)",
        pointerEvents: "none",
      }} />

      {/* Spine index — vertical, book-spine style */}
      <span style={{
        position: "absolute",
        top: 0, left: 4,
        height: "100%",
        display: "flex",
        alignItems: "center",
        fontSize: 8,
        fontFamily: "var(--font-body)",
        color: "rgba(255,255,255,0.18)",
        writingMode: "vertical-lr",
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "0.1em",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Expanded info — fades in after the width expansion */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: "14px 12px",
        opacity: active ? 1 : 0,
        transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${active ? "200ms" : "0ms"}`,
        pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem",
          fontWeight: 300,
          color: "#F5F0EB",
          letterSpacing: "0.05em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {leather.name}
        </div>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(245,240,235,0.4)",
          marginTop: 4,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
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

  // One DOM ref per bookmark — scroll handler writes transforms here directly
  const bookmarkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setBookmarkRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { bookmarkRefs.current[i] = el; },
    []
  );

  // Which bookmark index is currently hovered (-1 = none)
  const hoveredIdx = useRef<number>(-1);

  const rafPending = useRef(false);
  const { width: bkW, height: bkH } = useBookmarkSize();

  const [hoveredLeather, setHoveredLeather] = useState<Leather | null>(null);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // ── Cover Flow transform calculator ────────────────────────────────────────
  const updateTransforms = useCallback(() => {
    const vpCenter = window.innerWidth / 2;

    bookmarkRefs.current.forEach((el, i) => {
      if (!el || i === hoveredIdx.current) return;

      const rect = el.getBoundingClientRect();
      const elCenter = rect.left + rect.width / 2;
      // Normalize: 0 = dead-center, ±1 = half-viewport away, clamp at ±1.5
      const raw    = (elCenter - vpCenter) / (vpCenter);
      const offset = Math.max(-1.5, Math.min(1.5, raw));
      const abs    = Math.min(Math.abs(offset), 1);

      const rotateY   = offset * -55;                  // ±55deg at edges
      const translateZ = (1 - abs) * 50;               // +50px at center, 0 at edges
      const translateX = offset * 30;                  // slight lateral spread
      const scale      = 1 - abs * 0.08;               // 0.92 at edges

      // No transition class = instant update every rAF (smooth during scroll)
      el.style.transform =
        `rotateY(${rotateY}deg) translateZ(${translateZ}px) translateX(${translateX}px) scale(${scale})`;

      // Dynamic shadow: left-angled cards shadow right, right-angled shadow left
      const shadowX = offset * 15;
      el.style.boxShadow = `${shadowX}px 8px 25px rgba(0,0,0,0.4)`;
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      updateTransforms();
      rafPending.current = false;
    });
  }, [updateTransforms]);

  // ── Hover transform (overrides scroll-based transform) ─────────────────────
  const applyHoverTransform = useCallback((index: number) => {
    const el = bookmarkRefs.current[index];
    if (!el) return;
    hoveredIdx.current = index;
    // Add class that enables smooth transition ONLY for hover
    el.classList.add("bm-hover");
    el.style.transform = "rotateY(0deg) translateZ(80px) translateX(0px) scale(1.05)";
    el.style.boxShadow = "0 10px 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.3)";
    // Recalculate neighbours (width change shifts layout)
    setTimeout(scheduleUpdate, 16);
  }, [scheduleUpdate]);

  const clearHoverTransform = useCallback((index: number) => {
    hoveredIdx.current = -1;
    const el = bookmarkRefs.current[index];
    if (!el) return;
    // Keep transition class briefly so the snap-back is smooth
    el.classList.add("bm-hover");
    updateTransforms(); // immediately recalculate correct position
    // Strip transition class after animation completes
    setTimeout(() => el.classList.remove("bm-hover"), 520);
  }, [updateTransforms]);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredLeather(leathers[index]);
    applyHoverTransform(index);
  }, [applyHoverTransform]);

  const handleHoverEnd = useCallback((index: number) => {
    setHoveredLeather(null);
    clearHoverTransform(index);
  }, [clearHoverTransform]);

  // ── Scroll sync ─────────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 20);
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    }
    scheduleUpdate();
  }, [scheduleUpdate]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [handleScroll, scheduleUpdate]);

  // ── Drag-to-scroll with momentum ────────────────────────────────────────────
  const drag = useRef({ on: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0 });
  const hasDragged = useRef(false);
  const coastRaf   = useRef<number | null>(null);

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
    const dx  = e.pageX - (el.offsetLeft + d.startX);
    if (Math.abs(dx) > 4) hasDragged.current = true;
    d.velX  = (e.pageX - d.lastX) / Math.max(now - d.lastT, 1);
    d.lastX = e.pageX;
    d.lastT = now;
    el.scrollLeft = d.scrollLeft - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    let vel = d.velX * 14;
    const coast = () => {
      const el = scrollRef.current;
      if (!el || Math.abs(vel) < 0.5) return;
      el.scrollLeft -= vel;
      vel *= 0.92;
      coastRaf.current = requestAnimationFrame(coast);
    };
    coastRaf.current = requestAnimationFrame(coast);
  }, []);

  // ── GSAP entrance: fade + lift (scroll handler owns 3D transforms) ──────────
  useGSAP(() => {
    const wrappers = gsap.utils.toArray<HTMLElement>(".bm-wrapper");
    if (!wrappers.length) return;
    gsap.set(wrappers, { opacity: 0, y: 20 });
    // Let scroll handler calculate 3D positions first, then fade in
    gsap.to(wrappers, {
      opacity: 1, y: 0,
      duration: 0.45,
      stagger: 0.04,
      ease: "power3.out",
      delay: 0.1,
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, backgroundColor: "#0A0A0A", overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      {/* ── Floating labels ── */}
      <Link href="/" style={{ position: "fixed", top: 24, left: 24, zIndex: 50, fontFamily: "var(--font-display)", fontSize: "0.875rem", letterSpacing: "0.3em", color: "rgba(245,240,235,0.3)", textDecoration: "none" }}>
        AMAL
      </Link>
      <span style={{ position: "fixed", top: 28, right: 24, zIndex: 50, fontFamily: "var(--font-body)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(245,240,235,0.3)" }}>
        Leather Archive V2
      </span>

      {/* ── Header: hover name display ── */}
      <div style={{ position: "relative", zIndex: 10, height: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 12, flexShrink: 0 }}>
        {/* Default hint */}
        <span style={{ position: "absolute", fontFamily: "var(--font-body)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(61,61,61,0.9)", opacity: hoveredLeather ? 0 : 1, transition: "opacity 300ms ease", userSelect: "none" }}>
          Drag to Explore
        </span>
        {/* Leather name */}
        <div style={{ position: "absolute", textAlign: "center", opacity: hoveredLeather ? 1 : 0, transition: "opacity 300ms ease", pointerEvents: "none" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.06em", lineHeight: 1.1 }}>
            {hoveredLeather?.name ?? ""}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(184,160,128,0.6)", marginTop: 4 }}>
            {hoveredLeather?.collection ?? ""}
          </div>
        </div>
      </div>

      {/* ── Bookmark shelf ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative", minHeight: 0 }}>
        {/*
          The scroll container has perspective set directly on it.
          Because there are no intermediate transformed ancestors between
          the perspective element and the 3D-transformed bookmarks,
          the Cover Flow effect renders correctly despite overflow:auto.
        */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { drag.current.on = false; }}
          style={{
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
            alignItems: "center",
            paddingLeft: "15vw",
            paddingRight: "15vw",
            cursor: "grab",
            userSelect: "none",
            scrollbarWidth: "none",
            // Perspective on the scroll container — vanishing point tracks with scroll,
            // which keeps the effect correct as content moves.
            perspective: "1200px",
            perspectiveOrigin: "center center",
          }}
        >
          {leathers.map((leather, i) => (
            /*
              .bm-wrapper: GSAP entrance target (opacity + y)
              .leather-bookmark inside: scroll handler 3D transform target
              perspective on wrapper so each card transforms relative to its own VP center
            */
            <span
              key={leather.id}
              className="bm-wrapper"
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexShrink: 0,
                // Per-element perspective ensures rotateY is interpreted in the same
                // coordinate space regardless of the scroll container's perspective tracking.
                // This gives the correct Cover Flow look across all browsers.
                perspective: "1200px",
                perspectiveOrigin: "center center",
              }}
            >
              <LeatherBookmark
                leather={leather}
                index={i}
                setRef={setBookmarkRef(i)}
                defaultWidth={bkW}
                defaultHeight={bkH}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                hasDragged={hasDragged}
                isTouchDevice={isTouchDevice}
              />
            </span>
          ))}
        </div>

        {/* Left edge gradient */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: "linear-gradient(to right, #0A0A0A 20%, transparent)", pointerEvents: "none", zIndex: 20, opacity: showLeft ? 1 : 0, transition: "opacity 300ms ease" }} />

        {/* Right edge gradient */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: "100%", background: "linear-gradient(to left, #0A0A0A 20%, transparent)", pointerEvents: "none", zIndex: 20, opacity: showRight ? 1 : 0, transition: "opacity 300ms ease" }} />

        {/* Scroll hint chevron */}
        {showRight && (
          <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 30, pointerEvents: "none", fontSize: 20, color: "rgba(61,61,61,0.9)", animation: "scroll-pulse 2s ease-in-out infinite" }}>
            ›
          </span>
        )}
      </div>

      {/* Ground reflection strip */}
      <div style={{ height: 40, background: "linear-gradient(to bottom, rgba(24,24,24,0.18), transparent)", flexShrink: 0 }} />

      {/* ── Injected styles ── */}
      <style>{`
        /* Smooth transition only during hover enter/exit — NOT during scroll */
        .leather-bookmark.bm-hover {
          transition:
            transform 500ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1),
            width 500ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        /* Hide scrollbar cross-browser */
        .leather-bookmark::-webkit-scrollbar { display: none; }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
