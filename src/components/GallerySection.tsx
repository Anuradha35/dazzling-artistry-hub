import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const categories = ["All", "Bridal", "Party", "Editorial"];

const galleryItems = [
  { src: gallery1, category: "Bridal", title: "Traditional Bridal Look" },
  { src: gallery2, category: "Party", title: "Glamorous Party Look" },
  { src: gallery3, category: "Editorial", title: "Natural Dewy Glow" },
  { src: gallery4, category: "Bridal", title: "Reception Glamour" },
  { src: gallery5, category: "Bridal", title: "Engagement Ceremony" },
  { src: gallery6, category: "Editorial", title: "Bold Editorial Look" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gradient-section" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-elegant text-lg tracking-[0.2em] uppercase text-accent mb-3">Portfolio</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Gallery</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            A glimpse of our beautiful transformations and the artistry we bring to every look.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer aspect-[3/4]"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-end">
                <div className="p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-elegant text-xs uppercase tracking-widest text-cream/80 mb-1">{item.category}</p>
                  <p className="font-display text-lg text-ivory font-semibold">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
