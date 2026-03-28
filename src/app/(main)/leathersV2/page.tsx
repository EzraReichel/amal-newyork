"use client";

import { useRef, useState, useEffect, useCallback, forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leathers } from "@/lib/leathers";

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

// ── Bookmark ─────────────────────────────────────────────────────────────────
// Purely presentational — all active state driven by parent.
const LeatherBookmark = forwardRef<
  HTMLDivElement,
  {
    leather: (typeof leathers)[0];
    index: number;
    isActive: boolean;
    defaultWidth: number;
    defaultHeight: string;
    onClickIndex: (i: number) => void;
  }
>(function LeatherBookmark(
  { leather, index, isActive, defaultWidth, defaultHeight, onClickIndex },
  ref
) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      ref={ref}
      className="leather-bookmark"
      onClick={() => onClickIndex(index)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: "inline-block",
        flexShrink: 0,
        width: isActive ? 240 : defaultWidth,
        height: defaultHeight,
        margin: "0 3px",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition:
          "width 500ms cubic-bezier(0.16, 1, 0.3, 1)," +
          "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)," +
          "box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isActive
          ? `translateZ(60px) scale(${pressed ? 0.97 : 1.04})`
          : "scale(0.97)",
        boxShadow: isActive
          ? "0 10px 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.3)"
          : "none",
        border: isActive
          ? "1px solid rgba(196,162,101,0.2)"
          : "1px solid transparent",
        verticalAlign: "middle",
        scrollSnapAlign: "center",
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

      {/* Bottom shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Spine number */}
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
          color: "rgba(255,255,255,0.18)",
          writingMode: "vertical-lr",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.1em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name + collection — fades in when active */}
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
});

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LeathersV2Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const router       = useRouter();

  // Stable per-index callback refs — created once, never re-created
  const bookmarkRefs = useRef<(HTMLDivElement | null)[]>(
    Array(leathers.length).fill(null)
  );
  const refCallbacks = useRef(
    leathers.map((_, i) => (el: HTMLDivElement | null) => {
      bookmarkRefs.current[i] = el;
    })
  );

  const rafPending = useRef(false);
  const { width: bkW, height: bkH } = useBookmarkSize();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(true);

  // ── Center detection ────────────────────────────────────────────────────────
  const updateActive = useCallback(() => {
    const vpCenter = window.innerWidth / 2;
    let minDist = Infinity;
    let closest  = 0;
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
    requestAnimationFrame(() => {
      updateActive();
      rafPending.current = false;
    });
  }, [updateActive]);

  // ── Scroll → update shadows + active ───────────────────────────────────────
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
    // Initial active calculation after bookmarks have rendered
    const t = setTimeout(updateActive, 80);
    el.addEventListener("scroll",  handleScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll",  handleScroll);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [handleScroll, scheduleUpdate, updateActive]);

  // ── Click: active → navigate; inactive → scroll to center ──────────────────
  const hasDragged = useRef(false);

  const handleClickIndex = useCallback((index: number) => {
    if (hasDragged.current) return;
    if (index === activeIndex) {
      router.push(`/leathers/${leathers[index].id}`);
    } else {
      const el        = bookmarkRefs.current[index];
      const container = scrollRef.current;
      if (!el || !container) return;
      const { left, width } = el.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      container.scrollTo({
        left: container.scrollLeft + (left - cRect.left) + width / 2 - container.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex, router]);

  // ── Drag-to-scroll ────────────────────────────────────────────────────────
  const drag = useRef({
    on: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, lastT: 0,
  });
  const coastRaf = useRef<number | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    hasDragged.current = false;
    drag.current = {
      on: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft,
      velX: 0, lastX: e.pageX, lastT: Date.now(),
    };
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
    let vel = d.velX * 12;
    const coast = () => {
      const el = scrollRef.current;
      if (!el || Math.abs(vel) < 0.5) return;
      el.scrollLeft -= vel;
      vel *= 0.92;
      coastRaf.current = requestAnimationFrame(coast);
    };
    coastRaf.current = requestAnimationFrame(coast);
  }, []);

  // ── GSAP entrance ─────────────────────────────────────────────────────────
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".leather-bookmark");
    if (!items.length) return;
    gsap.set(items, { opacity: 0, x: 40 });
    gsap.to(items, {
      opacity: 1, x: 0,
      duration: 0.5, stagger: 0.04, ease: "power3.out",
      clearProps: "x",
    });
  }, { scope: containerRef });

  const active = leathers[activeIndex];

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0, backgroundColor: "#0A0A0A",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      {/* ── Header: active leather name, always visible, crossfades on change ── */}
      <div
        style={{
          position: "relative", zIndex: 10, height: 80,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-end",
          paddingBottom: 12, flexShrink: 0,
        }}
      >
        {/* key forces remount → restarts the fadeInUp animation on every change */}
        <div
          key={activeIndex}
          style={{ textAlign: "center", animation: "bm-name-in 350ms ease forwards" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 300, color: "#F5F0EB",
              letterSpacing: "0.06em", lineHeight: 1.1,
            }}
          >
            {active.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)", fontSize: 10,
              textTransform: "uppercase", letterSpacing: "0.25em",
              color: "rgba(184,160,128,0.6)", marginTop: 4,
            }}
          >
            {active.collection}
          </div>
        </div>
      </div>

      {/* ── Bookmark shelf ── */}
      <div
        style={{
          flex: 1, display: "flex", alignItems: "center",
          position: "relative", minHeight: 0,
          perspective: "1200px", perspectiveOrigin: "center center",
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
            paddingLeft: `calc(50% - ${bkW / 2}px)`,
            paddingRight: `calc(50% - ${bkW / 2}px)`,
            cursor: "grab", userSelect: "none",
            scrollbarWidth: "none",
            scrollSnapType: "x proximity",
          }}
        >
          {leathers.map((leather, i) => (
            <LeatherBookmark
              key={leather.id}
              ref={refCallbacks.current[i]}
              leather={leather}
              index={i}
              isActive={i === activeIndex}
              defaultWidth={bkW}
              defaultHeight={bkH}
              onClickIndex={handleClickIndex}
            />
          ))}
        </div>

        {/* Left edge fade */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, width: 80, height: "100%",
            background: "linear-gradient(to right, #0A0A0A 20%, transparent)",
            pointerEvents: "none", zIndex: 20,
            opacity: showLeft ? 1 : 0, transition: "opacity 300ms ease",
          }}
        />

        {/* Right edge fade */}
        <div
          style={{
            position: "absolute", top: 0, right: 0, width: 80, height: "100%",
            background: "linear-gradient(to left, #0A0A0A 20%, transparent)",
            pointerEvents: "none", zIndex: 20,
            opacity: showRight ? 1 : 0, transition: "opacity 300ms ease",
          }}
        />

        {/* Scroll hint chevron */}
        {showRight && (
          <span
            style={{
              position: "absolute", right: 16, top: "50%",
              transform: "translateY(-50%)", zIndex: 30,
              pointerEvents: "none", fontSize: 20,
              color: "rgba(61,61,61,0.9)",
              animation: "scroll-pulse 2s ease-in-out infinite",
            }}
          >
            ›
          </span>
        )}
      </div>

      {/* Ground reflection strip */}
      <div
        style={{
          height: 40,
          background: "linear-gradient(to bottom, rgba(24,24,24,0.18), transparent)",
          flexShrink: 0,
        }}
      />

      <style>{`
        @keyframes bm-name-in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
