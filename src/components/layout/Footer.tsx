import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amal-charcoal py-24 px-6 md:px-12">
      {/* Masthead */}
      <div className="text-center mb-20">
        <span className="font-display text-2xl tracking-[0.35em] font-light text-amal-cream">
          AMAL NEW YORK
        </span>
      </div>

      {/* Three-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
        {/* Navigate */}
        <div>
          <p className="font-body text-[10px] uppercase tracking-luxury text-amal-ash/50 mb-6">
            Navigate
          </p>
          <nav className="flex flex-col leading-loose">
            {[
              { href: "/journal", label: "Journal" },
              { href: "/world", label: "World" },
              { href: "/collections", label: "Collections" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-xs uppercase tracking-luxury text-amal-ash hover:text-amal-warm transition-colors duration-[400ms] ease-out"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Connect */}
        <div>
          <p className="font-body text-[10px] uppercase tracking-luxury text-amal-ash/50 mb-6">
            Connect
          </p>
          <div className="flex flex-col leading-loose">
            <span className="font-body text-xs uppercase tracking-luxury text-amal-ash hover:text-amal-warm transition-colors duration-[400ms] ease-out cursor-pointer">
              Instagram
            </span>
            <span className="font-body text-xs uppercase tracking-luxury text-amal-ash hover:text-amal-warm transition-colors duration-[400ms] ease-out cursor-pointer">
              Email
            </span>
            <span className="font-body text-xs uppercase tracking-luxury text-amal-ash">
              New York, NY
            </span>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <p className="font-body text-[10px] uppercase tracking-luxury text-amal-ash/50 mb-6">
            Subscribe
          </p>
          <div className="flex items-end gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-b border-amal-ash/40 text-amal-cream font-body text-xs tracking-wide pb-2 outline-none placeholder:text-amal-ash/60 focus:border-amal-ash/70 transition-colors duration-[400ms]"
            />
            <button className="font-body text-xs uppercase tracking-luxury text-amal-warm hover:text-amal-gold transition-colors duration-[400ms] ease-out pb-2">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-8 border-t border-amal-ash/10 flex items-center justify-between max-w-4xl mx-auto">
        <span className="text-[10px] tracking-wide text-amal-ash/50">
          © 2025 Amal New York
        </span>
        <span className="text-[10px] tracking-wide text-amal-ash/50">
          Handcrafted in New York
        </span>
      </div>
    </footer>
  );
}
