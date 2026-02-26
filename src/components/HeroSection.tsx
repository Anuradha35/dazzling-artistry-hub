import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-bride.jpg";
import { useSiteSettings } from "@/hooks/useCmsData";

const HeroSection = () => {
  const { data: heroSettings } = useSiteSettings("hero");
  const hero = (heroSettings?.content || {}) as Record<string, string>;

  const title = hero.title || "GlamourStudio";
  // Split title to highlight last word
  const titleParts = title.match(/^(.+?)([A-Z][a-z]+)$/) || [title, title.slice(0, -6), title.slice(-6)];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Professional bridal makeup artist at work" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-elegant text-lg md:text-xl tracking-[0.3em] uppercase text-cream/90 mb-4">
          Welcome to
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-ivory mb-6 leading-tight">
          {titleParts[1]}<span className="text-gold-light">{titleParts[2]}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="font-elegant text-xl md:text-2xl text-cream/85 max-w-2xl mx-auto mb-4 italic">
          {hero.subtitle || "Transforming Beauty with Expertise & Elegance"}
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="font-body text-sm md:text-base text-cream/70 max-w-lg mx-auto mb-10 tracking-wide">
          {hero.tagline || "Professional Bridal & Party Makeup | Salon & Academy"}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-body text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all duration-300 shadow-elevated">
            {hero.cta_primary || "Our Services"}
          </a>
          <a href="#contact" className="border-2 border-cream/50 text-cream px-8 py-3.5 rounded-full font-body text-sm uppercase tracking-widest font-semibold hover:bg-cream/10 transition-all duration-300">
            {hero.cta_secondary || "Get in Touch"}
          </a>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
