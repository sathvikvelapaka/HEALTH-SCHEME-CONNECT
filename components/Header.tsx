
import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { SunIcon, MoonIcon, GlobeIcon, MenuIcon, XIcon, LogoutIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { languages } from '../data/translations';
import { Phone, Shield, HeartPulse, Activity, MapPin, Sparkles, Stethoscope, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: Page, params?: { hospitalId?: string; schemeId?: string; searchQuery?: { city: string; scheme: string; } }) => void;
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, toggleTheme, currentTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode as 'en' | 'hi' | 'te' | 'ta');
    setIsLangOpen(false);
  };

  const handleNavClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
      logout();
      setIsProfileOpen(false);
      onNavigate(Page.HOME);
  }


  const headerClasses = scrolled 
    ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-md py-3 border-b border-gray-100 dark:border-gray-900' 
    : 'bg-white dark:bg-gray-950/90 py-4.5 border-b border-gray-100/50 dark:border-gray-900/50';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo Area */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 relative overflow-hidden transition-transform group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v8" />
                <path d="M9 12h6" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-teal-500/20 opacity-40 blur-md rounded-full group-hover:opacity-70 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className='text-lg md:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading leading-tight flex items-center'>
              Health Scheme<span className="bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent font-black ml-1">Connect</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 tracking-wider mt-0.5 uppercase hidden sm:inline-block">Unified Government Health Portal</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => onNavigate(Page.HOME)} 
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-blue transition-all rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            {t('navHome')}
          </button>
          <button 
            onClick={() => onNavigate(Page.SEARCH_RESULTS, {searchQuery: {city: 'Hyderabad', scheme: 'PMJAY'}})} 
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-blue transition-all rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            {t('navFindHospital')}
          </button>
          <button 
            onClick={() => onNavigate(Page.SCHEME_EXPLORER)} 
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-blue transition-all rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            {t('navExploreSchemes')}
          </button>
          <button 
            onClick={() => onNavigate(Page.COMPARE)} 
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-blue transition-all rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            {t('navCompare')}
          </button>

          {/* Resources Megamenu Toggle */}
          <div className="relative" ref={resourcesRef}>
            <button 
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              onMouseEnter={() => setIsResourcesOpen(true)}
              className={`px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-blue transition-all rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 flex items-center gap-1.5 ${isResourcesOpen ? 'text-primary-blue bg-gray-100/85 dark:bg-gray-800/85' : ''}`}
            >
              Resources
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180 text-primary-blue' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Megamenu Panel */}
            {isResourcesOpen && (
              <div 
                onMouseLeave={() => setIsResourcesOpen(false)}
                className="absolute left-1/2 -translate-x-[45%] mt-4 w-[760px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] z-50 border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-250"
              >
                <div className="p-8 grid grid-cols-3 gap-8">
                  {/* Column 1 */}
                  <div>
                    <h4 className="text-xs font-bold text-primary-blue tracking-widest uppercase mb-4 px-2">Learning Hub</h4>
                    <div className="space-y-1">
                      {[
                        { title: "Blogs", desc: "Read healthcare trends & expert opinions.", icon: "📖" },
                        { title: "Whitepapers", desc: "Access detailed technical analyses.", icon: "📄" },
                        { title: "Case Studies", desc: "Real-world hospital success stories.", icon: "📁" },
                        { title: "FAQs", desc: "Answers to common client questions.", icon: "💬" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors group">
                          <div className="flex gap-2.5 items-start">
                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h4 className="text-xs font-bold text-primary-blue tracking-widest uppercase mb-4 px-2">Media & News</h4>
                    <div className="space-y-1">
                      {[
                        { title: "Our Story", desc: "Discover our journey and purpose.", icon: "🏥" },
                        { title: "Testimonials", desc: "Hear from medical professionals.", icon: "🗣️" },
                        { title: "Certifications", desc: "Our industry standards & quality.", icon: "🎗️" },
                        { title: "Brochure", desc: "Download technical documentations.", icon: "📘" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors group">
                          <div className="flex gap-2.5 items-start">
                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h4 className="text-xs font-bold text-primary-blue tracking-widest uppercase mb-4 px-2">Partners & Community</h4>
                    <div className="space-y-1">
                      {[
                        { title: "Events", desc: "Stay updated on medical webinars.", icon: "📅" },
                        { title: "Become a Partner", desc: "Collaborate to expand innovation.", icon: "🤝" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors group">
                          <div className="flex gap-2.5 items-start">
                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Banner */}
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
                  <p className="text-sm font-bold flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-100"></span>
                    </span>
                    Have a look at our one-stop digital healthcare solution
                  </p>
                  <button 
                    onClick={() => { setIsResourcesOpen(false); setIsDemoModalOpen(true); }}
                    className="bg-white text-primary-blue px-5 py-2 rounded-full text-xs font-extrabold hover:bg-blue-50 shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                  >
                    Book A Demo
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Actions Area */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2.5 rounded-full text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:text-primary-blue border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              aria-label="Change language"
            >
              <GlobeIcon className="w-5 h-5" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in duration-200">
                <ul className="py-1">
                  {languages.map(lang => (
                    <li key={lang.code}>
                      <button
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${language === lang.code ? 'bg-blue-50 dark:bg-blue-900/40 text-primary-blue font-bold' : 'text-text-primary hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      >
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:text-yellow-500 dark:hover:text-yellow-400 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            aria-label="Toggle theme"
          >
            {currentTheme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>

          {/* Book A Demo Main CTA */}
          <button 
            onClick={() => setIsDemoModalOpen(true)}
            className="bg-transparent text-primary-blue border-2 border-primary-blue hover:bg-blue-50/50 dark:hover:bg-blue-900/20 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Book Demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* User Profile / Login */}
          {isAuthenticated && user ? (
               <div className="relative" ref={profileDropdownRef}>
                   <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
                   >
                       <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-gray-200" />
                       <span className="text-sm font-bold text-text-primary max-w-[100px] truncate">{user.name}</span>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                   </button>
                    {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                            <p className="text-sm font-bold text-text-primary">{user.name}</p>
                            <p className="text-xs text-text-muted truncate">{user.email}</p>
                        </div>
                        <ul className="py-1">
                            <li>
                                <button className="w-full text-left px-4 py-3 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium">
                                    {t('myProfile')}
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 font-bold"
                                >
                                    <LogoutIcon className="w-4 h-4" />
                                    {t('logout')}
                                </button>
                            </li>
                        </ul>
                    </div>
                    )}
               </div>
          ) : (
            <button 
                onClick={() => onNavigate(Page.LOGIN)}
                className="bg-primary-blue text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 ring-offset-2 focus:ring-2 focus:ring-primary-blue"
            >
                {t('login')}
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
           <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {currentTheme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-text-primary bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors active:scale-90"
          >
            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-2xl animate-in slide-in-from-top-5 duration-300 z-40 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
             
             {isAuthenticated && user && (
                 <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full bg-gray-200 shadow-sm" />
                      <div>
                          <p className="font-bold text-text-primary">{user.name}</p>
                          <p className="text-sm text-text-muted">{user.email}</p>
                      </div>
                 </div>
             )}

             <nav className="flex flex-col space-y-2">
                <button onClick={() => handleNavClick(() => onNavigate(Page.HOME))} className="text-left text-xl font-bold text-text-primary py-4 border-b border-gray-100 dark:border-gray-800 hover:text-primary-blue transition-colors">{t('navHome')}</button>
                <button onClick={() => handleNavClick(() => onNavigate(Page.SEARCH_RESULTS, {searchQuery: {city: 'Hyderabad', scheme: 'PMJAY'}}))} className="text-left text-xl font-bold text-text-primary py-4 border-b border-gray-100 dark:border-gray-800 hover:text-primary-blue transition-colors">{t('navFindHospital')}</button>
                <button onClick={() => handleNavClick(() => onNavigate(Page.SCHEME_EXPLORER))} className="text-left text-xl font-bold text-text-primary py-4 border-b border-gray-100 dark:border-gray-800 hover:text-primary-blue transition-colors">{t('navExploreSchemes')}</button>
                <button onClick={() => handleNavClick(() => onNavigate(Page.COMPARE))} className="text-left text-xl font-bold text-text-primary py-4 border-b border-gray-100 dark:border-gray-800 hover:text-primary-blue transition-colors">{t('navCompare')}</button>
                
                {/* Resources Collapsible for Mobile */}
                <div className="border-b border-gray-100 dark:border-gray-800 py-4">
                  <button 
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className="w-full flex justify-between items-center text-xl font-bold text-text-primary hover:text-primary-blue transition-colors"
                  >
                    <span>Resources</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isMobileResourcesOpen ? 'rotate-180 text-primary-blue' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMobileResourcesOpen && (
                    <div className="mt-4 pl-4 space-y-3 animate-in fade-in duration-200">
                      {["Blogs", "Whitepapers", "Case Studies", "FAQs", "Our Story", "Testimonials", "Become a Partner"].map((res, i) => (
                        <button 
                          key={i} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm font-semibold text-text-secondary hover:text-primary-blue py-1.5"
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
             </nav>
             
             <div className="pt-2">
                <p className="text-[10px] text-text-muted mb-4 font-bold uppercase tracking-widest">Language</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map(lang => (
                     <button
                       key={lang.code}
                       onClick={() => { changeLanguage(lang.code as any); setIsMobileMenuOpen(false); }}
                       className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${language === lang.code ? 'bg-primary-blue text-white border-primary-blue shadow-md' : 'bg-transparent text-text-primary border-gray-200 dark:border-gray-700 hover:border-primary-blue/30'}`}
                     >
                       {lang.name}
                     </button>
                  ))}
                </div>
             </div>

             <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsDemoModalOpen(true); }}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-500/20 active:scale-95 transition-transform text-center"
             >
                Book A Demo
             </button>

            {isAuthenticated ? (
                 <button 
                    onClick={() => handleNavClick(handleLogout)}
                    className="w-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-4 rounded-2xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/50"
                >
                    <LogoutIcon className="w-5 h-5" />
                    {t('logout')}
                </button>
            ) : (
                <button 
                    onClick={() => handleNavClick(() => onNavigate(Page.LOGIN))}
                    className="w-full bg-primary-blue text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
                >
                    {t('login')}
                </button>
            )}
          </div>
        </div>
      )}

      {/* Demo Booking Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-8 pb-4 relative bg-gradient-to-br from-blue-50/50 to-indigo-50/20 dark:from-gray-900/50 dark:to-gray-800/20 border-b border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <span className="text-primary-blue font-bold tracking-widest text-xs uppercase bg-blue-100/60 dark:bg-blue-900/40 px-4 py-1.5 rounded-full mb-3 inline-block">Consult Our Experts</span>
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading tracking-tight">Best HIMS Software For Your Hospital</h3>
              <p className="text-sm text-text-secondary mt-1 font-medium">Optimal resource efficiency with our HMIS software</p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your demo request has been received. Our team will contact you within 2 hours."); setIsDemoModalOpen(false); }} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider pl-1">Doctor / Hospital Name</label>
                  <input required type="text" placeholder="e.g. Dr. Verma / City Clinic" className="w-full p-3.5 border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-sm font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider pl-1">Speciality</label>
                  <select className="w-full p-3.5 border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-sm font-semibold cursor-pointer">
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Pediatrics</option>
                    <option>Orthopedics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider pl-1">Mobile Number</label>
                  <div className="flex rounded-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden bg-gray-50/50 dark:bg-gray-900 focus-within:border-primary-blue focus-within:ring-4 focus-within:ring-primary-blue/5">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3.5 flex items-center border-r border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-500">🇮🇳 +91</span>
                    <input required type="tel" pattern="[0-9]{10}" placeholder="9876543210" className="w-full p-3.5 bg-transparent focus:outline-none text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider pl-1">Business Type</label>
                  <select className="w-full p-3.5 border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-sm font-semibold cursor-pointer">
                    <option>Single Clinic</option>
                    <option>Multi-Speciality Hospital</option>
                    <option>Diagnostic Lab</option>
                    <option>Pharmacy Chain</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider pl-1">Email ID</label>
                <input required type="email" placeholder="contact@hospital.com" className="w-full p-3.5 border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-sm font-medium" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider pl-1">Your Message (Optional)</label>
                <textarea rows={2} placeholder="Write any specific requirements here..." className="w-full p-3.5 border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-sm font-medium resize-none"></textarea>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input required id="agree" type="checkbox" className="mt-1 accent-primary-blue h-4 w-4" />
                <label htmlFor="agree" className="text-xs text-text-muted font-medium cursor-pointer select-none">
                  I have read and agree to the Privacy Policy. I authorize Health Scheme Connect to contact me via phone, SMS, and WhatsApp.
                </label>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-primary-blue text-white font-extrabold text-base py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Start Free Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
