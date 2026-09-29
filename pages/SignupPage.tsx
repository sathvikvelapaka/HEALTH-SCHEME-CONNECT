
import React, { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MailIcon, LockIcon, UserIcon } from '../components/icons';

interface SignupPageProps {
  onNavigate: (page: Page) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
        setError(t('passwordsDoNotMatch'));
        return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      onNavigate(Page.HOME);
    } catch (err: any) {
        if (err.message === 'EMAIL_EXISTS' || err.message?.toLowerCase().includes('already exists')) {
            setError(t('emailAlreadyExists') || 'User with this email already exists');
        } else {
            setError(err.message || 'An error occurred. Please try again.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden py-10">
       {/* Background Blobs */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute bottom-[20%] left-[5%] w-[50%] h-[50%] bg-green-200/30 dark:bg-green-900/20 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
       </div>

      <div className="w-full max-w-md p-4 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading mb-2">{t('createAccount')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('signupSubtitle')}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium flex items-center animate-in shake">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
               {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
             <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">{t('fullName')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-blue/50 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">{t('email')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-blue/50 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">{t('password')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-blue/50 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
             <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">{t('confirmPassword')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-blue/50 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-green-500/30 text-sm font-bold text-white bg-gradient-to-r from-primary-green to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-70 disabled:cursor-not-allowed transform transition-all hover:-translate-y-1 active:scale-95 mt-4"
            >
              {isLoading ? (
                 <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('signingUp')}
                 </div>
              ) : (
                t('signUp')
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('alreadyHaveAccount')}{' '}
              <button
                onClick={() => onNavigate(Page.LOGIN)}
                className="font-bold text-primary-blue hover:text-blue-700 hover:underline transition-colors"
              >
                {t('signIn')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
