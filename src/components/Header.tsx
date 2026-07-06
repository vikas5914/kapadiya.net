import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const focusVisibleClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ind-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main";

const navLinkClass =
  "no-underline text-sm font-normal tracking-wide uppercase text-text-secondary transition-colors duration-200 hover:text-ind-accent";

const ctaClass =
  "no-underline text-xs font-medium tracking-widest uppercase bg-ind-accent text-text-on-accent border-none px-5 py-2.5 transition-opacity duration-[240ms] hover:opacity-85";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", id: "home", href: "/#home" },
    { name: "Projects", id: "projects", href: "/#projects" },
    { name: "About", id: "about", href: "/#about" },
    { name: "Blog", href: "/blog/" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "home"];
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

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-medium bg-bg-main">
      <div className="mx-auto flex items-center justify-between max-w-[1440px] h-16 px-6 sm:px-12">
        {/* Brand */}
        <a
          href="/"
          className="flex items-center gap-2.5 no-underline text-sm font-bold tracking-wide uppercase text-ind-accent"
        >
          <div className="flex items-center justify-center w-7 h-7 bg-ind-accent text-text-on-accent text-xs font-bold">
            VK
          </div>
          <span className="hidden sm:inline">Vikas Kapadiya</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => item.id && handleNavigate(e, item.id)}
              className={`${navLinkClass} ${
                activeSection === item.id ? "text-ind-accent" : "text-text-secondary"
              } ${focusVisibleClass}`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:vikas@kapadiya.net"
            className={`${ctaClass} ${focusVisibleClass}`}
          >
            Contact →
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden bg-transparent border-none cursor-pointer p-2 text-text-primary ${focusVisibleClass}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Toggle menu"}
        >
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden bg-bg-main border-t border-border-medium ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-12 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => item.id && handleNavigate(e, item.id)}
              className={`no-underline text-sm font-normal tracking-wide uppercase py-2 ${
                activeSection === item.id ? "text-ind-accent" : "text-text-secondary"
              }`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:vikas@kapadiya.net"
            className="inline-block text-center mt-2 no-underline text-xs font-medium tracking-widest uppercase bg-ind-accent text-text-on-accent px-5 py-2.5"
          >
            Contact →
          </a>
        </div>
      </div>
      <div
        id="scroll-progress"
        className="absolute bottom-0 left-0 h-[2px] bg-ind-accent w-full origin-left scale-x-0"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
};

export default Header;
