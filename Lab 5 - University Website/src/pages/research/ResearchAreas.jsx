import PageHeader from '../../components/PageHeader.jsx';
import { FlaskIcon } from '../../components/Icons.jsx';

const areas = [
  { title: 'Embedded Systems & IoT', text: 'Low-power sensor networks and edge inference, largely applied to agriculture monitoring.' },
  { title: 'Structural Health Monitoring', text: 'Using fibre-optic sensors to track fatigue in bridges and industrial structures.' },
  { title: 'Sustainable Water Treatment', text: 'Low-cost filtration methods aimed at rural municipal supply systems.' },
  { title: 'Applied Cryptography', text: 'Lightweight cryptographic protocols for constrained IoT devices.' },
  { title: 'Composite Materials', text: 'Fibre-reinforced composites for aerospace and automotive structural components.' },
  { title: 'Biomedical Signal Processing', text: 'Wearable ECG and EMG signal analysis for early anomaly detection.' },
];

export default function ResearchAreas() {
  return (
    <div className="page">
      <PageHeader eyebrow="Research" title="Research Areas" />
      <div className="area-grid">
        {areas.map((a) => (
          <div key={a.title} className="area-grid__card">
            <span className="area-grid__icon"><FlaskIcon /></span>
            <h4>{a.title}</h4>
            <p>{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
