import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getSiteSettings } from '../api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    logo_url: null,
    site_title: 'جبهة وادي هور الديمقراطية',
  });
  const location = useLocation();

  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.log('Using default site settings');
      }
    };
    loadSiteSettings();
  }, []);

  const navigation = [
    { name: 'اتصل بنا', href: '/contact' },
    { name: 'المعرض', href: '/gallery' },
    { name: 'الأخبار', href: '/news' },
    { name: 'المدونة', href: '/blog' },
    { name: 'الأثر', href: '/impact' },
    { name: 'الزغاوة', href: '/programs' },
    { name: 'عن الجبهة', href: '/about' },
    { name: 'الرئيسية', href: '/' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Hamburger - Left Side (Mobile) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation - Left Side */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-800 hover:text-[#d78525] font-medium transition-colors duration-200 ${
                  isActive(item.href) ? 'text-[#d78525] border-b-2 border-[#d78525] pb-1' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logo + Title - Right Side */}
          <div className="flex items-center gap-3">
            <h1 
              className="text-lg md:text-xl font-bold text-gray-800 text-right" 
              dir="rtl"
            >
              {siteSettings.site_title}
            </h1>
            <img 
              src="/images/logo-preview.png" 
              alt="شعار الجبهة" 
              className="h-9 w-auto object-contain md:h-10"
            />
          </div>

        </div>

        {/* ==================== MOBILE MENU - Home First ==================== */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {[...navigation].reverse().map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-800 hover:text-[#d78525] font-medium py-3 border-b border-gray-100 last:border-0 text-right"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;