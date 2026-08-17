import PageHeader from '../../components/PageHeader.jsx';
import SectionLinks from '../../components/SectionLinks.jsx';

const links = [
  { label: 'Undergraduate', path: '/academics/undergraduate', desc: 'Four-year B.Tech programmes across twelve disciplines.' },
  { label: 'Postgraduate', path: '/academics/postgraduate', desc: 'Two-year M.Tech and M.Sc programmes, research-leaning.' },
  { label: 'PhD', path: '/academics/phd', desc: 'Full-time and part-time doctoral study.' },
];

export default function Academics() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Academics"
        title="Academics"
        blurb="Every programme here follows the same rule: no lecture without a lab, studio,
          or project to go with it. Coursework is reviewed by an external panel every four years."
      />
      <SectionLinks links={links} />
    </div>
  );
}
