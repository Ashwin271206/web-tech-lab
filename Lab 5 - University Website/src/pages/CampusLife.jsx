import PageHeader from '../components/PageHeader.jsx';
import { TreeIcon, UsersIcon, LayersIcon } from '../components/Icons.jsx';

const clubs = [
  'Robotics Club', 'Debate & Literary Society', 'Music & Arts Collective',
  'Entrepreneurship Cell', 'Photography Circle', 'Sports Committee',
];

export default function CampusLife() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Life on campus"
        title="Campus Life"
        blurb="The 45-acre campus is fully residential — most students live on-site for all
          four years, which is part of why clubs and hostel committees end up running so much
          of the day-to-day."
      />
      <div className="two-col">
        <div className="info-block">
          <span className="info-block__icon"><TreeIcon /></span>
          <h3>Hostels & Dining</h3>
          <p>
            Six hostel blocks house roughly 5,000 resident students, each with its own
            elected council. Two central dining halls run on a rotating regional-cuisine menu,
            with a smaller all-day café near the library.
          </p>
        </div>
        <div className="info-block">
          <span className="info-block__icon"><UsersIcon /></span>
          <h3>Student Governance</h3>
          <p>
            A Student Council, elected annually, manages the club budget and represents
            student interests on three of the college's administrative committees.
          </p>
        </div>
      </div>

      <h3 className="section-subhead"><LayersIcon size={20} /> Clubs & Societies</h3>
      <div className="chip-grid">
        {clubs.map((c) => (
          <div key={c} className="chip-grid__item">
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
