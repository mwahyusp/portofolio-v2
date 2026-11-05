import { FC, useEffect, useState } from 'react';
import { X, Mail, MapPin, Linkedin, Github, Globe, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { personalInfo, workExperience, skillCategories, featuredProjects, educationList } from '../data/portfolioData';
import { CareerTrack } from '../types';

interface TargetedCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: CareerTrack;
}

export const TargetedCVModal: FC<TargetedCVModalProps> = ({ isOpen, onClose, initialTrack = 'all' }) => {
  const [selectedTarget, setSelectedTarget] = useState<CareerTrack>(initialTrack);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    setSelectedTarget(initialTrack);
  }, [initialTrack]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Role-targeted tailored summaries and headlines
  const targetConfig = {
    all: {
      headline: 'IT Professional | Frontend Developer | Manual QA Tester',
      targetLabel: 'General IT Portfolio',
      summary:
        'IT Professional with verified experience in IT Support Operations and Frontend Development, supplemented by practical hands-on portfolio projects in Manual Software Testing. Offering a strong blend of diagnostic troubleshooting, incident handling, modern JavaScript/React interface development, and systematic test documentation. Ready to bring immediate value to IT operations, web development, or quality assurance teams.',
    },
    'it-support': {
      headline: 'IT Support Specialist | Helpdesk & Technical Operations',
      targetLabel: 'IT Support & Helpdesk Focus',
      summary:
        'IT Support Specialist with approximately three years of professional experience in Integrated Operations Center (IOC) Helpdesk environments. Proven track record in incident triage, SLA-driven ticket management, tier-1/tier-2 hardware and software troubleshooting, infrastructure monitoring, and coordinating on-site field technicians for swift incident closure. Detail-oriented, customer-focused, and eager to resume professional IT support operations.',
    },
    frontend: {
      headline: 'Frontend Developer | React.js & Modern Web Technologies',
      targetLabel: 'Frontend Developer Focus',
      summary:
        'Frontend Developer with approximately one year of professional employment experience building web user interfaces in React.js, complemented by extensive personal project development. Skilled in responsive design, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), component lifecycles, and state management. Passionate about creating clean, accessible, and high-performance digital interfaces.',
    },
    'qa-testing': {
      headline: 'Manual QA Tester | Software Quality Assurance',
      targetLabel: 'Manual QA Tester Focus',
      summary:
        'Detail-oriented Manual QA Tester with practical hands-on project experience authoring comprehensive test artifacts for web and e-commerce platforms. Proficient in test case design (positive, negative, boundary value), test plan authoring, regression checklists, structured defect reporting with reproducible steps, and Requirements Traceability Matrices (RTM). Proven ability to identify edge-case defects and validate business requirements.',
    },
  }[selectedTarget];

  // Direct PDF generation using jsPDF
  const generatePDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 16;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > 280) {
          doc.addPage();
          y = 16;
        }
      };

      // Header: Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(personalInfo.name.toUpperCase(), margin, y);
      y += 6;

      // Header: Target Headline
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text(targetConfig.headline, margin, y);
      y += 5;

      // Contact Info line
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105); // slate-600

      const part1 = `${personalInfo.location}  |  Email: `;
      const part1Width = doc.getTextWidth(part1);
      const emailText = personalInfo.email;
      const emailWidth = doc.getTextWidth(emailText);
      const part2 = `  |  LinkedIn: linkedin.com/in/mwahyusp  |  GitHub: github.com/mwahyusp`;

      doc.text(part1, margin, y);

      // Render visually blurred email effect in PDF
      doc.setTextColor(148, 163, 184); // slate-400
      const blurOffsets = [
        [-0.3, -0.2], [0.3, 0.2], [-0.2, 0.2], [0.2, -0.2],
        [-0.4, 0], [0.4, 0], [0, -0.3], [0, 0.3], [0, 0]
      ];
      blurOffsets.forEach(([dx, dy]) => {
        doc.text(emailText, margin + part1Width + dx, y + dy);
      });

      doc.setTextColor(71, 85, 105);
      doc.text(part2, margin + part1Width + emailWidth, y);
      y += 4;

      // Divider line
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(0.4);
      doc.line(margin, y, margin + contentWidth, y);
      y += 5;

      // SECTION 1: Professional Summary
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('PROFESSIONAL SUMMARY', margin, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const summaryLines = doc.splitTextToSize(targetConfig.summary, contentWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 3.8 + 3;

      // SECTION 2: Core Competencies / Skills
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('CORE SKILLS & COMPETENCIES', margin, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);

      const skillLines = [
        'IT Support & Operations: IT Helpdesk Operations, Incident Triage & Handling, Ticket Management, Technical Troubleshooting, System Monitoring, Field Technician Coordination.',
        'Frontend Development: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive Web Design, Git & GitHub Version Control.',
        'Manual Software Testing: Manual Testing, Test Case Design, Functional Testing, Boundary Analysis, Regression Testing, Bug Reporting, Requirements Traceability Matrix (RTM).',
      ];

      skillLines.forEach((line) => {
        const split = doc.splitTextToSize(`•  ${line}`, contentWidth);
        doc.text(split, margin, y);
        y += split.length * 3.6 + 1.2;
      });
      y += 2;

      // SECTION 3: Professional Experience
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('PROFESSIONAL EXPERIENCE & DEVELOPMENT', margin, y);
      y += 4;

      workExperience.forEach((exp) => {
        checkPageBreak(30);

        // Role & Company
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`${exp.role} — ${exp.companyOrContext}`, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const rightText = `${exp.period}${exp.duration ? ` (${exp.duration})` : ''}`;
        doc.text(rightText, margin + contentWidth, y, { align: 'right' });
        y += 4;

        // Brief summary
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        const expSum = doc.splitTextToSize(exp.summary, contentWidth);
        doc.text(expSum, margin, y);
        y += expSum.length * 3.4 + 2;

        // Key bullet points (top 3 for concise fit)
        exp.highlights.slice(0, 3).forEach((h) => {
          checkPageBreak(8);
          const hLines = doc.splitTextToSize(`- ${h}`, contentWidth - 4);
          doc.text(hLines, margin + 2, y);
          y += hLines.length * 3.2 + 0.8;
        });
        y += 3;
      });

      // SECTION 4: Featured Projects
      checkPageBreak(35);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('FEATURED PROJECTS & TECHNICAL EVIDENCE', margin, y);
      y += 4;

      featuredProjects.forEach((proj) => {
        checkPageBreak(18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`${proj.title}  [${proj.category}]`, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(37, 99, 235);
        const urlText = proj.liveDemoUrl || proj.githubUrl;
        doc.text(urlText, margin + contentWidth, y, { align: 'right' });
        y += 3.5;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(8);
        const desc = doc.splitTextToSize(`• ${proj.shortDescription} (Tech: ${proj.technologies.slice(0, 4).join(', ')})`, contentWidth);
        doc.text(desc, margin, y);
        y += desc.length * 3.2 + 1.5;
      });

      // SECTION 5: Education
      checkPageBreak(20);
      y += 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('EDUCATION', margin, y);
      y += 4;

      educationList.slice(0, 2).forEach((edu) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(edu.degree, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        doc.text(edu.period, margin + contentWidth, y, { align: 'right' });
        y += 3.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text(edu.institution, margin, y);
        y += 4.5;
      });

      const cleanTargetName = selectedTarget.replace('-', '_');
      doc.save(`Mohammad_Wahyu_Sanusi_Putra_CV_${cleanTargetName}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to browser print if library encounters an issue
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="targeted-cv-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Controls Header */}
        <div className="flex flex-col gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50 no-print" data-no-print>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 id="targeted-cv-title" className="text-base sm:text-lg font-bold text-slate-900">
                Curriculum Vitae &amp; Resume
              </h3>
              <p className="text-xs text-slate-500">
                Feel free to explore my background below or download a copy for your hiring team.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0f172a] rounded-lg hover:bg-slate-800 transition-all shadow-xs active:scale-95 disabled:opacity-60 whitespace-nowrap"
              >
                <FileDown className="w-4 h-4" />
                <span>{isGeneratingPDF ? 'Preparing Resume...' : 'Download My Resume'}</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close CV preview"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Target Role Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
            <span className="text-xs font-medium text-slate-500 mr-1">
              View perspective for:
            </span>
            {(
              [
                { id: 'all', label: 'All-Around Profile' },
                { id: 'it-support', label: 'IT Support & Operations' },
                { id: 'frontend', label: 'Frontend Developer' },
                { id: 'qa-testing', label: 'Manual QA Tester' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTarget(t.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                  selectedTarget === t.id
                    ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div
          id="cv-print-area"
          className="cv-document-sheet p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-900 bg-white text-xs sm:text-sm"
        >
          {/* Resume Header */}
          <div className="cv-header border-b border-slate-200 pb-5 space-y-2 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {personalInfo.name}
            </h1>
            <p className="text-sm font-semibold text-slate-800">
              {targetConfig.headline}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
              <span aria-hidden="true">·</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1 text-slate-700 hover:text-slate-900 group"
                title="Hover or click to reveal email"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                <span className="blurred-email">
                  {personalInfo.email}
                </span>
              </a>
              <span aria-hidden="true">·</span>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-700 hover:underline">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                linkedin.com/in/mwahyusp
              </a>
              <span aria-hidden="true">·</span>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-700 hover:underline">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                github.com/mwahyusp
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="cv-section-item space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {targetConfig.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="cv-section-item space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              Core Skills & Technical Competencies
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white">IT Support & Operations:</strong> IT Helpdesk Operations, Incident Triage, Ticket Lifecycle Management, Technical Troubleshooting, System Monitoring, Field Technician Coordination.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Frontend Development:</strong> HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive Web Design, Git & GitHub.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Manual Software Testing:</strong> Test Case Design, Functional Testing, Regression Checklists, Bug Reporting, Requirements Traceability Matrix (RTM), Defect Lifecycle.
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="cv-section-item space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              Professional Experience & Development Timeline
            </h2>

            {workExperience.map((exp) => (
              <div key={exp.role} className="space-y-1.5 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {exp.role}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 text-xs">
                      {' '}— {exp.companyOrContext}
                      {exp.contractType && ` · ${exp.contractType}`}
                      {exp.location && ` · ${exp.location}`}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {exp.period} {exp.duration && `(${exp.duration})`}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.summary}
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1">
                  {exp.highlights.slice(0, 4).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="cv-section-item space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              Featured Projects & Technical Evidence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredProjects.map((p) => (
                <div key={p.id} className="p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-[10px] text-blue-600 font-semibold">{p.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {p.shortDescription}
                  </p>
                  <div className="text-[10px] text-slate-500">
                    Tech: {p.technologies.slice(0, 4).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="cv-section-item space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Education
            </h2>
            <div className="text-xs text-slate-700 space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between font-semibold text-slate-900">
                <span>Bachelor&apos;s Degree (S1) in Information Technology</span>
                <span className="font-normal text-slate-500">2017</span>
              </div>
              <div className="text-slate-600">
                Universitas Nusa Mandiri (formerly STMIK Nusa Mandiri Jakarta)
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Friendly CTA Bar */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print" data-no-print>
          <div className="text-xs text-slate-500">
            Tailored perspective: <strong className="text-slate-800 font-semibold">{targetConfig.targetLabel}</strong>
          </div>
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0f172a] rounded-lg hover:bg-slate-800 transition-all shadow-xs active:scale-95 disabled:opacity-60 whitespace-nowrap"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{isGeneratingPDF ? 'Preparing Resume...' : 'Download My Resume'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
