import { useState, useEffect, useCallback } from 'react'

import TitleBar                      from './components/TitleBar/TitleBar'
import ActivityBar, { ActivityView } from './components/ActivityBar/ActivityBar'
import Explorer                      from './components/Explorer/Explorer'
import EditorTabs                    from './components/Editor/EditorTabs'
import EditorContent                 from './components/Editor/EditorContent'
import Terminal                      from './components/Terminal/Terminal'
import StatusBar                     from './components/StatusBar/StatusBar'
import CommandPalette                from './components/CommandPalette/CommandPalette'
import MobileNav                     from './components/MobileNav/MobileNav'

import { useTheme }      from './hooks/useTheme'
import { useEditorTabs } from './hooks/useEditorTabs'
import type { FileId }   from './data/files'

// Sidebar widths
const SIDEBAR_WIDTH = 240

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { tabs, activeTab, openTab, closeTab } = useEditorTabs('readme')

  const [activityView, setActivityView]   = useState<ActivityView>('explorer')
  const [sidebarOpen, setSidebarOpen]     = useState(true)
  const [terminalOpen, setTerminalOpen]   = useState(false)
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false)

  // Open a file and switch to explorer view
  const handleFileOpen = useCallback((id: FileId) => {
    openTab(id)
    setActivityView('explorer')
  }, [openTab])

  // Handle activity bar clicks — toggle sidebar if same view clicked
  const handleActivityView = useCallback((view: ActivityView) => {
    if (view === activityView && sidebarOpen) {
      setSidebarOpen(false)
    } else {
      setActivityView(view)
      setSidebarOpen(true)
    }
  }, [activityView, sidebarOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+K — command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdPaletteOpen(prev => !prev)
        return
      }
      // Ctrl+` — terminal
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setTerminalOpen(prev => !prev)
        return
      }
      // Ctrl+B — sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        setSidebarOpen(prev => !prev)
        return
      }
      // Escape — close command palette
      if (e.key === 'Escape') {
        setCmdPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* ── Title Bar ── */}
      <TitleBar />

      {/* ── Main body (everything below title bar, above status bar) ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Activity Bar (desktop) ── */}
        <ActivityBar
          activeView={activityView}
          onViewChange={handleActivityView}
          onFileOpen={handleFileOpen}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* ── Sidebar (Explorer only now) ── */}
        {sidebarOpen && (
          <aside
            className="flex-shrink-0 border-r overflow-hidden desktop-only sidebar-md"
            style={{
              width: SIDEBAR_WIDTH,
              background: 'var(--sidebar)',
              borderColor: 'var(--border)',
            }}
            aria-label="File explorer"
          >
            <Explorer activeFile={activeTab} onFileOpen={handleFileOpen} />
          </aside>
        )}

        {/* ── Editor area ── */}
        <main className="flex flex-col flex-1 overflow-hidden" role="main" aria-label="Editor">
          {/* Tabs */}
          <EditorTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={openTab}
            onTabClose={closeTab}
          />

          {/* Breadcrumb bar */}
          <div
            className="flex items-center gap-1 px-4 py-1 flex-shrink-0 border-b text-2xs font-mono"
            style={{ background: 'var(--bg2)', borderColor: 'var(--border)', color: 'var(--text-dim)' }}
            aria-label="Breadcrumb navigation"
          >
            <span>ruqhiya-portfolio</span>
            <ChevronRight />
            <span style={{ color: 'var(--text-muted)' }}>{activeTab}</span>
          </div>

          {/* Scrollable editor content */}
          <div className="flex-1 overflow-y-auto scroll-area mobile-content-pad" style={{ paddingBottom: terminalOpen ? 0 : undefined }}>
            <EditorContent activeFile={activeTab} onFileOpen={handleFileOpen} />
          </div>

          {/* Terminal */}
          <Terminal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />
        </main>
      </div>

      {/* ── Status Bar ── */}
      <StatusBar
        activeTab={activeTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleTerminal={() => setTerminalOpen(p => !p)}
        terminalOpen={terminalOpen}
      />

      {/* ── Command Palette ── */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onFileOpen={handleFileOpen}
        onToggleTerminal={() => setTerminalOpen(p => !p)}
        onToggleTheme={toggleTheme}
      />

      {/* ── Mobile Bottom Nav ── */}
      <MobileNav onFileOpen={handleFileOpen} activeFile={activeTab} />

      {/* ── Keyboard shortcut hint (desktop only, shown once) ── */}
      <KeyboardHint onOpenPalette={() => setCmdPaletteOpen(true)} />
    </div>
  )
}

/* Small unobtrusive hint that fades after a few seconds */
function KeyboardHint({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(id)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => { onOpenPalette(); setVisible(false) }}
      className="desktop-only fixed bottom-10 right-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded text-2xs font-mono transition-opacity hover:opacity-100"
      style={{
        background: 'var(--bg3)',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)',
        opacity: 0.8,
      }}
      aria-label="Open command palette (Ctrl+K)"
    >
      <span>Ctrl+K</span>
      <span style={{ color: 'var(--text-dim)' }}>Command Palette</span>
    </button>
  )
}

function ChevronRight() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
