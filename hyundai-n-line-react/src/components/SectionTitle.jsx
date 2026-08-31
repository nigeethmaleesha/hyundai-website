export default function SectionTitle({ eyebrow, title, text, ghost }) {
  return (
    <div className="section-title-wrap">
      {ghost && <div className="ghost-title" aria-hidden="true">{ghost}</div>}
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {text && <p className="section-subtitle">{text}</p>}
    </div>
  )
}
