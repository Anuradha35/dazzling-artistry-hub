import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutImage from "@/assets/about-makeup.jpg";
import { Award, Heart, Sparkles, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "5000+", label: "Happy Brides" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Sparkles, value: "50+", label: "Makeup Styles" },
  { icon: Heart, value: "100%", label: "Satisfaction" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={aboutImage}
                alt="Beautiful bridal makeup work"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-rose-gold/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-elegant text-lg tracking-[0.2em] uppercase text-accent mb-3">About Us</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mastering the Art of
              <span className="text-gradient-gold"> Beauty</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              At Glamour Studio, we believe every woman deserves to feel like a queen on her special day. 
              With over 15 years of experience in bridal and fashion makeup, we specialize in creating 
              looks that are not just beautiful — they're unforgettable.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Our team of expert makeup artists combines traditional techniques with modern trends to 
              deliver flawless, long-lasting makeup that complements your unique features. From intimate 
              ceremonies to grand celebrations, we bring precision, passion, and elegance to every look.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-card shadow-card"
                >
                  <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
