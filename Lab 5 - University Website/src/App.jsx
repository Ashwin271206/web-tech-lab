import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import Home from './pages/Home.jsx';
import CampusLife from './pages/CampusLife.jsx';
import ContactUs from './pages/ContactUs.jsx';

import AboutUs from './pages/about/AboutUs.jsx';
import VisionMission from './pages/about/VisionMission.jsx';
import Leadership from './pages/about/Leadership.jsx';
import Departments from './pages/about/Departments.jsx';

import Academics from './pages/academics/Academics.jsx';
import Undergraduate from './pages/academics/Undergraduate.jsx';
import Postgraduate from './pages/academics/Postgraduate.jsx';
import PhD from './pages/academics/PhD.jsx';

import Admissions from './pages/admissions/Admissions.jsx';
import Eligibility from './pages/admissions/Eligibility.jsx';
import ApplicationProcess from './pages/admissions/ApplicationProcess.jsx';
import ImportantDates from './pages/admissions/ImportantDates.jsx';

import Research from './pages/research/Research.jsx';
import ResearchAreas from './pages/research/ResearchAreas.jsx';
import Publications from './pages/research/Publications.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/vision-mission" element={<VisionMission />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/departments" element={<Departments />} />

          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/undergraduate" element={<Undergraduate />} />
          <Route path="/academics/postgraduate" element={<Postgraduate />} />
          <Route path="/academics/phd" element={<PhD />} />

          <Route path="/admissions" element={<Admissions />} />
          <Route path="/admissions/eligibility" element={<Eligibility />} />
          <Route path="/admissions/application-process" element={<ApplicationProcess />} />
          <Route path="/admissions/important-dates" element={<ImportantDates />} />

          <Route path="/research" element={<Research />} />
          <Route path="/research/areas" element={<ResearchAreas />} />
          <Route path="/research/publications" element={<Publications />} />

          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
