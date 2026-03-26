"use client";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* Background image — plain CSS, no next/image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center h-full px-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 mb-12 font-light">
          Issue No. 01 — Spring/Summer 2026
        </p>

        <h1
          className="font-script text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]"
          style={{
            background:
              "linear-gradient(135deg, #C4A265 0%, #D4B87A 25%, #E8D5A3 50%, #C4A265 75%, #A8894F 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Amal
        </h1>

        <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-white/40 mt-2 font-light">
          NEW YORK
        </p>
      </div>
    </section>
  );
}
