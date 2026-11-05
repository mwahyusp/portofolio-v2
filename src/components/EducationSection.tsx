import { FC } from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import { educationList } from '../data/portfolioData';

export const EducationSection: FC = () => {
  return (
    <section id="education" className="py-12 sm:py-16 border-b border-slate-200/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <GraduationCap className="w-4 h-4" />
            <span>Education &amp; Continuous Learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Formal Education &amp; Technical Curriculum
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Undergraduate academic degree and completed self-directed coursework with practical implementation.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-800 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                    <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                    {item.status}
                  </span>
                  <span>{item.period}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.degree}
                  </h3>
                  <div className="text-xs font-medium text-slate-600 mt-1">
                    {item.institution}
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    {item.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
