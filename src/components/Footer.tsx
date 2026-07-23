import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';

export default function Footer() {
  const { lang, isMr } = useLanguage();

  const quickLinks = [
    { to: '/about', label: t.nav.about[lang] },
    { to: '/departments', label: t.nav.departments[lang] },
    { to: '/events', label: t.nav.events[lang] },
    { to: '/social', label: t.nav.social[lang] },
    { to: '/join', label: t.nav.join[lang] },
    { to: '/gallery', label: t.nav.gallery[lang] },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                शि
              </div>
              <div className="font-bold text-white">
                {isMr ? 'शिवगर्जना मित्र मंडळ' : 'Shivgarjana Mitra Mandal'}
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{t.footer.about[lang]}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">{t.footer.quickLinks[lang]}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">{t.footer.social[lang]}</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>{t.contact.addressVal[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>shivgarjana.sinnar@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">{t.footer.emergency[lang]}</h3>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors">
                <Phone size={16} />
                +91 98765 43210
              </a>
              <a href="tel:+919876543211" className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors">
                <Phone size={16} />
                +91 98765 43211
              </a>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">{isMr ? 'प्रमुख' : 'Chief'}</div>
                <div className="text-sm font-medium text-white">Vikas Santosh Londhe</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {isMr ? 'शिवगर्जना, सिन्नर' : 'Shivgarjana, Sinnar'}. {t.footer.rights[lang]}.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {t.footer.developed[lang]} <Heart size={12} className="text-orange-500" /> {t.footer.dev[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
