import { fileMeta } from '../../data/files'
import type { FileId } from '../../data/files'
import type { Theme } from '../../hooks/useTheme'

interface Props {
  activeTab: FileId
  theme: Theme
  onToggleTheme: () => void
  onToggleTerminal: () => void
  terminalOpen: boolean
}

export default function StatusBar({ activeTab, theme, onToggleTheme, onToggleTerminal, terminalOpen }: Props) {
  const meta = fileMeta[activeTab]

  return (
    <footer
      role="contentinfo"
      aria-label="Status Bar"
      style={{ background: 'var(--statusbar)', height: 22, fontSize: 11 }}
      className="flex items-center justify-between px-3 flex-shrink-0 select-none text-white"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Git branch indicator */}
        <span className="flex items-center gap-1 font-mono opacity-90">
          <BranchIcon />
          <span>main</span>
        </span>
        {/* Status */}
        <span className="font-mono opacity-90">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#23d18b] mr-1 align-middle" />
          Available
        </span>
      </div>

      {/* Center */}
      <span className="font-mono opacity-90 hidden sm:block">
        Backend × AI/ML
      </span>

      {/* Right */}
      <div className="flex items-center gap-3 font-mono">
        <button
          onClick={onToggleTerminal}
          aria-label={terminalOpen ? 'Close terminal' : 'Open terminal'}
          title={terminalOpen ? 'Close terminal' : 'Open terminal'}
          className="opacity-90 hover:opacity-100 transition-opacity px-1"
        >
          {terminalOpen ? '⌄ Terminal' : '⌃ Terminal'}
        </button>
        <span className="opacity-90 hidden md:block">Ln 1, Col 1</span>
        <span className="opacity-90 hidden md:block">UTF-8</span>
        <span className="opacity-90 hidden md:block">LF</span>
        <span className="opacity-90">{meta?.lang ?? 'plaintext'}</span>
        <button
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Theme: ${theme}`}
          className="opacity-90 hover:opacity-100 transition-opacity"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </footer>
  )
}

function BranchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15"/>
      <circle cx="18" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M18 9a9 9 0 0 1-9 9"/>
    </svg>
  )
}
