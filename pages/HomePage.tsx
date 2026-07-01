
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { MOCK_SCHEMES } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Activity, ShieldCheck, Stethoscope, Star, Globe, Users, FileText, ChevronRight, PhoneCall, Layers, Award, MapPin } from 'lucide-react';

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
      badge: "National Health Protection",
      title: "INDIA'S UNIFIED GOVERNMENT HEALTH SCHEMES HUB",
      subtitle: "Discover empanelled multi-speciality network hospitals, track live bed availability, and compare cashless treatments and coverage across leading central and state healthcare schemes.",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000",
      stats: "51 Government Schemes Covered"
    },
    {
      badge: "Verified Cashless Network",
      title: "COMPARE EMPANELLED HOSPITALS & SCHEME COVERAGE",
      subtitle: "Instantly compare estimated surgical costs, ward capacities, and real-time general & ICU bed vacancies across top-tier empanelled medical centers.",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1800",
      stats: "60+ Major Network Hospitals"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, scheme });
  };

  const specialities = [
    { title: "Cardiology", icon: "🫀", desc: "Advanced interventional cardiology, structural heart disease repair, and state-of-the-art electrophysiology.", color: "from-rose-500/10 to-rose-600/5", textColor: "text-rose-600 dark:text-rose-400", badge: "24/7 Trauma" },
    { title: "Neurology & Neurosurgery", icon: "🧠", desc: "Comprehensive stroke management, epilepsy clinics, pediatric neurology, and high-precision neuro-oncology.", color: "from-blue-500/10 to-blue-600/5", textColor: "text-blue-600 dark:text-blue-400", badge: "Stroke Center" },
    { title: "Gastroenterology & Hepatology", icon: "🧪", desc: "Expert endoscopic ultrasound, advanced colonoscopies, liver transplants, and therapeutic GI procedures.", color: "from-emerald-500/10 to-emerald-600/5", textColor: "text-emerald-600 dark:text-emerald-400", badge: "Organ Transplant" },
    { title: "Oncology (Cancer Care)", icon: "🎗️", desc: "Immunotherapy, personalized chemotherapy, robotic oncosurgery, and modern linear-accelerator radiotherapy.", color: "from-purple-500/10 to-purple-600/5", textColor: "text-purple-600 dark:text-purple-400", badge: "Top Tier Tech" },
    { title: "Orthopedics & Joint Replacement", icon: "🦴", desc: "Computer-assisted total knee & hip replacement, sports medicine diagnostics, and spinal reconstruction.", color: "from-amber-500/10 to-amber-600/5", textColor: "text-amber-600 dark:text-amber-400", badge: "Robotic Joint" },
    { title: "Robotic Surgery", icon: "🤖", desc: "DaVinci robotic-assisted minimally invasive urological, gynecological, and general surgeries.", color: "from-indigo-500/10 to-indigo-600/5", textColor: "text-indigo-600 dark:text-indigo-400", badge: "Next-Gen Tech" }
  ];



  const partnerLogos = [
    { name: "Apollo Hospitals", logo: "🏥 Apollo" },
    { name: "Fortis Healthcare", logo: "🟢 Fortis" },
    { name: "Max Healthcare", logo: "🔵 Max" },
    { name: "Manipal Hospitals", logo: "🔴 Manipal" },
    { name: "AIG Hospitals", logo: "🔥 AIG" },
    { name: "Medanta Medicity", logo: "🌟 Medanta" }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-bg-primary">
      
      {/* 1. Immersive Enterprise Header Image Slider & Hero Banner */}
      <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center pt-[116px] pb-10 overflow-hidden">
        {/* Carousel Background Images */}
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 z-0 transition-all duration-1000 transform ${idx === activeSlide ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'}`}
          >
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-full h-full object-cover object-center filter brightness-[0.75] dark:brightness-[0.25]"
              referrerPolicy="no-referrer"
            />
            {/* Real Hospital overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent"></div>
          </div>
        ))}

        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl text-left text-white space-y-6 animate-in fade-in slide-in-from-left-10 duration-700">
            {/* Active Slide Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-widest shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              {slides[activeSlide].badge}
            </div>

            {/* Dynamic Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight drop-shadow-md">
              {slides[activeSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-lg text-blue-100 max-w-3xl leading-relaxed font-semibold drop-shadow-sm">
              {slides[activeSlide].subtitle}
            </p>

            {/* Live Stats Indicators inside Hero */}
            <div className="flex flex-wrap items-center gap-10 pt-10">
              <div className="bg-white/5 backdrop-blur-md px-4.5 py-7 rounded-2xl border border-white/15 shadow-sm text-xs font-bold text-white flex items-center gap-4">
                
                <span className='pb-3'>{slides[activeSlide].stats}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4.5 py-2.5 rounded-2xl border border-white/15 shadow-sm text-xs font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                <span>Real-time Syncing</span>
              </div>
              <button 
                onClick={() => onNavigate(Page.SCHEME_EXPLORER)}
                className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-black px-6 py-3 rounded-2xl transition-all shadow-md hover:scale-[1.02] flex items-center gap-1.5"
              >
                Explore Cashless Cover <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide manual navigation selectors */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2.5 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-teal-400' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Overlapping Multi-dropdown Real Hospital Search Widget */}
      <section className="relative z-30 mt-8  px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] pt-200 sm:p-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-gray-800">
            
            <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black text-primary-blue dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">Cashless Empanelment Finder</span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-heading tracking-tight mt-2">Find Network Hospitals & Book Appointment</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700 w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
                <span>Live Bed Tracker: 2,490 Free Beds Available Today</span>
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Location Select */}
              <div className="space-y-2">
                <label htmlFor="city" className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> {t('city')}
                </label>
                <div className="relative group">
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-4 pl-5 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-inner cursor-pointer text-sm transition-all hover:border-gray-200"
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

              {/* Speciality Selection (Star/AIG style) */}
              <div className="space-y-2">
                <label htmlFor="speciality" className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-500" /> Speciality Department
                </label>
                <div className="relative group">
                  <select
                    id="speciality"
                    className="w-full p-4 pl-5 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-inner cursor-pointer text-sm transition-all hover:border-gray-200"
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
                <label htmlFor="scheme" className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> {t('healthScheme')}
                </label>
                <div className="relative group flex gap-3">
                  <div className="relative flex-grow">
                    <select
                      id="scheme"
                      value={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                      className="w-full p-4 pl-5 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-inner cursor-pointer text-sm transition-all hover:border-gray-200"
                    >
                      {MOCK_SCHEMES.slice(0, 5).map(s => <option key={s.id} value={s.code}>{s.name} ({s.short_name || s.code})</option>)}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </span>
                  </div>
                  
                  {/* Action button inside form */}
                  <button 
                    type="submit" 
                    className="bg-red-600 hover:bg-red-700 text-white font-black text-sm px-6 rounded-2xl transition-all shadow-md shadow-red-600/10 active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Search Network</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Government Scheme Quick Access Action Cards */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer" onClick={() => alert("Scheme Eligibility Guide:\n- Low-income families with a BPL, White, Yellow, or Orange Ration Card qualify for 100% cashless treatment up to ₹5 Lakhs.\n- Families listed in the SECC-2011 database qualify instantly for central PMJAY.\n- State Government employees & pensioners carry specialized health benefits without income caps.")}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary-blue font-bold text-xl group-hover:scale-110 transition-transform">
                  📋
                </div>
                <h4 className="font-extrabold text-base text-gray-900 dark:text-white font-heading">Scheme Eligibility Checker</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">Verify which national or state-level government schemes cover your family.</p>
              </div>
              <span className="text-[10px] font-black text-primary-blue mt-4 flex items-center gap-1 group-hover:underline">Check Eligibility <ChevronRight className="w-3 h-3" /></span>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer" onClick={() => { onNavigate(Page.SEARCH_RESULTS, { searchQuery: { city: 'Hyderabad', scheme: 'PMJAY' } }); }}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold text-xl group-hover:scale-110 transition-transform">
                  🛏️
                </div>
                <h4 className="font-extrabold text-base text-gray-900 dark:text-white font-heading">Real-Time Scheme Beds</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">Check current vacant general & ICU beds reserved for government scheme patients.</p>
              </div>
              <span className="text-[10px] font-black text-teal-600 mt-4 flex items-center gap-1 group-hover:underline">Track Live Beds <ChevronRight className="w-3 h-3" /></span>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer" onClick={() => { onNavigate(Page.SCHEME_EXPLORER); }}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold text-xl group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h4 className="font-extrabold text-base text-gray-900 dark:text-white font-heading">Aarogyasri & PMJAY Desk</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">Instant pre-authorization guidelines and cashless cover limits.</p>
              </div>
              <span className="text-[10px] font-black text-green-600 mt-4 flex items-center gap-1 group-hover:underline">Check Guidelines <ChevronRight className="w-3 h-3" /></span>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer" onClick={() => alert("Cashless Pre-Authorization Guide:\n1. Show your ABHA Card or Scheme Card at the hospital's empanelled desk.\n2. The coordinator uploads medical documents and prescription details.\n3. Government approvers process and clear the request cashless in 2-4 hours.\n- Zero cash deposit is required!")}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 font-bold text-xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h4 className="font-extrabold text-base text-gray-900 dark:text-white font-heading">Cashless Pre-Auth Assistance</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">Step-by-step submission workflow to guarantee 100% deposit-free treatment.</p>
              </div>
              <span className="text-[10px] font-black text-purple-600 mt-4 flex items-center gap-1 group-hover:underline">Learn Workflow <ChevronRight className="w-3 h-3" /></span>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Trust Strip & Metrics */}
      <section className="bg-gray-50/50 dark:bg-gray-900/60 py-10 border-y border-gray-100 dark:border-gray-800/80">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center lg:text-left mb-1">Empanelled Networks</p>
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 text-center lg:text-left">Trusted Cashless Network Hospitals</h4>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {partnerLogos.map((partner, idx) => (
                <div key={idx} className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-xs font-bold text-gray-500 dark:text-gray-400 shadow-sm hover:text-primary-blue dark:hover:text-primary-blue hover:-translate-y-0.5 transition-all cursor-default select-none">
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100 dark:border-gray-800/50 mt-10">
            {[
              { val: "5M+", label: "Cashless Treatments" },
              { val: "30+", label: "Medical Specialities" },
              { val: "1,200+", label: "Verified Hospitals" },
              { val: "24/7", label: "Realtime Bed Synced" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-5xl font-black text-primary-blue tracking-tight font-heading">{stat.val}</p>
                <p className="text-xs font-bold text-text-muted mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centers of Excellence Section (Bento Grid) */}
      <section id="specialities" className="py-24 bg-bg-secondary relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-primary-blue font-bold tracking-widest text-sm uppercase bg-blue-100/60 dark:bg-blue-900/40 px-5 py-2 rounded-full mb-6 inline-block">Centers of Clinical Excellence</span>
               <h2 className="text-4xl md:text-5xl font-black mb-6 font-heading text-text-primary tracking-tight">World-Class Speciality Care</h2>
               <p className="text-lg text-text-secondary leading-relaxed font-semibold">Our network hospitals represent centers of national and global repute, deploying premium therapeutic standards and advanced technology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {specialities.map((spec, idx) => (
                <div key={idx} className="bg-bg-primary p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 dark:border-gray-800 group relative overflow-hidden">
                    <div className="absolute top-6 right-6 text-xs font-extrabold px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full border border-gray-100 dark:border-gray-700">
                      {spec.badge}
                    </div>
                    
                    <div className={`w-16 h-16 bg-gradient-to-br ${spec.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                        {spec.icon}
                    </div>
                    
                    <h3 className="text-xl font-extrabold mb-3 font-heading text-text-primary">{spec.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium opacity-90">{spec.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Schemes Section */}
      <section id="schemes" className="py-24 bg-bg-secondary">
         <div className="container mx-auto px-6 text-center">
            <span className="text-primary-blue font-bold tracking-widest text-sm uppercase bg-blue-100/60 dark:bg-blue-900/40 px-5 py-2 rounded-full mb-6 inline-block">Financial Protection</span>
            <h2 className="text-4xl font-black mb-14 font-heading text-text-primary tracking-tight">cashless Treatment Under Supported Schemes</h2>
            
             <div className="flex flex-wrap justify-center gap-8">
                {MOCK_SCHEMES.slice(0, 6).map(s => (
                    <div key={s.id} className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center justify-center text-center w-52 h-52 border border-gray-100 dark:border-gray-700/50 cursor-default group">
                        <div className="text-2xl font-extrabold text-primary-blue bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300 w-18 h-18 flex items-center justify-center rounded-2xl mb-5 shadow-inner group-hover:scale-110 transition-transform">
                            {s.short_name?.substring(0,2) || s.code.substring(0,2)}
                        </div>
                        <p className="font-bold text-sm text-text-primary line-clamp-2 px-2 leading-snug">{s.short_name || s.name}</p>
                        <span className="text-[10px] font-extrabold text-primary-blue bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full mt-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 transition-colors">Cashless</span>
                    </div>
                ))}
                 <div 
                    className="bg-white/40 dark:bg-gray-800/30 p-6 rounded-[2.5rem] flex flex-col items-center justify-center text-center w-52 h-52 border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:border-primary-blue hover:shadow-2xl transition-all group" 
                    onClick={() => onNavigate(Page.SCHEME_EXPLORER)}
                 >
                    <span className="text-gray-400 group-hover:text-primary-blue font-extrabold text-4xl mb-3 transition-colors">+</span>
                    <span className="text-gray-500 group-hover:text-primary-blue font-bold text-sm transition-colors">View All Schemes</span>
                 </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-indigo-950"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 font-heading text-white tracking-tight leading-tight">{t('ctaTitle')}</h2>
          <p className="max-w-3xl mx-auto mb-12 text-blue-100 text-xl font-medium leading-relaxed">{t('ctaSubtitle')}</p>
          <button 
            onClick={() => onSearch({city: 'Hyderabad', scheme: 'PMJAY'})} 
            className="bg-white text-primary-blue font-extrabold text-xl py-5 px-16 rounded-full hover:bg-blue-50 hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl"
          >
            {t('findHospitalNow')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
