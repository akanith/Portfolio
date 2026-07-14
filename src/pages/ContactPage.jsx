import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Dr. D. Sri Dhivya</title>
        <meta name="description" content="Contact Dr. D. Sri Dhivya for academic collaborations, research partnerships, speaking invitations, or editorial enquiries." />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-[#0a2a4a] pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Reach Out
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contact
          </motion.h1>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-xl mx-auto text-base"
          >
            Open to academic collaborations, research partnerships, speaking invitations, and editorial enquiries.
          </motion.p>
        </div>
      </div>

      <Contact />
    </>
  );
}
