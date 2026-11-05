import { FC, useState, useEffect } from 'react';
import { FileText, ExternalLink, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: FC<NavbarProps> = ({ onOpenResume }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler with offset for sticky navbar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs transition-colors no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / Brand Name (matches screenshot) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors truncate focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            aria-label="Mohammad Wahyu Sanusi Putra - Return to top"
          >
            {personalInfo.name}
          </a>

          {/* Desktop Horizontal Navigation (1024px and above) */}
          <nav
            className="hidden lg:flex items-center gap-6 text-sm font-medium"
            aria-label="Desktop Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1 px-1.5 ${
                    isActive
                      ? 'text-blue-600 font-bold'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* CV Badge Button (matches screenshot) */}
            <button
              onClick={onOpenResume}
              className="bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs px-2.5 py-1 rounded-md tracking-wider transition-colors shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="View and Download CV"
            >
              CV
            </button>

            {/* Mobile & Tablet Toggle Button (matches screenshot) */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="lg:hidden p-1 text-slate-800 hover:text-slate-900 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Menu Overlay & Drawer (Matches screenshot pixel-for-pixel) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 lg:hidden">
          {/* Subtle dim backdrop to close when clicking outside */}
          <div
            className="fixed inset-0 top-16 bg-slate-900/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Panel */}
          <div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="relative z-40 bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
          >
            <div className="max-w-6xl mx-auto px-6 pt-2 pb-6 space-y-4">
              {/* Vertical Navigation Links with thin dividers */}
              <nav className="divide-y divide-slate-100" aria-label="Mobile Navigation Links">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block py-3.5 text-base font-normal transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        isActive
                          ? 'text-slate-900 font-semibold'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Primary View & Download CV Action Button (matches screenshot) */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full mt-2 py-3 px-4 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <FileText className="w-4 h-4" />
                <span>View &amp; Download CV</span>
              </button>

              {/* GitHub ↗ · LinkedIn ↗ Links (matches screenshot) */}
              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-500 font-medium">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-300">·</span>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
