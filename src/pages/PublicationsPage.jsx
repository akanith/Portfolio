import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  FiSearch, FiFilter, FiX, FiBookOpen, FiTrendingUp,
  FiCalendar, FiAward, FiBarChart2, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import PublicationCard from '../components/PublicationCard';
import PublicationModal from '../components/PublicationModal';
import { publications } from '../data/publications';

const ITEMS_PER_PAGE = 5;

// Publication statistics
const totalCitations = publications.reduce((sum, p) => sum + (p.citations || 0), 0);
const badgeCounts = {
  Scopus: publications.filter(p => p.badges?.includes('Scopus')).length,
  WoS: publications.filter(p => p.badges?.includes('WoS')).length,
  SCI: publications.filter(p => p.badges?.includes('SCI')).length,
  ESCI: publications.filter(p => p.badges?.includes('ESCI')).length,
};

function StatCard({ icon: Icon, value, label, color, suffix = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="text-center">
      <div className={`inline-flex items-center gap-1 text-3xl font-heading font-bold ${color}`}>
        {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="text-white/70 text-xs mt-0.5">{label}</p>
    </div>
  );
}

export default function PublicationsPage() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [journalFilter, setJournalFilter] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'oldest' | 'most-cited'
  const [page, setPage] = useState(1);
  const [selectedPub, setSelectedPub] = useState(null);

  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
  const journals = [...new Set(publications.map(p => p.journal))].sort();

  const filtered = useMemo(() => {
    const result = publications.filter(pub => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q) ||
        String(pub.year).includes(q);
      const matchYear = !yearFilter || pub.year === parseInt(yearFilter);
      const matchJournal = !journalFilter || pub.journal === journalFilter;
      return matchSearch && matchYear && matchJournal;
    });

    // Sort
    if (sortBy === 'latest') result.sort((a, b) => b.year - a.year);
    if (sortBy === 'oldest') result.sort((a, b) => a.year - b.year);
    if (sortBy === 'most-cited') result.sort((a, b) => (b.citations || 0) - (a.citations || 0));

    return result;
  }, [search, yearFilter, journalFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch('');
    setYearFilter('');
    setJournalFilter('');
    setSortBy('latest');
    setPage(1);
  };

  const hasFilters = search || yearFilter || journalFilter || sortBy !== 'latest';

  return (
    <>
      <Helmet>
        <title>Publications | Dr. D. Sri Dhivya — Assistant Professor</title>
        <meta
          name="description"
          content="Peer-reviewed publications by Dr. D. Sri Dhivya. Scopus, Web of Science, and SCI-indexed journals on ESP, gamification, Education 4.0, and technology enhanced learning."
        />
        <meta property="og:title" content="Publications | Dr. D. Sri Dhivya" />
        <meta property="og:description" content="Browse peer-reviewed research publications by Dr. D. Sri Dhivya." />
        <link rel="canonical" href="https://drsridhivya.edu.in/publications" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'Publications by Dr. D. Sri Dhivya',
            'numberOfItems': publications.length,
            'itemListElement': publications.map((pub, i) => ({
              '@type': 'ScholarlyArticle',
              'position': i + 1,
              'name': pub.title,
              'author': pub.authors,
              'datePublished': pub.year,
              'isPartOf': { '@type': 'Periodical', 'name': pub.journal },
            })),
          })}
        </script>
      </Helmet>

      {/* ── HERO HEADER ── */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-[#0a2a4a] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-5"
          >
            <SiGooglescholar size={13} className="text-accent" />
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase">Scholarly Work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Publications
          </motion.h1>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-10" />

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <StatCard icon={FiBookOpen} value={publications.length} label="Publications" color="text-white" suffix="+" />
            <StatCard icon={FiTrendingUp} value={totalCitations} label="Total Citations" color="text-accent" suffix="+" />
            <StatCard icon={FiAward} value={badgeCounts.Scopus} label="Scopus Papers" color="text-orange-300" />
            <StatCard icon={FiBarChart2} value={badgeCounts.WoS} label="WoS Papers" color="text-blue-300" />
          </motion.div>

          {/* Badge pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {Object.entries(badgeCounts).filter(([, c]) => c > 0).map(([key, count]) => (
              <div key={key} className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">
                <span className="text-accent font-bold text-xs">{key}</span>
                <span className="text-white/60 text-xs">{count} paper{count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="section-padding bg-background dark:bg-gray-950">
        <div className="container-custom max-w-5xl">

          {/* ── FILTER BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6 shadow-card"
          >
            <div className="flex flex-col gap-3">
              {/* Row 1: search */}
              <div className="relative">
                <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="pub-search"
                  type="text"
                  placeholder="Search by title, author, journal, or year..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                />
              </div>

              {/* Row 2: filters + sort */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* Year filter */}
                <div className="relative">
                  <FiCalendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    id="pub-year-filter"
                    value={yearFilter}
                    onChange={(e) => { setYearFilter(e.target.value); setPage(1); }}
                    className="pl-8 pr-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/40 appearance-none cursor-pointer"
                  >
                    <option value="">All Years</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                {/* Journal filter */}
                <div className="relative flex-1 min-w-[150px] max-w-xs">
                  <FiFilter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    id="pub-journal-filter"
                    value={journalFilter}
                    onChange={(e) => { setJournalFilter(e.target.value); setPage(1); }}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/40 appearance-none cursor-pointer"
                  >
                    <option value="">All Journals</option>
                    {journals.map(j => <option key={j} value={j}>{j.length > 35 ? j.substring(0, 35) + '…' : j}</option>)}
                  </select>
                </div>

                {/* Sort */}
                <div className="flex gap-1.5 ml-auto">
                  {[
                    { key: 'latest', icon: FiArrowDown, label: 'Latest' },
                    { key: 'oldest', icon: FiArrowUp, label: 'Oldest' },
                    { key: 'most-cited', icon: FiTrendingUp, label: 'Most Cited' },
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      onClick={() => { setSortBy(key); setPage(1); }}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        sortBy === key
                          ? 'bg-primary text-white shadow-sm'
                          : 'border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={12} />
                      {label}
                    </button>
                  ))}
                </div>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-500 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiX size={12} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-gray-400 text-sm">
              Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{paginated.length}</span> of{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span> publications
              {hasFilters && <span className="ml-1 text-secondary font-medium">(filtered)</span>}
            </p>
            <a
              href="https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary dark:text-secondary dark:hover:text-white transition-colors font-medium"
            >
              <SiGooglescholar size={13} />
              View on Google Scholar
            </a>
          </div>

          {/* Publication list */}
          <div className="space-y-4">
            {paginated.length > 0 ? (
              paginated.map((pub, i) => (
                <PublicationCard key={pub.id} pub={pub} index={i} onOpenModal={setSelectedPub} />
              ))
            ) : (
              <div className="text-center py-16 text-gray-400">
                <FiBookOpen size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-heading font-medium text-lg">No publications match your search.</p>
                <p className="text-sm mt-1 text-gray-300">Try different keywords or clear the filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-secondary text-sm font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    p === page
                      ? 'bg-primary text-white shadow-md scale-110'
                      : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* ── MODAL ── */}
      <PublicationModal 
        pub={selectedPub} 
        isOpen={!!selectedPub} 
        onClose={() => setSelectedPub(null)} 
      />
    </>
  );
}
