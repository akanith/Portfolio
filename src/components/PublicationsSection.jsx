import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiBookOpen } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import PublicationCard from './PublicationCard';
import PublicationModal from './PublicationModal';
import { publications } from '../data/publications';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function PublicationsSection() {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedJournal, setSelectedJournal] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [selectedPub, setSelectedPub] = useState(null);
  
  const containerRef = useRef(null);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Get unique filters
  const years = useMemo(() => ['All', ...new Set(publications.map(p => p.year))].sort((a, b) => b - a), []);
  const journals = useMemo(() => ['All', ...new Set(publications.map(p => p.journal))].sort(), []);
  const categories = useMemo(() => ['All', ...new Set(publications.map(p => p.type))].sort(), []);

  // Compute Statistics
  const stats = useMemo(() => {
    return {
      total: publications.length,
      scopus: publications.filter(p => p.badges?.some(b => b.toLowerCase().includes('scopus'))).length,
      wos: publications.filter(p => p.badges?.some(b => b.toLowerCase().includes('wos') || b.toLowerCase().includes('ssci'))).length,
      conference: publications.filter(p => p.type?.toLowerCase().includes('conference')).length,
      books: publications.filter(p => p.type?.toLowerCase().includes('book') || p.type?.toLowerCase().includes('chapter')).length,
    };
  }, []);

  // Filter & Sort Publications
  const filteredPublications = useMemo(() => {
    let result = publications.filter(pub => {
      const matchesSearch = !search || 
        pub.title.toLowerCase().includes(search.toLowerCase()) ||
        pub.journal.toLowerCase().includes(search.toLowerCase()) ||
        pub.authors.some(a => a.toLowerCase().includes(search.toLowerCase()));

      const matchesYear = selectedYear === 'All' || pub.year === Number(selectedYear);
      const matchesJournal = selectedJournal === 'All' || pub.journal === selectedJournal;
      const matchesCategory = selectedCategory === 'All' || pub.type === selectedCategory;

      return matchesSearch && matchesYear && matchesJournal && matchesCategory;
    });

    // Sorting
    if (sortBy === 'Latest') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'Most Cited') {
      result.sort((a, b) => (b.citations || 0) - (a.citations || 0));
    }

    return result;
  }, [search, selectedYear, selectedJournal, selectedCategory, sortBy]);

  return (
    <section id="publications" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Floating abstract paper fragments simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/5 bg-white/[0.01] w-24 h-32 hidden md:block"
            style={{
              top: `${15 + i * 15}%`,
              left: i % 2 === 0 ? '5%' : '85%',
              transform: 'rotate(15deg)'
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [15, 20, 15],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-2">
              <SiGooglescholar size={14} className="text-accentGold" />
              Scholarly Work
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Publications
          </h2>
        </div>

        {/* Academic Stats Counters */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-16 border-y border-white/10 py-8 bg-cardBg/40 backdrop-blur-md px-6"
        >
          {[
            { label: "Total Publications", val: stats.total },
            { label: "Scopus Indexed", val: stats.scopus },
            { label: "Web of Science", val: stats.wos },
            { label: "Conference Papers", val: stats.conference },
            { label: "Book Chapters", val: stats.books }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <span className="block font-numbers text-3xl md:text-4xl text-accentGold font-light mb-1">
                {statsInView ? (
                  <CountUp end={stat.val} duration={2} useEasing={true} />
                ) : '0'}
              </span>
              <span className="block font-body text-[10px] tracking-widest uppercase text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Premium Filter Bar */}
        <div className="max-w-5xl mx-auto mb-12 bg-[#111111]/80 border border-white/10 p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by title, authors, journal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 pl-11 pr-4 py-3 text-white text-xs font-body tracking-wider focus:outline-none focus:border-accentGold transition-colors rounded-none placeholder-white/30"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-[10px] uppercase font-semibold text-white/40 font-body tracking-wider shrink-0">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-44 bg-black/40 border border-white/10 px-4 py-3 text-white text-xs font-body tracking-wider focus:outline-none focus:border-accentGold rounded-none cursor-pointer"
              >
                <option value="Latest" className="bg-[#111111]">Latest First</option>
                <option value="Oldest" className="bg-[#111111]">Oldest First</option>
                <option value="Most Cited" className="bg-[#111111]">Most Cited</option>
              </select>
            </div>
          </div>

          {/* Tag Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-semibold font-body">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-black/40 border border-white/10 px-3 py-2.5 text-white text-xs font-body tracking-wider focus:outline-none focus:border-accentGold rounded-none cursor-pointer"
              >
                {years.map(y => <option key={y} value={y} className="bg-[#111111]">{y}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-semibold font-body">Journal</label>
              <select
                value={selectedJournal}
                onChange={(e) => setSelectedJournal(e.target.value)}
                className="bg-black/40 border border-white/10 px-3 py-2.5 text-white text-xs font-body tracking-wider focus:outline-none focus:border-accentGold rounded-none cursor-pointer"
              >
                {journals.map(j => <option key={j} value={j} className="bg-[#111111]">{j}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-semibold font-body">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-black/40 border border-white/10 px-3 py-2.5 text-white text-xs font-body tracking-wider focus:outline-none focus:border-accentGold rounded-none cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c} className="bg-[#111111]">{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Alternating Editorial Layout List */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {filteredPublications.map((pub, idx) => (
            <PublicationCard 
              key={pub.id} 
              pub={pub} 
              index={idx} 
              onOpenModal={setSelectedPub} 
            />
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-24 text-white/40">
            <FiBookOpen size={48} strokeWidth={1} className="mx-auto mb-6 opacity-40 text-white" />
            <p className="font-heading font-medium text-xl text-white/60">No publications matched your filters.</p>
          </div>
        )}
      </div>

      <PublicationModal 
        pub={selectedPub} 
        isOpen={!!selectedPub} 
        onClose={() => setSelectedPub(null)} 
      />
    </section>
  );
}
