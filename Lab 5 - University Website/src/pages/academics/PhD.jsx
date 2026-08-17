import PageHeader from '../../components/PageHeader.jsx';
import { FlaskIcon, ClockIcon, DocIcon } from '../../components/Icons.jsx';

export default function PhD() {
  return (
    <div className="page">
      <PageHeader eyebrow="Academics" title="Doctoral Programme" blurb="Around 70 scholars are registered at any given time, split roughly evenly between full-time and part-time (working professional) tracks." />
      <div className="two-col">
        <div className="info-block">
          <span className="info-block__icon"><ClockIcon /></span>
          <h3>Timeline</h3>
          <p>Minimum three years for full-time scholars, five for part-time. A comprehensive
            viva is held at the eighteen-month mark, followed by an annual progress review
            with the doctoral committee.</p>
        </div>
        <div className="info-block">
          <span className="info-block__icon"><FlaskIcon /></span>
          <h3>Active Research Clusters</h3>
          <p>Scholars currently work across embedded systems, structural health monitoring,
            composite materials, applied cryptography, and sustainable water treatment.</p>
        </div>
      </div>
      <div className="info-block info-block--full">
        <span className="info-block__icon"><DocIcon /></span>
        <h3>How to apply</h3>
        <p>Applications open twice a year, in June and December. Candidates sit a written
          entrance test followed by an interview with the relevant department's doctoral
          committee. Full details are published on the Admissions page closer to each cycle.</p>
      </div>
    </div>
  );
}
