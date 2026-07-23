import { Link } from 'react-router-dom';
import { HeartPulse, Briefcase, Landmark, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations as t } from '../lib/translations';
import { departments } from '../lib/seedData';
import PageHeader from '../components/PageHeader';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HeartPulse, Briefcase, Landmark, GraduationCap,
};

const colors = [
  'from-rose-500 to-pink-600',
  'from-blue-500 to-indigo-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
];

export default function Departments() {
  const { lang } = useLanguage();

  return (
    <div>
      <PageHeader title={t.departments.title[lang]} subtitle={t.departments.subtitle[lang]} image="/images/social-health.jpg" />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, i) => {
            const Icon = iconMap[dept.icon] || Briefcase;
            return (
              <Link
                key={dept.id}
                to={`/departments/${dept.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`h-32 bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center relative overflow-hidden`}>
                  <Icon size={48} className="text-white/90 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {t.departments[dept.id as keyof typeof t.departments][lang]}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">{dept.introduction[lang]}</p>
                  <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    {lang === 'mr' ? 'अधिक वाचा' : 'Read More'} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
