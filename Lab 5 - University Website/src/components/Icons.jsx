// A small hand-picked set of stroke icons. Kept in one file so nothing
// external needs to be installed — plain inline SVG, styled via currentColor.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const ChevronDown = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const CompassIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="16 8 13.5 13.5 8 16 10.5 10.5 16 8" />
  </svg>
);

export const BookIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const GateIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 21V8l8-5 8 5v13" />
    <path d="M9 21v-7h6v7" />
    <line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);

export const FlaskIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M9 2h6" />
    <path d="M10 2v6.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V2" />
    <line x1="7" y1="15" x2="17" y2="15" />
  </svg>
);

export const TreeIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 2 7 9h3l-4 6h4v7h4v-7h4l-4-6h3z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const CapIcon = (p) => (
  <svg width={26} height={26} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M2 9 12 4l10 5-10 5-10-5Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    <path d="M22 9v6" />
  </svg>
);

export const PinIcon = (p) => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 2 6.2 2 2 0 0 1 4 4Z" />
  </svg>
);

export const ClockIcon = (p) => (
  <svg width={18} height={18} viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg width={16} height={16} viewBox="0 0 24 24" {...base} {...p}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const UsersIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 19c0-3.3 3-5 6.5-5s6.5 1.7 6.5 5" />
    <circle cx="18" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.7.4 5 1.8 5 4.8" />
  </svg>
);

export const TargetIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);

export const LayersIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <polygon points="12 3 21 8 12 13 3 8 12 3" />
    <polyline points="3 13 12 18 21 13" />
    <polyline points="3 17.5 12 22.5 21 17.5" />
  </svg>
);

export const DocIcon = (p) => (
  <svg width={22} height={22} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 2h9l5 5v15H6z" />
    <path d="M15 2v5h5" />
    <line x1="9" y1="13" x2="16" y2="13" />
    <line x1="9" y1="17" x2="16" y2="17" />
  </svg>
);
