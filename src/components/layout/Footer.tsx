export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--t-bg-card)", padding: "32px 24px" }}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <span style={{ fontSize: "10px", letterSpacing: "0.05em", color: "var(--t-muted)" }}>
          © 2025 Amal New York
        </span>
        <span style={{ fontSize: "10px", letterSpacing: "0.05em", color: "var(--t-muted)" }}>
          Handcrafted in Italy
        </span>
      </div>
    </footer>
  );
}
