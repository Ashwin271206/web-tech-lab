import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from './Icons.jsx';

// Props: item ({label, path, icon, children}), closeTimer shared ref not needed —
// each instance manages its own open/close with a short delay so the menu
// doesn't flicker shut when the pointer crosses the small gap to the panel.
export default function DropdownMenu({ item }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const Icon = item.icon;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const openNow = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <li
      className="nav-item"
      onMouseEnter={hasChildren ? openNow : undefined}
      onMouseLeave={hasChildren ? closeSoon : undefined}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          'nav-trigger' + (isActive ? ' nav-trigger--active' : '')
        }
      >
        <Icon className="nav-trigger__icon" />
        <span>{item.label}</span>
        {hasChildren && (
          <ChevronDown className={'nav-trigger__chev' + (open ? ' nav-trigger__chev--open' : '')} />
        )}
      </NavLink>

      {hasChildren && (
        <div className={'dropdown-panel' + (open ? ' dropdown-panel--open' : '')}>
          <div className="dropdown-panel__inner">
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  'dropdown-link' + (isActive ? ' dropdown-link--active' : '')
                }
                onClick={() => setOpen(false)}
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}
