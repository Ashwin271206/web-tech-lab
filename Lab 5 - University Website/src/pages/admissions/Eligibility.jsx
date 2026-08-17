import PageHeader from '../../components/PageHeader.jsx';
import { GateIcon } from '../../components/Icons.jsx';

const rows = [
  { level: 'B.Tech (UG)', criteria: '10+2 with Physics, Chemistry & Mathematics, minimum 60% aggregate. Valid entrance rank required.' },
  { level: 'M.Tech / M.Sc (PG)', criteria: "Relevant bachelor's degree with minimum 55% aggregate. Valid GATE score preferred but not mandatory." },
  { level: 'PhD', criteria: "Master's degree in a relevant discipline with minimum 60% aggregate, plus a qualifying entrance test or valid national fellowship." },
];

export default function Eligibility() {
  return (
    <div className="page">
      <PageHeader eyebrow="Admissions" title="Eligibility Criteria" />
      <div className="stack-list">
        {rows.map((r) => (
          <div key={r.level} className="stack-list__item">
            <span className="stack-list__icon"><GateIcon /></span>
            <div>
              <h4>{r.level}</h4>
              <p>{r.criteria}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
