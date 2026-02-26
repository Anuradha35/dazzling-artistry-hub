import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Settings, Image, Star, MessageSquare, Home, Loader2, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";

type Tab = "settings" | "services" | "gallery" | "testimonials";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("settings");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!user || !isAdmin) return null;

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "settings", label: "Site Settings", icon: Settings },
    { key: "services", label: "Services", icon: Star },
    { key: "gallery", label: "Gallery", icon: Image },
    { key: "testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">
            Glamour<span className="text-accent">Studio</span> <span className="font-body text-sm font-normal text-muted-foreground ml-2">Admin</span>
          </h1>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="font-body text-xs text-muted-foreground hover:text-primary flex items-center gap-1"><Home className="w-3 h-3" /> View Site</a>
            <button onClick={() => { signOut(); navigate("/admin/login"); }} className="font-body text-xs text-destructive flex items-center gap-1"><LogOut className="w-3 h-3" /> Logout</button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex gap-1 px-4 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 font-body text-sm border-b-2 transition-all whitespace-nowrap ${
                activeTab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "settings" && <SiteSettingsTab />}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "gallery" && <GalleryTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
      </div>
    </div>
  );
};

// ---- Site Settings Tab ----
const SiteSettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, any> = {};
      data?.forEach((d) => { map[d.section_key] = d.content; });
      setSettings(map);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const saveSection = async (key: string) => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({ content: settings[key] }).eq("section_key", key);
    setSaving(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Saved!", description: `${key} settings updated.` });
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const updateField = (section: string, field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Hero */}
      <SettingsCard title="Hero Section" onSave={() => saveSection("hero")} saving={saving}>
        <FieldInput label="Title" value={settings.hero?.title || ""} onChange={(v) => updateField("hero", "title", v)} />
        <FieldInput label="Subtitle" value={settings.hero?.subtitle || ""} onChange={(v) => updateField("hero", "subtitle", v)} />
        <FieldInput label="Tagline" value={settings.hero?.tagline || ""} onChange={(v) => updateField("hero", "tagline", v)} />
      </SettingsCard>

      {/* Contact */}
      <SettingsCard title="Contact Info" onSave={() => saveSection("contact")} saving={saving}>
        <FieldInput label="Address" value={settings.contact?.address || ""} onChange={(v) => updateField("contact", "address", v)} />
        <FieldInput label="Phone 1" value={settings.contact?.phone1 || ""} onChange={(v) => updateField("contact", "phone1", v)} />
        <FieldInput label="Phone 2" value={settings.contact?.phone2 || ""} onChange={(v) => updateField("contact", "phone2", v)} />
        <FieldInput label="Email 1" value={settings.contact?.email1 || ""} onChange={(v) => updateField("contact", "email1", v)} />
        <FieldInput label="Email 2" value={settings.contact?.email2 || ""} onChange={(v) => updateField("contact", "email2", v)} />
        <FieldInput label="WhatsApp Number" value={settings.contact?.whatsapp || ""} onChange={(v) => updateField("contact", "whatsapp", v)} />
        <FieldInput label="Weekday Hours" value={settings.contact?.hours_weekday || ""} onChange={(v) => updateField("contact", "hours_weekday", v)} />
        <FieldInput label="Weekend Hours" value={settings.contact?.hours_weekend || ""} onChange={(v) => updateField("contact", "hours_weekend", v)} />
      </SettingsCard>

      {/* About */}
      <SettingsCard title="About Section" onSave={() => saveSection("about")} saving={saving}>
        <FieldInput label="Heading" value={settings.about?.heading || ""} onChange={(v) => updateField("about", "heading", v)} />
        <FieldTextarea label="Paragraph 1" value={settings.about?.paragraph1 || ""} onChange={(v) => updateField("about", "paragraph1", v)} />
        <FieldTextarea label="Paragraph 2" value={settings.about?.paragraph2 || ""} onChange={(v) => updateField("about", "paragraph2", v)} />
      </SettingsCard>
    </div>
  );
};

// ---- Services Tab ----
const ServicesTab = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchServices(); }, []);

  const saveService = async (svc: any) => {
    const { error } = await supabase.from("services").update({ title: svc.title, description: svc.description, price: svc.price, icon: svc.icon, is_active: svc.is_active }).eq("id", svc.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved!" }); qc.invalidateQueries({ queryKey: ["services"] }); }
  };

  const addService = async () => {
    const { error } = await supabase.from("services").insert({ title: "New Service", description: "Description", price: "Starting ₹0", sort_order: services.length });
    if (!error) fetchServices();
  };

  const deleteService = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
    qc.invalidateQueries({ queryKey: ["services"] });
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  return (
    <div className="space-y-4 max-w-2xl">
      {services.map((svc, i) => (
        <div key={svc.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-start">
            <FieldInput label="Title" value={svc.title} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], title: v }; setServices(s); }} />
            <div className="flex gap-2 ml-4 mt-5">
              <button onClick={() => saveService(svc)} className="text-primary hover:opacity-70"><Save className="w-4 h-4" /></button>
              <button onClick={() => { const s = [...services]; s[i] = { ...s[i], is_active: !s[i].is_active }; setServices(s); saveService({ ...svc, is_active: !svc.is_active }); }} className="text-muted-foreground hover:opacity-70">
                {svc.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => deleteService(svc.id)} className="text-destructive hover:opacity-70"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <FieldTextarea label="Description" value={svc.description || ""} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], description: v }; setServices(s); }} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Price" value={svc.price || ""} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], price: v }; setServices(s); }} />
            <FieldInput label="Icon" value={svc.icon || ""} onChange={(v) => { const s = [...services]; s[i] = { ...s[i], icon: v }; setServices(s); }} />
          </div>
        </div>
      ))}
      <button onClick={addService} className="flex items-center gap-2 text-primary font-body text-sm hover:opacity-70"><Plus className="w-4 h-4" /> Add Service</button>
    </div>
  );
};

// ---- Gallery Tab ----
const GalleryTab = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("gallery_items").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("cms-images").upload(path, file);
    if (error) { toast({ title: "Upload Error", description: error.message, variant: "destructive" }); return null; }
    const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const addItem = async () => {
    const { error } = await supabase.from("gallery_items").insert({ title: "New Image", category: "Bridal", image_url: "/placeholder.svg", sort_order: items.length });
    if (!error) fetchItems();
  };

  const saveItem = async (item: any) => {
    const { error } = await supabase.from("gallery_items").update({ title: item.title, category: item.category, image_url: item.image_url, is_active: item.is_active }).eq("id", item.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved!" }); qc.invalidateQueries({ queryKey: ["gallery_items"] }); }
  };

  const deleteItem = async (id: string) => {
    await supabase.from("gallery_items").delete().eq("id", id);
    fetchItems();
    qc.invalidateQueries({ queryKey: ["gallery_items"] });
  };

  const handleFileChange = async (index: number, file: File) => {
    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], image_url: url };
      setItems(newItems);
      await saveItem({ ...newItems[index] });
    }
    setUploading(false);
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileChange(i, e.target.files[0])}
              className="font-body text-xs w-full"
            />
            <FieldInput label="Title" value={item.title} onChange={(v) => { const s = [...items]; s[i] = { ...s[i], title: v }; setItems(s); }} />
            <FieldInput label="Category" value={item.category} onChange={(v) => { const s = [...items]; s[i] = { ...s[i], category: v }; setItems(s); }} />
            <div className="flex gap-2">
              <button onClick={() => saveItem(item)} className="text-primary hover:opacity-70 font-body text-xs flex items-center gap-1"><Save className="w-3 h-3" /> Save</button>
              <button onClick={() => deleteItem(item.id)} className="text-destructive hover:opacity-70 font-body text-xs flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="flex items-center gap-2 text-primary font-body text-sm hover:opacity-70"><Plus className="w-4 h-4" /> Add Gallery Item</button>
      {uploading && <p className="font-body text-xs text-muted-foreground">Uploading...</p>}
    </div>
  );
};

// ---- Testimonials Tab ----
const TestimonialsTab = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const saveItem = async (item: any) => {
    const { error } = await supabase.from("testimonials").update({ name: item.name, role: item.role, text: item.text, rating: item.rating, is_active: item.is_active }).eq("id", item.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved!" }); qc.invalidateQueries({ queryKey: ["testimonials"] }); }
  };

  const addItem = async () => {
    const { error } = await supabase.from("testimonials").insert({ name: "New Client", text: "Great service!", sort_order: items.length });
    if (!error) fetchItems();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchItems();
    qc.invalidateQueries({ queryKey: ["testimonials"] });
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  return (
    <div className="space-y-4 max-w-2xl">
      {items.map((item, i) => (
        <div key={item.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Name" value={item.name} onChange={(v) => { const s = [...items]; s[i] = { ...s[i], name: v }; setItems(s); }} />
            <FieldInput label="Role" value={item.role || ""} onChange={(v) => { const s = [...items]; s[i] = { ...s[i], role: v }; setItems(s); }} />
          </div>
          <FieldTextarea label="Testimonial" value={item.text} onChange={(v) => { const s = [...items]; s[i] = { ...s[i], text: v }; setItems(s); }} />
          <div className="flex justify-between items-center">
            <FieldInput label="Rating (1-5)" value={String(item.rating || 5)} onChange={(v) => { const s = [...items]; s[i] = { ...s[i], rating: parseInt(v) || 5 }; setItems(s); }} />
            <div className="flex gap-2 mt-5">
              <button onClick={() => saveItem(item)} className="text-primary hover:opacity-70"><Save className="w-4 h-4" /></button>
              <button onClick={() => deleteItem(item.id)} className="text-destructive hover:opacity-70"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-2 text-primary font-body text-sm hover:opacity-70"><Plus className="w-4 h-4" /> Add Testimonial</button>
    </div>
  );
};

// ---- Reusable Components ----
const SettingsCard = ({ title, onSave, saving, children }: { title: string; onSave: () => void; saving: boolean; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <button onClick={onSave} disabled={saving} className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-xs font-medium hover:opacity-90 disabled:opacity-50">
        <Save className="w-3 h-3" /> {saving ? "Saving..." : "Save"}
      </button>
    </div>
    {children}
  </div>
);

const FieldInput = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg bg-background border border-border font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
    />
  </div>
);

const FieldTextarea = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full px-3 py-2 rounded-lg bg-background border border-border font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
    />
  </div>
);

export default AdminDashboard;
