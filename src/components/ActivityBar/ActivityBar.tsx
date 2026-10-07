import { useState } from 'react'
import type { FileId } from '../../data/files'
import { SOCIAL_LINKS } from '../../data/config'
import type { Theme } from '../../hooks/useTheme'

export type ActivityView = 'explorer' | 'contact'

interface Props {
  activeView:    ActivityView
  onViewChange:  (view: ActivityView) => void
  onFileOpen:    (id: FileId) => void
  theme:         Theme
  onToggleTheme: () => void
}

export default function ActivityBar({
  activeView,
  onViewChange,
  onFileOpen,
  theme,
  onToggleTheme,
}: Props) {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <aside
      aria-label="Activity Bar"
      style={{
        background:   'var(--bg2)',
        borderRight:  '1px solid var(--border)',
        width:        48,
        display:      'flex',
        flexDirection:'column',
        flexShrink:   0,
      }}
      className="desktop-only"
    >
      {/* ── Top navigable icons ── */}
      <div className="flex flex-col gap-0.5 pt-2">
        <ActivityBtn
          id="explorer" label="Explorer" active={activeView === 'explorer'}
          tooltip={tooltip} setTooltip={setTooltip}
          onClick={() => onViewChange('explorer')}
        ><ExplorerIcon /></ActivityBtn>

        <ActivityBtn
          id="contact" label="Contact" active={activeView === 'contact'}
          tooltip={tooltip} setTooltip={setTooltip}
          onClick={() => { onViewChange('contact'); onFileOpen('contact') }}
        ><ContactIcon /></ActivityBtn>
      </div>

      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── Bottom: GitHub, LinkedIn, Theme, Resume ── */}
      <div
        className="flex flex-col gap-0.5 pb-2"
        style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}
      >
        {/* GitHub */}
        <IconLink
          id="github" label="GitHub"
          href={SOCIAL_LINKS.github}
          tooltip={tooltip} setTooltip={setTooltip}
        ><GitHubIcon /></IconLink>

        {/* LinkedIn */}
        <IconLink
          id="linkedin" label="LinkedIn"
          href={SOCIAL_LINKS.linkedin}
          tooltip={tooltip} setTooltip={setTooltip}
        ><LinkedInIcon /></IconLink>

        {/* Theme toggle */}
        <div className="relative flex justify-center">
          <button
            onClick={onToggleTheme}
            onMouseEnter={() => setTooltip('theme')}
            onMouseLeave={() => setTooltip(null)}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="w-12 h-12 flex items-center justify-center transition-colors hover:text-[var(--white)]"
            style={{ color: 'var(--text-dim)' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          {tooltip === 'theme' && (
            <span className="activity-tooltip z-50" role="tooltip">
              {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            </span>
          )}
        </div>

        {/* Resume */}
        <IconLink
          id="resume" label="Download Resume"
          href={SOCIAL_LINKS.resume}
          tooltip={tooltip} setTooltip={setTooltip}
        ><ResumeIcon /></IconLink>
      </div>
    </aside>
  )
}

/* ── Reusable nav button ── */
interface BtnProps {
  id:         string
  label:      string
  active:     boolean
  tooltip:    string | null
  setTooltip: (v: string | null) => void
  onClick:    () => void
  children:   React.ReactNode
}
function ActivityBtn({ id, label, active, tooltip, setTooltip, onClick, children }: BtnProps) {
  return (
    <div className="relative flex justify-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setTooltip(id)}
        onMouseLeave={() => setTooltip(null)}
        aria-label={label}
        aria-pressed={active}
        className="w-12 h-12 flex items-center justify-center transition-colors"
        style={{
          color:      active ? 'var(--white)' : 'var(--text-dim)',
          borderLeft: active ? '2px solid var(--blue)' : '2px solid transparent',
        }}
      >
        {children}
      </button>
      {tooltip === id && <span className="activity-tooltip z-50" role="tooltip">{label}</span>}
    </div>
  )
}

/* ── Reusable icon link ── */
interface LinkProps {
  id:         string
  label:      string
  href:       string
  tooltip:    string | null
  setTooltip: (v: string | null) => void
  children:   React.ReactNode
}
function IconLink({ id, label, href, tooltip, setTooltip, children }: LinkProps) {
  return (
    <div className="relative flex justify-center">
      <a
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={() => setTooltip(id)}
        onMouseLeave={() => setTooltip(null)}
        className="w-12 h-12 flex items-center justify-center transition-colors hover:text-[var(--white)]"
        style={{ color: 'var(--text-dim)' }}
      >
        {children}
      </a>
      {tooltip === id && <span className="activity-tooltip z-50" role="tooltip">{label}</span>}
    </div>
  )
}

/* ── Icons ── */
function ExplorerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/>
    </svg>
  )
}
function ContactIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
function ResumeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <polyline points="9 15 12 18 15 15"/>
    </svg>
  )
}
