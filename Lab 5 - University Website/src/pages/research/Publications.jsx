import PageHeader from '../../components/PageHeader.jsx';
import { DocIcon } from '../../components/Icons.jsx';

const pubs = [
  { title: 'Low-power clustering for agricultural sensor networks', authors: 'R. Pillai, A. Verghese', venue: 'Journal of Embedded Systems, 2026' },
  { title: 'Fibre-optic strain sensing for highway bridge decks', authors: 'K. Bhat, S. Menon', venue: 'Structural Monitoring Quarterly, 2025' },
  { title: 'A lightweight authentication scheme for constrained IoT nodes', authors: 'M. Rajan, D. Iyer', venue: 'International Conference on Applied Cryptography, 2025' },
  { title: 'Ceramic-based filtration for fluoride removal in groundwater', authors: 'A. Verghese, P. Nair', venue: 'Water Research Letters, 2024' },
];

export default function Publications() {
  return (
    <div className="page">
      <PageHeader eyebrow="Research" title="Publications" blurb="A sample of recent output — the full, searchable list is maintained on the institutional repository." />
      <div className="pub-list">
        {pubs.map((p) => (
          <div key={p.title} className="pub-list__item">
            <span className="pub-list__icon"><DocIcon /></span>
            <div>
              <h4>{p.title}</h4>
              <p>{p.authors} &nbsp;·&nbsp; <em>{p.venue}</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
