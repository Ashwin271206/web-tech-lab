// Simple presentational component — receives props, no logic.
export default function PageHeader({ eyebrow, title, blurb }) {
  return (
    <div className="page-header">
      {eyebrow && <span className="page-header__eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {blurb && <p className="page-header__blurb">{blurb}</p>}
    </div>
  );
}
