import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBookOpen, FiTarget, FiHeart, FiStar } from 'react-icons/fi';
import profileImg from '../assets/images/profile.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const cards = [
  {
    icon: <FiBookOpen size={20} />,
    title: "Teaching",
    desc: "Empowering students with communication skills and critical thinking through learner-centred, technology-integrated pedagogy.",
    color: "bg-cardBg border-borderGlass",
    iconColor: "text-accentGold bg-accentGold/10",
  },
  {
    icon: <FiTarget size={20} />,
    title: "Research",
    desc: "Publishing interdisciplinary research at the intersection of applied linguistics, educational technology, and cognitive science.",
    color: "bg-cardBg border-borderGlass",
    iconColor: "text-accentGold bg-accentGold/10",
  },
  {
    icon: <FiStar size={20} />,
    title: "Innovation",
    desc: "Pioneering gamification and Education 4.0 frameworks that redefine engagement and learning outcomes in higher education.",
    color: "bg-cardBg border-borderGlass",
    iconColor: "text-accentGold bg-accentGold/10",
  },
  {
    icon: <FiHeart size={20} />,
    title: "Impact",
    desc: "Creating sustainable, equitable educational experiences that transcend institutional boundaries and inspire lifelong learning.",
    color: "bg-cardBg border-borderGlass",
    iconColor: "text-accentGold bg-accentGold/10",
  },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.25em] uppercase">About</span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="section-title">Faculty Profile</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-start">
          {/* Left — Image */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-8"
          >
            <div className="relative w-64 h-80 lg:w-full lg:h-96 max-w-xs rounded-none overflow-hidden border border-borderGlass">
              <img
                src={profileImg}
                alt="Dr. D. Sri Dhivya"
                className="w-full h-full object-cover object-top filter grayscale contrast-125 saturate-[0.8] brightness-90 hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/80 backdrop-blur-md p-4 border border-white/10 rounded-none">
                  <p className="font-heading font-medium text-white text-base">Dr. D. Sri Dhivya</p>
                  <p className="font-body text-accentGold text-xs mt-1">Ph.D., M.A. English | B.Sc. CS</p>
                </div>
              </div>
            </div>

            {/* Contact brief */}
            <div className="w-full space-y-3 max-w-xs border-t border-borderGlass pt-6">
              {[
                { label: 'Position', value: 'Faculty of English' },
                { label: 'Department', value: 'English' },
                { label: 'Institution', value: 'CS Academy International' },
                { label: 'Location', value: 'Coimbatore, TN' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 text-xs font-body tracking-wider">
                  <span className="text-white/40 w-24 shrink-0 uppercase font-semibold">{item.label}</span>
                  <span className="text-white/80 font-light">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Biography */}
          <div className="lg:col-span-3 space-y-12">
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}>
              <h3 className="font-heading text-3xl font-medium text-white mb-6">Biography</h3>
              <div className="space-y-6 text-textSecondary font-light leading-relaxed text-[0.98rem]">
                <p>
                  My career has been deeply rooted in a passion for teaching and learning, focusing on nurturing students' success and growth. Despite the diverse career options available, I chose education as my lifelong pursuit, dedicating myself to empowering students with essential communication skills and critical thinking abilities. Over the past decade, I have successfully prepared learners for success in an increasingly competitive global job market, while integrating gamification strategies to enhance engagement and motivation. I also embrace technology-enhanced learning, blending traditional pedagogy with modern tools to enrich the educational experience and promote educational sustainability.
                </p>
                <p>
                  Alongside teaching, I am committed to advancing research in education, technology, professional communication, and psychology. My PhD research has contributed to the academic community through publications in English for Specific Purposes (ESP), Education 4.0, and Higher Education. I have published several research articles, with works featured in Scopus, Web of Science (WoS), and SCI Impact Factor journals.
                </p>
                <p>
                  I have also presented a wide array of research papers in international forums, including in Thailand and Malaysia, contributing to global dialogues in education and language learning. With a healthy and dynamic approach to both teaching and personal development, I look forward to bringing my skills and dedication to your esteemed institution.
                </p>
              </div>
            </motion.div>

            {/* Vision + Teaching Philosophy */}
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-cardBg border border-borderGlass">
                <h4 className="font-heading font-medium text-white text-lg mb-3">Vision</h4>
                <p className="text-textSecondary font-body text-sm font-light leading-relaxed">
                  To bridge the gap between academic knowledge and professional readiness through innovative, technology-powered education that empowers the next generation of global communicators.
                </p>
              </div>
              <div className="p-6 bg-cardBg border border-borderGlass">
                <h4 className="font-heading font-medium text-accentGold text-lg mb-3">Teaching Philosophy</h4>
                <p className="text-textSecondary font-body text-sm font-light leading-relaxed">
                  Every student is a unique learner. I design inclusive, evidence-based learning experiences that foster intrinsic motivation, critical inquiry, and autonomous, lifelong learning habits.
                </p>
              </div>
            </motion.div>

            {/* Cards */}
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
              className="grid grid-cols-2 gap-4">
              {cards.map((card) => (
                <div key={card.title}
                  className={`p-6 border rounded-none ${card.color} hover:border-accentGold/40 transition-all duration-500 hover:-translate-y-1 group`}
                >
                  <div className={`w-10 h-10 ${card.iconColor} flex items-center justify-center mb-4 transition-transform duration-500`}>
                    {card.icon}
                  </div>
                  <h4 className="font-heading font-medium text-base text-white mb-2">{card.title}</h4>
                  <p className="font-body text-xs text-textSecondary leading-relaxed font-light">{card.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
