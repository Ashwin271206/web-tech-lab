import PageHeader from '../../components/PageHeader.jsx';
import SectionLinks from '../../components/SectionLinks.jsx';

const links = [
  { label: 'Eligibility', path: '/admissions/eligibility', desc: 'Minimum qualifications for each programme level.' },
  { label: 'Application Process', path: '/admissions/application-process', desc: 'A five-step walkthrough of how to apply.' },
  { label: 'Important Dates', path: '/admissions/important-dates', desc: 'The full admissions calendar for this cycle.' },
];

export default function Admissions() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Admissions"
        title="Admissions"
        blurb="Admissions run on a rolling basis for postgraduate and doctoral seats, and through
          a single annual cycle for undergraduate seats. Here's what you need to know before you start."
      />
      <SectionLinks links={links} />
    </div>
  );
}
