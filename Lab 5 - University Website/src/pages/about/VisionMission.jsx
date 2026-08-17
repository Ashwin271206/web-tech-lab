import PageHeader from '../../components/PageHeader.jsx';
import { TargetIcon, CompassIcon } from '../../components/Icons.jsx';

export default function VisionMission() {
  return (
    <div className="page">
      <PageHeader eyebrow="About Us" title="Vision & Mission" />
      <div className="two-col">
        <div className="info-block">
          <span className="info-block__icon"><CompassIcon /></span>
          <h3>Our Vision</h3>
          <p>
            To be recognised as a college where engineers are trained to notice problems
            worth solving — not just to clear exams — and to send graduates into industry
            and research who are comfortable with ambiguity.
          </p>
        </div>
        <div className="info-block">
          <span className="info-block__icon"><TargetIcon /></span>
          <h3>Our Mission</h3>
          <ul className="tick-list">
            <li>Keep class sizes small enough that professors know every student by name.</li>
            <li>Give every department a working lab budget, not just a teaching one.</li>
            <li>Treat placements as a byproduct of good teaching, not the main event.</li>
            <li>Build partnerships with industry that go beyond guest lectures.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
