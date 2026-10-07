import { useState, useCallback, useRef } from 'react'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { SOCIAL_LINKS, PERSONAL } from '../data/config'

export interface TermLine {
  type: 'prompt' | 'output' | 'error' | 'blank' | 'heading'
  text: string
}

const COMMANDS: Record<string, () => TermLine[]> = {
  help: () => [
    { type: 'heading', text: 'Available commands:' },
    { type: 'output',  text: '  about      — who I am' },
    { type: 'output',  text: '  projects   — list my projects' },
    { type: 'output',  text: '  skills     — list my skills' },
    { type: 'output',  text: '  contact    — get in touch' },
    { type: 'output',  text: '  status     — current learning status' },
    { type: 'output',  text: '  whoami     — basic info' },
    { type: 'output',  text: '  focus      — what I am working on' },
    { type: 'output',  text: '  ls         — list workspace files' },
    { type: 'output',  text: '  clear      — clear terminal' },
    { type: 'blank',   text: '' },
  ],
  whoami: () => [
    { type: 'output', text: PERSONAL.name },
    { type: 'output', text: PERSONAL.title },
    { type: 'blank',  text: '' },
  ],
  about: () => [
    { type: 'heading', text: PERSONAL.name },
    { type: 'output',  text: `${PERSONAL.degree} @ ${PERSONAL.college}` },
    { type: 'output',  text: `Graduating: ${PERSONAL.graduatingYear}` },
    { type: 'output',  text: PERSONAL.title },
    { type: 'blank',   text: '' },
    { type: 'output',  text: 'Building backend systems and intelligent applications.' },
    { type: 'output',  text: 'Currently learning deeply, shipping projects.' },
    { type: 'blank',   text: '' },
  ],
  projects: () => [
    { type: 'heading', text: `${projects.length} projects found:` },
    ...projects.map(p => ({ type: 'output' as const, text: `  • ${p.name}  — ${p.category}` })),
    ...projects.map(p => ({ type: 'output' as const, text: `    ${p.liveUrl}` })),
    { type: 'blank',  text: '' },
  ],
  'ls projects': () => [
    { type: 'output', text: 'projects/' },
    ...projects.map(p => ({ type: 'output' as const, text: `  ${p.fileName}` })),
    { type: 'blank',  text: '' },
  ],
  ls: () => [
    { type: 'output', text: 'README.md    projects/    about-me/    skills.json' },
    { type: 'output', text: 'education.md experience.md resume.pdf   contact.md' },
    { type: 'blank',  text: '' },
  ],
  skills: () => [
    { type: 'heading', text: 'Skills:' },
    ...skillGroups.flatMap(g => [
      { type: 'output' as const, text: `  [${g.label}]` },
      { type: 'output' as const, text: `    ${g.skills.join(', ')}` },
    ]),
    { type: 'blank', text: '' },
  ],
  focus: () => [
    { type: 'heading', text: 'Current focus:' },
    { type: 'output',  text: '  Python' },
    { type: 'output',  text: '  FastAPI' },
    { type: 'output',  text: '  PostgreSQL' },
    { type: 'output',  text: '  Machine Learning' },
    { type: 'output',  text: '  AI Agents' },
    { type: 'blank',   text: '' },
  ],
  status: () => [
    { type: 'heading', text: 'git status — learning branch:' },
    { type: 'blank',   text: '' },
    { type: 'output',  text: '✓ Backend fundamentals' },
    { type: 'output',  text: '✓ Python' },
    { type: 'output',  text: '✓ PostgreSQL' },
    { type: 'output',  text: '✓ FastAPI' },
    { type: 'output',  text: '→ Machine Learning' },
    { type: 'output',  text: '→ AI Agents' },
    { type: 'output',  text: '→ Open-source contribution' },
    { type: 'blank',   text: '' },
    { type: 'output',  text: 'Status: Currently building...' },
    { type: 'blank',   text: '' },
  ],
  contact: () => [
    { type: 'heading', text: 'Contact:' },
    { type: 'output',  text: `  GitHub:   ${SOCIAL_LINKS.github}` },
    { type: 'output',  text: `  LinkedIn: ${SOCIAL_LINKS.linkedin}` },
    { type: 'output',  text: `  Email:    ${SOCIAL_LINKS.email}` },
    { type: 'blank',   text: '' },
  ],
  role: () => [
    { type: 'output', text: 'Backend × AI/ML Developer' },
    { type: 'blank',  text: '' },
  ],
}

const INITIAL_LINES: TermLine[] = [
  { type: 'output', text: 'Welcome to ruqhiya.dev terminal.' },
  { type: 'output', text: 'Type "help" for available commands.' },
  { type: 'blank',  text: '' },
]

export function useTerminal() {
  const [lines, setLines]     = useState<TermLine[]>(INITIAL_LINES)
  const [input, setInput]     = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 10)
  }, [])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const prompt: TermLine = { type: 'prompt', text: `ruqhiya@portfolio:~$ ${raw}` }

    if (cmd === '') {
      setLines(prev => [...prev, prompt, { type: 'blank', text: '' }])
      scrollToBottom()
      return
    }

    if (cmd === 'clear') {
      setLines(INITIAL_LINES)
      setInput('')
      return
    }

    const handler = COMMANDS[cmd]
    const response = handler
      ? handler()
      : [{ type: 'error' as const, text: `command not found: ${cmd}. Try "help".` }, { type: 'blank' as const, text: '' }]

    setLines(prev => [...prev, prompt, ...response])
    setHistory(prev => [raw, ...prev.slice(0, 49)])
    setHistIdx(-1)
    setInput('')
    scrollToBottom()
  }, [scrollToBottom])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(prev => {
        const next = Math.min(prev + 1, history.length - 1)
        setInput(history[next] ?? '')
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(prev => {
        const next = Math.max(prev - 1, -1)
        setInput(next === -1 ? '' : (history[next] ?? ''))
        return next
      })
    }
  }, [input, history, runCommand])

  // suppress unused warning
  void histIdx

  return { lines, input, setInput, handleKeyDown, bottomRef, runCommand }
}
