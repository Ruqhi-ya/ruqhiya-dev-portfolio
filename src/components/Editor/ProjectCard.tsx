import type { Project } from '../../data/projects'
import type { FileId } from '../../data/files'

interface Props {
  project: Project
  onOpen:  (id: FileId) => void
}

export default function ProjectCard({ project, onOpen }: Props) {
  const fileId = project.id as FileId

  return (
    <article
      className="code-card group cursor-pointer"
      onClick={() => onOpen(fileId)}
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.name} project detail`}
      onKeyDown={e => e.key === 'Enter' && onOpen(fileId)}
    >
      {/* ── File tab header ── */}
      <div className="code-card-header">
        <div className="flex items-center gap-2">
          <span className="text-2xs font-bold font-mono" style={{ color: '#4ec9b0' }}>py</span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{project.fileName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="badge"
            style={{ background: 'rgba(86,156,214,0.14)', color: 'var(--blue)', border: '1px solid rgba(86,156,214,0.28)' }}
          >
            {project.category.split('/')[0].trim()}
          </span>
          <span className="text-2xs font-mono" style={{ color: '#23d18b' }}>● {project.status}</span>
        </div>
      </div>

      {/* ── Code body ── */}
      <div className="p-4 font-mono text-xs leading-6">
        <p>
          <span className="token-keyword">class </span>
          <span className="token-class">{project.name.replace(/\s/g, '')}</span>
          <span>:</span>
        </p>
        <p>&nbsp;</p>
        <p className="pl-6 token-comment"># {project.description.slice(0, 60)}{project.description.length > 60 ? '…' : ''}</p>
        <p>&nbsp;</p>
        {project.technologies.slice(0, 3).map((tech) => (
          <p key={tech} className="pl-6">
            <span className="token-property">{tech.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>
            <span> = </span>
            <span className="token-string">"{tech}"</span>
          </p>
        ))}
        <p className="pl-6">
          <span className="token-property">ai_powered</span>
          <span> = </span>
          <span className="token-keyword">True</span>
        </p>
      </div>

      {/* ── Footer ── */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <button
          onClick={e => { e.stopPropagation(); onOpen(fileId) }}
          className="px-3 py-1.5 rounded text-xs font-semibold transition-all hover:brightness-110"
          style={{ background: 'var(--blue)', color: '#fff', fontFamily: 'Inter' }}
          aria-label={`View ${project.name} details`}
        >
          View Details
        </button>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:border-[var(--blue)]"
            style={{ border: '1px solid var(--border2)', color: 'var(--text)', background: 'transparent', fontFamily: 'Inter' }}
            aria-label={`${project.name} live demo`}
          >
            Live →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:border-[var(--blue)]"
            style={{ border: '1px solid var(--border2)', color: 'var(--text-muted)', background: 'transparent', fontFamily: 'Inter' }}
            aria-label={`${project.name} GitHub`}
          >
            GitHub
          </a>
        )}
      </div>
    </article>
  )
}
