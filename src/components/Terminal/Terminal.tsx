import { useRef } from 'react'
import { useTerminal } from '../../hooks/useTerminal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Terminal({ isOpen, onClose }: Props) {
  const { lines, input, setInput, handleKeyDown, bottomRef } = useTerminal()
  const inputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  return (
    <section
      aria-label="Integrated terminal"
      className="flex flex-col border-t"
      style={{
        background: 'var(--bg)',
        borderColor: 'var(--border)',
        height: 220,
        flexShrink: 0,
      }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center justify-between px-3 py-1 flex-shrink-0 border-b select-none"
        style={{ background: 'var(--bg2)', borderColor: 'var(--border)', height: 30 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>TERMINAL</span>
          <span
            className="text-2xs font-mono px-2 py-0.5 rounded"
            style={{ background: 'var(--bg3)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            bash
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => inputRef.current?.focus()}
            aria-label="Focus terminal input"
            className="p-1 rounded hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </button>
          <button
            onClick={onClose}
            aria-label="Close terminal"
            className="p-1 rounded hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Output area */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs scroll-area"
        style={{ color: 'var(--text)' }}
        onClick={() => inputRef.current?.focus()}
        aria-live="polite"
        aria-atomic="false"
        role="log"
        aria-label="Terminal output"
      >
        {lines.map((line, i) => {
          if (line.type === 'blank') return <div key={i} aria-hidden="true" style={{ height: 6 }} />
          return (
            <div key={i} className="leading-5">
              {line.type === 'prompt' ? (
                <span style={{ color: '#23d18b' }}>{line.text}</span>
              ) : line.type === 'error' ? (
                <span style={{ color: 'var(--red)' }}>{line.text}</span>
              ) : line.type === 'heading' ? (
                <span style={{ color: 'var(--blue)' }}>{line.text}</span>
              ) : (
                <span style={{ color: 'var(--text)' }}>{line.text}</span>
              )}
            </div>
          )
        })}

        {/* Input line */}
        <div className="flex items-center mt-1">
          <span style={{ color: '#23d18b' }}>ruqhiya@portfolio:~$&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command input"
            className="flex-1 bg-transparent outline-none font-mono text-xs"
            style={{ color: 'var(--white)', caretColor: 'var(--white)' }}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="cursor-blink" style={{ color: 'var(--white)' }} aria-hidden="true">█</span>
        </div>
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </section>
  )
}
