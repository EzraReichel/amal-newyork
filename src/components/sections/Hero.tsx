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
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2.5rem, 10vw, 6.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "0.06em",
            color: "var(--t-text)",
          }}
        >
          Amal
        </h1>

        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            color: "rgba(184,160,128,0.8)",
            marginTop: "1.5rem",
            fontWeight: 300,
          }}
        >
          New Collection
        </p>
      </div>
    </section>
  );
}
