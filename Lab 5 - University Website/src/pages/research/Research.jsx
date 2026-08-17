import PageHeader from '../../components/PageHeader.jsx';
import SectionLinks from '../../components/SectionLinks.jsx';

const links = [
  { label: 'Research Areas', path: '/research/areas', desc: 'The clusters where most sponsored work happens.' },
  { label: 'Publications', path: '/research/publications', desc: 'A sample of recent faculty and scholar publications.' },
];

export default function Research() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Research"
        title="Research"
        blurb="Sponsored research here runs through department-level labs rather than one
          central institute — funding currently comes from national grant bodies and a handful
          of industry-sponsored chairs."
      />
      <SectionLinks links={links} />
    </div>
  );
}
