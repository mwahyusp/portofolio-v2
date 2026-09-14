import { useState, ElementType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
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
  Wrench,
  ClipboardCheck,
  FileCheck,
  Bug,
  ListChecks,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
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
  ClipboardCheck,
  FileCheck,
  Bug,
  ListChecks,
  ShieldCheck,
  RotateCcw,
};

interface SkillsProps {
  lang: Language;
}

export default function Skills({ lang }: SkillsProps) {
  const t = UI_TRANSLATIONS[lang].skills;
  const [filter, setFilter] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: t.allTab },
    { key: 'QA & Testing', label: (t as any).qaTab || 'QA & Testing' },
    { key: 'Frontend', label: t.frontendTab || 'Frontend' },
    { key: 'Framework', label: t.frameworkTab || 'Framework' },
    { key: 'Backend', label: t.backendTab || 'Backend' },
    { key: 'Database & Cloud', label: t.databaseTab || 'Database & Cloud' },
    { key: 'Tools', label: t.toolsTab || 'Tools & Utilities' },
  ];

  const filteredSkills = filter === 'ALL'
    ? SKILLS
    : SKILLS.filter(s => s.category === filter);

  const qaDisciplines = [
    {
      id: 'test-planning',
      title: {
        id: 'Test Planning & Strategy',
        en: 'Test Planning & Strategy'
      },
      badge: {
        id: 'Fase 1 • Strategy & Scoping',
        en: 'Phase 1 • Strategy & Scoping'
      },
      icon: FileCheck,
      description: {
        id: 'Menyusun dokumen Test Plan komprehensif, mendefinisikan ruang lingkup pengujian, kriteria masuk/keluar (entry/exit criteria), analisis risiko, serta teknik Boundary Value Analysis (BVA) & Equivalence Partitioning (EP).',
        en: 'Authoring structured Test Plans, defining testing scope, establishing entry/exit criteria, analyzing risks, and applying Boundary Value Analysis (BVA) & Equivalence Partitioning (EP).'
      },
      tags: ['Test Scope', 'Entry & Exit Criteria', 'BVA & EP', 'Risk Mitigation']
    },
    {
      id: 'bug-reporting',
      title: {
        id: 'Bug Reporting & Root Cause',
        en: 'Bug Reporting & Root Cause'
      },
      badge: {
        id: '5 Intentional Defects (DEF)',
        en: '5 Intentional Defects (DEF)'
      },
      icon: Bug,
      description: {
        id: 'Dokumentasi laporan bug terstandar (DEF-001 s/d DEF-005) mencakup Severity, Priority, Steps to Reproduce yang jelas, Expected vs Actual, analisis Root Cause pada baris kode JavaScript, dan Suggested Fix.',
        en: 'Standardized defect reporting (DEF-001 to DEF-005) detailing Severity, Priority, precise Steps to Reproduce, Expected vs Actual behavior, source-code Root Cause, and Suggested Fixes.'
      },
      tags: ['Severity & Priority', 'Steps to Reproduce', 'Root Cause Analysis', 'DEF-001 - DEF-005']
    },
    {
      id: 'functional-testing',
      title: {
        id: 'Functional Testing (Black-Box)',
        en: 'Functional Testing (Black-Box)'
      },
      badge: {
        id: 'Positif & Negatif Testing',
        en: 'Positive & Negative Testing'
      },
      icon: ShieldCheck,
      description: {
        id: 'Pengujian fungsional menyeluruh dari hulu ke hilir: Autentikasi Pengguna & penanganan pesan error, Pencarian & Filter Katalog, Manipulasi Batas Stok Keranjang, Validasi Form Checkout, dan Faktur Konfirmasi Pesanan.',
        en: 'Comprehensive black-box functional testing across all user flows: Authentication & error alerts, Catalog Search & filters, Cart stock boundary manipulation, Checkout form, and Order Confirmation invoices.'
      },
      tags: ['Smoke & Sanity', 'Edge Case Validation', 'Cart Stock Guard', 'Invoice Calculation']
    },
    {
      id: 'regression-testing',
      title: {
        id: 'Regression Testing',
        en: 'Regression Testing'
      },
      badge: {
        id: '7 Skenario Regresi (RS)',
        en: '7 Regression Scenarios (RS)'
      },
      icon: RotateCcw,
      description: {
        id: 'Merancang dan mengeksekusi 7 skenario pengujian regresi terarah (RS-001 s/d RS-007) setelah perbaikan bug untuk memastikan stabilitas sistem dan menjamin perbaikan tidak merusak fitur yang telah berjalan normal.',
        en: 'Authoring and running 7 targeted regression scenarios (RS-001 to RS-007) post-bugfix to ensure system stability and verify that defect resolutions cause no regressions or unintended side effects.'
      },
      tags: ['RS-001 to RS-007', 'Side-Effect Prevention', 'Re-test Verification', 'Build Stability']
    },
    {
      id: 'test-documentation',
      title: {
        id: 'Test Documentation & Traceability (RTM)',
        en: 'Test Documentation & Traceability (RTM)'
      },
      badge: {
        id: '100% RTM Coverage',
        en: '100% RTM Coverage'
      },
      icon: ListChecks,
      description: {
        id: 'Memelihara Requirements Traceability Matrix (RTM) yang memetakan 19 kebutuhan fungsional secara dua arah ke 33 Test Cases dan 5 Defect Reports (100% Cakupan), disertai Test Execution Summary Report.',
        en: 'Maintaining a two-way Requirements Traceability Matrix (RTM) linking 19 functional requirements to 33 Test Cases and 5 Defect Reports (100% Coverage), accompanied by comprehensive Test Summary Reports.'
      },
      tags: ['33 Test Cases', '19 Requirements Mapped', '100% Coverage Matrix', 'Test Execution Summary']
    },
    {
      id: 'qa-case-study',
      title: {
        id: 'Live Case Study: Mini E-Commerce',
        en: 'Live Case Study: Mini E-Commerce'
      },
      badge: {
        id: 'Proyek Nyata Terkontrol',
        en: 'Real Controlled Testbed'
      },
      icon: CheckCircle2,
      description: {
        id: 'Penerapan langsung kelima disiplin QA di atas pada lingkungan uji nyata berbasis Vanilla JavaScript. Pengunjung dapat mencoba simulator interaktif reproduksi bug secara langsung di browser.',
        en: 'Practical implementation of all 5 QA disciplines in a live Vanilla JS testing environment. Visitors can directly interact with the live defect reproduction simulator in the browser.'
      },
      tags: ['Interactive Simulator', 'Controlled Defects', 'Live Testbed', 'GitHub Repo']
    }
  ];

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

        {/* Dedicated Section: Keahlian QA Manual Berdasarkan Proyek Portofolio QA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/80 text-white border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
            {/* Background decorative glow effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Banner Header & Direct Links */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Keahlian Inti QA Manual' : 'Core Manual QA Competencies'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {lang === 'id' ? 'Spesialisasi & Metodologi QA Manual' : 'Manual QA Specialization & Methodologies'}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                    {lang === 'id' 
                      ? 'Keahlian pengujian perangkat lunak terstruktur yang dibuktikan secara nyata melalui proyek terkontrol Mini E-Commerce lengkap dengan 33 Test Cases, 5 Defect Reports, dan 100% Traceability RTM.'
                      : 'Structured software testing methodologies proven through a live controlled Mini E-Commerce testbed with 33 Test Cases, 5 Defect Reports, and 100% Traceability RTM.'}
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="https://qa-testing-portofolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2"
                  >
                    <span>{lang === 'id' ? 'Buka Live QA Project' : 'Open Live QA Project'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/mwahyusp/qa-testing-portofolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>GitHub Repo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Key Artifacts & Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 py-6 border-b border-slate-800">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">33</span>
                  <span className="text-xs text-slate-300 font-medium">Test Cases (Fase 1–3)</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">5 Defect</span>
                  <span className="text-xs text-slate-300 font-medium">Laporan Bug (DEF-001–005)</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold text-teal-400 block">100%</span>
                  <span className="text-xs text-slate-300 font-medium">Traceability RTM (19 Req)</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 block">7 Skenario</span>
                  <span className="text-xs text-slate-300 font-medium">Regression Testing (RS)</span>
                </div>
              </div>

              {/* 5 Core QA Manual Disciplines Cards (+ 1 Live Case Study Spotlight) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
                {qaDisciplines.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="p-6 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {item.badge[lang]}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                          {item.title[lang]}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                          {item.description[lang]}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-700/60">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[11px] font-medium border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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

        {/* Skill Cards Grid with QA Badges & Highlights */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = iconMap[skill.iconName] || Wrench;
              const isQa = skill.category === 'QA & Testing';

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`p-6 rounded-3xl transition-all flex flex-col justify-between relative overflow-hidden ${
                    isQa
                      ? 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 dark:from-emerald-950/30 dark:via-slate-800/95 dark:to-teal-950/20 border-2 border-emerald-500/50 dark:border-emerald-500/50 shadow-lg shadow-emerald-500/10 hover:border-emerald-500 hover:shadow-emerald-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:border-teal-500/50'
                  }`}
                >
                  {/* QA Specialization Pill Badge for standout QA skills */}
                  {isQa && (
                    <div className="absolute top-0 right-0">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-2xl bg-emerald-500 text-white shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        QA Focus
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4 mt-1">
                      <div className={`p-3 rounded-2xl border ${
                        isQa
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                        isQa
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>

                    <div className="mb-2">
                      {isQa && (
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>QA Specialization</span>
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {skill.name}
                      </h3>
                    </div>

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
                        className={`h-full rounded-full ${
                          isQa
                            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400'
                            : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                        }`}
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
