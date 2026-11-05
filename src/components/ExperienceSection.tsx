import { FC } from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin, Building2, FileText } from 'lucide-react';
import { workExperience } from '../data/portfolioData';
import { CareerTrack } from '../types';

interface ExperienceSectionProps {
  currentTrack?: CareerTrack;
  onOpenResume?: () => void;
}

export const ExperienceSection: FC<ExperienceSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="experience" className="py-12 sm:py-16 border-b border-slate-200/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <Briefcase className="w-4 h-4" />
            <span>Professional Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Employment Timeline &amp; Development
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Verified professional employment in Frontend Development and IT Help Desk operations, followed by independent technical upskilling.
          </p>
        </div>

        {/* Timeline Stack in Reverse Chronological Order */}
        <div className="relative border-l border-slate-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {workExperience.map((exp) => {
            const isEmployment = exp.type === 'employment';

            return (
              <div key={exp.role} className="relative">
                {/* Timeline node in dark navy / slate */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                    isEmployment ? 'bg-[#0f172a]' : 'bg-slate-500'
                  }`}
                />

                <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        {isEmployment ? (
                          <span className="text-[11px] font-semibold text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                            Professional Employment
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md">
                            Caregiving &amp; Independent Upskilling
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-slate-900 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {exp.companyOrContext}
                        </span>
                        {exp.contractType && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{exp.contractType}</span>
                          </>
                        )}
                        {exp.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {exp.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto shrink-0 border border-slate-200/60">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.period}</span>
                      {exp.duration && <span>({exp.duration})</span>}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Responsibilities & Experience bullet points */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Responsibilities and Experience
                    </span>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Demonstrated Skills unboxed metadata */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 border-t border-slate-100">
                    <span className="font-medium text-slate-700">Skills / Focus:</span>
                    {exp.skillsDemonstrated.map((skill, sIdx) => (
                      <span key={skill} className="flex items-center gap-2">
                        <span>{skill}</span>
                        {sIdx < exp.skillsDemonstrated.length - 1 && <span aria-hidden="true">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warm Invitation CTA to View CV */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-900">
              Looking for a complete chronological overview?
            </h3>
            <p className="text-xs text-slate-600">
              Explore my verified employment history, responsibilities, and qualifications in a structured CV.
            </p>
          </div>
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0f172a] hover:bg-slate-800 active:scale-95 transition-all rounded-lg shadow-xs whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>View My CV</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
