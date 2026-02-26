import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Gem, Palette, Scissors, Sparkles, Star } from "lucide-react";
import { useServices } from "@/hooks/useCmsData";

const iconMap: Record<string, any> = { Crown, Gem, Palette, Scissors, Sparkles, Star };

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: services, isLoading } = useServices();

  return (
    <section id="services" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-lg tracking-[0.2em] uppercase text-accent mb-3">What We Offer</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-rose">Services</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            From bridal glamour to everyday elegance, we offer a complete range of beauty services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services || []).map((service, index) => {
            const IconComp = iconMap[service.icon || "Sparkles"] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <IconComp className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <p className="font-elegant text-lg font-semibold text-primary">{service.price}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
