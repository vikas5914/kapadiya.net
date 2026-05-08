import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { metaData } from "../config";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["skills", "about", "home"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "var(--bg-main)",
        borderColor: "var(--border-medium)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "var(--container-max)",
          padding: "0 48px",
          height: "64px",
        }}
      >
        {/* Brand */}
        <a
          href="/"
          className="flex items-center gap-2.5 no-underline"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ind-accent)",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "28px",
              height: "28px",
              background: "var(--ind-accent)",
              color: "#fff",
              fontFamily: "'MonoLisa', monospace",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            VK
          </div>
          <span className="hidden sm:inline">Vikas Kapadiya</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.href ? (
              <a
                key={item.name}
                href={item.href}
                className="transition-colors duration-200"
                style={{
                  fontFamily: "'MonoLisa', monospace",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ind-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {item.name}
              </a>
            ) : (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.id!)}
                className="transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
                style={{
                  fontFamily: "'MonoLisa', monospace",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:
                    activeSection === item.id
                      ? "var(--ind-accent)"
                      : "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id)
                    e.currentTarget.style.color = "var(--ind-accent)";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id)
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {item.name}
              </button>
            )
          )}
          <a
            href="mailto:vikas@kapadiya.net"
            style={{
              fontFamily: "'MonoLisa', monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "var(--ind-accent)",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              textDecoration: "none",
              transition: "opacity 240ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Contact →
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-transparent border-none cursor-pointer p-2"
          style={{ color: "var(--text-primary)" }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "var(--bg-main)",
          borderTop: "1px solid var(--border-medium)",
        }}
      >
        <div className="px-12 py-6 flex flex-col gap-4">
          {navItems.map((item) =>
            item.href ? (
              <a
                key={item.name}
                href={item.href}
                style={{
                  fontFamily: "'MonoLisa', monospace",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "8px 0",
                }}
              >
                {item.name}
              </a>
            ) : (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.id!)}
                className="bg-transparent border-none cursor-pointer text-left"
                style={{
                  fontFamily: "'MonoLisa', monospace",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:
                    activeSection === item.id
                      ? "var(--ind-accent)"
                      : "var(--text-secondary)",
                  padding: "8px 0",
                }}
              >
                {item.name}
              </button>
            )
          )}
          <a
            href="mailto:vikas@kapadiya.net"
            className="inline-block text-center mt-2"
            style={{
              fontFamily: "'MonoLisa', monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "var(--ind-accent)",
              color: "#fff",
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            Contact →
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
