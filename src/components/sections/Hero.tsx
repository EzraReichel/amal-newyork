"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Base64-encoded SVG noise pattern (200x200, feTurbulence baseFrequency 0.9, numOctaves 4)
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const datelineRef = useRef<HTMLParagraphElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLAnchorElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Set initial states — prevents flash before animation
      gsap.set(
        [
          datelineRef.current,
          lineTopRef.current,
          headlineRef.current,
          subtitleRef.current,
          taglineRef.current,
          lineBottomRef.current,
          scrollIndicatorRef.current,
        ],
        { opacity: 0 }
      );

      // 1. Dateline
      tl.to(datelineRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, 0.3);

      // 2. Top decorative line
      gsap.set(lineTopRef.current, { scaleX: 0, transformOrigin: "center" });
      tl.to(lineTopRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0.4);

      // 3. Headline — the hero moment, longest smoothest animation
      gsap.set(headlineRef.current, { y: 25 });
      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
      }, 0.6);

      // 4. Subtitle
      gsap.set(subtitleRef.current, { y: 15 });
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
      }, 0.9);

      // 5. Editorial tagline — pure fade, no y movement
      tl.to(taglineRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, 1.3);

      // 6. Bottom decorative line
      gsap.set(lineBottomRef.current, { scaleX: 0, transformOrigin: "center" });
      tl.to(lineBottomRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, 1.5);

      // 7. Scroll indicator — never reaches full opacity
      tl.to(scrollIndicatorRef.current, {
        opacity: 0.5,
        duration: 0.6,
        ease: "power2.out",
      }, 2.1);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-amal-black"
    >
      {/* ── BACKGROUND LAYER ─────────────────────────────────────── */}
      {/* REPLACE: swap this div for hero video/image */}
      <div
        className="absolute inset-0 animate-ken-burns"
        style={{
          background:
            "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%)",
        }}
      >
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundRepeat: "repeat",
            opacity: 0.04,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Vignette — darkens edges for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.65) 100%)",
        }}
      />

      {/* ── CONTENT LAYER ────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12 text-center">

        {/* 1. Dateline */}
        <p
          ref={datelineRef}
          className="font-body text-[10px] uppercase tracking-[0.35em] text-amal-ash/60 font-light mb-12"
        >
          Issue No. 01 — Spring/Summer 2026
        </p>

        {/* 2. Decorative line — top */}
        <div
          ref={lineTopRef}
          className="w-10 h-px bg-amal-gold/50 mb-8"
        />

        {/* 3. Main headline */}
        <h1
          ref={headlineRef}
          className="font-display font-light tracking-[0.06em] text-amal-cream
            text-[2.5rem] leading-[1.1]
            md:text-[4rem]
            lg:text-[5.5rem]
            xl:text-[6.5rem]"
        >
          The Art of Restraint
        </h1>

        {/* 4. Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body font-light text-[11px] uppercase tracking-[0.25em] text-amal-warm/80 mt-6"
        >
          Luxury Leather Goods — Handcrafted in New York
        </p>

        {/* 5. Editorial tagline */}
        <Link
          ref={taglineRef}
          href="/journal"
          className="group inline-flex items-center gap-2 mt-12 font-editorial italic text-base md:text-lg font-light text-amal-cream/50 hover:text-amal-cream transition-colors duration-500"
        >
          Explore the Journal
          <span className="inline-block not-italic transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>

        {/* 6. Decorative line — bottom */}
        <div
          ref={lineBottomRef}
          className="w-10 h-px bg-amal-gold/50 mt-12"
        />
      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="relative w-px h-[30px] overflow-hidden">
          <div className="absolute inset-0 bg-amal-ash/30" />
          <div
            className="absolute left-0 right-0 h-1/2 bg-amal-warm/60"
            style={{ animation: "scroll-travel 2s ease-in-out infinite" }}
          />
        </div>
        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-amal-ash/30">
          Scroll
        </span>
      </div>

    </section>
  );
}
