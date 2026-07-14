import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiDownload, FiBookOpen, FiCopy, FiCheck } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';

export default function PublicationModal({ pub, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!pub) return null;

  const authorsStr = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;

  const handleCopyCitation = () => {
    const citation = `${authorsStr} (${pub.year}). ${pub.title}. ${pub.journal}${pub.volume ? `, ${pub.volume}` : ''}${pub.issue ? `(${pub.issue})` : ''}${pub.pages ? `, ${pub.pages}` : ''}. https://doi.org/${pub.doi || ''}`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportBibtex = () => {
    const firstAuthor = Array.isArray(pub.authors) ? pub.authors[0] : pub.authors;
    const key = `${firstAuthor.split(',')[0].trim().replace(/\s/g, '')}${pub.year}`;
    const bibtex = `@article{${key},
  author    = {${authorsStr}},
  title     = {{${pub.title}}},
  journal   = {${pub.journal}},
  year      = {${pub.year}},
  volume    = {${pub.volume || ''}},
  number    = {${pub.issue || ''}},
  pages     = {${pub.pages || ''}},
  publisher = {${pub.publisher || 'Academic Publisher'}},
  doi       = {${pub.doi || ''}},
}`;
    const blob = new Blob([bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}.bib`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <div
            className="bg-[#111111] border border-accentGold/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl relative z-10 p-8 md:p-12 text-white scrollbar-thin"
          >
            {/* Header / Badges */}
            <div className="flex items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
              <div className="flex flex-wrap gap-2">
                {pub.badges?.map(b => (
                  <span key={b} className="font-body text-[10px] tracking-widest uppercase font-semibold text-accentGold px-3 py-1 bg-accentGold/10 border border-accentGold/20">
                    {b}
                  </span>
                ))}
                <span className="font-numbers text-xs font-light text-white/50 border border-white/10 px-3 py-1">
                  {pub.year}
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="font-body text-[9px] tracking-widest uppercase font-semibold text-accentGold mb-2 block">
                  Document Archive
                </span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-medium tracking-tight leading-snug">
                  {pub.title}
                </h2>
              </div>

              <div className="space-y-2 text-sm font-body">
                <p className="text-white/50">
                  <strong className="text-white font-semibold">Authors:</strong> {authorsStr}
                </p>
                <p className="text-white/50">
                  <strong className="text-white font-semibold">Journal:</strong> <span className="italic text-accentGold">{pub.journal}</span>
                </p>
                {pub.publisher && (
                  <p className="text-white/50">
                    <strong className="text-white font-semibold">Publisher:</strong> {pub.publisher}
                  </p>
                )}
                <p className="text-white/50">
                  <strong className="text-white font-semibold">Metadata:</strong> Vol. {pub.volume || 'N/A'}, Issue {pub.issue || 'N/A'}, Pages: {pub.pages || 'N/A'}
                </p>
                {pub.doi && (
                  <p className="text-white/50">
                    <strong className="text-white font-semibold">DOI:</strong> <span className="font-numbers text-accentGold">{pub.doi}</span>
                  </p>
                )}
              </div>

              {/* Mocked Abstract / Summary for demonstration */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="font-heading text-xl text-white flex items-center gap-2">
                  <FiBookOpen className="text-accentGold" />
                  Abstract & Key Research Insights
                </h3>
                <p className="font-body text-white/70 text-sm md:text-base leading-relaxed font-light">
                  This scholarly contribution presents a comprehensive analysis of modern pedagogical tools and communication methodologies. By integrating state-of-the-art technological infrastructures and sustainable curriculum designs, the study demonstrates significant advancements in learner autonomy, linguistic competence, and professional communication preparedness. The empirical findings underscore the critical role of innovative teaching models in higher education frameworks.
                </p>
              </div>

              {/* Actions Grid */}
              <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                {pub.doi && (
                  <a 
                    href={`https://doi.org/${pub.doi}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-accentGold text-background px-6 py-3 font-body text-xs tracking-wider uppercase hover:bg-white transition-colors duration-500"
                  >
                    <FiExternalLink size={14} />
                    DOI Link
                  </a>
                )}
                
                {pub.url && (
                  <a 
                    href={pub.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 border border-white/10 hover:border-white px-6 py-3 font-body text-xs tracking-wider uppercase text-white transition-colors"
                  >
                    <FiDownload size={14} />
                    Download PDF
                  </a>
                )}

                <a 
                  href="https://scholar.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-white px-6 py-3 font-body text-xs tracking-wider uppercase text-white transition-colors"
                >
                  <SiGooglescholar size={14} />
                  Google Scholar
                </a>

                <button 
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-white px-6 py-3 font-body text-xs tracking-wider uppercase text-white transition-colors"
                >
                  {copied ? <FiCheck className="text-accentGold" size={14} /> : <FiCopy size={14} />}
                  Copy Citation
                </button>

                <button 
                  onClick={handleExportBibtex}
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-white px-6 py-3 font-body text-xs tracking-wider uppercase text-white transition-colors"
                >
                  <FiDownload size={14} />
                  Export BibTeX
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
