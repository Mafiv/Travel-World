import { GUIDES } from '../data/guides'

export default function GuidesView({ activeId, onOpen, onBack }) {
  const guide = GUIDES.find((item) => item.id === activeId) ?? null

  if (guide) {
    return (
      <article className="panel guide-article" aria-labelledby="guide-heading">
        <button type="button" className="button ghost" onClick={onBack}>
          Back to guides
        </button>
        <p className="eyebrow">{guide.kicker}</p>
        <h2 id="guide-heading">{guide.title}</h2>
        <p className="lede">{guide.dek}</p>
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    )
  }

  return (
    <section className="panel" aria-labelledby="guides-heading">
      <h2 id="guides-heading">Field guides</h2>
      <ul className="guide-index">
        {GUIDES.map((item) => (
          <li key={item.id}>
            <button type="button" className="guide-card" onClick={() => onOpen(item.id)}>
              <span className="eyebrow">{item.kicker}</span>
              <strong>{item.title}</strong>
              <span className="meta">{item.dek}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
