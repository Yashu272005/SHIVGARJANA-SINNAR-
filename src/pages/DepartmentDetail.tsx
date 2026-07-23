import { useParams, Link } from 'react-router-dom';
import { HeartPulse, Briefcase, Landmark, GraduationCap, Phone, User, Users, Target, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';
import { departments } from '../lib/seedData';
import PageHeader from '../components/PageHeader';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HeartPulse, Briefcase, Landmark, GraduationCap,
};

export default function DepartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const dept = departments.find((d) => d.id === id);

  if (!dept) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-gray-500 mb-4">Department not found</p>
        <Link to="/departments" className="text-orange-600 font-semibold">← Back to Departments</Link>
      </div>
    );
  }

  const Icon = iconMap[dept.icon] || Briefcase;
  const deptName = t.departments[dept.id as keyof typeof t.departments][lang];

  return (
    <div>
      <PageHeader title={deptName} subtitle={dept.introduction[lang]} image={dept.image} />

      <section className="py-16 px-4 max-w-5xl mx-auto">
        <Link to="/departments" className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={18} /> {t.departments.back[lang]}
        </Link>

        {/* Introduction */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Icon size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t.departments.introduction[lang]}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">{dept.introduction[lang]}</p>
        </div>

        {/* Objectives */}
        <div className="mb-12 bg-orange-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-orange-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">{t.departments.objectives[lang]}</h2>
          </div>
          <ul className="space-y-2">
            {dept.objectives[lang].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-orange-500 mt-0.5 flex-shrink-0" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Current & Upcoming */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-emerald-500">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-emerald-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">{t.departments.current[lang]}</h3>
            </div>
            <ul className="space-y-2">
              {dept.current[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-emerald-500 mt-1">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-blue-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">{t.departments.upcoming[lang]}</h3>
            </div>
            <ul className="space-y-2">
              {dept.upcoming[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-blue-500 mt-1">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Head & Members */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {dept.head.charAt(0)}
            </div>
            <div className="flex items-center justify-center gap-2 text-orange-600 text-sm font-medium mb-1">
              <User size={14} /> {t.departments.head[lang]}
            </div>
            <div className="text-lg font-bold text-gray-800">{dept.head}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-orange-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">{t.departments.members[lang]}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dept.members.map((m) => (
                <div key={m} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 text-sm font-bold">
                    {m.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.departments.gallery[lang]}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[dept.image, '/images/decoration.jpg', '/images/about-community.jpg'].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md group">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Person */}
        <div className="bg-gray-800 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">{t.departments.contact[lang]}</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-xl font-bold">
              {dept.contactPerson.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-lg">{dept.contactPerson}</div>
              <a href={`tel:${dept.contactPhone}`} className="flex items-center gap-2 text-orange-300 hover:text-orange-200 transition-colors">
                <Phone size={16} /> {dept.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


