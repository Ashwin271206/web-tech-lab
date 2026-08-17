import { NavLink } from 'react-router-dom';
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-col">
          <h4>Ideal Engineering College</h4>
          <p className="footer-about">
            A residential engineering campus built around the idea that good
            questions matter more than quick answers. Seven schools, one shared library.
          </p>
        </div>

        <div className="footer-col">
          <h5>Explore</h5>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/academics">Academics</NavLink>
          <NavLink to="/admissions">Admissions</NavLink>
          <NavLink to="/research">Research</NavLink>
          <NavLink to="/campus-life">Campus Life</NavLink>
        </div>

        <div className="footer-col">
          <h5>Reach Us</h5>
          <p><PinIcon />49A, Rajiv Gandhi Road, Kelambakkam, Chennai – 603110</p>
          <p><PhoneIcon /> +91 44 2745 6120</p>
          <p><MailIcon /> registrar@idealengg.edu.in</p>
          <p><ClockIcon /> Mon – Sat, 9:00 AM – 5:00 PM</p>
        </div>
      </div>
      <div className="site-footer__bottom">
        © {new Date().getFullYear()} Ideal Engineering College. All rights reserved.
      </div>
    </footer>
  );
}
