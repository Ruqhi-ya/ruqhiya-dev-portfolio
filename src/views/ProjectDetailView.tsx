import { projects } from '../data/projects'
import type { FileId } from '../data/files'

interface Props { fileId: FileId }

function Chev() {
  return <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
}
function Md2({ text }: { text: string }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold mb-3 mt-7" style={{ fontFamily: 'Inter' }}>
      <span className="font-mono" style={{ color: 'var(--yellow)' }}>##</span>
      <span style={{ color: 'var(--white)' }}>{text}</span>
    </h2>
  )
}

function CartivaArch() {
  return (
    <div className="p-4 rounded-lg font-mono text-xs mb-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
      <p className="token-comment mb-3"># Request → Response flow</p>
      {[
        { node: 'React Frontend',         color: 'var(--cyan)'    },
        { node: 'FastAPI Router',          color: 'var(--blue)'    },
        { node: 'Business Logic',          color: 'var(--text)'    },
        { node: 'AI Agent (Cart Analysis)',color: 'var(--purple)'  },
        { node: 'PostgreSQL',              color: 'var(--orange2)' },
      ].map((item, i, arr) => (
        <div key={item.node}>
          <div className="inline-flex px-4 py-1.5 rounded text-xs"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: item.color }}>
            {item.node}
          </div>
          {i < arr.length - 1 && (
            <div className="ml-6" style={{ width: 1, height: 16, background: 'var(--border2)' }} />
          )}
        </div>
      ))}
      <div className="mt-3 flex flex-wrap gap-2">
        {['Product Catalogue', 'Cart Manager', 'Bundle Builder', 'Usage Tracking'].map(s => (
          <span key={s} className="px-2 py-1 rounded text-2xs"
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--purple)' }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProjectDetailView({ fileId }: Props) {
  const project = projects.find(p => p.id === fileId)
  if (!project) return <div className="p-6" style={{ color: 'var(--text-muted)' }}>Project not found.</div>

  const isCartiva = fileId === 'cartiva'

  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label={`${project.name} project`}>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>projects</span><Chev />
        <span style={{ color: 'var(--text)' }}>{project.fileName}</span>
      </nav>

      {/* ── File header card ── */}
      <div className="rounded-lg overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold font-mono" style={{ color: '#4ec9b0' }}>py</span>
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{project.fileName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge" style={{ background: 'rgba(86,156,214,0.14)', color: 'var(--blue)', border: '1px solid rgba(86,156,214,0.28)' }}>
              {project.category}
            </span>
            <span className="text-2xs font-mono" style={{ color: '#23d18b' }}>● {project.status}</span>
          </div>
        </div>
        <div className="p-4 font-mono text-xs leading-6" style={{ background: 'var(--bg)' }}>
          <p><span className="token-keyword">class </span><span className="token-class">{project.name.split(' ')[0]}</span><span>:</span></p>
          <p>&nbsp;</p>
          <p className="pl-6 token-comment"># {project.description}</p>
          <p>&nbsp;</p>
          <p className="pl-6">
            <span className="token-property">stack</span><span> = </span>
            <span>[</span>
            {project.technologies.map((t, i) => (
              <span key={t}>
                <span className="token-string">"{t}"</span>
                {i < project.technologies.length - 1 && <span>, </span>}
              </span>
            ))}
            <span>]</span>
          </p>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex flex-wrap gap-3 mb-8">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded text-xs font-semibold transition-all hover:brightness-110"
            style={{ background: 'var(--blue)', color: '#fff', fontFamily: 'Inter' }}>
            🌐 Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded text-xs font-medium transition-all hover:border-[var(--blue)]"
            style={{ border: '1px solid var(--border2)', color: 'var(--text)', background: 'transparent', fontFamily: 'Inter' }}>
            GitHub
          </a>
        )}
      </div>

      {/* ── Overview ── */}
      <Md2 text="Overview" />
      <p className="text-sm leading-7 mb-2" style={{ color: 'var(--text)', fontFamily: 'Inter' }}>
        {project.longDescription}
      </p>

      {/* ── CV Bullet points ── */}
      <Md2 text="What I Built" />
      <ul className="space-y-2.5 mb-4">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-6"
            style={{ color: 'var(--text)', fontFamily: 'Inter' }}>
            <span className="flex-shrink-0 font-mono text-xs mt-1" style={{ color: 'var(--green)' }}>→</span>
            {b}
          </li>
        ))}
      </ul>

      {/* ── Architecture (Cartiva) ── */}
      {isCartiva && (
        <>
          <Md2 text="Architecture" />
          <CartivaArch />
        </>
      )}

      {/* ── Tech stack ── */}
      <Md2 text="Tech Stack" />
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(t => (
          <span key={t} className="badge"
            style={{ background: 'rgba(86,156,214,0.12)', color: 'var(--blue)', border: '1px solid rgba(86,156,214,0.25)' }}>
            {t}
          </span>
        ))}
      </div>

      {/* ── Code snippet ── */}
      <Md2 text={isCartiva ? 'API Endpoint Example' : 'Matching Logic Example'} />
      <div className="p-4 rounded-lg font-mono text-xs leading-6 mb-4"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
        {isCartiva ? (
          <>
            <p className="token-comment"># Cart optimize endpoint — FastAPI + AI agent</p>
            <p>&nbsp;</p>
            <p><span className="token-purple">@router</span><span>.</span><span className="token-function">post</span><span>(</span><span className="token-string">"/cart/&#123;cart_id&#125;/optimize"</span><span>)</span></p>
            <p><span className="token-keyword">async def </span><span className="token-function">optimize_cart</span><span>(</span></p>
            <p className="pl-6"><span className="token-variable">cart_id</span><span>: </span><span className="token-type">int</span><span>,</span></p>
            <p className="pl-6"><span className="token-variable">db</span><span>: </span><span className="token-type">Session</span><span> = </span><span className="token-function">Depends</span><span>(get_db)</span></p>
            <p><span>):</span></p>
            <p className="pl-6"><span className="token-variable">cart</span><span> = </span><span className="token-function">get_cart</span><span>(db, cart_id)</span></p>
            <p className="pl-6"><span className="token-variable">suggestions</span><span> = </span><span className="token-function">ai_agent</span><span>.optimize(cart)</span></p>
            <p className="pl-6"><span className="token-keyword">return </span><span>&#123;</span><span className="token-string">"suggestions"</span><span>: suggestions&#125;</span></p>
          </>
        ) : (
          <>
            <p className="token-comment"># Cat compatibility scoring — Spring Boot + FastAPI</p>
            <p>&nbsp;</p>
            <p><span className="token-purple">@PostMapping</span><span>(</span><span className="token-string">"/match"</span><span>)</span></p>
            <p><span className="token-keyword">public </span><span className="token-type">MatchResult </span><span className="token-function">findMatches</span><span>(</span></p>
            <p className="pl-6"><span className="token-purple">@RequestBody </span><span className="token-type">CatProfile </span><span className="token-variable">profile</span></p>
            <p><span>) &#123;</span></p>
            <p className="pl-6"><span className="token-keyword">return </span><span className="token-function">matchingService</span><span>.score(profile);</span></p>
            <p>&#125;</p>
          </>
        )}
      </div>

    </article>
  )
}
