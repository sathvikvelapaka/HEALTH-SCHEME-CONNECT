import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { MOCK_SCHEMES } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { HOME_SLIDE_IMAGES } from '../data/imageAssets';
import { 
  Heart, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  Star, 
  Globe, 
  Users, 
  FileText, 
  ChevronRight, 
  PhoneCall, 
  Layers, 
  Award, 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle,
  Building2
} from 'lucide-react';

interface HomePageProps {
  onSearch: (query: { city: string; scheme: string }) => void;
  onNavigate: (page: Page, params?: { searchQuery?: { city: string; scheme: string; } }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch, onNavigate }) => {
  const [city, setCity] = useState('Hyderabad');
  const [scheme, setScheme] = useState('PMJAY');
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useLanguage();

  const slides = [
    {
      badge: "Ayushman Bharat & PMJAY",
      title: "Unified National Health Schemes",
      highlight: "Hub",
      subtitle: "Instantly discover empanelled multi-speciality hospitals, verify live bed availability, and navigate zero out-of-pocket treatments under leading government schemes.",
      img: HOME_SLIDE_IMAGES.SLIDE_1,
      stat: "51 Schemes Supported"
    },
    {
      badge: "Verified Cashless Network",
      title: "Compare Costs & Scheme",
      highlight: "Coverage",
      subtitle: "Search established private and government hospital networks. Compare pre-negotiated package limits and eliminate hidden medical bills for your family.",
      img: HOME_SLIDE_IMAGES.SLIDE_2,
      stat: "60+ Major Network Centers"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, scheme });
  };

  const specialities = [
    { title: "Cardiology", icon: "🫀", desc: "Advanced interventional cardiac surgeries, bypass procedures, and state-of-the-art heart trauma units.", color: "from-rose-500/10 to-rose-600/5 hover:border-rose-500/30", textColor: "text-rose-600 dark:text-rose-400", badge: "24/7 Cardiac Care" },
    { title: "Neurology", icon: "🧠", desc: "Comprehensive acute stroke management, epilepsy support, and advanced computer-aided neurosurgery.", color: "from-blue-500/10 to-blue-600/5 hover:border-blue-500/30", textColor: "text-blue-600 dark:text-blue-400", badge: "Stroke Center" },
    { title: "Gastroenterology", icon: "🧪", desc: "Expert endoscopic therapies, liver and bile duct transplants, and therapeutic gastrointestinal procedures.", color: "from-emerald-500/10 to-emerald-600/5 hover:border-emerald-500/30", textColor: "text-emerald-600 dark:text-emerald-400", badge: "Transplant Unit" },
    { title: "Oncology", icon: "🎗️", desc: "Targeted immunotherapy, modern linear-accelerator radiotherapy, and comprehensive cancer care complexes.", color: "from-purple-500/10 to-purple-600/5 hover:border-purple-500/30", textColor: "text-purple-600 dark:text-purple-400", badge: "Precision Oncology" },
    { title: "Orthopedics", icon: "🦴", desc: "Minimal access robotic joint replacement, computer-navigated spine surgery, and emergency fracture repair.", color: "from-amber-500/10 to-amber-600/5 hover:border-amber-500/30", textColor: "text-amber-600 dark:text-amber-400", badge: "Robotic Ortho" },
    { title: "Robotic Surgery", icon: "🤖", desc: "DaVinci robotic-assisted precision urological, thoracic, and general laparoscopic interventions.", color: "from-indigo-500/10 to-indigo-600/5 hover:border-indigo-500/30", textColor: "text-indigo-600 dark:text-indigo-400", badge: "Next-Gen Surgery" }
  ];

  const partnerLogos = [
    { name: "Apollo Hospitals", icon: "🏥", tag: "Apollo Network" },
    { name: "Fortis Healthcare", icon: "🟢", tag: "Fortis Care" },
    { name: "Max Healthcare", icon: "🔵", tag: "Max Group" },
    { name: "Manipal Hospitals", icon: "🔴", tag: "Manipal" },
    { name: "AIG Hospitals", icon: "🔥", tag: "AIG Sciences" },
    { name: "Medanta Medicity", icon: "🌟", tag: "Medanta" }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-bg-primary">
      
      {/* 1. HERO SECTION WITH MODERN GEOMETRIC BACKGROUND & AMBIENT GLOWS */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-green/10 dark:bg-primary-green/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core Copywriting / Hero Title */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Dynamic Tag/Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 text-xs font-bold text-blue-600 dark:text-blue-400">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-500" />
                <span className="uppercase tracking-widest text-[10px] font-extrabold">National Digital Health Portal</span>
              </div>

              {/* Headline with Thin-to-Black Contrast */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] font-heading">
                  {slides[activeSlide].title}{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-black block sm:inline">
                    {slides[activeSlide].highlight}
                  </span>
                </h1>
                
                {/* Clean Subtitle */}
                <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed font-medium">
                  {slides[activeSlide].subtitle}
                </p>
              </div>

              {/* Dynamic Live Status & Action Button */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2.5 rounded-2xl shadow-sm text-xs font-bold text-text-secondary flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{slides[activeSlide].stat}</span>
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2.5 rounded-2xl shadow-sm text-xs font-bold text-text-secondary flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-500" />
                  <span>Real-time Beds Live</span>
                </div>
              </div>
              
              {/* Slide Navigator Dots */}
              <div className="flex gap-2.5 pt-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Right Column: Layered Premium Healthcare Visuals */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
                {/* Dynamic Image Slideshow with smooth fade */}
                {slides.map((slide, idx) => (
                  <div 
                    key={idx} 
                    className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                  >
                    <img 
                      src={slide.img} 
                      alt={slide.title} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                  </div>
                ))}

                {/* Floating Interactive Glassmorphic Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 dark:bg-gray-950/35 backdrop-blur-md border border-white/10 p-5 rounded-[1.75rem] text-white flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">Live Active Empanelments</p>
                    <p className="text-xl font-black font-heading tracking-tight mt-0.5">1,200+ Hospitals</p>
                  </div>
                  <div className="bg-white/20 p-2.5 rounded-xl text-white">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Additional Decorative Ring */}
              <div className="absolute -z-10 -right-4 -bottom-4 w-72 h-72 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-full pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING SLEEK INTEGRATED SEARCH WIDGET */}
      <section className="relative z-30 -mt-8 sm:-mt-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white dark:bg-gray-900 rounded-[2.25rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-800">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">Cashless Network</span>
                <h2 className="text-lg sm:text-xl font-black text-text-primary font-heading tracking-tight">Find Empanelled Hospitals & Check Bed Vacancies</h2>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3 py-1.5 rounded-xl border border-teal-100/50 dark:border-teal-900/30">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>2,490 Verified Beds Online</span>
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Location Select */}
              <div className="space-y-2">
                <label htmlFor="city" className="text-text-muted text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> {t('city')}
                </label>
                <div className="relative">
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-4 pl-5 pr-10 appearance-none border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 text-text-primary font-bold text-sm transition-all cursor-pointer"
                  >
                    <option value="Hyderabad">Hyderabad (Banjara Hills, Gachibowli)</option>
                    <option value="Bangalore">Bangalore (Whitefield, Indiranagar)</option>
                    <option value="Delhi">Delhi / NCR (Dwarka, Saket)</option>
                    <option value="Mumbai">Mumbai (Colaba, Bandra)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </span>
                </div>
              </div>

              {/* Speciality Department */}
              <div className="space-y-2">
                <label htmlFor="speciality" className="text-text-muted text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-500" /> Speciality Department
                </label>
                <div className="relative">
                  <select
                    id="speciality"
                    className="w-full p-4 pl-5 pr-10 appearance-none border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 text-text-primary font-bold text-sm transition-all cursor-pointer"
                  >
                    <option>Cardiac Sciences (Cardiology)</option>
                    <option>Neurology & Stroke</option>
                    <option>Gastroenterology & GI Surgery</option>
                    <option>Orthopedics & Joint Replacement</option>
                    <option>Oncology (Cancer Institute)</option>
                    <option>Robotic Assisted Surgery</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </span>
                </div>
              </div>

              {/* Health Scheme Input */}
              <div className="space-y-2">
                <label htmlFor="scheme" className="text-text-muted text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> {t('healthScheme')}
                </label>
                <div className="relative flex gap-3">
                  <div className="relative flex-grow">
                    <select
                      id="scheme"
                      value={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                      className="w-full p-4 pl-5 pr-10 appearance-none border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 text-text-primary font-bold text-sm transition-all cursor-pointer"
                    >
                      {MOCK_SCHEMES.slice(0, 5).map(s => (
                        <option key={s.id} value={s.code}>{s.short_name || s.code} - {s.name}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </span>
                  </div>
                  
                  {/* Modern Trigger Button */}
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 rounded-2xl transition-all shadow-md shadow-blue-500/10 active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Search Network</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. REFINED BENTO QUICK ACCESS CARDS */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div 
              className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 hover:-translate-y-1.5 transition-all group flex flex-col justify-between cursor-pointer" 
              onClick={() => alert("Scheme Eligibility Guide:\n- Low-income families with a BPL, White, Yellow, or Orange Ration Card qualify for 100% cashless treatment up to ₹5 Lakhs.\n- Families listed in the SECC-2011 database qualify instantly for central PMJAY.\n- State Government employees & pensioners carry specialized health benefits without income caps.")}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 text-lg font-bold group-hover:scale-105 transition-transform">
                  📋
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-text-primary font-heading tracking-tight">Eligibility Checker</h4>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-semibold">Verify which national or state-level government schemes cover your family details.</p>
                </div>
              </div>
              <span className="text-[11px] font-black text-blue-600 mt-5 flex items-center gap-1 group-hover:underline">Check Eligibility <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>

            {/* Card 2 */}
            <div 
              className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 hover:-translate-y-1.5 transition-all group flex flex-col justify-between cursor-pointer" 
              onClick={() => { onNavigate(Page.SEARCH_RESULTS, { searchQuery: { city: 'Hyderabad', scheme: 'PMJAY' } }); }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 text-lg font-bold group-hover:scale-105 transition-transform">
                  🛏️
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-text-primary font-heading tracking-tight">Real-Time Beds</h4>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-semibold">Check current vacant general & ICU beds reserved specifically for scheme patients.</p>
                </div>
              </div>
              <span className="text-[11px] font-black text-teal-600 mt-5 flex items-center gap-1 group-hover:underline">Track Live Beds <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>

            {/* Card 3 */}
            <div 
              className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 hover:-translate-y-1.5 transition-all group flex flex-col justify-between cursor-pointer" 
              onClick={() => { onNavigate(Page.SCHEME_EXPLORER); }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 text-lg font-bold group-hover:scale-105 transition-transform">
                  🛡️
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-text-primary font-heading tracking-tight">Aarogyasri & PMJAY Desk</h4>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-semibold">Instant pre-authorization guidelines and cashless cover limits per procedure.</p>
                </div>
              </div>
              <span className="text-[11px] font-black text-amber-600 mt-5 flex items-center gap-1 group-hover:underline">Check Guidelines <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>

            {/* Card 4 */}
            <div 
              className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 hover:-translate-y-1.5 transition-all group flex flex-col justify-between cursor-pointer" 
              onClick={() => alert("Cashless Pre-Authorization Guide:\n1. Show your Scheme Card (like PMJAY, Aarogyasri, or Employee Health Card) at the hospital's empanelled desk.\n2. The coordinator uploads medical documents and prescription details.\n3. Government/Scheme approvers process and clear the request cashless in 2-4 hours.\n- Zero cash deposit is required!")}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 text-lg font-bold group-hover:scale-105 transition-transform">
                  ⚡
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-text-primary font-heading tracking-tight">Cashless Pre-Auth</h4>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-semibold">Step-by-step submission workflow to guarantee 100% deposit-free treatment.</p>
                </div>
              </div>
              <span className="text-[11px] font-black text-purple-600 mt-5 flex items-center gap-1 group-hover:underline">Learn Workflow <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL TRUST STRIP & MINIMAL MARQUEE */}
      <section className="bg-gray-50/60 dark:bg-gray-900/40 py-12 border-y border-gray-100 dark:border-gray-800/60">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Empanelled Networks</span>
              <h4 className="text-sm font-black text-text-secondary">Major Connected Hospital Systems</h4>
            </div>
            
            {/* Elegant horizontal grid matching top-tier SaaS layout */}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              {partnerLogos.map((partner, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/80 text-xs font-bold text-text-secondary shadow-sm hover:text-blue-600 hover:border-blue-200 transition-all cursor-default select-none flex items-center gap-1.5"
                >
                  <span className="text-sm">{partner.icon}</span>
                  <span>{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Metric Badges Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100 dark:border-gray-800/50 mt-10">
            {[
              { val: "5M+", label: "Cashless Treatments" },
              { val: "30+", label: "Medical Specialities" },
              { val: "1,200+", label: "Verified Hospitals" },
              { val: "24/7", label: "Realtime Bed Updates" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight font-heading">{stat.val}</p>
                <p className="text-[10px] font-black text-text-muted mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CENTERS OF EXCELLENCE (BENTO GRID WITH GLOWING BORDERS) */}
      <section id="specialities" className="py-24 bg-bg-secondary relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-extrabold tracking-widest text-[10px] uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1.5 rounded-full mb-4 inline-block">Speciality Departments</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-heading text-text-primary tracking-tight">World-Class Speciality Care</h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-semibold">Our network partners deploy premium clinical standards and advanced diagnostics across multiple fields.</p>
          </div>

          {/* Specialty Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialities.map((spec, idx) => (
              <div 
                key={idx} 
                className="bg-bg-primary p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-800/80 group relative overflow-hidden"
              >
                {/* Micro badge in card */}
                <div className="absolute top-6 right-6 text-[10px] font-black px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-text-muted rounded-full border border-gray-100 dark:border-gray-700/80 uppercase tracking-wider">
                  {spec.badge}
                </div>
                
                {/* Icon wrapper with glow */}
                <div className={`w-14 h-14 bg-gradient-to-br ${spec.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-gray-100/10 group-hover:scale-105 transition-transform duration-300`}>
                  {spec.icon}
                </div>
                
                <h3 className="text-lg font-black mb-2.5 font-heading text-text-primary tracking-tight">{spec.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium opacity-90">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SCHEMES CATALOGUE (CLEAN BADGES) */}
      <section id="schemes" className="py-24 bg-bg-primary border-t border-gray-100 dark:border-gray-800/30">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <span className="text-blue-600 dark:text-blue-400 font-extrabold tracking-widest text-[10px] uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1.5 rounded-full mb-4 inline-block">Financial Protection</span>
          <h2 className="text-3xl md:text-4xl font-black mb-12 font-heading text-text-primary tracking-tight">Treatment Under Supported Schemes</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {MOCK_SCHEMES.slice(0, 6).map(s => (
              <div 
                key={s.id} 
                className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center w-48 h-48 border border-gray-100 dark:border-gray-800/80 cursor-default group"
              >
                <div className="text-lg font-black text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 w-14 h-14 flex items-center justify-center rounded-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {s.short_name?.substring(0,3) || s.code.substring(0,3)}
                </div>
                <p className="font-extrabold text-xs text-text-primary line-clamp-2 px-1 leading-snug">{s.short_name || s.name}</p>
                <span className="text-[9px] font-black text-teal-600 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-full mt-2.5">100% Cashless</span>
              </div>
            ))}
            
            {/* View All Card */}
            <div 
              className="bg-white/40 dark:bg-gray-900/20 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center w-48 h-48 border-2 border-dashed border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-white dark:hover:bg-gray-900 hover:border-blue-600 hover:shadow-xl transition-all group" 
              onClick={() => onNavigate(Page.SCHEME_EXPLORER)}
            >
              <span className="text-gray-400 group-hover:text-blue-600 font-extrabold text-3xl mb-1.5 transition-colors">+</span>
              <span className="text-text-secondary group-hover:text-blue-600 font-extrabold text-xs transition-colors">View All Schemes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-CONTRAST SOPHISTICATED CALL TO ACTION */}
      <section className="relative py-28 overflow-hidden bg-gray-950 text-white">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Colorful neon highlights */}
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <span className="text-teal-400 font-extrabold tracking-widest text-[10px] uppercase bg-white/10 px-3.5 py-1.5 rounded-full mb-6 inline-block">Empanelment Hotline</span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading tracking-tight leading-tight">{t('ctaTitle')}</h2>
          <p className="max-w-2xl mx-auto mb-10 text-gray-300 text-sm md:text-base font-semibold leading-relaxed">{t('ctaSubtitle')}</p>
          
          <button 
            onClick={() => onSearch({city: 'Hyderabad', scheme: 'PMJAY'})} 
            className="bg-white text-gray-950 font-black text-sm py-4 px-10 rounded-2xl hover:bg-teal-50 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            {t('findHospitalNow')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
