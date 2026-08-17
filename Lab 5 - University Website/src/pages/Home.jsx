import { NavLink } from 'react-router-dom';
import { UsersIcon, TargetIcon, LayersIcon, CapIcon } from '../components/Icons.jsx';

const stats = [
  { label: 'Students on campus', value: '6,400+' },
  { label: 'Faculty members', value: '410' },
  { label: 'Research labs', value: '38' },
  { label: 'Recruiting partners', value: '190+' },
];

const highlights = [
  {
    icon: TargetIcon,
    title: 'Admissions open for 2026–27',
    text: 'Applications for the undergraduate and postgraduate cohorts are now being accepted through the online portal.',
    to: '/admissions/application-process',
  },
  {
    icon: LayersIcon,
    title: 'Twelve departments, one campus',
    text: 'From Aerospace to VLSI Design, every department shares the same core labs, library and maker spaces.',
    to: '/about/departments',
  },
  {
    icon: UsersIcon,
    title: 'A campus that runs itself',
    text: 'Student councils, hostel committees and clubs handle most of day-to-day campus life, with faculty as mentors.',
    to: '/campus-life',
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <span className="hero__eyebrow"><CapIcon size={18} /> Ideal Engineering College</span>
          <h1>Engineering, taught the way it's practiced.</h1>
          <p>
            We're a mid-sized, residential engineering college on the outskirts of Chennai,
            built around small studios, long lab hours, and professors who still write code.
            Seven schools, one shared campus, and a habit of asking "why" before "how".
          </p>
          <div className="hero__actions">
            <NavLink to="/admissions" className="btn btn--primary">Start an Application</NavLink>
            <NavLink to="/about" className="btn btn--ghost">Learn about the college</NavLink>
          </div>
        </div>
        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panel-card hero__panel-card--one">
            <TargetIcon />
            <p>NAAC A+ accredited institution</p>
          </div>
          <div className="hero__panel-card hero__panel-card--two">
            <LayersIcon />
            <p>12 UG programmes · 9 PG programmes</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        {stats.map((s) => (
          <div key={s.label} className="stats-strip__item">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="highlights">
        <h2>Where to start</h2>
        <div className="highlights__grid">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <NavLink to={h.to} key={h.title} className="highlight-card">
                <span className="highlight-card__icon"><Icon /></span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </NavLink>
            );
          })}
        </div>
      </section>
    </div>
  );
}
