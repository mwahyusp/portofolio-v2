import { PERSONAL_INFO, UI_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = UI_TRANSLATIONS[lang].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Logo & Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-block py-1">
              <picture>
                <source type="image/webp" srcSet={PERSONAL_INFO.logoWebp} />
                <img
                  src={PERSONAL_INFO.logoPng}
                  alt="Logo MWSP"
                  className="h-10 w-auto object-contain"
                />
              </picture>
            </a>

            <h3 className="text-xl font-bold text-white mt-2">
              Mohammad Wahyu Sanusi Putra
            </h3>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.desc}
            </p>

            <address className="not-italic text-sm text-slate-400 space-y-1 pt-2">
              <p>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-teal-400 transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>{PERSONAL_INFO.address}</p>
            </address>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wider uppercase">{t.navHeader}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-teal-400 transition-colors">
                  {UI_TRANSLATIONS[lang].nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  {UI_TRANSLATIONS[lang].nav.about}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-teal-400 transition-colors">
                  {UI_TRANSLATIONS[lang].nav.portfolio}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-teal-400 transition-colors">
                  {UI_TRANSLATIONS[lang].nav.skills}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-400 transition-colors">
                  {UI_TRANSLATIONS[lang].nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wider uppercase">{t.socialHeader}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-2">
                  <span>GitHub</span>
                  <span className="text-xs text-slate-500">(@mwahyusp)</span>
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-2">
                  <span>LinkedIn</span>
                  <span className="text-xs text-slate-500">(/in/mwahyusp)</span>
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-2">
                  <span>Instagram</span>
                  <span className="text-xs text-slate-500">(@mwahyusp)</span>
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-2">
                  <span>Twitter / X</span>
                  <span className="text-xs text-slate-500">(@mwhysp)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Notice */}
        <div className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; <span className="text-slate-300 font-semibold">{currentYear}</span>{' '}
            <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-400 font-bold hover:underline">
              Mohammad Wahyu Sanusi Putra
            </a>. {t.rights}
          </p>

          <p className="flex items-center gap-1.5">
            <span>{t.developedWith}</span>
            <span className="text-teal-400 font-semibold">React</span>
            <span>&</span>
            <span className="text-sky-400 font-semibold">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
