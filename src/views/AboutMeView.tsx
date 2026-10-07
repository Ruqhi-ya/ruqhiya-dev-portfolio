import { PERSONAL, SOCIAL_LINKS } from '../data/config'

export default function AboutMeView() {
  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="About Me">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>about-me</span>
        <Chev />
        <span style={{ color: 'var(--text)' }}>about-me.md</span>
      </nav>

      <h1 className="text-xl font-bold mb-8 flex items-center gap-2" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
        <span className="font-mono" style={{ color: 'var(--blue)' }}>#</span>
        About Me
      </h1>

      {/* ── Intro card ── */}
      <div className="p-5 rounded-lg mb-8" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
        <p className="text-sm leading-7 mb-2" style={{ color: 'var(--text)', fontFamily: 'Inter' }}>
          Hi, I'm{' '}
          <span style={{ color: 'var(--white)', fontWeight: 600 }}>{PERSONAL.name}</span>{' '}
          — a{' '}
          <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>Backend × AI/ML Developer</span>{' '}
          currently pursuing{' '}
          <span style={{ color: 'var(--orange2)' }}>{PERSONAL.degree}</span>{' '}
          at{' '}
          <span style={{ color: 'var(--orange2)' }}>{PERSONAL.college}</span>,
          graduating in{' '}
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>{PERSONAL.graduatingYear}</span>.
        </p>
        <p className="text-sm leading-7" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
          I build backend systems and intelligent applications using Python, FastAPI, PostgreSQL, and AI/ML.
          Focused on learning deeply, shipping real projects, and working toward backend and AI/ML roles.
        </p>
      </div>

      {/* ── Code profile ── */}
      <section aria-labelledby="profile-code" className="mb-8">
        <h2 id="profile-code" className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Profile</span>
        </h2>
        <div className="rounded-lg p-5 font-mono text-xs leading-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <p><span className="token-keyword">class </span><span className="token-class">Ruqhiya</span><span>:</span></p>
          <p>&nbsp;</p>
          <p className="pl-6"><span className="token-property">role       </span><span> = </span><span className="token-string">"Backend × AI/ML Developer"</span></p>
          <p className="pl-6"><span className="token-property">degree     </span><span> = </span><span className="token-string">"{PERSONAL.degree}"</span></p>
          <p className="pl-6"><span className="token-property">college    </span><span> = </span><span className="token-string">"{PERSONAL.college}"</span></p>
          <p className="pl-6"><span className="token-property">batch      </span><span> = </span><span className="token-number">{PERSONAL.graduatingYear}</span></p>
          <p className="pl-6"><span className="token-property">language   </span><span> = </span><span className="token-string">"Python"</span></p>
          <p className="pl-6"><span className="token-property">framework  </span><span> = </span><span className="token-string">"FastAPI"</span></p>
          <p className="pl-6"><span className="token-property">database   </span><span> = </span><span className="token-string">"PostgreSQL"</span></p>
          <p className="pl-6"><span className="token-property">focus      </span><span> = </span><span className="token-string">"Backend + AI/ML"</span></p>
          <p className="pl-6"><span className="token-property">open_to    </span><span> = </span><span className="token-string">"Internship Opportunities"</span></p>
          <p>&nbsp;</p>
          <p className="pl-6 token-comment"># Build. Learn. Experiment. Improve.</p>
        </div>
      </section>

      {/* ── Building toward ── */}
      <section aria-labelledby="building-toward" className="mb-8">
        <h2 id="building-toward" className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Building Toward</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '⚙',  title: 'Backend Engineering',  desc: 'FastAPI · PostgreSQL · REST APIs'         },
            { icon: '🧠', title: 'AI/ML Applications',   desc: 'ML models · AI agents · intelligent backends' },
            { icon: '📦', title: 'Real Projects',          desc: 'Cartiva · Catrimonial AI — live & shipped' },
            { icon: '🌐', title: 'Open Source',            desc: 'Future goal — Python & backend ecosystems' },
          ].map(item => (
            <div
              key={item.title}
              className="p-4 rounded-lg"
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
                {item.icon}&nbsp;&nbsp;{item.title}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interests ── */}
      <section aria-labelledby="interests" className="mb-8">
        <h2 id="interests" className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>Interests</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Backend systems',
            'AI Agents',
            'Machine Learning',
            'Generative AI',
            'Open source',
            'Building in public',
          ].map(t => (
            <span
              key={t}
              className="badge"
              style={{
                background: 'rgba(86,156,214,0.12)',
                color: 'var(--blue)',
                border: '1px solid rgba(86,156,214,0.25)',
                padding: '3px 10px',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Status / CTA ── */}
      <div className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
        <span className="status-dot flex-shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: '#23d18b', fontFamily: 'Inter' }}>
            {PERSONAL.status}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
            Looking for backend engineering or AI/ML internships · 2028 batch
          </p>
        </div>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded text-xs font-medium flex-shrink-0 transition-all hover:brightness-110"
          style={{ background: 'var(--blue)', color: '#fff', fontFamily: 'Inter' }}
        >
          Connect
        </a>
      </div>

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
