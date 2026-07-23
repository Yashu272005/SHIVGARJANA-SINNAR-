import { Link } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';
import { festivals, socialActivities } from '../lib/seedData';

export default function Home() {
  const { lang, isMr } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-festival.jpg"
            alt="Festival"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-red-900/70 to-gray-900/85" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/30 border border-orange-400/50 text-orange-100 text-sm font-medium mb-6 animate-[fadeIn_0.8s_ease]">
            {isMr ? 'सिन्नर तालुक्यातील अभिमानास्पद संस्था' : 'A proud organization in Sinnar taluka'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 animate-[fadeIn_1s_ease]">
            {t.hero.title[lang]}
          </h1>
          <p className="text-base md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto animate-[fadeIn_1.2s_ease]">
            {t.hero.subtitle[lang]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_1.4s_ease]">

            <Link
              to="/about"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:scale-105 transition-all flex items-center gap-2 justify-center"
            >
              {t.hero.cta2[lang]}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* About preview */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
              {isMr ? 'आमच्याबद्दल' : 'About Us'}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-600 mb-4">
              {isMr ? '"उत्सव फक्त साजरा करण्यासाठी नाही, तर समाज घडवण्यासाठी आहे!"' : 'A Festival is Not Just Meant to Be Celebrated – It\'s Meant to Build a Better Society'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t.about.intro[lang]}</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
            >
              {isMr ? 'अधिक वाचा' : 'Read More'} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative">
            <img
              src="/images/about-community.jpg"
              alt="Community"
              className="rounded-2xl shadow-2xl w-[520px] h-[320px]"
              loading="lazy"
            />

          </div>
        </div>
      </section>

      {/* Festivals preview */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t.events.title[lang]}</h2>
            <p className="text-gray-500">{t.events.subtitle[lang]}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivals.slice(0, 3).map((f) => (
              <div key={f.id} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <img src={f.image} alt={f.id} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{t.events[f.id as keyof typeof t.events][lang]}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/events" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
              {isMr ? 'सर्व उत्सव पाहा' : 'View All Festivals'} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Social activities preview */}
      <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t.socialAct.title[lang]}</h2>
          <p className="text-gray-500">{t.socialAct.subtitle[lang]}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialActivities.slice(0, 4).map((s) => (
            <div key={s.id} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-48 overflow-hidden">
                <img src={s.image} alt={s.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-2">{t.socialAct[s.id as keyof typeof t.socialAct][lang]}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{s.description[lang]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/social" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
            {isMr ? 'सर्व उपक्रम पाहा' : 'View All Activities'} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isMr ? 'सेवेच्या कार्यात सहभागी होण्यास तयार आहात?' : 'Ready to join our service activities?'}
          </h2>
          <p className="text-orange-100 mb-8">
            {isMr ? 'आजच सदस्य बना आणि समाजसेवेत आपले योगदान द्या' : 'Become a member today and contribute to social service'}
          </p>
          <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 font-bold shadow-xl hover:scale-105 transition-transform">
            <UserPlus size={20} />
            {t.hero.cta1[lang]}
          </Link>
        </div>
      </section>
    </div>
  );
}