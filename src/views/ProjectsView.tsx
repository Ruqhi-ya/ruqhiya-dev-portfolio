import ProjectCard from '../components/Editor/ProjectCard'
import { projects } from '../data/projects'
import type { FileId } from '../data/files'

interface Props {
  onFileOpen: (id: FileId) => void
}

export default function ProjectsView({ onFileOpen }: Props) {
  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="Projects">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-8 font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>portfolio</span>
        <Chev />
        <span style={{ color: 'var(--text)' }}>projects</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--white)', fontFamily: 'Inter' }}>
          <span className="font-mono" style={{ color: 'var(--blue)' }}>#</span>
          Projects
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
          Hands-on projects built to learn backend engineering and AI/ML through practice.
          Both projects are live and deployed.
        </p>
      </header>

      {/* Grid */}
      <section aria-label="Project list" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onOpen={onFileOpen} />
        ))}
      </section>

      {/* Footer note */}
      <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
        <span style={{ color: 'var(--green2)' }}># </span>
        More projects in progress. Building consistently.
      </p>

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
