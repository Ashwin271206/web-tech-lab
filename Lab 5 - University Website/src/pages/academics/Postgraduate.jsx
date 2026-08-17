import PageHeader from '../../components/PageHeader.jsx';
import { BookIcon } from '../../components/Icons.jsx';

const programmes = [
  { name: 'M.Tech Structural Engineering', seats: 24, duration: '2 years' },
  { name: 'M.Tech VLSI Design', seats: 24, duration: '2 years' },
  { name: 'M.Tech Thermal Engineering', seats: 18, duration: '2 years' },
  { name: 'M.Sc Applied Mathematics', seats: 20, duration: '2 years' },
  { name: 'M.Tech Computer Science', seats: 30, duration: '2 years' },
];

export default function Postgraduate() {
  return (
    <div className="page">
      <PageHeader eyebrow="Academics" title="Postgraduate Programmes" blurb="Most M.Tech students co-author at least one paper with their guide before graduating — it isn't mandatory, but it's the norm." />
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
