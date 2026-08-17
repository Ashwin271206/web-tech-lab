import PageHeader from '../../components/PageHeader.jsx';
import { BookIcon } from '../../components/Icons.jsx';

const programmes = [
  { name: 'B.Tech Computer Science & Engineering', seats: 180, duration: '4 years' },
  { name: 'B.Tech Electronics & Communication', seats: 120, duration: '4 years' },
  { name: 'B.Tech Mechanical Engineering', seats: 120, duration: '4 years' },
  { name: 'B.Tech Civil Engineering', seats: 90, duration: '4 years' },
  { name: 'B.Tech Aerospace Engineering', seats: 60, duration: '4 years' },
  { name: 'B.Tech Biotechnology', seats: 60, duration: '4 years' },
];

export default function Undergraduate() {
  return (
    <div className="page">
      <PageHeader eyebrow="Academics" title="Undergraduate Programmes" blurb="The first two years are common core across all branches — students pick a specialised lab track from year three." />
      <table className="data-table">
        <thead>
          <tr><th><BookIcon size={16} /> Programme</th><th>Intake</th><th>Duration</th></tr>
        </thead>
        <tbody>
          {programmes.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.seats} seats</td>
              <td>{p.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
