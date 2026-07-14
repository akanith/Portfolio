<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-r185-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

# 🎓 Dr. D. Sri Dhivya — Academic Portfolio

> **Official academic portfolio website of Dr. D. Sri Dhivya** — Assistant Professor, Researcher, and Education 4.0 Specialist at CS Academy of Higher Education, Coimbatore, India.

A premium, modern single-page application showcasing academic accomplishments, research publications, patents, conference presentations, and professional experience — built with React, Three.js, and Framer Motion.

---

## ✨ Live Preview

🔗 [drsridhivya.edu.in](https://drsridhivya.edu.in) _(coming soon)_

---

## 📸 Features & Sections

### 🏠 Hero Section
- Cinematic editorial layout with 3D interactive sphere (Three.js)
- Parallax profile card with mouse-tracking tilt effect
- Animated typing effect for research specializations
- Magnetic hover buttons with glow effects

### 📊 Stats Dashboard
- Animated counters displaying key research metrics
- **149** Google Scholar Citations | **h-index: 6** | **i10-index: 4**
- **70** Scopus Citations | **10** Publications | **2** Granted Patents

### 👩‍🏫 About
- Professional biography and research overview
- Academic philosophy and teaching approach

### 🧬 DNA Timeline
- Interactive double-helix styled education timeline
- **Ph.D.** — Kalasalingam Academy of Research and Education (Aug 2025)
- **M.A. English** — Bharathiar University (2019)
- **B.A. English** — Bharathiar University (2016)
- **B.Sc. Computer Science** — PSGR Krishnammal College for Women (2013)

### 🔬 Research Expertise
- 8 core research domains visualized with interactive cards:
  - English for Specific Purposes (ESP)
  - Education 4.0
  - Technology Enhanced Learning (TEL)
  - Gamification in Education
  - Educational Sustainability
  - Professional Communication
  - Multidisciplinary Research
  - Corpus Linguistics & NLP

### 📝 Publications
- **9 peer-reviewed publications** with filterable view
- Indexed in **Scopus**, **SSCI**, and international journals
- Key journals: *Sustainability*, *Cogent Social Sciences*, *Australian Journal of Applied Linguistics*, *Onomázein*
- Publication modal with detailed metadata (DOI, authors, badges)

### 📈 Research Impact
- Visual dashboard of citation metrics and research influence
- Google Scholar & Scopus analytics comparison

### 💡 Patents (Granted)
| # | Title | Year | Patent No. |
|---|-------|------|------------|
| 1 | AI-Based Stress Detection Cap | 2024 | Design No. 412990-001 |
| 2 | AI-Based Multimedia Interactive Whiteboard for Online Studies | 2024 | Design No. 6359961 |

### 🌍 International Conferences
- Interactive globe visualization of conference locations
- **Thailand** — 3rd Global Conference on Entrepreneurship (Nov 2023)
- **Malaysia** — 7th Global Conference on Computing Media & Technology (Sep 2023)

### 💼 Professional Experience
| Role | Organization | Duration |
|------|-------------|----------|
| Faculty of English | CS Academy International, Coimbatore | June 2025 – Present |
| Media Coordinator | IATEFL - BESIG | November 2024 – Present |
| Graduate Trainee | Cognizant Technology Solutions (CTS) | June–December 2013 |

### 🏅 Recognition & Editorial Roles
- **Reviewer**: MethodsX, Frontiers in Education, JETDE, Health Education and Behavior, IJCRT
- **Editorial Board Member**: International Journal of Education, Culture and Society

### 🤝 Professional Memberships
- **ELTAI** — English Language Teachers' Association of India
- **TESOL** — Teaching English to Speakers of Other Languages
- **IATEFL** — International Association of Teachers of English as a Foreign Language

### 🔗 Academic Profiles
- [Google Scholar](https://scholar.google.com/citations?user=XAU7i34AAAAJ&hl=en)
- [ResearchGate](https://www.researchgate.net/profile/Sri-Dhivya-D)
- [LinkedIn](https://www.linkedin.com/in/dr-sri-dhivya-501481259/)
- Scopus · ORCID _(profiles linked)_

### 🛠 Skills & Achievements
- Technical and soft skills visualization
- Achievements: Master of Ceremonies, Class Coordinator, SPSS Workshop Facilitator

### 📬 Contact
- Contact form with animated input fields
- Direct email link and social profile buttons

---

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.2 |
| **Build Tool** | Vite 5.1 |
| **3D Graphics** | Three.js (r185) + React Three Fiber + Drei |
| **Animations** | Framer Motion 11 |
| **Styling** | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| **Routing** | React Router DOM 6 |
| **SEO** | React Helmet Async (meta tags, OpenGraph, Schema.org) |
| **Smooth Scroll** | Lenis |
| **Icons** | React Icons (Feather + Simple Icons) |
| **Type Animation** | React Type Animation |
| **Counters** | React CountUp |

---

## 📁 Project Structure

```
dr-sridhivya-portfolio/
├── public/                     # Static assets (favicon, CV PDF)
├── src/
│   ├── assets/                 # Images (profile photo)
│   ├── components/             # 38 React components
│   │   ├── Hero.jsx            # Hero section with 3D sphere
│   │   ├── HeroSphere.jsx      # Three.js animated sphere
│   │   ├── Background3D.jsx    # 3D background effects
│   │   ├── NeuralBackground.jsx# Neural network background
│   │   ├── About.jsx           # About section
│   │   ├── Stats.jsx           # Research metrics counters
│   │   ├── DNATimeline.jsx     # Education timeline
│   │   ├── ResearchExpertise.jsx # Research areas showcase
│   │   ├── PublicationsSection.jsx # Publications list
│   │   ├── PublicationCard.jsx # Individual publication card
│   │   ├── PublicationModal.jsx# Publication detail modal
│   │   ├── ResearchImpact.jsx  # Citation analytics
│   │   ├── ResearchDashboard.jsx # Research overview
│   │   ├── PatentSection.jsx   # Patents display
│   │   ├── PatentCard.jsx      # Individual patent card
│   │   ├── ConferenceGlobe.jsx # Interactive globe
│   │   ├── ConferenceSection.jsx # Conference listing
│   │   ├── ExperienceTimeline.jsx # Work experience
│   │   ├── RecognitionTimeline.jsx # Editorial roles
│   │   ├── MembershipCards.jsx # Professional memberships
│   │   ├── AcademicProfiles.jsx# Scholar/Scopus/ORCID cards
│   │   ├── Skills.jsx          # Skills visualization
│   │   ├── Achievements.jsx    # Achievements section
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Site footer
│   │   ├── CustomCursor.jsx    # Custom cursor effect
│   │   ├── LoadingScreen.jsx   # Loading animation
│   │   ├── ScrollProgress.jsx  # Scroll progress indicator
│   │   ├── SmoothScroll.jsx    # Lenis smooth scroll wrapper
│   │   ├── FloatingProfileButton.jsx # Floating action button
│   │   ├── FloatingIndicator.jsx # Floating UI indicator
│   │   ├── MagneticButton.jsx  # Magnetic hover button
│   │   ├── TiltCard.jsx        # 3D tilt card
│   │   ├── HexagonGrid.jsx     # Hexagonal grid layout
│   │   ├── SectionDivider.jsx  # Section divider
│   │   └── ResearchCards.jsx   # Research area cards
│   ├── context/
│   │   └── ThemeContext.jsx     # Theme provider
│   ├── data/                   # Data files
│   │   ├── academicProfiles.js # Scholar, Scopus, ORCID data
│   │   ├── achievements.js     # Achievements data
│   │   ├── conferences.js      # Conference presentations
│   │   ├── education.js        # Education timeline data
│   │   ├── experience.js       # Work experience data
│   │   ├── memberships.js      # Professional memberships
│   │   ├── patents.js          # Patent details
│   │   ├── publications.js     # Publications database
│   │   ├── recognition.js      # Editorial recognition
│   │   └── research.js         # Research interest areas
│   ├── pages/
│   │   ├── Home.jsx            # Main landing page
│   │   ├── PublicationsPage.jsx# Publications full page
│   │   ├── ResearchPage.jsx    # Research detail page
│   │   └── ContactPage.jsx     # Contact full page
│   ├── App.jsx                 # Root application component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies & scripts
└── .gitignore                  # Git ignore rules
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/akanith/Portfolio.git

# Navigate to the project
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design Highlights

- **Dark Theme** — Premium black & gold color palette with editorial typography
- **3D Elements** — Interactive Three.js sphere, tilt cards, and neural network background
- **Micro-Animations** — Framer Motion powered scroll reveals, hover effects, and transitions
- **Custom Cursor** — Magnetic cursor with interactive highlights
- **Smooth Scrolling** — Lenis-powered buttery smooth page scrolling
- **Responsive** — Fully responsive across all devices
- **SEO Optimized** — Schema.org Person markup, OpenGraph, Twitter Cards, meta descriptions

---

## 📄 License

This project is private and built for **Dr. D. Sri Dhivya's** academic portfolio.

---

<p align="center">
  Built with ❤️ using React, Three.js & Framer Motion
</p>
