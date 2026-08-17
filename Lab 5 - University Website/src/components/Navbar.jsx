import { NavLink } from 'react-router-dom';
import { navData } from '../data/navData.js';
import DropdownMenu from './DropdownMenu.jsx';
import { CapIcon } from './Icons.jsx';

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <NavLink to="/" className="brand">
          <span className="brand__mark"><CapIcon /></span>
          <span className="brand__text">
            <span className="brand__name">Ideal Engineering College</span>
          </span>
        </NavLink>

        <nav aria-label="Primary">
          <ul className="nav-list">
            {navData.map((item) => (
              <DropdownMenu key={item.path} item={item} />
            ))}
          </ul>
        </nav>

        <NavLink to="/admissions" className="topbar__cta">Apply Now</NavLink>
      </div>
    </header>
  );
}
