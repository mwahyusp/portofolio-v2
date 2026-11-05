import { FC } from 'react';
import { ArrowDown, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="home" className="pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typographic Hierarchy & CTAs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Metadata line (clean unboxed text with typographic separators) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1 text-slate-700 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              {personalInfo.location}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-bold text-xl">Ready to Return to IT Opportunities</span>
          </div>

          {/* Headline & Identity */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              {personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-700">
              {personalInfo.headline}
            </p>
          </div>

          {/* Short personal introduction from brief */}
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl text-pretty">
            {personalInfo.introduction}
          </p>

          {/* Key Positioning Note */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            <span className="font-semibold text-slate-900">Professional Positioning: </span>
            {personalInfo.positioning}
          </div>

          {/* Actions & Links (Friendly, approachable CTAs matching requirements) */}
          <div className="space-y-4 pt-2">
            {/* Row 1: Primary CTA (View My Projects), Secondary CTA (Get in Touch), and Download My CV text link */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0f172a] hover:bg-slate-800 active:scale-95 transition-all rounded-lg shadow-xs whitespace-nowrap"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4 text-slate-300" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all rounded-lg shadow-2xs whitespace-nowrap"
              >
                <span>Get in Touch</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600">Download My CV</span>
              </button>
            </div>

            {/* Row 2: Elevated Interactive Social Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <span className="text-xs font-medium text-slate-400">Connect:</span>

              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile (opens in new tab)"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <Github className="w-4 h-4 text-slate-600 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-200" />
                <span>GitHub</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-700 transition-colors">↗</span>
              </a>

              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile (opens in new tab)"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0a66c2] hover:border-blue-200 hover:bg-blue-50/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <Linkedin className="w-4 h-4 text-slate-600 group-hover:text-[#0a66c2] group-hover:scale-110 transition-all duration-200" />
                <span>LinkedIn</span>
                <span className="text-[10px] text-slate-400 group-hover:text-[#0a66c2] transition-colors">↗</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Send Direct Email"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <Mail className="w-4 h-4 text-slate-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-200" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Natural Portrait Card & Snapshot */}
        <div className="lg:col-span-4 flex flex-col items-center sm:items-start lg:items-end">
          <div className="w-full max-w-xs bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-bold text-slate-900">
                {personalInfo.name}
              </div>
              <div className="text-xs text-slate-500">
                Jakarta, Indonesia
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Frontend:</span>
                  <span className="font-medium text-slate-700">PT. Vizitrip (1 year)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Help Desk:</span>
                  <span className="font-medium text-slate-700">Telkominfra (2y 9m)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Manual QA:</span>
                  <span className="font-medium text-slate-700">Portfolio & 33 TCs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
