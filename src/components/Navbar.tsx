import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Sun, Moon, Menu, X, Sparkles, Globe } from 'lucide-react';
import { PERSONAL_INFO, UI_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
}

export default function Navbar({ darkMode, setDarkMode, lang, setLang, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = UI_TRANSLATIONS[lang].nav;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.home, id: 'home' },
    { href: '#about', label: t.about, id: 'about' },
    { href: '#portfolio', label: t.portfolio, id: 'portfolio' },
    { href: '#skills', label: t.skills, id: 'skills' },
    { href: '#contact', label: t.contact, id: 'contact' },
  ];

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-800/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="group flex items-center gap-2 text-xl font-bold text-teal-600 dark:text-teal-400 focus:outline-none"
            >
              <div className="relative overflow-hidden rounded-lg p-1 transition-transform group-hover:scale-105">
                <picture>
                  <source type="image/webp" srcSet={PERSONAL_INFO.logoWebp} />
                  <img
                    src={PERSONAL_INFO.logoPng}
                    alt="Logo MWSP"
                    className="h-9 w-auto object-contain transition-opacity duration-300"
                  />
                </picture>
              </div>
              <span className="hidden sm:inline-block font-mono text-sm font-semibold tracking-wider text-slate-700 dark:text-slate-200 group-hover:text-teal-500 transition-colors">
                MWSP.dev
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/70 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'text-teal-700 dark:text-teal-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-teal-500/15 dark:bg-teal-500/25 rounded-full border border-teal-500/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action Controls: Language Switcher, Theme Switcher, Hire Me CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Language Switcher Segmented Control */}
              <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  onClick={() => setLang('id')}
                  className={`relative px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
                    lang === 'id'
                      ? 'text-white font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-label="Ubah ke Bahasa Indonesia"
                >
                  {lang === 'id' && (
                    <motion.div
                      layoutId="active-lang-pill"
                      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <span>🇮🇩</span>
                    <span>ID</span>
                  </span>
                </button>

                <button
                  onClick={() => setLang('en')}
                  className={`relative px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
                    lang === 'en'
                      ? 'text-white font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-label="Switch to English"
                >
                  {lang === 'en' && (
                    <motion.div
                      layoutId="active-lang-pill"
                      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <span>🇬🇧</span>
                    <span>EN</span>
                  </span>
                </button>
              </div>

              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-teal-500 dark:hover:border-teal-400 transition-colors relative group"
                aria-label={darkMode ? t.lightMode : t.darkMode}
                title={darkMode ? t.lightMode : t.darkMode}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: darkMode ? 180 : 0, scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700 fill-slate-700/20" />
                  )}
                </motion.div>
              </motion.button>

              {/* Hire Me Desktop Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/mwahyusp"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hireMe}</span>
              </motion.a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold border border-teal-500/20'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <div className="pt-2">
                  <a
                    href="https://linkedin.com/in/mwahyusp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-teal-500 text-white shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.hireMeLinkedIn}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
