import { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useRegistration } from "./RegistrationModal";
import { useNavigate } from "react-router-dom";
import prosolitelogo from "@/assets/prosolite-logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setOpen } = useRegistration();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    // { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.startsWith("#") ? href.slice(1) : href;
    const el = document.getElementById(id) || document.querySelector(href);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    } else {
      // If element doesn't exist, navigate to home page with hash
      navigate(`/${href}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group cursor-pointer" onClick={(e) => handleScroll(e, "#home")}>
            <img 
              src={prosolitelogo} 
              alt="Prosolite Logo" 
              className="w-10 h-10 rounded-xl object-cover group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
            />
            <span className="text-xl font-bold text-foreground">
              Proso<span className="text-gradient">lite</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
                onClick={(e) => handleScroll(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="hero" size="sm" onClick={() => setOpen(true)}>
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 text-lg"
                  onClick={(e) => handleScroll(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <Button variant="hero" className="w-full" onClick={() => setOpen(true)}>
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
