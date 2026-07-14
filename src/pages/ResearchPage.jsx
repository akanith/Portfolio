import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ResearchCards from '../components/ResearchCards';
import { researchInterests } from '../data/research';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
};

const ongoingProjects = [
  {
    title: "Gamification Framework for Engineering ESP",
    status: "Ongoing",
    funding: "Institution-funded",
    year: "2022–Present",
    description: "Developing and validating an adaptive gamification framework specifically designed for engineering English communication courses, targeting professional readiness outcomes.",
  },
  {
    title: "Education 4.0 Readiness in South Indian Higher Education",
    status: "Ongoing",
    funding: "Collaborative",
    year: "2023–Present",
    description: "A multi-institutional study examining faculty readiness, institutional infrastructure, and student adaptability in adopting Education 4.0 technologies across South Indian universities.",
  },
  {
    title: "Corpus-Based ESP Curriculum Redesign",
    status: "Completed",
    funding: "Department-funded",
    year: "2021–2022",
    description: "A completed project that employed corpus linguistic methods to redesign the B.E. English Communication curriculum at CS Academy, aligning it with industry communicative needs.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <Helmet>
        <title>Research | Dr. D. Sri Dhivya</title>
        <meta name="description" content="Research profile of Dr. D. Sri Dhivya covering ESP, Education 4.0, Technology Enhanced Learning, Gamification, and Educational Sustainability." />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-[#0a2a4a] pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Scholarly Focus
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Research Profile
          </motion.h1>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Interdisciplinary research bridging applied linguistics, educational technology, and pedagogical innovation — producing impactful scholarship for a globalised academic community.
          </motion.p>
        </div>
      </div>

      {/* Research Interests Cards */}
      <ResearchCards />

      {/* Research Philosophy */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Research Philosophy</h2>
            <div className="divider-accent-center mt-4" />
          </motion.div>

          <div className="prose-lg max-w-none space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              My research is grounded in the conviction that rigorous academic inquiry must speak to real-world educational challenges. I am committed to producing scholarship that is methodologically sound, contextually relevant, and practically applicable — research that not only advances theoretical understanding but genuinely improves learning outcomes for students in higher education.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Interdisciplinarity is central to my approach. By drawing on applied linguistics, cognitive science, educational psychology, and information technology, I aim to produce nuanced, multi-dimensional analyses of how learners acquire professional communicative competence in technologically mediated environments.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I am equally committed to collaborative and open research. Partnerships with colleagues across institutions and disciplines enrich my work, and I welcome enquiries regarding collaborative projects, co-authorship, or joint grant applications.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="section-padding bg-background dark:bg-gray-950">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Active Work</p>
            <h2 className="section-title">Research Projects</h2>
            <div className="divider-accent-center mt-4" />
          </motion.div>

          <div className="space-y-5">
            {ongoingProjects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card dark:bg-gray-800 dark:border-gray-700 p-6 group"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`badge text-xs ${proj.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                      {proj.status}
                    </span>
                    <span className="badge bg-secondary/10 text-secondary text-xs">{proj.funding}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{proj.year}</span>
                </div>
                <h3 className="font-heading font-bold text-primary dark:text-white text-lg mb-2">{proj.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{proj.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
