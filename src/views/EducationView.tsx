import { PERSONAL } from '../data/config'

const timeline = [
  { year: 'Jun 2025', event: 'Started BCA at JSS CACS Autonomous College, Mysore',  done: true  },
  { year: '2025–26',  event: 'Web development, Python & programming fundamentals',  done: true  },
  { year: '2026',     event: 'Backend + AI/ML focus — built Cartiva & Catrimonial AI', done: true },
  { year: '2027',     event: 'Internship applications & open-source contribution',   done: false },
  { year: 'Jul 2028', event: 'Graduation',                                            done: false, highlight: true },
]

export default function EducationView() {
  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="Education">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>portfolio</span><Chev />
        <span style={{ color: 'var(--text)' }}>education.md</span>
      </nav>

      <h1 className="text-xl font-bold mb-8 flex items-center gap-2" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
        <span className="font-mono" style={{ color: 'var(--blue)' }}>#</span>
        Education
      </h1>

      {/* ── Degree card ── */}
      <section className="mb-10">
        <div className="p-5 rounded-lg" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
                {PERSONAL.degree}
              </p>
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--blue)' }}>
                {PERSONAL.college}
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                Jun 2025 – Jul 2028
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge" style={{ background: 'rgba(86,156,214,0.14)', color: 'var(--blue)', border: '1px solid rgba(86,156,214,0.28)' }}>
                  Batch {PERSONAL.graduatingYear}
                </span>
                <span className="badge" style={{ background: 'rgba(35,209,139,0.12)', color: '#23d18b', border: '1px solid rgba(35,209,139,0.28)' }}>
                  ● Currently Enrolled
                </span>
                <span className="badge" style={{ background: 'rgba(215,186,125,0.12)', color: 'var(--orange2)', border: '1px solid rgba(215,186,125,0.28)' }}>
                  CGPA {PERSONAL.cgpa}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xs font-mono mb-0.5" style={{ color: 'var(--text-muted)' }}>CGPA</p>
              <p className="text-2xl font-bold font-mono" style={{ color: 'var(--cyan)' }}>7.5</p>
              <p className="text-2xs font-mono" style={{ color: 'var(--text-dim)' }}>/ 10</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section aria-labelledby="timeline-heading" className="mb-10">
        <h2 id="timeline-heading" className="flex items-center gap-2 text-sm font-semibold mb-6" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Timeline</span>
        </h2>
        <ol style={{ borderLeft: '1px solid var(--border)', paddingLeft: 24 }}>
          {timeline.map((item, i) => (
            <li key={i} className="relative mb-5 last:mb-0">
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', left: -28, top: 5,
                  width: 8, height: 8, borderRadius: '50%',
                  background:  item.highlight ? 'var(--green)'  : item.done ? 'var(--blue)' : 'var(--bg3)',
                  border: `1px solid ${item.highlight ? 'var(--green)' : item.done ? 'var(--blue)' : 'var(--border2)'}`,
                }}
              />
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs flex-shrink-0 pt-0.5"
                  style={{ color: item.done ? 'var(--blue)' : 'var(--text-dim)', minWidth: 52 }}>
                  {item.year}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm"
                    style={{ color: item.highlight ? 'var(--green)' : item.done ? 'var(--text)' : 'var(--text-muted)', fontFamily: 'Inter', fontWeight: item.highlight ? 600 : 400 }}>
                    {item.event}
                  </p>
                  {item.highlight && (
                    <span className="badge" style={{ background: 'rgba(78,201,176,0.12)', color: 'var(--green)', border: '1px solid rgba(78,201,176,0.28)' }}>
                      Goal
                    </span>
                  )}
                  {!item.done && !item.highlight && (
                    <span className="badge" style={{ background: 'rgba(216,122,48,0.1)', color: 'var(--orange2)', border: '1px solid rgba(216,122,48,0.22)' }}>
                      upcoming
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Current focus ── */}
      <section aria-labelledby="focus-heading">
        <h2 id="focus-heading" className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Current Focus Areas</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: 'Python',          color: 'var(--green)'   },
            { label: 'FastAPI',         color: 'var(--yellow)'  },
            { label: 'PostgreSQL',      color: 'var(--orange2)' },
            { label: 'REST APIs',       color: 'var(--blue)'    },
            { label: 'Machine Learning',color: 'var(--purple)'  },
            { label: 'AI Agents',       color: 'var(--cyan)'    },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-2 p-2.5 rounded text-xs"
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', fontFamily: 'Inter' }}>
              <span style={{ color: f.color }} aria-hidden="true">→</span>
              <span style={{ color: 'var(--text)' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

    </article>
  )
}

function Chev() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
