import type { FileId } from '../../data/files'
import ReadmeView        from '../../views/ReadmeView'
import ProjectsView      from '../../views/ProjectsView'
import ProjectDetailView from '../../views/ProjectDetailView'
import AboutMeView       from '../../views/AboutMeView'
import SkillsView        from '../../views/SkillsView'
import EducationView     from '../../views/EducationView'
import ExperienceView    from '../../views/ExperienceView'
import ResumeView        from '../../views/ResumeView'
import ContactView       from '../../views/ContactView'

const PROJECT_IDS: FileId[] = ['cartiva', 'catrimonial-ai']

interface Props {
  activeFile: FileId
  onFileOpen: (id: FileId) => void
}

export default function EditorContent({ activeFile, onFileOpen }: Props) {
  if (activeFile === 'readme')     return <ReadmeView onFileOpen={onFileOpen} />
  if (activeFile === 'about-me')   return <AboutMeView />
  if (activeFile === 'skills')     return <SkillsView />
  if (activeFile === 'education')  return <EducationView />
  if (activeFile === 'experience') return <ExperienceView />
  if (activeFile === 'resume')     return <ResumeView />
  if (activeFile === 'contact')    return <ContactView />

  if (PROJECT_IDS.includes(activeFile)) return <ProjectDetailView fileId={activeFile} />

  return <ProjectsView onFileOpen={onFileOpen} />
}
