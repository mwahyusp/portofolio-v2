import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Copy, Check, MapPin, Sparkles, CheckCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, UI_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = UI_TRANSLATIONS[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending form message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Effect!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#10b981', '#06b6d4', '#3b82f6']
      });

      // Reset form after 5s
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2 block">
            {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.sectionDesc}
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-slate-50 dark:bg-slate-800/90 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-teal-500" />
                <span>{t.infoTitle}</span>
              </h3>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 shadow-sm group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{t.emailLabel}</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 truncate block">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyEmailToClipboard}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-teal-600 shrink-0 relative"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3 shadow-sm">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{t.locationLabel}</span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {PERSONAL_INFO.address}
                  </p>
                </div>
              </div>

              {/* Toast confirmation message */}
              <AnimatePresence>
                {copiedEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.copySuccess}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Animated Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-slate-50 dark:bg-slate-800/90 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl relative">
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.successTitle}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                      {t.successDesc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {t.formNameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.formNamePlaceholder}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {t.formEmailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.formEmailPlaceholder}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {t.formMessageLabel}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.formMessagePlaceholder}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-600 text-white font-bold text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t.sendingBtn}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>{t.sendBtn}</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
