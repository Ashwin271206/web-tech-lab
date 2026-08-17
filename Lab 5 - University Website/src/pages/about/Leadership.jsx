import PageHeader from '../../components/PageHeader.jsx';
import { UsersIcon } from '../../components/Icons.jsx';

const leaders = [
  { name: 'Dr. Meenakshi Rajan', role: 'Chairperson, Governing Council', note: 'Alumna, Class of 1997. Previously led materials research at a national lab.' },
  { name: 'Dr. Suresh Pillai', role: 'Principal', note: 'Twenty-two years in academia, six of them here as Head of Mechanical Engineering.' },
  { name: 'Dr. Anjali Verghese', role: 'Dean, Academics', note: 'Oversees curriculum design across all twelve departments.' },
  { name: 'Prof. Kiran Bhat', role: 'Dean, Research & Development', note: 'Runs the sponsored-research office and the annual innovation grant.' },
];

export default function Leadership() {
  return (
    <div className="page">
      <PageHeader eyebrow="About Us" title="Leadership" blurb="A small governing team that still teaches at least one course a year, by policy." />
      <div className="people-grid">
        {leaders.map((p) => (
          <div key={p.name} className="people-grid__card">
            <span className="people-grid__icon"><UsersIcon /></span>
            <h4>{p.name}</h4>
            <span className="people-grid__role">{p.role}</span>
            <p>{p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
