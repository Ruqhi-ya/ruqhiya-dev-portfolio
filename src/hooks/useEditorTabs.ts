import { useState, useCallback } from 'react'
import type { FileId } from '../data/files'

export function useEditorTabs(initial: FileId = 'readme') {
  const [tabs, setTabs]           = useState<FileId[]>([initial])
  const [activeTab, setActiveTab] = useState<FileId>(initial)

  const openTab = useCallback((id: FileId) => {
    setTabs(prev => prev.includes(id) ? prev : [...prev, id])
    setActiveTab(id)
  }, [])

  const closeTab = useCallback((id: FileId) => {
    setTabs(prev => {
      const next = prev.filter(t => t !== id)
      if (next.length === 0) return ['readme' as FileId]
      return next
    })
    setActiveTab(prev => {
      if (prev !== id) return prev
      const idx = tabs.indexOf(id)
      const next = tabs.filter(t => t !== id)
      if (next.length === 0) return 'readme'
      return next[Math.max(0, idx - 1)]
    })
  }, [tabs])

  return { tabs, activeTab, openTab, closeTab, setActiveTab }
}
