import type { FileId } from '../../data/files'

interface Props {
  onFileOpen: (id: FileId) => void
  activeFile: FileId
}

const NAV_ITEMS: Array<{ id: FileId; label: string; icon: string }> = [
  { id: 'readme',    label: 'Home',     icon: '🏠' },
  { id: 'cartiva',   label: 'Projects', icon: '📁' },
  { id: 'about-me',  label: 'About',    icon: '👤' },
  { id: 'skills',    label: 'Skills',   icon: '🛠' },
  { id: 'contact',   label: 'Contact',  icon: '📬' },
]

export default function MobileNav({ onFileOpen, activeFile }: Props) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-only fixed bottom-0 left-0 right-0 z-40 flex border-t"
      style={{
        background:    'var(--bg2)',
        borderColor:   'var(--border)',
        height:        52,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map(item => {
        const isActive = activeFile === item.id ||
          (item.id === 'cartiva' && activeFile === 'catrimonial-ai')

        return (
          <button
            key={item.id}
            onClick={() => onFileOpen(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
            style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)' }}
          >
            <span className="text-base" aria-hidden="true">{item.icon}</span>
            <span className="font-mono" style={{ fontSize: 10 }}>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
