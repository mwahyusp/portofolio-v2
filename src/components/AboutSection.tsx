import { FC } from 'react';
import { User, CheckCircle2, HeartHandshake, Briefcase } from 'lucide-react';

export const AboutSection: FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 border-b border-slate-200/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <User className="w-4 h-4" />
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Professional Background & Technical Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            A practical IT professional with hands-on experience across technical support, frontend engineering, and structured manual quality assurance.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Column 1: The Core Story */}
          <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>
              My professional foundation began in technical operations at <strong className="font-semibold text-slate-900">PT Infrastruktur Telekomunikasi Indonesia (Telkominfra)</strong>. Over 2 years and 9 months as a <strong className="font-semibold text-slate-900">Help Desk Specialist</strong>, I supported daily IT Help Desk operations, handled support tickets and technical incidents, performed troubleshooting and incident triage, monitored reported problems, and coordinated with field technicians to resolve infrastructure incidents.
            </p>
            <p>
              Advancing my focus toward digital interfaces, I worked as a <strong className="font-semibold text-slate-900">Frontend Developer</strong> at <strong className="font-semibold text-slate-900">PT. Vizitrip Global Tour</strong> for 1 year, developing website interfaces using <strong className="font-semibold text-slate-900">React.js</strong>, translating design requirements into functional web interfaces, and contributing to digital products.
            </p>
          </div>

          {/* Column 2: Career Break & Upskilling */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-sm">
              <HeartHandshake className="w-4 h-4 text-slate-700" />
              <span>Career Break & Professional Development (April 2020 – 2026)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              From April 2020 to 2026, I took a career break to focus on family caregiving responsibilities. During this period, I maintained consistent technical development through:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Online courses and independent learning</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Refreshing HTML, CSS, and JavaScript fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Practicing React.js and frontend development</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Studying Manual Software Testing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Building personal projects and developing my technical portfolio</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-700 font-medium">
              <Briefcase className="w-3.5 h-3.5 text-slate-600" />
              <span>I am now fully prepared, motivated, and ready to return to the IT industry.</span>
            </div>
          </div>
        </div>

        {/* Natural Invitation CTA */}
        <div className="pt-2 flex items-center">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all rounded-lg shadow-2xs"
          >
            <span>Explore My Experience</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
