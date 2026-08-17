import PageHeader from '../../components/PageHeader.jsx';
import { ClockIcon } from '../../components/Icons.jsx';

const dates = [
  { label: 'Application portal opens', date: '1 December 2026' },
  { label: 'Last date to apply (UG)', date: '15 March 2027' },
  { label: 'Entrance test (UG)', date: '5 April 2027' },
  { label: 'PG & PhD interviews', date: '20 – 25 April 2027' },
  { label: 'Offer letters released', date: '10 May 2027' },
  { label: 'Academic year begins', date: '1 August 2027' },
];

export default function ImportantDates() {
  return (
    <div className="page">
      <PageHeader eyebrow="Admissions" title="Important Dates" blurb="Dates for the 2027–28 admissions cycle. The calendar is updated once the previous cycle closes." />
      <div className="date-list">
        {dates.map((d) => (
          <div key={d.label} className="date-list__row">
            <span className="date-list__icon"><ClockIcon /></span>
            <span className="date-list__label">{d.label}</span>
            <span className="date-list__value">{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
