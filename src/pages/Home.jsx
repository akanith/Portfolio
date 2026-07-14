import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import DNATimeline from '../components/DNATimeline';
import ResearchExpertise from '../components/ResearchExpertise';
import PublicationsSection from '../components/PublicationsSection';
import PatentSection from '../components/PatentSection';
import ConferenceGlobe from '../components/ConferenceGlobe';
import ResearchImpact from '../components/ResearchImpact';
import ExperienceTimeline from '../components/ExperienceTimeline';
import RecognitionTimeline from '../components/RecognitionTimeline';
import MembershipCards from '../components/MembershipCards';
import AcademicProfiles from '../components/AcademicProfiles';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dr. D. Sri Dhivya',
  honorificPrefix: 'Dr.',
  jobTitle: 'Assistant Professor',
  worksFor: {
    '@type': 'CollegeOrUniversity',
    name: 'CS Academy of Higher Education',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Bharathiar University',
    address: { '@type': 'PostalAddress', addressLocality: 'Coimbatore', addressCountry: 'IN' },
  },
  knowsAbout: [
    'English for Specific Purposes',
    'Education 4.0',
    'Technology Enhanced Learning',
    'Gamification',
    'Professional Communication',
    'Educational Sustainability',
  ],
  sameAs: [
    'https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en',
    'https://www.researchgate.net/profile/Sri-Dhivya-D',
    'https://orcid.org/0000-0000-0000-0000',
  ],
  email: 'sridhivya@csacademy.edu.in',
  url: 'https://drsridhivya.edu.in',
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dr. D. Sri Dhivya | Assistant Professor & Researcher — CS Academy of Higher Education</title>
        <meta
          name="description"
          content="Official academic profile of Dr. D. Sri Dhivya — Assistant Professor, Researcher, and Education 4.0 Specialist at CS Academy of Higher Education, Coimbatore. Research in ESP, Technology Enhanced Learning, and Gamification."
        />
        <meta name="keywords" content="Dr. Sri Dhivya, Assistant Professor, ESP, Education 4.0, Technology Enhanced Learning, Gamification, CS Academy, Coimbatore, English for Specific Purposes, Scopus" />
        {/* OpenGraph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Dr. D. Sri Dhivya | Assistant Professor & Researcher" />
        <meta property="og:description" content="Official academic profile featuring research in English for Specific Purposes, Education 4.0, Gamification, and Technology Enhanced Learning." />
        <meta property="og:url" content="https://drsridhivya.edu.in" />
        <meta property="og:site_name" content="Dr. D. Sri Dhivya — Faculty Profile" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. D. Sri Dhivya | Assistant Professor & Researcher" />
        <meta name="twitter:description" content="Academic profile of Dr. D. Sri Dhivya — ESP, Education 4.0, Gamification, TEL researcher." />
        {/* Canonical */}
        <link rel="canonical" href="https://drsridhivya.edu.in" />
        {/* Schema.org Person */}
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        {/* Google Scholar link */}
        <link rel="me" href="https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en" />
      </Helmet>

      <main className="relative z-10 bg-transparent">
        <Hero />
        <Stats />
        <About />
        <DNATimeline />
        <ResearchExpertise />
        <PublicationsSection />
        <ResearchImpact />
        <PatentSection />
        <ConferenceGlobe />
        <ExperienceTimeline />
        <RecognitionTimeline />
        <MembershipCards />
        <AcademicProfiles />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
