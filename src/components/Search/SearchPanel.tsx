import { useState, useCallback, useRef, useEffect } from 'react'
import type { FileId } from '../../data/files'

interface SearchResult {
  fileId:   FileId
  fileName: string
  excerpt:  string
  matches:  string[]
}

/* ── Search index ── */
const INDEX: Array<{ fileId: FileId; fileName: string; content: string; tags: string[] }> = [
  {
    fileId: 'readme', fileName: 'README.md',
    content: 'Ruqhiya backend AI ML developer Python FastAPI PostgreSQL REST API welcome homepage',
    tags: ['about', 'home', 'ruqhiya', 'developer'],
  },
  {
    fileId: 'cartiva', fileName: 'cartiva.py',
    content: 'Cartiva AI shopping assistant cart optimization bundle product recommendation FastAPI PostgreSQL REST API Python backend',
    tags: ['project', 'fastapi', 'postgresql', 'python', 'ai', 'backend'],
  },
  {
    fileId: 'catrimonial-ai', fileName: 'catrimonial_ai.py',
    content: 'Catrimonial AI cat matchmaking breeding recommendations machine learning Python FastAPI data processing',
    tags: ['project', 'ml', 'ai', 'python', 'fastapi'],
  },
  {
    fileId: 'about-me', fileName: 'about-me.md',
    content: 'About Ruqhiya BCA student backend developer AI ML FastAPI Python internship 2028 goals interests',
    tags: ['about', 'ruqhiya', 'bca', 'student', 'internship'],
  },
  {
    fileId: 'skills', fileName: 'skills.json',
    content: 'Skills backend Python FastAPI REST APIs PostgreSQL SQL AI ML NumPy Pandas AI agents Git GitHub VS Code',
    tags: ['skills', 'python', 'fastapi', 'postgresql', 'git'],
  },
  {
    fileId: 'education', fileName: 'education.md',
    content: 'Education BCA JSS Autonomous College 2028 graduation timeline',
    tags: ['education', 'bca', 'college', '2028'],
  },
  {
    fileId: 'experience', fileName: 'experience.md',
    content: 'Experience hackathons projects Cartiva Catrimonial AI open source contribution',
    tags: ['experience', 'hackathon', 'projects', 'open source'],
  },
  {
    fileId: 'contact', fileName: 'contact.md',
    content: 'Contact GitHub LinkedIn email internship collaboration backend AI ML open source',
    tags: ['contact', 'github', 'linkedin', 'email', 'internship'],
  },
]

function search(query: string): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  return INDEX
    .filter(doc =>
      doc.content.toLowerCase().includes(q) ||
      doc.tags.some(t => t.includes(q)) ||
      doc.fileName.toLowerCase().includes(q)
    )
    .map(doc => {
      const words = doc.content.split(' ')
      const matchIdx = words.findIndex(w => w.toLowerCase().includes(q))
      const start = Math.max(0, matchIdx - 3)
      const excerpt = words.slice(start, start + 12).join(' ')
      return { fileId: doc.fileId, fileName: doc.fileName, excerpt, matches: [q] }
    })
}

interface Props {
  onFileOpen: (id: FileId) => void
}

export default function SearchPanel({ onFileOpen }: Props) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search
  const handleChange = useCallback((val: string) => {
    setQuery(val)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setResults(search(query)), 120)
    return () => clearTimeout(id)
  }, [query])

  useEffect(() => { inputRef.current?.focus() }, [])

  function highlight(text: string, q: string) {
    if (!q.trim()) return text
    const parts = text.split(new RegExp(`(${q})`, 'gi'))
    return parts.map((p, i) =>
      p.toLowerCase() === q.toLowerCase()
        ? <mark key={i} style={{ background: 'rgba(86,156,214,0.3)', color: 'var(--white)', borderRadius: 2 }}>{p}</mark>
        : p
    )
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: 'var(--sidebar)' }}
    >
      {/* Header */}
      <div className="px-4 py-2 text-2xs font-semibold tracking-widest uppercase flex-shrink-0"
        style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
        Search
      </div>

      {/* Input */}
      <div className="px-3 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--text-muted)', flexShrink: 0 }} aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => handleChange(e.target.value)}
            placeholder="Search..."
            aria-label="Search portfolio content"
            className="flex-1 bg-transparent outline-none font-mono text-xs"
            style={{ color: 'var(--text)' }}
            role="searchbox"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search" style={{ color: 'var(--text-muted)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto scroll-area px-2" role="region" aria-label="Search results" aria-live="polite">
        {!query ? (
          <div className="px-2 py-4 text-xs" style={{ color: 'var(--text-dim)' }}>
            <p className="mb-3">Try searching for:</p>
            {['FastAPI', 'RAG', 'PostgreSQL', 'AI Agents', 'Cartiva'].map(s => (
              <button
                key={s}
                onClick={() => handleChange(s)}
                className="block w-full text-left px-2 py-1 mb-1 rounded hover:bg-white/5 transition-colors font-mono"
                style={{ color: 'var(--text-muted)' }}
              >
                {s}
              </button>
            ))}
          </div>
        ) : results.length === 0 ? (
          <p className="px-2 py-4 text-xs" style={{ color: 'var(--text-dim)' }}>
            No results for "{query}"
          </p>
        ) : (
          <div>
            <p className="px-2 py-1 text-2xs font-mono" style={{ color: 'var(--text-dim)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.map(result => (
              <button
                key={result.fileId}
                onClick={() => onFileOpen(result.fileId)}
                className="w-full text-left px-2 py-2 mb-1 rounded transition-colors explorer-item"
                style={{ color: 'var(--text)' }}
                aria-label={`Open ${result.fileName}`}
              >
                <p className="font-mono text-2xs mb-1" style={{ color: 'var(--blue)' }}>
                  {result.fileName}
                </p>
                <p className="text-2xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                  {highlight(result.excerpt, query)}…
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
