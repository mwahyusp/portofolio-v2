import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Eye, Sparkles, X, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { PROJECTS, UI_TRANSLATIONS } from '../data/portfolioData';
import { Project, CategoryType, Language } from '../types';

const GithubIcon = (props: { className?: string }) => {
  const Icon = FaGithub as any;
  return <Icon {...props} />;
};

interface PortfolioProps {
  lang: Language;
}

export default function Portfolio({ lang }: PortfolioProps) {
  const t = UI_TRANSLATIONS[lang].portfolio;
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Semua');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'Semua', label: t.allTab },
    { key: 'React', label: 'React' },
    { key: 'Next.js', label: 'Next.js' },
    { key: 'Interactive Apps', label: 'Interactive Apps' },
  ];

  const filteredProjects = activeCategory === 'Semua'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-100/80 dark:bg-slate-900/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
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

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                activeCategory === cat.key
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm'
              }`}
            >
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="active-portfolio-tab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat.key === 'Semua' && <Sparkles className="w-3.5 h-3.5" />}
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-teal-500/50 transition-all flex flex-col justify-between"
              >
                {/* Image Box with WebP / PNG Fallback & Hover Blur Overlay */}
                <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-900">
                  <picture className="w-full h-full block">
                    <source type="image/webp" srcSet={project.imageWebp} />
                    <img
                      src={project.imagePng}
                      alt={project.title[lang]}
                      width="600"
                      height="338"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                  </picture>

                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2.5 rounded-full bg-white/90 text-slate-900 font-semibold text-xs sm:text-sm hover:bg-white hover:scale-105 transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      <Eye className="w-4 h-4 text-teal-600" />
                      <span>{t.detailBtn}</span>
                    </button>

                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-teal-500 text-white font-semibold text-xs sm:text-sm hover:bg-teal-600 hover:scale-105 transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{t.liveDemo}</span>
                    </a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.featuredBadge}</span>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {project.title[lang]}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {project.description[lang]}
                    </p>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Live Links */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        <span>{t.seeLiveDemo}</span>
                      </a>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title={t.detailBtn}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative z-10 bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title[lang]}
                  </h3>
                </div>

                {/* Image Preview */}
                <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-100 dark:bg-slate-900 shadow-md">
                  <picture className="w-full h-full block">
                    <source type="image/webp" srcSet={selectedProject.imageWebp} />
                    <img
                      src={selectedProject.imagePng}
                      alt={selectedProject.title[lang]}
                      width="600"
                      height="338"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>

                {/* Detailed Description */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">{t.projectDescLabel}</h4>
                  <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed">
                    {selectedProject.detailedDescription ? selectedProject.detailedDescription[lang] : selectedProject.description[lang]}
                  </p>
                </div>

                {/* Stack Badges */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">{t.techUsedLabel}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-500/30 flex items-center gap-1.5"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal External CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm text-center shadow-lg hover:shadow-teal-500/30 hover:scale-102 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.openLiveDemo}</span>
                  </a>

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>{t.githubRepo}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
