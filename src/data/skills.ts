export interface SkillGroup {
  key:    string
  label:  string
  color:  string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    key:   'languages',
    label: 'languages',
    color: 'var(--cyan)',
    skills: ['Python (Primary)', 'Java'],
  },
  {
    key:   'backend',
    label: 'backend',
    color: 'var(--blue)',
    skills: ['FastAPI', 'REST APIs', 'HTTP', 'CORS', 'Authentication', 'PostgreSQL', 'Supabase'],
  },
  {
    key:   'databases',
    label: 'databases',
    color: 'var(--orange2)',
    skills: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    key:   'apis_web',
    label: 'apis_web',
    color: 'var(--yellow)',
    skills: ['HTML', 'Tailwind CSS', 'Swagger / OpenAPI'],
  },
  {
    key:   'ai_ml',
    label: 'ai_ml',
    color: 'var(--purple)',
    skills: ['NumPy', 'Pandas', 'Generative AI'],
  },
]

export const learningStatus = [
  { item: 'Python (Backend)',    done: true  },
  { item: 'FastAPI',             done: true  },
  { item: 'PostgreSQL',          done: true  },
  { item: 'REST APIs',           done: true  },
  { item: 'NumPy & Pandas',      done: true  },
  { item: 'Generative AI',       done: true  },
  { item: 'Machine Learning',    done: false },
  { item: 'AI Agents',           done: false },
  { item: 'Open-source',         done: false },
]
