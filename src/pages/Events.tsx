import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';
import { festivals } from '../lib/seedData';
import PageHeader from '../components/PageHeader';

export default function Events() {
  const { lang } = useLanguage();

  return (
    <div>
      <PageHeader title={t.events.title[lang]} subtitle={t.events.subtitle[lang]} image="/images/festival-dahihandi.png" />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="space-y-8">
          {festivals.map((f, i) => (
            <div
              key={f.id}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <img src={f.image} alt={f.id} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-bold">
                    #{i + 1}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {t.events[f.id as keyof typeof t.events][lang]}
                </h2>
                <div className="w-16 h-1 bg-orange-500 mb-4" />
                <p className="text-gray-600 leading-relaxed">{f.description[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
