"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export default function Hero() {
  const containerRef    = useRef<HTMLElement>(null);
  const bgLayerRef      = useRef<HTMLDivElement>(null);
  const grainRef        = useRef<HTMLDivElement>(null);
  const amalRef         = useRef<HTMLHeadingElement>(null);
  const newyorkRef      = useRef<HTMLParagraphElement>(null);
  const datelineRef     = useRef<HTMLParagraphElement>(null);
  const bottomRef       = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Freeze everything before timeline fires
      gsap.set(
        [bgLayerRef.current, amalRef.current, newyorkRef.current,
         datelineRef.current, bottomRef.current, grainRef.current],
        { opacity: 0 }
      );
      gsap.set(amalRef.current, { scale: 0.95 });

      const tl = gsap.timeline({ delay: 0.05 });

      // 1. Background image fades in
      tl.to(bgLayerRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0);

      // 2. "Amal" — THE moment. Scale + fade, slow and weighty
      tl.to(amalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
      }, 0.8);

      // 3. "NEW YORK" — stays muted, fades to 0.4
      tl.to(newyorkRef.current, {
        opacity: 0.4,
        duration: 1.0,
        ease: "power2.out",
      }, 1.2);

      // 4. Dateline — fades to 0.5
      tl.to(datelineRef.current, {
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.out",
      }, 1.5);

      // 5. Bottom elements — journal link + scroll indicator
      tl.to(bottomRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 1.9);

      // 6. Grain overlay — last, barely visible
      tl.to(grainRef.current, {
        opacity: 0.035,
        duration: 1.0,
        ease: "power2.out",
      }, 2.0);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-amal-black"
    >
      {/* ── LAYER 1: BACKGROUND ──────────────────────────────────── */}
      <div ref={bgLayerRef} className="absolute inset-0">

        {/* Fallback gradient — shows through if image fails to load */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 75%)",
          }}
        />

        {/* REPLACE: swap next/image src with final product shot */}
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="/images/hero-belt.jpg"
            alt="Amal New York — hero"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
        </div>

        {/* Gradient overlay — keeps top/bottom legible, lets middle breathe */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.5) 100%)",
          }}
        />

        {/* Film grain — fades in last via GSAP */}
        <div
          ref={grainRef}
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ── LAYER 2: CONTENT ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-between">

        {/* TOP ZONE — dateline */}
        <div className="pt-28 px-6 md:px-12 flex justify-center md:justify-start">
          <p
            ref={datelineRef}
            className="font-body text-[10px] uppercase tracking-[0.35em] text-amal-cream font-light"
          >
            Issue No. 01 — Spring/Summer 2026
          </p>
        </div>

        {/* MIDDLE ZONE — gold "Amal" logotype */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1
            ref={amalRef}
            className="font-script font-normal leading-none tracking-[0.02em]
              text-[5rem]
              md:text-[8rem]
              lg:text-[10rem]
              xl:text-[12rem]"
            style={{
              background:
                "linear-gradient(135deg, #C4A265 0%, #D4B87A 25%, #E8D5A3 50%, #C4A265 75%, #A8894F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 30px rgba(196,162,101,0.15)",
            }}
          >
            Amal
          </h1>

          <p
            ref={newyorkRef}
            className="font-body font-light uppercase tracking-[0.5em] text-amal-cream
              text-[10px] md:text-[12px]
              mt-2"
          >
            New York
          </p>
        </div>

        {/* BOTTOM ZONE — journal link + scroll indicator */}
        <div
          ref={bottomRef}
          className="pb-12 px-6 md:px-12 flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-end"
        >
          {/* Journal link */}
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 font-editorial italic text-sm font-light text-amal-cream/40 hover:text-amal-cream/70 transition-colors duration-500"
          >
            Explore the Journal
            <span className="inline-block not-italic transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-px h-[25px] bg-amal-cream/20"
              style={{ animation: "scroll-pulse 2.5s ease-in-out infinite" }}
            />
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-amal-cream/20">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
