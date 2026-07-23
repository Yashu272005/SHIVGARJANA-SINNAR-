import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { translations as t } from '../lib/translations';
import PageHeader from '../components/PageHeader';

export default function Contact() {
  const { lang } = useLanguage();
  const { addMessage } = useData();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(form);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all';

  return (
    <div>
      <PageHeader title={t.contact.title[lang]} subtitle={t.contact.subtitle[lang]} image="/images/decoration.jpg" />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{lang === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{t.contact.address[lang]}</div>
                  <div className="text-sm text-gray-500">{t.contact.addressVal[lang]}</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{t.contact.phone[lang]}</div>
                  <a href="tel:+919876543210" className="text-sm text-gray-500 hover:text-orange-600">+91 98765 43210</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{t.contact.email[lang]}</div>
                  <a href="mailto:shivgarjana.sinnar@gmail.com" className="text-sm text-gray-500 hover:text-orange-600">shivgarjana.sinnar@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Emergency contact */}
            <div className="mt-6 p-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl text-white">
              <div className="text-sm text-orange-100 mb-1">{t.footer.emergency[lang]}</div>
              <a href="tel:+919876543210" className="text-2xl font-bold hover:text-orange-200">+91 98765 43210</a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {success && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-emerald-700">{t.contact.success[lang]}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.name[lang]}</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.email[lang]}</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.phone[lang]}</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.subject[lang]}</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.message[lang]}</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Send size={20} />
                {t.contact.submit[lang]}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
