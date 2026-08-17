import PageHeader from '../../components/PageHeader.jsx';
import { LayersIcon } from '../../components/Icons.jsx';

const departments = [
  'Computer Science & Engineering', 'Electronics & Communication', 'Electrical & Electronics',
  'Mechanical Engineering', 'Civil Engineering', 'Aerospace Engineering',
  'Chemical Engineering', 'Biotechnology', 'Information Technology',
  'VLSI Design', 'Robotics & Automation', 'Mathematics & Sciences',
];

export default function Departments() {
  return (
    <div className="page">
      <PageHeader eyebrow="About Us" title="Departments" blurb="Twelve departments, sharing one library, one set of core labs, and one timetable grid." />
      <div className="chip-grid">
        {departments.map((d) => (
          <div key={d} className="chip-grid__item">
            <LayersIcon size={18} />
            <span>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
