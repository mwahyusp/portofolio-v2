import { motion } from 'motion/react';
import { Award, BookOpen, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { FaInstagram, FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import { PERSONAL_INFO, LEARNING_JOURNEY, UI_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

const SocialIcon = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  const Component = Icon;
  return <Component className={className} />;
};

export default function About({ lang }: AboutProps) {
  const t = UI_TRANSLATIONS[lang].about;

  return (
    <section id="about" className="py-24 bg-slate-100/70 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2 block">
            {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t.sectionTitle}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mx-auto" />
        </motion.div>

        {/* Top Story & Social Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Bio Story Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-teal-500">
              <BookOpen className="w-24 h-24" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span>{t.storyTitle}</span>
            </h3>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {PERSONAL_INFO.aboutText1[lang]}
            </p>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-teal-500 pl-4 py-1 bg-teal-500/5 dark:bg-teal-500/10 rounded-r-xl">
              {lang === 'id' 
                ? '"Karena menjadi developer bukan soal seberapa cepat, tapi seberapa konsisten kita maju."'
                : '"Being a developer is not about how fast you go, but how consistently you move forward."'
              }
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
              <div className="text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 block">8+</span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t.statProjects}</span>
              </div>
              <div className="text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 block">3</span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t.statCerts}</span>
              </div>
              <div className="text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 block">100%</span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t.statCommitment}</span>
              </div>
            </div>
          </motion.div>

          {/* Let's connect Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-teal-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl border border-teal-800/40 relative overflow-hidden min-h-[380px]"
          >
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <HeartHandshake className="w-4 h-4" />
                <span>{lang === 'id' ? 'Mari Berteman' : "Let's Connect"}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold">
                {t.friendTitle}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.aboutText2[lang]}
              </p>

              <div className="pt-4">
                <p className="text-xs font-mono uppercase tracking-wider text-teal-400 mb-3">{t.socialHeader}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: FaInstagram, href: PERSONAL_INFO.socials.instagram, label: 'Instagram' },
                    { icon: FaGithub, href: PERSONAL_INFO.socials.github, label: 'GitHub' },
                    { icon: FaLinkedin, href: PERSONAL_INFO.socials.linkedin, label: 'LinkedIn' },
                    { icon: FaXTwitter, href: PERSONAL_INFO.socials.twitter, label: 'Twitter' },
                    { icon: FaEnvelope, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
                  ].map((soc, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-white/10 hover:bg-teal-500 hover:text-white transition-all text-slate-200 border border-white/10"
                      aria-label={soc.label}
                    >
                      <SocialIcon icon={soc.icon} className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Learning & Track Milestones */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-teal-500" />
              <span>{t.journeyHeader}</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEARNING_JOURNEY.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:border-teal-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      {item.badge[lang]}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      {item.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {item.title[lang]}
                  </h4>

                  <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3">
                    {item.organization}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs sm:text-sm text-teal-600 dark:text-teal-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.completedBadge}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
