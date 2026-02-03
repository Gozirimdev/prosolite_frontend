import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import prosolitelogo from "@/assets/prosolite-logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Courses: ["Web Development", "Data Analytics", "Video Editing", "UI/UX Design"],
    Company: ["About Us", "Careers", "Blog", "Contact"],
    Support: ["Help Center", "Terms of Service", "Privacy Policy", "FAQ"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-border/50 py-16 bg-gradient-to-t from-secondary/20 to-transparent">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3 mb-4">
              <img 
                src={prosolitelogo} 
                alt="Prosolite Logo" 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-xl font-bold">
                Proso<span className="text-gradient">lite</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Empowering careers through industry-focused education and practical skill development.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary/80 hover:bg-primary flex items-center justify-center transition-all duration-300 group hover:scale-105"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Prosolite Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
