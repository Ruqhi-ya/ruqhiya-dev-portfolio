// Title bar — traffic lights + title only. Social links live in the ActivityBar.
interface Props {
  // kept for potential future use
  _unused?: never
}

export default function TitleBar(_props: Props) {
  return (
    <header
      role="banner"
      style={{ background: 'var(--titlebar)', borderBottom: '1px solid var(--border)' }}
      className="flex items-center justify-between h-9 px-3 flex-shrink-0 select-none z-50"
    >
      {/* Left — traffic lights + title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="font-mono text-xs hidden sm:block"
          style={{ color: 'var(--text-muted)' }}
        >
          ruqhiya.dev&nbsp;—&nbsp;Developer Portfolio
        </span>
      </div>

      {/* Center — subtitle */}
      <div
        className="absolute left-1/2 -translate-x-1/2 font-mono text-xs hidden md:block pointer-events-none"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Backend AI/ML"
      >
        Backend × AI/ML
      </div>

      {/* Right — empty, kept for symmetry */}
      <div />
    </header>
  )
}
