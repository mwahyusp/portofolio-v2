import { FC, useEffect, useState } from 'react';
import { ExternalLink, Github, X, CheckCircle, Bug, FileCheck, Layers, BookOpen } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'test-cases' | 'bugs' | 'rtm'>('overview');

  useEffect(() => {
    setActiveTab('overview');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isQA = project.category === 'Manual QA Testing' && project.qaArtifacts;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="min-w-0 pr-4">
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {project.category}
            </div>
            <h3 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white truncate">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QA Sub-Navigation Tabs if applicable */}
        {isQA && (
          <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Overview & Scope
            </button>
            <button
              onClick={() => setActiveTab('test-cases')}
              className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'test-cases'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>33 Test Cases & Samples</span>
            </button>
            <button
              onClick={() => setActiveTab('bugs')}
              className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'bugs'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Bug Reports (5)</span>
            </button>
            <button
              onClick={() => setActiveTab('rtm')}
              className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'rtm'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>RTM & Regressions</span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Main Screenshot Preview */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* TAB 1: General Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Project Purpose & Context
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.purpose}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Detailed Description
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Technologies & Methodologies
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {project.technologies.map((tech, i) => (
                    <span key={tech} className="flex items-center gap-2">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{tech}</span>
                      {i < project.technologies.length - 1 && <span aria-hidden="true">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Key Scope & Highlights
                </h4>
                <ul className="space-y-2">
                  {project.mainFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* QA Summary Metrics box if QA */}
              {isQA && project.qaArtifacts && (
                <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                      {project.qaArtifacts.totalTestCases}
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">Test Cases</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                      {project.qaArtifacts.regressionScenarios}
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">Regression Scenarios</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                      {project.qaArtifacts.bugReportsCount}
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">Bug Reports</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                      {project.qaArtifacts.intentionalDefects}
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">Intentional Defects</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Sample Test Cases */}
          {activeTab === 'test-cases' && isQA && project.qaArtifacts && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Sample test cases from the 33 total documented test cases demonstrating positive, boundary, and negative scenarios:
              </div>
              <div className="space-y-3">
                {project.qaArtifacts.sampleTestCases.map((tc) => (
                  <div
                    key={tc.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{tc.id}</span>
                      <span className="text-slate-500 dark:text-slate-400">{tc.module} · {tc.type} Test</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {tc.title}
                    </div>
                    <div>
                      <span className="text-slate-400">Precondition: </span>
                      <span className="text-slate-600 dark:text-slate-300">{tc.precondition}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400">Steps:</span>
                      <ol className="list-decimal list-inside pl-1 text-slate-600 dark:text-slate-300 space-y-0.5">
                        {tc.testSteps.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Expected Result: </span>
                      <span className="text-slate-600 dark:text-slate-300">{tc.expectedResult}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Bug Reports */}
          {activeTab === 'bugs' && isQA && project.qaArtifacts && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Sample formal defect reports documenting symptoms, steps to reproduce, and severity levels:
              </div>
              <div className="space-y-4">
                {project.qaArtifacts.sampleBugReports.map((bug) => (
                  <div
                    key={bug.id}
                    className="p-4 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/20 dark:bg-rose-950/20 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{bug.id}</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Severity: <strong className="text-slate-800 dark:text-slate-200">{bug.severity}</strong> · Priority: {bug.priority}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {bug.title}
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Steps to Reproduce:</span>
                      <ol className="list-decimal list-inside pl-1 text-slate-600 dark:text-slate-300 space-y-0.5">
                        {bug.stepsToReproduce.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-rose-100 dark:border-rose-900/60">
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Expected Result:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{bug.expectedResult}</p>
                      </div>
                      <div>
                        <span className="font-medium text-rose-700 dark:text-rose-300">Actual Result:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{bug.actualResult}</p>
                      </div>
                    </div>
                    {bug.rootCause && (
                      <div className="pt-2 border-t border-rose-100 dark:border-rose-900/60 text-[11px] space-y-0.5">
                        <div className="text-amber-700 dark:text-amber-400 font-semibold">
                          Root Cause: <span className="font-normal text-slate-600 dark:text-slate-300">{bug.rootCause}</span>
                        </div>
                        {bug.suggestedFix && (
                          <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                            Suggested Fix: <span className="font-normal text-slate-600 dark:text-slate-300">{bug.suggestedFix}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RTM & Regression */}
          {activeTab === 'rtm' && isQA && project.qaArtifacts && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Requirements Traceability Matrix (RTM)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.qaArtifacts.rtmSummary}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>Test Plan Strategy & Entry/Exit Criteria</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.qaArtifacts.testPlanSummary}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Inspect live demo or source code on GitHub
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0f172a] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shadow-2xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
