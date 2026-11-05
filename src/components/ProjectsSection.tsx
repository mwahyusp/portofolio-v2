import { FC, useState } from 'react';
import {
  ExternalLink,
  Github,
  FolderGit2,
  ArrowRight,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Code2
} from 'lucide-react';
import { featuredProjects, additionalRepositories } from '../data/portfolioData';
import { CareerTrack, Project } from '../types';

interface ProjectsSectionProps {
  currentTrack?: CareerTrack;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: FC<ProjectsSectionProps> = ({ currentTrack = 'all', onSelectProject }) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'qa' | 'frontend'>('all');
  const [showAdditional, setShowAdditional] = useState(false);

  // Map category tabs to filter criteria
  const filteredProjects = featuredProjects.filter((project) => {
    if (currentTrack === 'qa-testing' && project.track !== 'qa-testing') return false;
    if (currentTrack === 'frontend' && project.track !== 'frontend') return false;

    if (selectedCategoryTab === 'all') return true;
    if (selectedCategoryTab === 'qa') return project.track === 'qa-testing';
    if (selectedCategoryTab === 'frontend') return project.track === 'frontend';
    return true;
  });

  return (
    <section id="projects" className="py-12 sm:py-16 border-b border-slate-200/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <FolderGit2 className="w-4 h-4" />
              <span>Project Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Featured Projects & Practical Implementations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Prioritized repositories showcasing manual software testing artifacts and frontend React applications.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-medium border border-slate-200/60">
            {[
              { id: 'all', label: 'All Featured (4)' },
              { id: 'qa', label: 'Manual QA Testing (1)' },
              { id: 'frontend', label: 'Frontend React (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategoryTab(tab.id as typeof selectedCategoryTab)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategoryTab === tab.id
                    ? 'bg-[#0f172a] text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid (Prioritized 4 Repositories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isQA = project.id === 'qa-portfolio';

            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all duration-300 group hover:border-slate-300 hover:shadow-sm"
              >
                <div>
                  {/* Project Screenshot Container */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative aspect-video w-full overflow-hidden bg-slate-100 cursor-pointer border-b border-slate-100"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/15 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                        {isQA ? 'See QA Details & Artifacts' : 'See Project Details'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="text-slate-800 font-semibold">
                        {project.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      {isQA ? (
                        <span className="text-slate-600 font-medium">
                          33 Test Cases · 5 Defect Reports · 100% RTM
                        </span>
                      ) : (
                        <span>Live Application</span>
                      )}
                    </div>

                    {/* Title & Short Description */}
                    <div className="space-y-1.5">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Purpose */}
                    <div className="text-xs text-slate-500">
                      <strong className="text-slate-700 font-medium">Purpose: </strong>
                      {project.purpose}
                    </div>

                    {/* Tags */}
                    {project.tags && (
                      <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                        <span className="text-slate-400">Tags:</span>
                        {project.tags.slice(0, 4).map((tag, idx) => (
                          <span key={tag} className="flex items-center gap-1.5">
                            <span className="font-medium text-slate-800">{tag}</span>
                            {idx < Math.min(project.tags!.length, 4) - 1 && <span aria-hidden="true">·</span>}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    {isQA ? (
                      <>
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>See QA Details & Artifacts</span>
                      </>
                    ) : (
                      <>
                        <span>See Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0f172a] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-2xs"
                        aria-label={`Open Live Demo for ${project.title}`}
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shadow-2xs"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curated Secondary Repositories Toggle */}
        <div className="pt-2">
          <button
            onClick={() => setShowAdditional((prev) => !prev)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/70 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Code2 className="w-4 h-4 text-slate-500" />
              <div>
                <div className="text-xs font-semibold text-slate-900">
                  Additional Learning &amp; Practice Repositories ({additionalRepositories.length})
                </div>
                <div className="text-[11px] text-slate-500">
                  Curated secondary repositories from GitHub (DOM manipulation, web storage)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <span>{showAdditional ? 'Hide' : 'View'}</span>
              {showAdditional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showAdditional && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-in fade-in duration-200">
              {additionalRepositories.map((repo) => (
                <div
                  key={repo.title}
                  className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {repo.title}
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {repo.liveDemoUrl && (
                        <a
                          href={repo.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-[#0f172a] hover:bg-slate-800 transition-colors shadow-2xs"
                          aria-label={`View live demo of ${repo.title}`}
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        aria-label={`View ${repo.title} on GitHub`}
                      >
                        <Github className="w-3 h-3" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {repo.description}
                  </p>
                  <div className="text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">Purpose: </span>
                    {repo.purpose}
                  </div>
                  <div className="pt-1 text-[11px] text-slate-400">
                    Tech: {repo.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
