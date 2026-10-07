import { skillGroups, learningStatus } from '../data/skills'

export default function SkillsView() {
  const json = {
    backend:   skillGroups[0].skills,
    ai_ml:     skillGroups[1].skills,
    tools:     skillGroups[2].skills,
  }

  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="Skills">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>portfolio</span>
        <Chev />
        <span style={{ color: 'var(--text)' }}>skills.json</span>
      </nav>

      <h1 className="text-xl font-bold mb-8 flex items-center gap-2" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
        <span className="font-mono" style={{ color: 'var(--yellow)' }}>{'{}'}</span>
        skills.json
      </h1>

      {/* ── JSON code view ── */}
      <section aria-label="Skills JSON" className="mb-10">
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xs font-bold font-mono" style={{ color: 'var(--yellow)' }}>{'{}'}</span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>skills.json</span>
            </div>
            <span className="text-2xs font-mono" style={{ color: 'var(--text-dim)' }}>JSON</span>
          </div>
          {/* Code */}
          <div style={{ background: 'var(--bg)' }}>
            {renderJsonLines(json)}
          </div>
        </div>
      </section>

      {/* ── Visual breakdown ── */}
      <section aria-labelledby="breakdown-heading" className="mb-10">
        <h2
          id="breakdown-heading"
          className="flex items-center gap-2 text-sm font-semibold mb-4"
          style={{ color: 'var(--white)', fontFamily: 'Inter' }}
        >
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          Skill Groups
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {skillGroups.slice(0, 3).map(group => (
            <div
              key={group.key}
              className="p-4 rounded-lg"
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
            >
              <p className="font-mono text-xs font-semibold mb-3" style={{ color: group.color }}>
                [{group.label}]
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="badge"
                    style={{
                      background: `${group.color}14`,
                      color: group.color,
                      border: `1px solid ${group.color}30`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Learning status terminal ── */}
      <section aria-labelledby="learning-heading">
        <h2
          id="learning-heading"
          className="flex items-center gap-2 text-sm font-semibold mb-4"
          style={{ color: 'var(--white)', fontFamily: 'Inter' }}
        >
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          Learning Status
        </h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {/* Prompt header */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
          >
            <span style={{ color: '#23d18b' }} className="font-mono text-xs">ruqhiya@dev</span>
            <span style={{ color: 'var(--text-dim)' }} className="font-mono text-xs">:</span>
            <span style={{ color: 'var(--blue)' }} className="font-mono text-xs">~/learning</span>
            <span style={{ color: 'var(--text-dim)' }} className="font-mono text-xs">$</span>
            <span style={{ color: 'var(--text-muted)' }} className="font-mono text-xs">git status</span>
          </div>
          {/* Items */}
          <div className="p-4 space-y-1.5 font-mono text-xs" style={{ background: 'var(--bg)' }}>
            {learningStatus.map(item => (
              <div key={item.item} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 font-bold"
                  style={{ color: item.done ? '#23d18b' : 'var(--orange2)', minWidth: 12 }}
                  aria-label={item.done ? 'Done' : 'In progress'}
                >
                  {item.done ? '✓' : '→'}
                </span>
                <span style={{ color: item.done ? 'var(--text)' : 'var(--orange2)' }}>
                  {item.item}
                </span>
                {!item.done && (
                  <span
                    className="ml-auto badge"
                    style={{ background: 'rgba(216,122,48,0.12)', color: 'var(--orange2)', border: '1px solid rgba(216,122,48,0.25)' }}
                  >
                    learning
                  </span>
                )}
              </div>
            ))}
            <div className="pt-3 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status: </span>
              <span style={{ color: '#23d18b' }}>Currently building...</span>
            </div>
          </div>
        </div>
      </section>

    </article>
  )
}

/* ── JSON renderer with line numbers ── */
function renderJsonLines(data: Record<string, string[]>) {
  const lines: { n: number; content: React.ReactNode }[] = []
  let n = 1
  const push = (content: React.ReactNode) => lines.push({ n: n++, content })

  push(<span style={{ color: 'var(--text)' }}>{'{'}</span>)
  const keys = Object.keys(data)
  keys.forEach((key, ki) => {
    push(
      <span>
        <span style={{ color: 'var(--blue)' }}>{'  '}&quot;{key}&quot;</span>
        <span style={{ color: 'var(--text)' }}>: [</span>
      </span>
    )
    data[key].forEach((val, vi) => {
      push(
        <span>
          <span style={{ color: 'var(--orange)' }}>{'    '}&quot;{val}&quot;</span>
          {vi < data[key].length - 1 && <span style={{ color: 'var(--text)' }}>,</span>}
        </span>
      )
    })
    push(
      <span style={{ color: 'var(--text)' }}>
        {'  ]'}{ki < keys.length - 1 ? ',' : ''}
      </span>
    )
  })
  push(<span style={{ color: 'var(--text)' }}>{'}'}</span>)

  return (
    <table className="w-full" aria-label="JSON source">
      <tbody>
        {lines.map(({ n: lineNo, content }) => (
          <tr key={lineNo}>
            <td
              className="select-none text-right pr-4 py-px font-mono"
              style={{ width: 36, paddingLeft: 12, color: 'var(--text-dim)', fontSize: 11, verticalAlign: 'top', paddingTop: 2 }}
              aria-hidden="true"
            >
              {lineNo}
            </td>
            <td className="py-px font-mono text-xs" style={{ verticalAlign: 'top', paddingTop: 2, paddingRight: 16 }}>
              {content}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Chev() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
