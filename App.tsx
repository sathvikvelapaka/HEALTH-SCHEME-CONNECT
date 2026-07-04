
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import SchemeExplorerPage from './pages/SchemeExplorerPage';
import ComparePage from './pages/ComparePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Chatbot from './components/Chatbot';
import { Page, AppState } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

const AppContent = () => {
  const [appState, setAppState] = useState({
    currentPage: Page.HOME,
    selectedHospitalId: null,
    selectedSchemeId: null,
    searchQuery: { city: '', scheme: '' },
  });
  const { t } = useLanguage();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const navigateTo = useCallback((page, params = {}) => {
    setAppState(prev => ({
      ...prev,
      currentPage: page,
      selectedHospitalId: params.hospitalId || null,
      selectedSchemeId: params.schemeId || null,
      searchQuery: params.searchQuery || { city: '', scheme: '' },
    }));
  }, []);
  
  const handleComingSoon = (e) => {
    e.preventDefault();
    alert(t('featureComingSoon'));
  };

  const renderPage = () => {
    switch (appState.currentPage) {
      case Page.HOME:
        return <HomePage onSearch={(query) => navigateTo(Page.SEARCH_RESULTS, { searchQuery: query })} onNavigate={navigateTo} />;
      case Page.SEARCH_RESULTS:
        return <SearchResultsPage searchQuery={appState.searchQuery} onSelectHospital={(hospital) => navigateTo(Page.HOSPITAL_DETAIL, { hospitalId: hospital.id })} />;
      case Page.HOSPITAL_DETAIL:
        return appState.selectedHospitalId ? <HospitalDetailPage hospitalId={appState.selectedHospitalId} onNavigate={navigateTo}/> : <HomePage onSearch={(query) => navigateTo(Page.SEARCH_RESULTS, { searchQuery: query })} onNavigate={navigateTo}/>;
      case Page.SCHEME_EXPLORER:
        return <SchemeExplorerPage />;
      case Page.COMPARE:
        return <ComparePage />;
      case Page.LOGIN:
        return <LoginPage onNavigate={navigateTo} />;
      case Page.SIGNUP:
        return <SignupPage onNavigate={navigateTo} />;
      default:
        return <HomePage onSearch={(query) => navigateTo(Page.SEARCH_RESULTS, { searchQuery: query })} onNavigate={navigateTo}/>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-bg-primary text-text-primary transition-colors duration-300">
      <Header onNavigate={navigateTo} toggleTheme={toggleTheme} currentTheme={theme} />
      <main className="flex-grow">
        {appState.currentPage === Page.HOME || appState.currentPage === Page.LOGIN || appState.currentPage === Page.SIGNUP ? renderPage() : (
            <div className="container mx-auto p-4 md:p-6 mt-20">
                 {renderPage()}
            </div>
        )}
      </main>
      <Chatbot />
      <footer className="bg-bg-dark text-gray-300">
        <div className="container mx-auto py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="footer-section">
                    <h4 className="font-bold text-lg mb-4 font-heading text-white">Health Scheme Connect</h4>
                    <p className="text-gray-400">
                        {t('footerSlogan')}
                    </p>
                </div>
                <div className="footer-section">
                    <h4 className="font-bold text-lg mb-4 font-heading text-white">{t('quickLinks')}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.HOME); }} className="text-gray-400 hover:text-white transition-colors">{t('navHome')}</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.SEARCH_RESULTS, {searchQuery: {city: 'Hyderabad', scheme: 'PMJAY'}}); }} className="text-gray-400 hover:text-white transition-colors">{t('navFindHospital')}</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.SCHEME_EXPLORER); }} className="text-gray-400 hover:text-white transition-colors">{t('navExploreSchemes')}</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.COMPARE); }} className="text-gray-400 hover:text-white transition-colors">{t('navCompare')}</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="font-bold text-lg mb-4 font-heading text-white">{t('forHospitals')}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" onClick={handleComingSoon} className="text-gray-400 hover:text-white transition-colors">{t('partnerWithUs')}</a></li>
                        <li><a href="#" onClick={handleComingSoon} className="text-gray-400 hover:text-white transition-colors">{t('adminLogin')}</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="font-bold text-lg mb-4 font-heading text-white">{t('support')}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" onClick={handleComingSoon} className="text-gray-400 hover:text-white transition-colors">{t('helpCenter')}</a></li>
                        <li><a href="#" onClick={handleComingSoon} className="text-gray-400 hover:text-white transition-colors">{t('privacyPolicy')}</a></li>
                        <li><a href="#" onClick={handleComingSoon} className="text-gray-400 hover:text-white transition-colors">{t('termsOfService')}</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center pt-8 border-t border-gray-700">
                <p className="text-gray-500">{t('copyright')}</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  </AuthProvider>
);

export default App;
