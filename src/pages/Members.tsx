import { useState } from 'react';
import { Search, UserPlus, Users, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { translations as t } from '../lib/translations';
import { guide, chief, committee, Member } from '../lib/seedData';
import PageHeader from '../components/PageHeader';

type LanguageKey = keyof Member['name'];
type Tab = 'members' | 'join';

// Picks the name in the current language, falling back to any non-empty language if blank
function resolveName(name: Member['name'], lang: LanguageKey): string {
  const direct = name[lang];
  if (direct && direct.trim() !== '') return direct;
  const fallback = Object.values(name).find((v) => v && v.trim() !== '');
  return fallback ?? '';
}

function Avatar({ member, size = 'lg', lang }: { member: Member; size?: 'lg' | 'md'; lang: LanguageKey }) {
  const dimensions = size === 'lg' ? 'w-55 h-50 text-8xl' : 'w-30 h-30 text-3xl';
  const displayName = resolveName(member.name, lang);
  const initial = displayName.charAt(0) || '?';

  if (member.photo) {
    return (
      <div className={`${dimensions} aspect-square object-cover overflow-hidden shadow-xl mb-3 border-2 border-white shrink-0 bg-gray-100`}>
        <img
          src={member.photo}
          alt={displayName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-orange-400', 'to-amber-500', 'text-white', 'font-bold');
              parent.textContent = initial;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${dimensions} rounded-full object-cover bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-xl mb-3 shrink-0`}>
      {initial}
    </div>
  );
}

function MembersSection({ lang }: { lang: LanguageKey }) {
  const [query, setQuery] = useState('');

  const filtered = committee.filter((m) => {
    const name = resolveName(m.name, lang);
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.members.search[lang]}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
          />
        </div>
      </div>

      {/* Guide */}
      <div className="flex flex-col items-center mb-8">
        <Avatar member={guide} size="lg" lang={lang} />
        <div className="text-sm text-purple-600 font-medium">{t.org.guide[lang]}</div>
        <div className="text-lg font-bold text-gray-800">{resolveName(guide.name, lang)}</div>
        <div className="text-sm text-gray-500 text-center max-w-xs">{guide.info[lang]}</div>
      </div>

      {/* Chief */}
      <div className="flex flex-col items-center mb-8">
        <Avatar member={chief} size="lg" lang={lang} />
        <div className="text-sm text-orange-600 font-medium">{t.org.chief[lang]}</div>
        <div className="text-lg font-bold text-gray-800">{resolveName(chief.name, lang)}</div>
        <div className="text-sm text-gray-500 mt-1 text-center max-w-xs">{chief.info[lang]}</div>
      </div>

      {/* Committee */}
      <h3 className="text-center text-xl font-bold text-gray-800 mb-6">{t.org.committee[lang]}</h3>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">{t.members.noResults[lang]}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((member, idx) => {
            const memberName = resolveName(member.name, lang);

            return (
              <div
                key={`${memberName}-${idx}`}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <Avatar member={member} size="md" lang={lang} />
                <div className="text-sm font-medium text-gray-700 text-center">{memberName}</div>
                <div className="text-xs text-gray-500 text-center mt-1">{member.info[lang]}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function JoinSection({ lang }: { lang: LanguageKey }) {
  const { addMember } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) errs.name = t.join.errName[lang];
    const phoneClean = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(phoneClean)) errs.phone = t.join.errPhone[lang];
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addMember(name.trim(), phone.replace(/\D/g, ''));
    setSuccess(true);
    setName('');
    setPhone('');
    setErrors({});
    setTimeout(() => setSuccess(false), 6000);
  };

  const inputCls = 'w-full px-4 py-3 pl-12 rounded-xl border focus:ring-2 outline-none transition-all';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={24} />
            <p className="text-sm text-emerald-700">{t.join.success[lang]}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.join.name[lang]} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.join.namePh[lang]}
                className={`${inputCls} ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100'}`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.join.phone[lang]} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.join.phonePh[lang]}
                maxLength={10}
                className={`${inputCls} ${errors.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100'}`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.phone}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg"
          >
            <UserPlus size={22} />
            {t.join.submit[lang]}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Members() {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<Tab>('members');

  return (
    <div>
      <PageHeader
        title={tab === 'members' ? t.members.title[lang] : t.join.title[lang]}
        subtitle={tab === 'members' ? t.members.subtitle[lang] : t.join.subtitle[lang]}
        image="/images/logo.png"
      />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Tab toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setTab('members')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${tab === 'members'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Users size={18} />
              {t.members.title[lang]}
            </button>
            <button
              onClick={() => setTab('join')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${tab === 'join'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <UserPlus size={18} />
              {t.join.title[lang]}
            </button>
          </div>
        </div>

        {tab === 'members' ? <MembersSection lang={lang} /> : <JoinSection lang={lang} />}
      </section>
    </div>
  );
}