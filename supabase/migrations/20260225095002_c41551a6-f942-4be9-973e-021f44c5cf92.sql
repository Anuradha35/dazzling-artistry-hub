
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Convenience function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- user_roles RLS: only admins can manage roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.is_admin());

-- ========== SITE SETTINGS ==========
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete settings" ON public.site_settings FOR DELETE TO authenticated USING (public.is_admin());

-- ========== SERVICES ==========
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    icon TEXT DEFAULT 'Sparkles',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE TO authenticated USING (public.is_admin());

-- ========== GALLERY ==========
CREATE TABLE public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Bridal',
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins can insert gallery" ON public.gallery_items FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update gallery" ON public.gallery_items FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete gallery" ON public.gallery_items FOR DELETE TO authenticated USING (public.is_admin());

-- ========== TESTIMONIALS ==========
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Client',
    text TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.is_admin());

-- ========== STORAGE BUCKET ==========
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true);

CREATE POLICY "Anyone can view cms images" ON storage.objects FOR SELECT USING (bucket_id = 'cms-images');
CREATE POLICY "Admins can upload cms images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms-images' AND public.is_admin());
CREATE POLICY "Admins can update cms images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'cms-images' AND public.is_admin());
CREATE POLICY "Admins can delete cms images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cms-images' AND public.is_admin());

-- ========== UPDATED_AT TRIGGER ==========
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
