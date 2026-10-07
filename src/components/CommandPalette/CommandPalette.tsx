import { useState, useEffect, useRef, useCallback } from 'react'
import type { FileId } from '../../data/files'

interface Command {
  label:    string
  desc:     string
  action:   () => void
  shortcut?: string
}

interface Props {
  isOpen:          boolean
  onClose:         () => void
  onFileOpen:      (id: FileId) => void
  onToggleTerminal:() => void
  onToggleTheme:   () => void
}

export default function CommandPalette({ isOpen, onClose, onFileOpen, onToggleTerminal, onToggleTheme }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Command[] = [
    { label: 'Open README',         desc: 'Open README.md homepage',        action: () => { onFileOpen('readme');        onClose() } },
    { label: 'Open Projects',       desc: 'Browse Cartiva & Catrimonial AI', action: () => { onFileOpen('cartiva');       onClose() } },
    { label: 'Open About Me',       desc: 'Who I am and my goals',           action: () => { onFileOpen('about-me');      onClose() } },
    { label: 'Open Skills',         desc: 'View skills.json',                 action: () => { onFileOpen('skills');        onClose() } },
    { label: 'Open Education',      desc: 'BCA timeline',                    action: () => { onFileOpen('education');     onClose() } },
    { label: 'Open Experience',     desc: 'Projects & hackathons',           action: () => { onFileOpen('experience');    onClose() } },
    { label: 'Open Resume',         desc: 'Download resume.pdf',             action: () => { onFileOpen('resume');        onClose() } },
    { label: 'Open Contact',        desc: 'GitHub · LinkedIn · Email',       action: () => { onFileOpen('contact');       onClose() } },
    { label: 'Open Cartiva',        desc: 'Cartiva AI Agent project',        action: () => { onFileOpen('cartiva');       onClose() } },
    { label: 'Open Catrimonial AI', desc: 'Catrimonial AI project',          action: () => { onFileOpen('catrimonial-ai');onClose() } },
    { label: 'Toggle Terminal',     desc: 'Show/hide integrated terminal',   action: () => { onToggleTerminal();          onClose() }, shortcut: 'Ctrl+`' },
    { label: 'Toggle Theme',        desc: 'Switch between dark and light',   action: () => { onToggleTheme();             onClose() } },
  ]

  const filtered = query.trim() === ''
    ? commands
    : commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase())
      )

  // Reset selection when filter changes
  useEffect(() => { setSelected(0) }, [query])

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isOpen])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      filtered[selected]?.action()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }, [filtered, selected, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', paddingTop: '10vh' }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-xl rounded-lg overflow-hidden animate-slide-down shadow-2xl"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border2)' }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }} aria-hidden="true">
            <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            aria-label="Search commands"
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={filtered[selected] ? `cmd-${selected}` : undefined}
            className="flex-1 bg-transparent outline-none font-mono text-sm"
            style={{ color: 'var(--text)' }}
          />
          <span className="text-2xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--bg3)', color: 'var(--text-dim)', border: '1px solid var(--border)' }}>
            ESC
          </span>
        </div>

        {/* Command list */}
        <ul
          id="command-list"
          role="listbox"
          aria-label="Available commands"
          className="max-h-72 overflow-y-auto scroll-area"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              No commands found
            </li>
          ) : filtered.map((cmd, i) => (
            <li
              key={cmd.label}
              id={`cmd-${i}`}
              role="option"
              aria-selected={selected === i}
              onClick={cmd.action}
              onMouseEnter={() => setSelected(i)}
              className="flex items-center justify-between px-4 py-2 cursor-pointer transition-colors"
              style={{
                background: selected === i ? 'var(--active)' : 'transparent',
                color: 'var(--text)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono" style={{ color: selected === i ? 'var(--white)' : 'var(--text)' }}>
                  {cmd.label}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>— {cmd.desc}</span>
              </div>
              {cmd.shortcut && (
                <span className="text-2xs font-mono px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'var(--bg3)', color: 'var(--text-dim)', border: '1px solid var(--border)' }}>
                  {cmd.shortcut}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2 border-t text-2xs font-mono"
          style={{ borderColor: 'var(--border)', color: 'var(--text-dim)', background: 'var(--bg3)' }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
