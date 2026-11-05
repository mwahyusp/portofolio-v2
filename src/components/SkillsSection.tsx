import { FC } from 'react';
import { Layers, Monitor, Code, CheckCircle } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { CareerTrack } from '../types';

interface SkillsSectionProps {
  currentTrack?: CareerTrack;
}

export const SkillsSection: FC<SkillsSectionProps> = () => {
  const getIcon = (track: CareerTrack) => {
    switch (track) {
      case 'it-support':
        return Monitor;
      case 'frontend':
        return Code;
      case 'qa-testing':
        return CheckCircle;
      default:
        return Layers;
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 border-b border-slate-200/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <Layers className="w-4 h-4" />
            <span>Technical Skills</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Practical Skills Categorized by Discipline
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Only technologies and practices I can confidently demonstrate and discuss during technical interviews.
            Presented transparently without arbitrary percentage scores.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = getIcon(category.track);

            return (
              <div
                key={category.title}
                className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    {category.description}
                  </p>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-0.5">
                        <div className="text-sm font-semibold text-slate-800">
                          {skill.name}
                        </div>
                        <div className="text-xs text-slate-500 leading-snug">
                          {skill.context}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  Backed by real practical artifacts &amp; experience
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
