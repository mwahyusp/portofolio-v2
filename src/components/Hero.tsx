import { motion } from 'motion/react';
import { ArrowDown, Code, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { SiTailwindcss } from 'react-icons/si';
import { PERSONAL_INFO, UI_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const SocialIcon = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  const Component = Icon;
  return <Component className={className} />;
};

export default function Hero({ lang }: HeroProps) {
  const t = UI_TRANSLATIONS[lang].hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/20 to-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Intro */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          >
            {/* Live Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 backdrop-blur-sm shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{t.availabilityBadge}</span>
              </div>
            </motion.div>

            {/* Greeting Headline */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
              {t.greetingPrefix}{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent block mt-1">
                {PERSONAL_INFO.name}
              </span>
            </motion.h1>

            {/* Role & Motto */}
            <motion.h2 variants={itemVariants} className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span>{t.rolePrefix}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-semibold">
                {PERSONAL_INFO.role}
              </span>
              <span className="italic text-slate-500 dark:text-slate-400">
                — {PERSONAL_INFO.bioHeadline[lang]}
              </span>
            </motion.h2>

            {/* Description Body */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8 mx-auto lg:mx-0">
              {PERSONAL_INFO.bioDescription[lang]}
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/mwahyusp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-600 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all text-base"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t.hireMeBtn}</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('portfolio');
                  if (element) {
                    const headerOffset = 70;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-md hover:border-teal-500 dark:hover:border-teal-400 transition-all text-base backdrop-blur-sm"
              >
                <Code className="w-5 h-5 text-teal-500" />
                <span>{t.viewPortfolio}</span>
              </motion.a>
            </motion.div>

            {/* Quick Social Icons */}
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2">
                {t.contactTitle}
              </span>

              {[
                { icon: FaGithub, href: PERSONAL_INFO.socials.github, label: 'GitHub' },
                { icon: FaLinkedin, href: PERSONAL_INFO.socials.linkedin, label: 'LinkedIn' },
                { icon: FaInstagram, href: PERSONAL_INFO.socials.instagram, label: 'Instagram' },
                { icon: FaEnvelope, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10 border border-slate-200 dark:border-slate-700 transition-colors"
                  aria-label={item.label}
                >
                  <SocialIcon icon={item.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Profile Avatar with Organic Glowing SVG Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rotating Animated Background Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 via-emerald-400 to-sky-500 blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 animate-spin-slow" />
              
              {/* Teal Blob Background SVG */}
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full text-teal-500 dark:text-teal-600/80 transition-transform duration-700 group-hover:scale-105"
              >
                <path
                  fill="currentColor"
                  d="M47.4,-51C59.2,-35.6,65.1,-17.8,63.4,-1.7C61.7,14.5,52.6,28.9,40.8,36.6C28.9,44.2,14.5,45,-2,47C-18.4,49,-36.8,52.1,-45.4,44.5C-53.9,36.8,-52.5,18.4,-51.2,1.3C-49.9,-15.8,-48.7,-31.7,-40.2,-47.1C-31.7,-62.4,-15.8,-77.3,1,-78.3C17.8,-79.2,35.6,-66.3,47.4,-51Z"
                  transform="translate(100 100) scale(1.15)"
                />
              </svg>

              {/* Profile Image Picture Tag */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative z-10 w-full h-full flex items-center justify-center p-4"
              >
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={PERSONAL_INFO.profileImageWebp} />
                  <img
                    src={PERSONAL_INFO.profileImagePng}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl transition-all duration-300 group-hover:shadow-teal-500/20"
                  />
                </picture>

                {/* Floating Tech Tag Badge 1 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 left-0 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-lg border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md flex items-center gap-2 z-20"
                >
                  <div className="p-1.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Code className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">React.js</span>
                </motion.div>

                {/* Floating Tech Tag Badge 2 */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-6 right-0 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-lg border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md flex items-center gap-2 z-20"
                >
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <SocialIcon icon={SiTailwindcss} className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Tailwind CSS</span>
                </motion.div>

                {/* Floating QA Manual Badge */}
                <motion.a
                  href="https://qa-testing-portofolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute bottom-2 left-2 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/40 backdrop-blur-md flex items-center gap-2 z-20 hover:scale-105 transition-transform"
                >
                  <div className="p-1 rounded-lg bg-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wide">QA Manual (33 TCs)</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors z-20"
        aria-label="Scroll"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
}
