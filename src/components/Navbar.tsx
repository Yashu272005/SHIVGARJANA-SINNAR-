import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';

export default function Navbar() {
  const { lang, toggle, isMr } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { to: '/', label: t.nav.home[lang] },
    { to: '/about', label: t.nav.about[lang] },
    { to: '/departments', label: t.nav.departments[lang] },
    { to: '/events', label: t.nav.events[lang] },
    { to: '/social', label: t.nav.social[lang] },
    { to: '/members', label: t.nav.members[lang] },

    { to: '/gallery', label: t.nav.gallery[lang] },
    { to: '/contact', label: t.nav.contact[lang] },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
              शि
            </div>
            <div className="hidden sm:block">
              <div className="text-sm md:text-base font-bold text-orange-700 leading-tight">
                {isMr ? 'शिवगर्जना सिन्नर ' : 'Shivgarjana Sinnar'}
              </div>
              <div className="text-xs text-gray-500 leading-tight">
                {isMr ? 'दहीहंडी समिती, सिन्नर' : 'Dahihandi Samiti, Sinnar'}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/admin"
              className="ml-1 flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <Shield size={14} />
              {t.nav.admin[lang]}
            </Link>
            <button
              onClick={toggle}
              className="ml-1 flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <Globe size={14} />
              {isMr ? 'EN' : 'मराठी'}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium bg-orange-500 text-white"
            >
              <Globe size={14} />
              {isMr ? 'EN' : 'मरा'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-700 hover:bg-orange-50"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-gray-100 py-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-700 hover:bg-orange-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-800 text-white"
              >
                <Shield size={16} />
                {t.nav.admin[lang]}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
