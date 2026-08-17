import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from '../components/Icons.jsx';

export default function ContactUs() {
  // Simple controlled form — demonstrates event handling (no backend, purely client-side).
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page">
      <PageHeader eyebrow="Get in touch" title="Contact Us" />
      <div className="contact-grid">
        <div className="contact-details">
          <div className="contact-details__row"><PinIcon /> <span>49A, Rajiv Gandhi Road, Kelambakkam, Chennai – 603110, Tamil Nadu</span></div>
          <div className="contact-details__row"><PhoneIcon /> <span>+91 44 2745 6120</span></div>
          <div className="contact-details__row"><MailIcon /> <span>registrar@idealengg.edu.in</span></div>
          <div className="contact-details__row"><ClockIcon /> <span>Monday – Saturday, 9:00 AM – 5:00 PM</span></div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <p className="contact-form__success">Thanks — your message has been noted. The registrar's office typically replies within two working days.</p>
          ) : (
            <>
              <label>
                Name
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="How can we help?" />
              </label>
              <button type="submit" className="btn btn--primary">Send Message</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
