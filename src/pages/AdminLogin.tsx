import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { translations as t } from '../lib/translations';

export default function AdminLogin() {
  const { lang } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError(t.admin.errCreds[lang]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t.admin.login[lang]}</h1>
            <p className="text-sm text-gray-500 mt-1">Shivgarjana Mitra Mandal</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.username[lang]}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.password[lang]}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              {t.admin.signIn[lang]}
            </button>
          </form>

          <div className="mt-6 p-3 bg-orange-50 rounded-lg text-center">
            <p className="text-xs text-gray-500">
              Demo: <span className="font-mono font-bold text-orange-600">admin</span> / <span className="font-mono font-bold text-orange-600">sgmm@2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
