import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              Glamour<span className="text-accent">Studio</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed mb-6">
              Transforming beauty with expertise and elegance. Your trusted destination for professional bridal and party makeup.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/30 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-elegant text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-elegant text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {["Bridal Makeup", "Party Makeup", "HD Makeup", "Airbrush Makeup", "Makeup Academy"].map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-primary-foreground/70">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-elegant text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <p className="font-body text-sm text-primary-foreground/70">123, Beauty Lane, Rajouri Garden, New Delhi</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="font-body text-sm text-primary-foreground/70">+91 99999 99999</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="font-body text-sm text-primary-foreground/70">info@glamourstudio.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-primary-foreground/50">
            © 2025 Glamour Studio. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/50 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent fill-accent" /> by Glamour Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
