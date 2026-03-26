"use client";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "block",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "3rem",
            fontWeight: 300,
          }}
        >
          Issue No. 01 — Spring/Summer 2026
        </p>

        <h1
          style={{
            fontFamily: "var(--font-script), cursive",
            fontSize: "clamp(4rem, 12vw, 12rem)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "0.02em",
            background:
              "linear-gradient(135deg, #C4A265 0%, #D4B87A 25%, #E8D5A3 50%, #C4A265 75%, #A8894F 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Amal
        </h1>

        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            color: "rgba(255,255,255,0.4)",
            marginTop: "0.5rem",
            fontWeight: 300,
          }}
        >
          NEW YORK
        </p>
      </div>
    </section>
  );
}
