import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useSiteSettings } from "@/hooks/useCmsData";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const { data: contactSettings } = useSiteSettings("contact");
  const contact = (contactSettings?.content || {}) as Record<string, string>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `Hi! I'm ${formData.name}. I'm interested in ${formData.service || "your services"}. ${formData.message}`;
    window.open(`https://wa.me/${contact.whatsapp || "919999999999"}?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-section" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-lg tracking-[0.2em] uppercase text-accent mb-3">Get in Touch</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Book Your <span className="text-gradient-gold">Appointment</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-elegant text-lg font-semibold text-foreground mb-1">Our Studio</h4>
                <p className="font-body text-sm text-muted-foreground">{contact.address || "123, Beauty Lane, Rajouri Garden, New Delhi - 110027"}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-elegant text-lg font-semibold text-foreground mb-1">Call Us</h4>
                <p className="font-body text-sm text-muted-foreground">{contact.phone1 || "+91 99999 99999"}<br />{contact.phone2 || "+91 88888 88888"}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-elegant text-lg font-semibold text-foreground mb-1">Email Us</h4>
                <p className="font-body text-sm text-muted-foreground">{contact.email1 || "info@glamourstudio.com"}<br />{contact.email2 || "booking@glamourstudio.com"}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-elegant text-lg font-semibold text-foreground mb-1">Working Hours</h4>
                <p className="font-body text-sm text-muted-foreground">{contact.hours_weekday || "Mon - Sat: 10:00 AM - 8:00 PM"}<br />{contact.hours_weekend || "Sunday: By Appointment Only"}</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
              <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
            </div>
            <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
            <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all">
              <option value="">Select Service</option>
              <option value="Bridal Makeup">Bridal Makeup</option>
              <option value="Party Makeup">Party Makeup</option>
              <option value="HD Makeup">HD Makeup</option>
              <option value="Airbrush Makeup">Airbrush Makeup</option>
              <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
              <option value="Makeup Course">Makeup Course</option>
            </select>
            <textarea placeholder="Your Message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none" />
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-body text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all duration-300 shadow-soft">
              <Send size={16} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
