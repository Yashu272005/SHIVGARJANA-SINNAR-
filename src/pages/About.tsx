import { Target, Eye, Users, Award, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';
import { guide, chief, committee, Member } from '../lib/seedData';
import PageHeader from '../components/PageHeader';

type LanguageKey = keyof Member['name'];

// Picks the name in the current language, falling back to any non-empty language if blank
function resolveName(name: Member['name'], lang: LanguageKey): string {
  const direct = name[lang];
  if (direct && direct.trim() !== '') return direct;
  const fallback = Object.values(name).find((v) => v && v.trim() !== '');
  return fallback ?? '';
}

export default function About() {
  const { lang, isMr } = useLanguage();

  const guideName = resolveName(guide.name, lang);
  const chiefName = resolveName(chief.name, lang);

  return (
    <div>
      <PageHeader title={t.about.title[lang]} subtitle={t.about.title[lang]} image="images/about-community.jpg" />

      {/* Intro */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-9 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {isMr ? 'सेवा हाच धर्म आहे' : 'Service is our religion'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t.about.intro[lang]}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 rounded-xl">
                <Target className="text-orange-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-800 mb-1">{t.about.mission[lang]}</h3>
                <p className="text-sm text-gray-500">{t.about.missionText[lang]}</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <Eye className="text-amber-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-800 mb-1">{t.about.vision[lang]}</h3>
                <p className="text-sm text-gray-500">{t.about.visionText[lang]}</p>
              </div>
            </div>
          </div>
          <img src="/images/about-community.jpg" alt="Decoration" className="rounded-2xl shadow-xl w-[520px] h-[320px]" loading="lazy" />
        </div>
      </section>

      {/* Organization Structure */}
      {/* Organization Structure */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t.org.title[lang]}</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto" />
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/images/committee-group.jpg"
              alt={isMr ? 'शिष्टमंडळ गट छायाचित्र' : 'Committee group photo'}
              className="rounded-2xl shadow-xl w-full max-w-3xl h-auto object-cover mb-4"
              loading="lazy"
            />
            <p className="text-gray-600 text-center max-w-2xl">
              {isMr
                ? 'आमचे मार्गदर्शक, प्रमुख आणि समर्पित शिष्टमंडळ सदस्य एकत्रितपणे संस्थेच्या कार्याचे नेतृत्व करतात.'
                : 'Our guide, chief, and dedicated committee members together lead the work of the organization.'}
            </p>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: isMr ? 'एकत्रीकरण' : 'Unity', text: isMr ? 'समाजातील सर्व घटकांना एकत्र आणणे' : 'Bringing all sections of society together' },
            { icon: Heart, title: isMr ? 'सेवा' : 'Service', text: isMr ? 'निस्वार्थ सेवा हाच आमचा मूलमंत्र' : 'Selfless service is our core principle' },
            { icon: Award, title: isMr ? 'समर्पण' : 'Dedication', text: isMr ? 'समाजासाठी सातत्याने कार्य करणे' : 'Working continuously for society' },
          ].map((v) => (
            <div key={v.title} className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white mx-auto mb-4">
                <v.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}