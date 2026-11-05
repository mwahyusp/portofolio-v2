import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { TargetedCVModal } from './components/TargetedCVModal';
import { CareerTrack, Project } from './types';

export default function App() {
  const [currentTrack] = useState<CareerTrack>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Enforce consistent light mode as required
    document.documentElement.classList.remove('dark');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('theme');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Container (Desktop baseline 1440px compatible with max-w-6xl) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        {/* Hero Section */}
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* About Me Section */}
        <AboutSection />

        {/* Categorized Skills (No Percentage Bars) */}
        <SkillsSection currentTrack={currentTrack} />

        {/* Featured Projects with QA Artifacts */}
        <ProjectsSection
          currentTrack={currentTrack}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Work Experience Timeline */}
        <ExperienceSection
          currentTrack={currentTrack}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Education & Continuous Learning */}
        <EducationSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Deep-Dive / QA Artifact Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Targeted / ATS-Compliant CV Modal with direct PDF generation */}
      <TargetedCVModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        initialTrack={currentTrack}
      />
    </div>
  );
}
