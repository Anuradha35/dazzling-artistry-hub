import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride",
    text: "Glamour Studio made my wedding day absolutely magical! The bridal makeup was flawless and lasted through all the ceremonies. I felt like a queen!",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    role: "Bride",
    text: "The best makeup experience I've ever had. The team understood exactly what I wanted and delivered beyond my expectations. Highly recommend!",
    rating: 5,
  },
  {
    name: "Riya Patel",
    role: "Party Makeup Client",
    text: "I got my engagement makeup done here and received so many compliments! The attention to detail is incredible. Will definitely come back.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-lg tracking-[0.2em] uppercase text-accent mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient-rose">Clients Say</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-card relative"
            >
              <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-display text-base font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
