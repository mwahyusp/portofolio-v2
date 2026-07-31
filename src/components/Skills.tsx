import { useState, ElementType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Palette, FileCode, Layers, Zap, GitBranch, Layout, Globe, Server, Database, Wrench } from 'lucide-react';
import { SKILLS, UI_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

const iconMap: Record<string, ElementType> = {
  Code2,
  Palette,
  FileCode,
  Layers,
  Zap,
  GitBranch,
  Layout,
  Globe,
  Server,
  Database,
};

interface SkillsProps {
  lang: Language;
}

export default function Skills({ lang }: SkillsProps) {
  const t = UI_TRANSLATIONS[lang].skills;
  const [filter, setFilter] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: t.allTab },
    { key: 'Frontend', label: t.frontendTab || 'Frontend' },
    { key: 'Framework', label: t.frameworkTab || 'Framework' },
    { key: 'Backend', label: t.backendTab || 'Backend' },
    { key: 'Database & Cloud', label: t.databaseTab || 'Database & Cloud' },
    { key: 'Tools', label: t.toolsTab || 'Tools & Utilities' },
  ];

  const filteredSkills = filter === 'ALL'
    ? SKILLS
    : SKILLS.filter(s => s.category === filter);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2 block">
            {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.sectionDesc}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Skill Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filter === cat.key
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {filter === cat.key && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = iconMap[skill.iconName] || Wrench;
              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:border-teal-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {skill.level}%
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {skill.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {skill.description[lang]}
                    </p>
                  </div>

                  {/* Dynamic Fill Progress Bar */}
                  <div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
