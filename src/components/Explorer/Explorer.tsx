import { useState } from 'react'
import { fileTree, isFolder } from '../../data/files'
import type { FileId, TreeNode, FileNode } from '../../data/files'

interface Props {
  activeFile: FileId
  onFileOpen: (id: FileId) => void
}

export default function Explorer({ activeFile, onFileOpen }: Props) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(() => {
    const set = new Set<string>()
    fileTree.forEach(node => {
      if (isFolder(node) && node.defaultOpen) set.add(node.id)
    })
    return set
  })

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: 'var(--sidebar)' }}
    >
      {/* Explorer header */}
      <div
        className="px-4 py-2 text-2xs font-semibold tracking-widest uppercase flex-shrink-0"
        style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}
      >
        Explorer
      </div>

      {/* Workspace label */}
      <div
        className="flex items-center gap-1 px-2 py-1 cursor-default text-xs font-semibold flex-shrink-0"
        style={{ color: 'var(--text)' }}
      >
        <ChevronDown />
        <span className="tracking-wide uppercase text-2xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          Ruqhiya-Portfolio
        </span>
      </div>

      {/* File tree */}
      <nav
        aria-label="File Explorer"
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-area text-xs"
      >
        {fileTree.map(node => (
          <TreeItem
            key={isFolder(node) ? node.id : (node as FileNode).id}
            node={node}
            depth={0}
            openFolders={openFolders}
            activeFile={activeFile}
            onFileOpen={onFileOpen}
            onToggleFolder={toggleFolder}
          />
        ))}
      </nav>
    </div>
  )
}

/* ── Recursive tree item ── */
interface ItemProps {
  node: TreeNode
  depth: number
  openFolders: Set<string>
  activeFile: FileId
  onFileOpen: (id: FileId) => void
  onToggleFolder: (id: string) => void
}

function TreeItem({ node, depth, openFolders, activeFile, onFileOpen, onToggleFolder }: ItemProps) {
  const indent = depth * 12 + 8

  if (isFolder(node)) {
    const open = openFolders.has(node.id)
    return (
      <>
        <button
          onClick={() => onToggleFolder(node.id)}
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} folder ${node.name}`}
          className="w-full flex items-center gap-1 py-0.5 pr-2 text-left transition-colors explorer-item"
          style={{ paddingLeft: indent }}
        >
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 transition-transform" style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
            <ChevronDown small />
          </span>
          <FolderIcon open={open} />
          <span style={{ color: 'var(--text)' }} className="truncate">{node.name}</span>
        </button>
        {open && node.children.map(child => (
          <TreeItem
            key={isFolder(child) ? child.id : (child as FileNode).id}
            node={child}
            depth={depth + 1}
            openFolders={openFolders}
            activeFile={activeFile}
            onFileOpen={onFileOpen}
            onToggleFolder={onToggleFolder}
          />
        ))}
      </>
    )
  }

  const file = node as FileNode
  const isActive = activeFile === file.id

  return (
    <button
      onClick={() => onFileOpen(file.id)}
      aria-label={`Open ${file.name}`}
      aria-current={isActive ? 'page' : undefined}
      className="w-full flex items-center gap-1.5 py-0.5 pr-2 text-left transition-colors explorer-item"
      style={{
        paddingLeft: indent + 20,
        background: isActive ? 'var(--active)' : undefined,
        color: isActive ? 'var(--white)' : 'var(--text)',
      }}
    >
      <FileIcon type={file.icon} />
      <span className="truncate">{file.name}</span>
    </button>
  )
}

/* ── Icon components ── */
function ChevronDown({ small }: { small?: boolean }) {
  const size = small ? 10 : 12
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function FolderIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function FileIcon({ type }: { type: FileNode['icon'] }) {
  switch (type) {
    case 'file-md':
      return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#519aba" strokeWidth="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    case 'file-py':
      return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ec9b0" strokeWidth="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    case 'file-json':
      return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dcdcaa" strokeWidth="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    case 'file-pdf':
      return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f44747" strokeWidth="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    default:
      return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  }
}
