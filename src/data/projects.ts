export interface Project {
  id:              string
  name:            string
  fileName:        string
  category:        string
  description:     string
  longDescription: string
  technologies:    string[]
  bullets:         string[]
  githubUrl:       string
  liveUrl:         string
  status:          'active' | 'in-progress' | 'experimental'
  highlight:       boolean
}

export const projects: Project[] = [
  {
    id:       'cartiva',
    name:     'Cartiva AI Shopping Assistant',
    fileName: 'cartiva.py',
    category: 'AI Agent / Backend',
    description:
      'An AI-powered shopping assistant that analyses customer carts and provides personalised product recommendations.',
    longDescription:
      'Built an AI-powered shopping assistant backend with FastAPI and PostgreSQL. The system analyses customer carts in real time and uses an AI agent to provide personalised product recommendations, optimise cart contents, and generate dynamic product bundles. Deployed on Render with RESTful APIs documented via Swagger/OpenAPI.',
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'AI/ML', 'Swagger', 'Render'],
    bullets: [
      'Built an AI-powered shopping assistant that analyses customer carts and provides personalised product recommendations.',
      'Developed Cart Optimizer and Dynamic Bundle Builder features to identify complementary products and relevant product combinations.',
      'Designed RESTful APIs with FastAPI for product catalogue, cart management, AI-agent interactions, and usage tracking.',
      'Integrated PostgreSQL for persistent product and cart data and tested backend APIs through Swagger/OpenAPI.',
    ],
    githubUrl: 'https://github.com/Ruqhi-ya',
    liveUrl:   'https://cartiva-frontend.onrender.com/',
    status:    'active',
    highlight: true,
  },
  {
    id:       'catrimonial-ai',
    name:     'Catrimonial AI-Powered Cat Matching Platform',
    fileName: 'catrimonial_ai.py',
    category: 'AI / Full-Stack Application',
    description:
      'An AI-powered ecosystem for responsible cat owners — intelligent matching and recommendation workflows.',
    longDescription:
      'Catrimonial AI is an AI-powered ecosystem for responsible cat owners. The platform uses AI-based recommendation logic to match cats using characteristics and user-provided information, features an interactive frontend for profile management, and integrates AI-generated match exploration.',
    technologies: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Docker', 'FastAPI'],
    bullets: [
      'Catrimonial AI is an AI-powered ecosystem for responsible cat owners.',
      'Developed matching and recommendation workflows using cat characteristics and user-provided information.',
      'Created an interactive frontend for managing profiles and exploring AI-generated matches.',
      'Integrated AI-based recommendation logic into the application workflow.',
    ],
    githubUrl: 'https://github.com/Ruqhi-ya/catrimonial-ai',
    liveUrl:   'https://ruqhi-ya.github.io/catrimonial-ai/',
    status:    'active',
    highlight: true,
  },
]
