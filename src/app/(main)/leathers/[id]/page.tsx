import Link from "next/link";
import { leathers } from "@/lib/leathers";

export default function LeatherDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const leather = leathers.find((l) => l.id === params.id);

  if (!leather) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#0A0A0A", gap: "1.5rem" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.05em" }}>
          Leather not found
        </p>
        <Link href="/leathers" style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(184,160,128,0.6)", textDecoration: "none" }}>
          ← Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#0A0A0A", padding: "2rem" }}>

      {/* Leather photo swatch */}
      <div
        style={{
          width: 240,
          height: 240,
          backgroundColor: leather.color,
          backgroundImage: `url('${leather.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "2.5rem",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      />

      {/* Italian name */}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 300, color: "#F5F0EB", letterSpacing: "0.06em", textAlign: "center", margin: 0 }}>
        {leather.name}
      </h1>

      {/* English */}
      <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "1rem", color: "rgba(245,240,235,0.4)", marginTop: "0.4rem" }}>
        {leather.nameEn}
      </p>

      {/* Collection */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(184,160,128,0.7)", marginTop: "1.25rem" }}>
        {leather.collection}
      </p>

      {/* Origin */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(61,61,61,0.9)", marginTop: "0.5rem" }}>
        {leather.origin}
      </p>

      <Link href="/leathers" style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(184,160,128,0.5)", textDecoration: "none", marginTop: "3rem" }}>
        ← Back to Archive
      </Link>
    </div>
  );
}
