export type FileId =
  | 'readme'
  | 'cartiva'
  | 'catrimonial-ai'
  | 'about-me'
  | 'skills'
  | 'education'
  | 'experience'
  | 'resume'
  | 'contact'

export interface FileNode {
  id:       FileId
  name:     string
  icon:     'file-md' | 'file-py' | 'file-json' | 'file-pdf' | 'folder'
  lang?:    string
  parent?:  string
}

export interface FolderNode {
  id:       string
  name:     string
  children: (FileNode | FolderNode)[]
  defaultOpen?: boolean
}

export type TreeNode = FileNode | FolderNode

export function isFolder(node: TreeNode): node is FolderNode {
  return 'children' in node
}

export const fileTree: TreeNode[] = [
  { id: 'readme',    name: 'README.md',    icon: 'file-md',  lang: 'markdown' },
  {
    id: 'projects',
    name: 'projects',
    children: [
      { id: 'cartiva',        name: 'cartiva.py',        icon: 'file-py', lang: 'python', parent: 'projects' },
      { id: 'catrimonial-ai', name: 'catrimonial_ai.py', icon: 'file-py', lang: 'python', parent: 'projects' },
    ],
    defaultOpen: true,
  } as FolderNode,
  {
    id: 'about-me',
    name: 'about-me',
    children: [
      { id: 'about-me', name: 'about-me.md', icon: 'file-md', lang: 'markdown', parent: 'about-me' },
    ],
    defaultOpen: false,
  } as FolderNode,
  { id: 'skills',     name: 'skills.json',   icon: 'file-json', lang: 'json'     },
  { id: 'education',  name: 'education.md',  icon: 'file-md',   lang: 'markdown' },
  { id: 'experience', name: 'experience.md', icon: 'file-md',   lang: 'markdown' },
  { id: 'resume',     name: 'resume.pdf',    icon: 'file-pdf'                    },
  { id: 'contact',    name: 'contact.md',    icon: 'file-md',   lang: 'markdown' },
]

export const fileMeta: Record<FileId, { label: string; lang: string }> = {
  'readme':         { label: 'README.md',        lang: 'markdown' },
  'cartiva':        { label: 'cartiva.py',        lang: 'python'   },
  'catrimonial-ai': { label: 'catrimonial_ai.py', lang: 'python'   },
  'about-me':       { label: 'about-me.md',       lang: 'markdown' },
  'skills':         { label: 'skills.json',       lang: 'json'     },
  'education':      { label: 'education.md',      lang: 'markdown' },
  'experience':     { label: 'experience.md',     lang: 'markdown' },
  'resume':         { label: 'resume.pdf',        lang: 'pdf'      },
  'contact':        { label: 'contact.md',        lang: 'markdown' },
}
