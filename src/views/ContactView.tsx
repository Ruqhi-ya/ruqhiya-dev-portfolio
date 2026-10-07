import { SOCIAL_LINKS } from '../data/config'

export default function ContactView() {
  return (
    <article className="animate-fade-in max-w-2xl mx-auto px-4 sm:px-6 py-8" aria-label="Contact">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-6 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>portfolio</span><Chevron />
        <span style={{ color: 'var(--text)' }}>contact.md</span>
      </nav>

      <h1 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
        <span className="font-mono" style={{ color: 'var(--blue)' }}>#</span>
        Contact
      </h1>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
        Interested in collaborating, internships, backend engineering,<br className="hidden sm:block" />
        AI/ML projects or open-source work? Let's connect.
      </p>

      {/* Contact cards */}
      <section aria-label="Contact links" className="space-y-3 mb-10">
        {[
          {
            label:  'GitHub',
            icon:   <GitHubIcon />,
            href:   SOCIAL_LINKS.github,
            desc:   'github.com/Ruqhi-ya',
            color:  'var(--text)',
          },
          {
            label:  'LinkedIn',
            icon:   <LinkedInIcon />,
            href:   SOCIAL_LINKS.linkedin,
            desc:   'linkedin.com/in/ruqhiya-969b00370',
            color:  '#0a66c2',
          },
          {
            label:  'Email',
            icon:   <EmailIcon />,
            href:   `mailto:${SOCIAL_LINKS.email}`,
            desc:   SOCIAL_LINKS.email,
            color:  'var(--orange2)',
          },
        ].map(item => (
          <div
            key={item.label}
            className="flex items-center gap-4 p-4 rounded transition-all"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--bg3)', color: item.color }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
                {item.label}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                {item.desc}
              </p>
            </div>
            <a
              href={item.href}
              target={!item.href.startsWith('mailto') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={`Open ${item.label}`}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-[1.02] flex-shrink-0"
              style={{ background: 'var(--blue)', color: '#fff', fontFamily: 'Inter' }}
            >
              Open
            </a>
          </div>
        ))}
      </section>

      {/* Open to */}
      <section aria-labelledby="reach-heading" className="mb-8">
        <h2 id="reach-heading" className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
          <span style={{ color: 'var(--white)' }}>I'm open to</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Backend engineering internships',
            'Python / FastAPI projects',
            'AI/ML experiments',
            'Open-source collaboration',
            'Learning together',
            'Feedback on my projects',
          ].map(item => (
            <div
              key={item}
              className="flex items-center gap-2 p-2.5 rounded text-xs"
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Inter' }}
            >
              <span style={{ color: '#23d18b' }} aria-hidden="true">✓</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Quick config hint */}
      <div className="p-4 rounded font-mono text-xs" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
        <p className="token-comment mb-2"># Contact details</p>
        <p><span className="token-keyword">email    </span><span className="token-operator">= </span><span className="token-string">"{SOCIAL_LINKS.email}"</span></p>
        <p><span className="token-keyword">github   </span><span className="token-operator">= </span><span className="token-string">"{SOCIAL_LINKS.github}"</span></p>
        <p><span className="token-keyword">linkedin </span><span className="token-operator">= </span><span className="token-string">"{SOCIAL_LINKS.linkedin}"</span></p>
      </div>
    </article>
  )
}

function Chevron() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
}
function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
}
function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function EmailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
