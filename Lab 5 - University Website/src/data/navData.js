import {
  CompassIcon, BookIcon, GateIcon, FlaskIcon, TreeIcon, MailIcon,
} from '../components/Icons.jsx';

// Each top-level entry optionally has "children" -> renders as a dropdown.
// path = "" means the parent itself is not a clickable route, only a trigger.
export const navData = [
  {
    label: 'About Us',
    path: '/about',
    icon: CompassIcon,
    children: [
      { label: 'Vision & Mission', path: '/about/vision-mission' },
      { label: 'Leadership', path: '/about/leadership' },
      { label: 'Departments', path: '/about/departments' },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    icon: BookIcon,
    children: [
      { label: 'Undergraduate', path: '/academics/undergraduate' },
      { label: 'Postgraduate', path: '/academics/postgraduate' },
      { label: 'PhD', path: '/academics/phd' },
    ],
  },
  {
    label: 'Admissions',
    path: '/admissions',
    icon: GateIcon,
    children: [
      { label: 'Eligibility', path: '/admissions/eligibility' },
      { label: 'Application Process', path: '/admissions/application-process' },
      { label: 'Important Dates', path: '/admissions/important-dates' },
    ],
  },
  {
    label: 'Research',
    path: '/research',
    icon: FlaskIcon,
    children: [
      { label: 'Research Areas', path: '/research/areas' },
      { label: 'Publications', path: '/research/publications' },
    ],
  },
  {
    label: 'Campus Life',
    path: '/campus-life',
    icon: TreeIcon,
    children: null,
  },
  {
    label: 'Contact Us',
    path: '/contact',
    icon: MailIcon,
    children: null,
  },
];
