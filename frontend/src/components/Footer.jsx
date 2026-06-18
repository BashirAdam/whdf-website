import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { api, getSiteSettings, getPublicSiteContent } from '../api';

const Footer = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [siteSettings, setSiteSettings] = useState({
    facebook_url: null,
    instagram_url: null,
    youtube_url: null,
    twitter_url: null,
    linkedin_url: null
  });

  const [siteContent, setSiteContent] = useState({});

  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.log('Using default social media settings');
      }
    };

    const loadContent = async () => {
      try {
        const backendContent = await getPublicSiteContent();
        if (backendContent.content) {
          setSiteContent(backendContent.content);
        }
      } catch (error) {
        console.log('Footer could not load site content');
      }
    };

    loadSiteSettings();
    loadContent();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setLoading(true);
    try {
      const response = await api.subscribeNewsletter(newsletterEmail);
      toast({ title: "نجح", description: response.message });
      setNewsletterEmail('');
    } catch (error) {
      let errorMessage = "فشل في الاشتراك. حاول مرة أخرى.";
      if (error.response?.data?.detail) {
        errorMessage = typeof error.response.data.detail === 'string' 
          ? error.response.data.detail 
          : errorMessage;
      }
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <footer className="bg-[#4d261a] text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo + Description + Contact */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4 gap-3">
              <img 
                src="/images/logo-preview.png" 
                alt="شعار الجبهة" 
                className="h-10 w-auto object-contain"
              />
              <p className="text-lg font-bold">
                {siteContent.footer?.tagline || "جبهة وادي هور الديمقراطية"}
              </p>
            </Link>

            <p className="text-white/90 mb-6 leading-relaxed">
              {siteContent.footer?.description || 
                "حركة ثقافية ثورية سياسية سلمية تهدف لإقامة إقليم دار زغاوة (إقليم بيربي) كمركزية ثقافية وسياسية لشعب الزغاوة في السودان."}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  {siteContent.contact?.contactInfo?.address || "السودان - دارفور - وادي هور"}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  {siteContent.contact?.contactInfo?.email || "Ahosman3000@gmail.com"}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  {siteContent.contact?.contactInfo?.phone || "+249 XXX XXX XXX"}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {siteSettings.facebook_url && (
                <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {siteSettings.twitter_url && (
                <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {siteSettings.instagram_url && (
                <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {siteSettings.youtube_url && (
                <a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              )}
              {siteSettings.linkedin_url && (
                <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-white/90">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors">عن الجبهة</Link></li>
              <li><Link to="/programs" className="hover:text-yellow-400 transition-colors">الزغاوة</Link></li>
              <li><Link to="/gallery" className="hover:text-yellow-400 transition-colors">المعرض</Link></li>
              <li><Link to="/news" className="hover:text-yellow-400 transition-colors">الأخبار</Link></li>
              <li><Link to="/blog" className="hover:text-yellow-400 transition-colors">المدونة</Link></li>
              
              <li>
  <a
    href="/documents/manifesto.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-yellow-400 transition-colors"
  >
    المانيفستو
  </a>
</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">اشترك معنا</h3>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">
              اشترك في نشرتنا البريدية ليصلك كل جديد عن برامجنا وأخبارنا
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="bg-white border-gray-700 text-black placeholder:text-gray-500 text-right"
              />
              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#d78525] hover:bg-[#b86f1d] text-black font-medium"
              >
                {loading ? 'جاري الاشتراك...' : 'اشتراك'}
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              {siteContent.footer?.copyright || "© 2026 جبهة وادي هور الديمقراطية. جميع الحقوق محفوظة."}
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-yellow-400 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">شروط الخدمة</a>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;