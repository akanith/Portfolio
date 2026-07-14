import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCopy, FiCheck, FiBookOpen } from 'react-icons/fi';
import TiltCard from './TiltCard';

export default function PublicationCard({ pub, index, onOpenModal }) {
  const [copied, setCopied] = useState(false);
  const isEven = index % 2 === 0;

  const handleCopyCitation = () => {
    const authorsStr = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;
    const citation = `${authorsStr} (${pub.year}). ${pub.title}. ${pub.journal}${pub.volume ? `, ${pub.volume}` : ''}${pub.issue ? `(${pub.issue})` : ''}${pub.pages ? `, ${pub.pages}` : ''}. https://doi.org/${pub.doi || ''}`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const authorsDisplay = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;

  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onOpenModal && onOpenModal(pub)}
        className="relative overflow-hidden bg-[#111111]/80 backdrop-blur-md border border-[#D4AF37]/25 hover:border-accentGold hover:shadow-card-hover transition-all duration-500 cursor-pointer group rounded-none p-8 md:p-12"
      >
        {/* Soft light sweep overlay */}
        <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-transform duration-1000 ease-out pointer-events-none" />

        <div className={`flex flex-col md:flex-row gap-8 items-start justify-between ${isEven ? '' : 'md:flex-row-reverse'}`}>
          
          {/* Main Info */}
          <div className="flex-1 space-y-4">
            {/* Top Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="font-numbers text-accentGold text-base font-light tracking-widest">{pub.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="font-body text-white/50 tracking-widest uppercase font-semibold text-[9px]">{pub.type}</span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-medium text-white text-2xl lg:text-3xl leading-snug group-hover:text-accentGold transition-colors duration-500">
              {pub.title}
            </h3>

            {/* Authors */}
            <p className="font-body text-white/60 text-sm font-light leading-relaxed">
              {authorsDisplay}
            </p>

            {/* Journal */}
            <p className="font-body text-accentGold text-base font-medium italic">{pub.journal}</p>
          </div>

          {/* Badges / Citations Column */}
          <div className="flex flex-row md:flex-col items-start md:items-end gap-3 flex-wrap md:w-48 shrink-0">
            {pub.badges?.map((badge) => (
              <span key={badge} className="font-body text-[9px] tracking-widest uppercase font-semibold text-accentGold px-2.5 py-1 bg-accentGold/10 border border-accentGold/20 rounded-none group-hover:bg-accentGold/20 transition-colors duration-300">
                {badge}
              </span>
            ))}
            {pub.citations !== undefined && (
              <span className="font-numbers text-xs font-light text-white/50 border border-white/10 px-2.5 py-1 flex items-center gap-1.5 rounded-none">
                <FiBookOpen size={12} className="text-accentGold group-hover:animate-pulse" />
                {pub.citations} Citations
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-6 flex-wrap pt-6 mt-8 border-t border-white/5">
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold text-white/50 hover:text-white transition-colors"
            >
              <FiExternalLink size={12} />
              DOI Reference
            </a>
          )}
          
          <button
            onClick={(e) => { e.stopPropagation(); handleCopyCitation(); }}
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold text-white/50 hover:text-white transition-colors"
          >
            {copied ? <span className="text-accentGold">✓ Copied</span> : (
              <>
                <FiCopy size={12} />
                Copy Citation
              </>
            )}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onOpenModal && onOpenModal(pub); }}
            className="ml-auto inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold text-white/50 hover:text-accentGold transition-colors group/btn"
          >
            Open Document Archive
            <FiExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </TiltCard>
  );
}
