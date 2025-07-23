export const personalInfo = {
  name: "Lucas Froeschner",
  title: "Full-Stack Developer & Software Engineer"
};

export const sections = ['about', 'skills', 'contact', 'stats', 'projects'];

export const contentData = {
  about: {
    paragraphs: [
      "I'm a full-stack developer passionate about creating clean & efficient apps, tools, games and more! I enjoy learning new tech/langs or modifying existing ones to their extreme.",
      "When I'm not coding (rarely), you can find me playing games, watching movies, or learning about new tech in other fields, I love a good info rabbithole."
    ]
  },
  skills: {
    categories: [
      {
        name: 'Frontend Development',
        description: 'I love building interactive, responsive user interfaces. Most comfortable with React ecosystem, but enjoy exploring different frameworks and modern CSS approaches.',
        items: [
          { name: 'JavaScript', icon: 'JS' },
          { name: 'TypeScript', icon: 'TS' },
          { name: 'React', icon: '⚛' },
          { name: 'Vue.js', icon: 'V' },
          { name: 'Next.js', icon: 'N' },
          { name: 'HTML', icon: '<>' },
          { name: 'CSS', icon: '#' },
          { name: 'Tailwind CSS', icon: 'TW' },
          { name: 'Material-UI', icon: 'MU' },
          { name: 'Chakra UI', icon: 'CU' },
          { name: 'Vite', icon: '⚡' },
          { name: 'PWA', icon: 'PWA' },
          { name: 'Three.js', icon: '3D' },
          { name: 'Framer Motion', icon: 'FM' },
          { name: 'React Native', icon: 'RN' },
          { name: 'Electron', icon: 'E' }
        ]
      },
      {
        name: 'Backend Development',
        description: 'Experienced in building robust APIs and server-side applications. Particularly enjoy working with Node.js and Python for rapid development and Go for performance.',
        items: [
          { name: 'Node.js', icon: 'NODE' },
          { name: 'Express', icon: 'EXP' },
          { name: 'Python', icon: 'PY' },
          { name: 'Django', icon: 'DJ' },
          { name: 'Flask', icon: 'FL' },
          { name: 'FastAPI', icon: 'API' },
          { name: 'C#', icon: 'C#' },
          { name: 'Go', icon: 'GO' },
          { name: 'Gin', icon: 'GIN' }
        ]
      },
      {
        name: 'Database Systems',
        description: 'Comfortable working with both SQL and NoSQL databases. I like choosing the right database for the job and optimizing queries for performance.',
        items: [
          { name: 'MongoDB', icon: 'MDB' },
          { name: 'MySQL', icon: 'SQL' },
          { name: 'PostgreSQL', icon: 'PG' },
          { name: 'SQLite', icon: 'LITE' },
          { name: 'Redis', icon: 'RDS' },
          { name: 'Supabase', icon: 'SB' },
          { name: 'Prisma', icon: 'PRS' },
          { name: 'Mongoose', icon: 'MGS' },
          { name: 'Drizzle', icon: 'DRZ' }
        ]
      },
      {
        name: 'Programming Languages',
        description: 'I enjoy learning new languages and picking the right tool for each project. Always curious about language design and performance characteristics.',
        items: [
          { name: 'JavaScript', icon: 'JS' },
          { name: 'TypeScript', icon: 'TS' },
          { name: 'Python', icon: 'PY' },
          { name: 'Java', icon: 'JAVA' },
          { name: 'C#', icon: 'C#' },
          { name: 'Go', icon: 'GO' },
          { name: 'C++', icon: 'C++' },
          { name: 'PHP', icon: 'PHP' },
          { name: 'Ruby', icon: 'RB' },
          { name: 'Swift', icon: 'SW' },
          { name: 'Kotlin', icon: 'KT' },
          { name: 'Shell/Bash', icon: 'SH' },
          { name: 'SQL', icon: 'SQL' }
        ]
      },
      {
        name: 'Game Development',
        description: 'Creating games is my creative outlet. I love bringing ideas to life through interactive experiences and pushing the boundaries of what games can be.',
        items: [
          { name: 'Unity', icon: 'U3D' },
          { name: 'Unreal Engine', icon: 'UE' },
          { name: 'Godot', icon: 'GDT' },
          { name: 'Phaser.js', icon: 'PH' },
          { name: 'OpenGL', icon: 'GL' }
        ]
      },
      {
        name: 'Development Tools',
        description: 'Proficient with the essential development workflow tools. I believe good tooling makes for better code and more enjoyable development.',
        items: [
          { name: 'Git', icon: 'GIT' },
          { name: 'GitHub', icon: 'GH' },
          { name: 'VS Code', icon: 'VSC' },
          { name: 'Postman', icon: 'PM' },
          { name: 'Figma', icon: 'FIG' },
          { name: 'Unity', icon: 'U3D' },
          { name: 'Unreal Engine', icon: 'UE' },
          { name: 'Vite', icon: 'VT' },
          { name: 'Webpack', icon: 'WP' },
          { name: 'Babel', icon: 'BB' },
          { name: 'ESLint', icon: 'ES' },
          { name: 'Prettier', icon: 'PR' },
          { name: 'Jest', icon: 'JST' },
          { name: 'Cypress', icon: 'CY' }
        ]
      }
    ]
  },
  contact: {
    items: [
      { icon: '💻', text: 'GitHub', url: 'https://github.com/LFroesch' },
      { icon: '🎮', text: 'Game Projects', url: 'https://lfroesch.itch.io/' },
      { icon: '💼', text: 'LinkedIn', url: 'https://www.linkedin.com/in/lucas-froeschner-938886114/' },
      { icon: '📝', text: 'Resume / CV', url: '#' }, // this will be a page on this site
      { icon: '📧', text: 'lucas.froeschner@gmail.com', url: 'mailto:lucas.froeschner@gmail.com' } // make this copy the email
    ]
  }
};

export const projects = [
  {
    name: 'isle of brady',
    description: '3D Skyrim-like RPG with exploration, quests, and a dynamic world. Features immersive gameplay mechanics and rich storytelling.',
    techStack: 'Godot, GDScript',
    status: 'Completed - May 2024',
    liveDemo: '#',
    github: '#',
    media: [
      {
        type: 'video',
        url: '/rpg/rpg.mp4'
      },
      {
        type: 'image',
        url: '/rpg/rpg.mp4'
      }
    ]
  },
  {
    name: 'portmon',
    description: 'A TUI interface for managing your active ports and services. Clean, efficient port monitoring with real-time updates.',
    techStack: 'Go, BubbleTea, Lipgloss',
    status: 'Completed - March 2024',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/portmon',
    media: [
      {
        type: 'image',
        url: '/Portmon.png'
      }
    ]
  },
  {
    name: 'git-helper',
    description: 'A TUI interface for managing your git repositories and workflows. Streamlined git operations with real-time feedback.',
    techStack: 'Go, BubbleTea, Lipgloss',
    status: 'Completed - March 2024',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/git-helper',
    media: [
      {
        type: 'image',
        url: '/GitHelper.png'
      }
    ]
  },
  {
    name: 'gator',
    description: 'RSS feed reader with a clean interface for staying up-to-date with your favorite content sources.',
    techStack: 'Go, RSS Parser, TUI',
    status: 'Completed - January 2024',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'project-manager',
    description: 'Full-featured project management web application with task tracking, team collaboration, and progress visualization.',
    techStack: 'React, Node.js, MongoDB, Express',
    status: 'In Development',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'fresh-notes',
    description: 'Modern note-taking application with rich text editing, organization features, and cross-platform sync.',
    techStack: 'React, Electron, SQLite, Markdown',
    status: 'In Development',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'project-launcher',
    description: 'TUI application for launching and managing personal projects with quick access to tools and resources.',
    techStack: 'BubbleTea, Go',
    status: 'In Development',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'dwight',
    description: 'Local LLM assistant interface built for Ollama. Terminal-based AI companion for development tasks and queries.',
    techStack: 'Go, Ollama API, BubbleTea',
    status: 'In Development',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'voice memo transcriber',
    description: 'Records voice audio and converts it to text notes with voice command support for hands-free note-taking.',
    techStack: 'Python, Speech Recognition, Audio Processing',
    status: 'Completed - February 2024',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'logdog',
    description: 'TUI/CLI-driven custom logging system designed for personal projects with advanced filtering and analysis.',
    techStack: 'Go, Log Parsing, TUI',
    status: 'In Development',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'backup-xd',
    description: 'TUI application for backing up personal projects, configurations, and important files with automated scheduling.',
    techStack: 'Go, File System APIs, BubbleTea',
    status: 'Completed - April 2024',
    liveDemo: '#',
    github: '#',
    media: null
  },
  {
    name: 'lif',
    description: 'Personal productivity TUI app featuring timers, reminders, glossary, and daily task management.',
    techStack: 'Go, SQLite, BubbleTea, Cron',
    status: 'In Development',
    liveDemo: '#',
    github: '#',
    media: null
  }
];