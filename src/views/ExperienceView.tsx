import { projects } from '../data/projects'

export default function ExperienceView() {
  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="Experience">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-6 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>portfolio</span>
        <Chevron />
        <span style={{ color: 'var(--text)' }}>experience.md</span>
      </nav>

      <h1 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
        <span className="font-mono" style={{ color: 'var(--blue)' }}>#</span>
        Experience
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
        Hands-on project experience. Currently building toward professional opportunities.
      </p>

      {/* Projects */}
      <section aria-labelledby="projects-exp" className="mb-10">
        <h2 id="projects-exp" className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Projects</span>
        </h2>
        <div className="space-y-4">
          {projects.map(proj => (
            <div
              key={proj.name}
              className="p-4 rounded transition-colors"
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
                    {proj.name}
                  </p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--blue)' }}>
                    Solo Developer · {proj.category}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23d18b]" aria-hidden="true" />
                  <span className="text-2xs font-mono" style={{ color: '#23d18b' }}>{proj.status}</span>
                </div>
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text)', fontFamily: 'Inter' }}>
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.technologies.map(t => (
                  <span
                    key={t}
                    className="badge"
                    style={{ background: 'rgba(86,156,214,0.1)', color: 'var(--blue)', border: '1px solid rgba(86,156,214,0.22)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xs font-mono px-2.5 py-1 rounded transition-colors"
                    style={{ background: 'var(--blue)', color: '#fff' }}
                  >
                    Live Demo →
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xs font-mono px-2.5 py-1 rounded transition-colors"
                    style={{ border: '1px solid var(--border2)', color: 'var(--text-muted)' }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source — future goal */}
      <section aria-labelledby="opensource">
        <h2 id="opensource" className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Open Source</span>
        </h2>
        <div
          className="p-4 rounded"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              <span className="status-dot blue" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
                Working toward open-source contribution
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                Open-source is a future goal — planning to contribute to Python and FastAPI ecosystem projects.
                Currently building the foundational skills and real project experience needed to contribute meaningfully.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 font-mono text-xs" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="token-comment"># Timeline: starting open-source contributions in 2027</span>
          </div>
        </div>
      </section>
    </article>
  )
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
