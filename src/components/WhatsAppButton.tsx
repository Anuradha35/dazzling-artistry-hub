import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useCmsData";

const WhatsAppButton = () => {
  const { data: contactSettings } = useSiteSettings("contact");
  const contact = (contactSettings?.content || {}) as Record<string, string>;
  const whatsapp = contact.whatsapp || "919999999999";

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Hi!%20I%27m%20interested%20in%20your%20makeup%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 animate-pulse hover:animate-none"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-[#fff]" />
    </a>
  );
};

export default WhatsAppButton;
