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
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t.org.title[lang]}</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto" />
          </div>

          {/* Guide */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
              {guideName.charAt(0)}
            </div>
            <div className="text-center">
              <div className="text-sm text-purple-600 font-medium">{t.org.guide[lang]}</div>
              <div className="text-xl font-bold text-gray-800">{guideName}</div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center mb-10">
            <div className="w-1 h-12 bg-orange-300" />
          </div>

          {/* Chief */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
              {chiefName.charAt(0)}
            </div>
            <div className="text-center">
              <div className="text-sm text-orange-600 font-medium">{t.org.chief[lang]}</div>
              <div className="text-xl font-bold text-gray-800">{chiefName}</div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center mb-10">
            <div className="w-1 h-12 bg-orange-300" />
          </div>

          {/* Committee */}
          <div>
            <h3 className="text-center text-xl font-bold text-gray-800 mb-6">{t.org.committee[lang]}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {committee.map((member, i) => {
                const memberName = resolveName(member.name, lang);
                return (
                  <div
                    key={`${memberName}-${i}`}
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-lg font-bold mb-2">
                      {memberName.charAt(0)}
                    </div>
                    <div className="text-sm font-medium text-gray-700 text-center">{memberName}</div>
                  </div>
                );
              })}
            </div>
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