import { useRef, useEffect } from 'react'
import { fileMeta } from '../../data/files'
import type { FileId } from '../../data/files'

interface Props {
  tabs: FileId[]
  activeTab: FileId
  onTabClick: (id: FileId) => void
  onTabClose: (id: FileId) => void
}

export default function EditorTabs({ tabs, activeTab, onTabClick, onTabClose }: Props) {
  const activeRef = useRef<HTMLButtonElement>(null)

  // Scroll active tab into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeTab])

  return (
    <div
      role="tablist"
      aria-label="Open editor tabs"
      className="flex items-end overflow-x-auto flex-shrink-0 scroll-area"
      style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        minHeight: 35,
        scrollbarWidth: 'none',
      }}
    >
      {tabs.map(tabId => {
        const meta = fileMeta[tabId]
        const isActive = tabId === activeTab
        return (
          <div
            key={tabId}
            role="tab"
            aria-selected={isActive}
            className="flex items-center flex-shrink-0 group"
            style={{
              background: isActive ? 'var(--tab-active)' : 'var(--tab-bg)',
              borderRight: '1px solid var(--border)',
              borderTop: isActive ? '1px solid var(--blue)' : '1px solid transparent',
              height: 35,
            }}
          >
            <button
              ref={isActive ? activeRef : undefined}
              onClick={() => onTabClick(tabId)}
              aria-label={`Open ${meta.label}`}
              className="flex items-center gap-1.5 px-3 h-full text-xs font-mono transition-colors"
              style={{ color: isActive ? 'var(--white)' : 'var(--text-muted)' }}
            >
              <TabIcon lang={meta.lang} />
              <span>{meta.label}</span>
            </button>
            <button
              onClick={e => { e.stopPropagation(); onTabClose(tabId) }}
              aria-label={`Close ${meta.label}`}
              className="w-6 h-6 flex items-center justify-center mr-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )
      })}
      {/* Remaining space */}
      <div className="flex-1 h-full" style={{ borderBottom: '1px solid transparent' }} />
    </div>
  )
}

function TabIcon({ lang }: { lang: string }) {
  switch (lang) {
    case 'python':
      return <span className="text-2xs font-bold" style={{ color: '#4ec9b0' }}>py</span>
    case 'markdown':
      return <span className="text-2xs font-bold" style={{ color: '#519aba' }}>md</span>
    case 'json':
      return <span className="text-2xs font-bold" style={{ color: '#dcdcaa' }}>{'{}'}</span>
    case 'pdf':
      return <span className="text-2xs font-bold" style={{ color: '#f44747' }}>pdf</span>
    default:
      return <span className="text-2xs" style={{ color: 'var(--text-dim)' }}>◻</span>
  }
}
