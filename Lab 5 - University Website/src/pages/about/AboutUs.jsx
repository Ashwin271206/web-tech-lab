import PageHeader from '../../components/PageHeader.jsx';
import SectionLinks from '../../components/SectionLinks.jsx';

const links = [
  { label: 'Vision & Mission', path: '/about/vision-mission', desc: 'What we are trying to build, and why.' },
  { label: 'Leadership', path: '/about/leadership', desc: 'The people steering the institution.' },
  { label: 'Departments', path: '/about/departments', desc: 'Twelve departments, one shared campus.' },
];

export default function AboutUs() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="About the college"
        title="About Us"
        blurb="Ideal Engineering College was founded in 1994 by a small group of alumni who
          wanted an engineering school that felt less like a factory and more like a workshop.
          Three decades later, that instinct still shapes how we teach."
      />
      <SectionLinks links={links} />
    </div>
  );
}
