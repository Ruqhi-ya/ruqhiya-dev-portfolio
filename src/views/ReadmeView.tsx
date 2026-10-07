import { useEffect, useState } from 'react'
import { PERSONAL, SOCIAL_LINKS } from '../data/config'
import type { FileId } from '../data/files'

interface Props {
  onFileOpen: (id: FileId) => void
}

const TYPING_LINES = [
  '> Backend systems',
  '> APIs & databases',
  '> Machine learning',
  '> AI applications',
]

export default function ReadmeView({ onFileOpen }: Props) {
  const [shownLines, setShownLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const tick = () => {
      if (i < TYPING_LINES.length) {
        setShownLines(prev => [...prev, TYPING_LINES[i]])
        i++
        setTimeout(tick, 300)
      } else {
        setDone(true)
      }
    }
    const id = setTimeout(tick, 700)
    return () => clearTimeout(id)
  }, [])

  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="README — Homepage">

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>portfolio</span>
        <Chev />
        <span style={{ color: 'var(--text)' }}>README.md</span>
      </nav>

      {/* ── Hero ── */}
      <header className="mb-8">
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="font-mono font-bold text-2xl leading-none" style={{ color: 'var(--blue)' }}>#</span>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
            Hi, I'm {PERSONAL.name} 👋
          </h1>
        </div>
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="font-mono font-semibold text-base leading-none" style={{ color: 'var(--purple)' }}>##</span>
          <h2 className="text-base font-semibold" style={{ color: 'var(--cyan)', fontFamily: 'Inter' }}>
            {PERSONAL.title}
          </h2>
        </div>
        <p className="text-sm leading-7 mb-1" style={{ color: 'var(--text)', fontFamily: 'Inter' }}>
          I build backend systems and intelligent applications
          using Python, APIs, databases and AI/ML.
        </p>
        <p className="text-sm leading-7" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
          Currently focused on building strong backend fundamentals
          and exploring real-world AI systems.
        </p>
      </header>

      {/* ── Status ── */}
      <div className="flex items-center gap-2.5 mb-8">
        <span className="status-dot flex-shrink-0" aria-hidden="true" />
        <span className="text-xs font-mono" style={{ color: '#23d18b' }}>
          {PERSONAL.status}
        </span>
      </div>

      {/* ── CTA buttons ── */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => onFileOpen('cartiva')}
          className="px-5 py-2 rounded text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ background: 'var(--blue)', color: '#fff', fontFamily: 'Inter' }}
        >
          View Projects
        </button>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded text-sm font-medium transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ border: '1px solid var(--border2)', color: 'var(--text)', background: 'transparent', fontFamily: 'Inter' }}
        >
          GitHub
        </a>
        {SOCIAL_LINKS.resume && (
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded text-sm font-medium transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ border: '1px solid var(--border2)', color: 'var(--text)', background: 'transparent', fontFamily: 'Inter' }}
          >
            ↓ Resume
          </a>
        )}
      </div>

      {/* ── Quick stats ── */}
      <section aria-labelledby="stats-heading" className="mb-10">
        <h3 id="stats-heading" className="sr-only">Developer Stats</h3>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--border)' }}
        >
          {[
            { label: 'Projects',  value: '2',          color: 'var(--cyan)'    },
            { label: 'Language',  value: 'Python',     color: 'var(--green)'   },
            { label: 'Framework', value: 'FastAPI',    color: 'var(--yellow)'  },
            { label: 'Database',  value: 'PostgreSQL', color: 'var(--orange2)' },
            { label: 'Focus',     value: 'Backend + AI/ML', color: 'var(--purple)' },
            { label: 'Batch',     value: '2028',       color: 'var(--blue)'    },
          ].map(s => (
            <div
              key={s.label}
              className="flex flex-col gap-1 px-4 py-3"
              style={{ background: 'var(--bg2)' }}
            >
              <span className="font-mono font-semibold text-sm" style={{ color: s.color }}>{s.value}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Terminal block ── */}
      <section aria-labelledby="terminal-heading" className="mb-10">
        <h3 id="terminal-heading" className="sr-only">Terminal Output</h3>
        <div
          className="rounded-lg overflow-hidden font-mono text-xs"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          {/* Terminal chrome */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-2 text-2xs" style={{ color: 'var(--text-dim)' }}>bash — ruqhiya@dev</span>
          </div>
          {/* Output */}
          <div className="p-4 space-y-0.5">
            <p>
              <span style={{ color: '#23d18b' }}>ruqhiya@dev</span>
              <span style={{ color: 'var(--text-dim)' }}>:</span>
              <span style={{ color: 'var(--blue)' }}>~/portfolio</span>
              <span style={{ color: 'var(--text-dim)' }}>$ </span>
              <span style={{ color: 'var(--white)' }}>python profile.py</span>
            </p>
            <div style={{ height: 8 }} />
            {shownLines.map((line, i) => (
              <p key={i} className="animate-fade-in" style={{ color: 'var(--green)' }}>{line}</p>
            ))}
            {done && (
              <>
                <div style={{ height: 8 }} />
                <p>
                  <span style={{ color: 'var(--text-muted)' }}>Status: </span>
                  <span style={{ color: '#23d18b' }}>Currently building...</span>
                </p>
                <div style={{ height: 8 }} />
                <p>
                  <span style={{ color: '#23d18b' }}>ruqhiya@dev</span>
                  <span style={{ color: 'var(--text-dim)' }}>:</span>
                  <span style={{ color: 'var(--blue)' }}>~/portfolio</span>
                  <span style={{ color: 'var(--text-dim)' }}>$ </span>
                  <span className="cursor-blink" style={{ color: 'var(--white)' }}>█</span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Explore grid ── */}
      <section aria-labelledby="nav-heading" className="mb-10">
        <h3
          id="nav-heading"
          className="flex items-center gap-2 mb-4 text-sm font-semibold"
          style={{ fontFamily: 'Inter', color: 'var(--white)' }}
        >
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          Explore
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {([
            { label: '📁 Projects',    id: 'cartiva'    as FileId, desc: 'Cartiva · Catrimonial AI'     },
            { label: '👤 About Me',    id: 'about-me'   as FileId, desc: 'Who I am & my goals'          },
            { label: '🎓 Education',   id: 'education'  as FileId, desc: 'BCA · Batch 2028'             },
            { label: '🛠 Skills',      id: 'skills'     as FileId, desc: 'skills.json'                  },
            { label: '📋 Experience',  id: 'experience' as FileId, desc: 'Projects & roadmap'           },
            { label: '📬 Contact',     id: 'contact'    as FileId, desc: 'GitHub · LinkedIn · Email'    },
          ] as const).map(item => (
            <button
              key={item.id}
              onClick={() => onFileOpen(item.id)}
              className="text-left p-3 rounded text-xs transition-all hover:border-[var(--blue)] hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              <div className="font-semibold mb-1" style={{ fontFamily: 'Inter', fontSize: 12 }}>{item.label}</div>
              <div style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{item.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Quote ── */}
      <blockquote
        className="border-l-2 pl-4 py-1 text-sm italic"
        style={{ borderColor: 'var(--blue)', color: 'var(--text-muted)', fontFamily: 'Inter' }}
      >
        Build. Learn. Experiment. Improve.
      </blockquote>

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
