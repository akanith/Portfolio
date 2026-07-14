import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin } from 'react-icons/fi';
import { SiGooglescholar, SiResearchgate, SiOrcid } from 'react-icons/si';

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'sridhivya@csacademy.edu.in',
    href: 'mailto:sridhivya@csacademy.edu.in',
    color: 'text-secondary bg-secondary/10',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'B3/402 Terraspace sumeru, Kovaipudur, Coimbatore, Tamil Nadu',
    href: 'https://maps.google.com/?q=CS+Academy+Coimbatore',
    color: 'text-accent bg-accent/10',
  },
];

const socials = [
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dr-sri-dhivya-501481259/', color: 'hover:text-blue-600' },
  { icon: SiGooglescholar, label: 'Google Scholar', href: 'https://scholar.google.com', color: 'hover:text-blue-500' },
  { icon: SiResearchgate, label: 'ResearchGate', href: 'https://researchgate.net', color: 'hover:text-teal-500' },
  { icon: SiOrcid, label: 'ORCID', href: 'https://orcid.org', color: 'hover:text-green-500' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
};

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background border-t border-white/5">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accentGold/60" />
            <span className="text-accentGold text-xs font-semibold tracking-[0.2em] uppercase">
              Get In Touch
            </span>
            <div className="w-8 h-[1px] bg-accentGold/60" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
            Contact
          </h2>
          <p className="font-body text-textSecondary text-lg font-light mt-8 max-w-xl mx-auto">
            Open to academic collaborations, research partnerships, speaking invitations, and editorial enquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 max-w-6xl mx-auto">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
              <h3 className="font-heading font-medium text-white text-2xl mb-8">Direct Contact</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-start gap-6 group"
                    >
                      <div className={`mt-1 text-accentGold group-hover:scale-110 transition-transform duration-500`}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-widest uppercase font-semibold text-textSecondary mb-2">{info.label}</p>
                        <p className="font-body text-white text-sm font-light leading-relaxed group-hover:text-accentGold transition-colors duration-300">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
              <h4 className="font-heading font-medium text-white text-xl mb-6">Academic Profiles</h4>
              <div className="flex flex-wrap gap-4">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-12 h-12 rounded-none border border-accentGold/20 bg-cardBg flex items-center justify-center text-white transition-all duration-500 hover:border-accentGold hover:text-accentGold hover:-translate-y-1"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
            className="lg:col-span-3"
          >
            <div className="bg-cardBg p-10 lg:p-16 relative overflow-hidden border border-borderGlass">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accentGold/5 rounded-bl-[100px]" />
              
              <h3 className="font-heading font-medium text-white text-3xl mb-10">Send a Message</h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 border border-accentGold/20 bg-accentGold/5 text-accentGold text-sm font-medium tracking-wide flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-accentGold rounded-full animate-pulse" />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div className="relative">
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-sm font-light focus:outline-none focus:border-accentGold transition-colors placeholder-transparent"
                      placeholder="Name"
                    />
                    <label htmlFor="contact-name" className="absolute left-0 -top-3.5 text-textSecondary font-body text-[10px] tracking-widest uppercase font-semibold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-textSecondary/70 peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accentGold">
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-sm font-light focus:outline-none focus:border-accentGold transition-colors placeholder-transparent"
                      placeholder="Email"
                    />
                    <label htmlFor="contact-email" className="absolute left-0 -top-3.5 text-textSecondary font-body text-[10px] tracking-widest uppercase font-semibold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-textSecondary/70 peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accentGold">
                      Email Address
                    </label>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-sm font-light focus:outline-none focus:border-accentGold transition-colors placeholder-transparent"
                    placeholder="Subject"
                  />
                  <label htmlFor="contact-subject" className="absolute left-0 -top-3.5 text-textSecondary font-body text-[10px] tracking-widest uppercase font-semibold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-textSecondary/70 peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accentGold">
                    Subject
                  </label>
                </div>
                
                <div className="relative mt-12">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white text-sm font-light focus:outline-none focus:border-accentGold transition-colors placeholder-transparent resize-none"
                    placeholder="Message"
                  />
                  <label htmlFor="contact-message" className="absolute left-0 -top-3.5 text-textSecondary font-body text-[10px] tracking-widest uppercase font-semibold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-textSecondary/70 peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accentGold">
                    Message
                  </label>
                </div>
                
                <div className="pt-6">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-4 bg-accentGold text-background px-8 py-4 font-body text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500"
                  >
                    Send Message
                    <div className="w-6 h-px bg-background/50 group-hover:bg-background transition-colors duration-500" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
