import { NavLink } from 'react-router-dom';
import { ArrowUpRight } from './Icons.jsx';

// Props: links = [{label, path, desc}]
export default function SectionLinks({ links }) {
  return (
    <div className="link-grid">
      {links.map((l) => (
        <NavLink key={l.path} to={l.path} className="link-card">
          <div className="link-card__top">
            <span>{l.label}</span>
            <ArrowUpRight />
          </div>
          <p>{l.desc}</p>
        </NavLink>
      ))}
    </div>
  );
}
