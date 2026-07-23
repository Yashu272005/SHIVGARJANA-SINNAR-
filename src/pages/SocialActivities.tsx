import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';
import { socialActivities } from '../lib/seedData';
import PageHeader from '../components/PageHeader';

export default function SocialActivities() {
  const { lang } = useLanguage();

  return (
    <div>
      <PageHeader title={t.socialAct.title[lang]} subtitle={t.socialAct.subtitle[lang]} image="/images/social-blood.jpg" />

      <section className="py-16 px-4 max-w-4xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 -translate-x-1/2" />

          {socialActivities.map((s, i) => (
            <div
              key={s.id}
              className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-md -translate-x-1/2 z-10" />

              {/* Card */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src={s.image} alt={s.id} className="w-full h-48 object-cover" loading="lazy" />
                  <div className="p-5">
                    <div className="text-xs text-orange-500 font-medium mb-1">
                      {new Date(s.date).toLocaleDateString(lang === 'mr' ? 'mr-IN' : 'en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {t.socialAct[s.id as keyof typeof t.socialAct][lang]}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.description[lang]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
