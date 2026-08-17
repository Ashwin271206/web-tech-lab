import PageHeader from '../../components/PageHeader.jsx';

const steps = [
  { n: '01', title: 'Register online', text: 'Create an account on the admissions portal with a valid email and phone number.' },
  { n: '02', title: 'Fill the application', text: 'Enter academic history and upload scanned mark sheets and identification documents.' },
  { n: '03', title: 'Pay the application fee', text: 'A one-time, non-refundable fee payable through net banking, UPI, or card.' },
  { n: '04', title: 'Entrance test / interview', text: 'UG applicants sit the entrance test; PG and PhD applicants attend a department interview.' },
  { n: '05', title: 'Offer & seat confirmation', text: 'Selected candidates receive an offer letter and must confirm their seat within seven days.' },
];

export default function ApplicationProcess() {
  return (
    <div className="page">
      <PageHeader eyebrow="Admissions" title="Application Process" />
      <div className="steps-list">
        {steps.map((s) => (
          <div key={s.n} className="steps-list__item">
            <span className="steps-list__num">{s.n}</span>
            <div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
