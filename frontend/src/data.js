export const personalInfo = {
  name: "Lucas Froeschner",
  title: "Full-Stack Developer & Software Engineer"
};

export const sections = ['about', 'skills', 'blog', 'contact', 'stats', 'projects'];

export const contentData = {
  about: {
    sections: [
      {
        paragraphs: [
          "I'm a full-stack developer passionate about creating clean and efficient apps, tools, games and more! I enjoy learning new tech/langs or modifying existing ones to their extreme."
        ],
        photo: {
          src: "/general_icons/profile.jpg",
          alt: "Lucas Froeschner",
          caption: "Full-Stack Developer"
        }
      },
      {
        paragraphs: [
          "I love building things that solve real problems and make life easier, as well as working on creative projects that push the boundaries of what's possible."
        ],
        photo: {
          src: "/general_icons/profile.jpg",
          alt: "Lucas Froeschner at work",
          caption: "Building efficient solutions"
        }
      },
      {
        paragraphs: [
          "I have a wonderful and supportive fiance, Sarah, as well as a rascal of a dog, Brady. When I'm not coding (rarely), you can find me playing games, watching movies, or learning about new tech/trivia. I love a good info rabbit hole."
        ],
        photo: {
          src: "/general_icons/profile.jpg",
          alt: "Lucas Froeschner with family",
          caption: "My family"
        }
      }
    ],
    timeline: [
      {
        period: "Early Summer 2024",
        title: "Started Programming",
        description: "First hello world while enrolled in Boot.dev, best decision I've ever made! Learned terminal and programming language basics.",
        tech: ["Shell", "Bash", "Git", "GitHub", "JavaScript", "Python", "Go"]
      },
      {
        period: "Late Summer 2024",
        title: "Learning Python and Pygame",
        description: "First game project, a simple Asteroids clone. Learned the basics of game development and programming concepts. This really hooked me, and I started researching how to make more professional games.",
        tech: ["Python", "Pygame"]
      },
      {
        period: "Fall 2024",
        title: "Learning Fundamentals",
        description: "Learned OOP, data structures, algorithms, and more advanced concepts. Built several projects to solidify understanding.",
        tech: ["OOP", "Data Structures", "Algorithms", "Functional Programming"]
      },
      {
        period: "Winter 2024",
        title: "Godot Game Development",
        description: "Found Godot and learned 2D, then 3D game development. Built several games with thousands of total downloads on Itch.io",
        tech: ["Godot", "GDScript"]
      },
      {
        period: "Spring 2025",
        title: "Full-Stack Web Development",
        description: "Discovered 'the frontend'. Built first websites and fell in love with interactive UIs, APIs, and full-stack development. This also led me to trying to maximize the efficiency of the code I write to make it easier to maintain and scale.",
        tech: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vite", "React Native"]
      },
      {
        period: "Summer 2025",
        title: "Systems & Performance",
        description: "Deep dive into Go, TUI development, and performance optimization. Built CLI/TUI tools and games.",
        tech: ["Go", "BubbleTea", "Lipgloss", "Gin"]
      },
      {
        period: "Summer 2025",
        title: "Portfolio Development",
        description: "Tuned up my portfolio with new projects and improved designs of old ones.",
        tech: ["React", "Tailwind CSS", "Vite"]
      },
      {
        period: "Summer to Fall 2025",
        title: "The Great Beyond",
        description: "Currently applying for jobs and continuing to learn. Excited for the next chapter in my career! Currently excited about LLMs, Kubernetes, Rust & cloud technologies.",
        tech: ["LLMs", "Kubernetes", "Rust", "Cloud Services", "Microservices"]
      }
    ],
    faq: {
      title: "How I Work & FAQs",
      description: "Get to know my working style and approach.",
      sections: [
        {
          category: "Working Style",
          questions: [
            {
              question: "What's your development approach?",
              answer: "I believe in clean, maintainable code, full stop. I start by looking at the problem from all angles, and designing a modular architecture that can evolve and be pruned at will. I create prototypes, gather feedback, and iterate. I prioritize communication and documentation throughout the process."
            },
            {
              question: "How do you handle project timelines?",
              answer: "I break projects into manageable milestones with regular check-ins. I'm very transparent about progress or status and any potential delays, and I always build in buffer time for testing and refinement. I typically work in sessions of about 12 hours, but adjust based on project needs."
            },
            {
              question: "What tools do you use for collaboration?",
              answer: "I'm flexible with tools - Slack, Discord, or email for communication. GitHub for code collaboration, Figma for design reviews, and various project management tools like Trello or Linear. I am a quick learner for any other tools you prefer."
            }
          ]
        },
        {
          category: "Technical Questions",
          questions: [
            {
              question: "Which technologies do you prefer?",
              answer: "My favorite is always the most efficient for the task at hand, I say it a lot, but efficiency is the name of the game. I do not mind refactoring to a different language in the name of efficiency. I love tools and languages that help me write clean, maintainable code with minimal overhead. I am partial to Go, JavaScript/Typescript and React, but I enjoy learning new languages and frameworks. I also love working with databases like MongoDB and PostgreSQL."
            },
            {
              question: "Do you work with existing codebases?",
              answer: "Absolutely! I enjoy diving into existing code, understanding architecture, and making improvements. I also work well with adapting to different coding practices."
            },
            {
              question: "How do you ensure code quality?",
              answer: "I use linting, testing frameworks, code reviews, and follow established style guides. I believe in writing self-documenting code and comprehensive documentation. I make sure tests are written for critical paths and edge cases, and I use CI/CD pipelines to automate testing and deployment."
            }
          ]
        },
        {
          category: "Business & Availability",
          questions: [
            {
              question: "What are your availability hours?",
              answer: "I'm generally available Monday-Friday, 9 AM - 6 PM PST, but I'm flexible for different time zones and urgent issues. I respond to messages within 24 hours."
            },
            {
              question: "How do you handle project pricing?",
              answer: "I offer both hourly rates and project-based pricing depending on scope. I provide detailed estimates upfront and track time transparently for hourly work."
            },
            {
              question: "Do you offer ongoing maintenance?",
              answer: "Yes! I provide post-launch support, bug fixes, feature additions, and general maintenance. I believe in long-term partnerships with clients, and I'm always here to help."
            }
          ]
        }
      ]
    },
    recommendations: {
      title: "My Recommended Tools",
      description: "Tools and libraries I trust and use regularly",
      categories: [
        {
          name: "Development Environment",
          icon: "💻",
          items: [
            { name: "VS Code", description: "Great debugging and Git integration" },
            { name: "Warp Terminal", description: "Smart completion and productivity features" },
            { name: "GitHub Desktop", description: "Simplifies complex Git operations" }
          ]
        },
        {
          name: "Frontend Development",
          icon: "🎨",
          items: [
            { name: "Vite", description: "Fast dev server and optimized builds" },
            { name: "Tailwind CSS", description: "Consistent design system and fast development" }
          ]
        },
        {
          name: "Backend & CLI",
          icon: "⚙️",
          items: [
            { name: "Drizzle ORM", description: "Excellent TypeScript support and performance" },
            { name: "Hono", description: "Ultra-fast web framework for the edge" },
            { name: "BubbleTea", description: "Elm-inspired TUI framework for Go" }
          ]
        }
      ]
    }
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
          { name: 'Shell/Bash', icon: 'SH' },
          { name: 'SQL', icon: 'SQL' }
        ]
      },
      {
        name: 'Game Development',
        description: 'Creating games is my creative outlet. I love bringing ideas to life through interactive experiences and pushing the boundaries of what games can be.',
        items: [
          { name: 'Godot', icon: 'GDT' },
          { name: 'Unity', icon: 'U3D' },
          { name: 'Unreal Engine', icon: 'UE' },
          { name: 'PyGame', icon: 'CE' }
        ]
      },
      {
        name: 'Development Tools',
        description: 'Proficient with the essential development workflow tools. I believe good tooling makes for better code and more enjoyable development. All listed below and more are used daily.',
        items: [
          { name: 'Git', icon: 'GIT' },
          { name: 'GitHub', icon: 'GH' },
          { name: 'VS Code', icon: 'VSC' },
          { name: 'Postman', icon: 'PM' },
          { name: 'Vite', icon: 'VT' },
          { name: 'ESLint', icon: 'ES' },
          { name: 'Prettier', icon: 'PR' },
        ]
      },
      {
        name: 'Certifications & Learning',
        description: 'Current certifications and active learning goals. Always expanding my knowledge through structured learning paths and industry-recognized credentials.',
        items: [
          { name: 'AWS Solutions Architect (Learning)', icon: 'AWS' },
          { name: 'Google Cloud Professional (Learning)', icon: 'GCP' },
          { name: 'MongoDB Certified Developer (Learning)', icon: 'MDB' },
          { name: 'Algorithms', icon: 'ALG' },
          { name: 'Backend Development', icon: 'BE' },
          { name: 'CI/CD', icon: 'CI' },
          { name: 'Data Structures', icon: 'DS' },
          { name: 'Docker', icon: 'DOC' },
          { name: 'File Servers & CDN', icon: 'CDN' },
          { name: 'Functional Programming', icon: 'FP' },
          { name: 'Git', icon: 'GIT' },
          { name: 'Go Programming', icon: 'GO' },
          { name: 'HTTP Clients', icon: 'HC' },
          { name: 'HTTP Servers', icon: 'HS' },
          { name: 'JavaScript', icon: 'JS' },
          { name: 'Memory Management', icon: 'MEM' },
          { name: 'Object-Oriented Programming', icon: 'OOP' },
          { name: 'Multiplayer Game Development', icon: 'MGD' },
          { name: '3D Game Development', icon: '3D' }
        ],
        gallery: [
          {
            type: 'image',
            url: '/section_skills/sql.png',
caption: 'Fundamentals and advanced query optimization techniques'
          },
          {
            type: 'image',
            url: '/section_skills/shells_and_terminals.png',
caption: 'Intermediate shell scripting and terminal usage techniques'
          },
          {
            type: 'image',
            url: '/section_skills/algorithms.png',
caption: 'Sorting, searching, and optimization techniques'
          },
          {
            type: 'image',
            url: '/section_skills/backend.png',
caption: 'Development fundamentals and server architecture patterns'
          },
          {
            type: 'image',
            url: '/section_skills/cicd.png',
caption: 'Continuous integration and deployment workflows with automated testing'
          },
          {
            type: 'image',
            url: '/section_skills/data_structures.png',
caption: 'Arrays, trees, graphs, and hash tables fundamentals'
          },
          {
            type: 'image',
            url: '/section_skills/docker.png',
caption: 'Containerization: building, deploying, and orchestrating containers'
          },
          {
            type: 'image',
            url: '/section_skills/file_servers_CDN.png',
caption: 'Server architecture and content delivery network optimization'
          },
          {
            type: 'image',
            url: '/section_skills/fp.png',
caption: 'Immutability, pure functions, and higher-order functions'
          },
          {
            type: 'image',
            url: '/section_skills/git.png',
caption: 'Advanced workflows: branching strategies, merging, and collaboration techniques'
          },
          {
            type: 'image',
            url: '/section_skills/go.png',
caption: 'Concurrency, performance, and systems programming'
          },
          {
            type: 'image',
            url: '/section_skills/http_clients_go.png',
caption: 'Building robust clients with error handling and middleware'
          },
          {
            type: 'image',
            url: '/section_skills/http_servers_go.png',
caption: 'Creating scalable servers with routing and middleware patterns'
          },
          {
            type: 'image',
            url: '/section_skills/javascript.png',
caption: 'Modern ES6+, async programming, and best practices'
          },
          {
            type: 'image',
            url: '/section_skills/memory_management.png',
caption: 'Garbage collection, allocation strategies, and optimization techniques'
          },
          {
            type: 'image',
            url: '/section_skills/oop.png',
caption: 'Design patterns, inheritance, and polymorphism concepts'
          },
          {
            type: 'image',
            url: '/section_skills/python.png',
caption: 'Programming fundamentals and best practices'
          },
          {
            type: 'image',
            url: '/section_skills/3d_rpg.jpg',
caption: 'Game development concepts and best practices'
          },
          {
            type: 'image',
            url: '/section_skills/multiplayer_fps.jpg',
caption: 'Game development concepts and best practices'
          }
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
      { icon: '📧', text: 'lucas.froeschner@gmail.com', url: 'mailto:lucas.froeschner@gmail.com' },
      { icon: '🌐', text: 'Contact Form Below', url: '#' }
    ],
    services: {
      title: "Available for Hire",
      items: [
        { name: "Employment", description: "You want me on your team!" },
        { name: "Web Development", description: "Full-stack apps and websites." },
        { name: "Game Development", description: "2D/3D game development/more." },
        { name: "Consulting", description: "Code review and technical guidance." }
      ]
    }
  },
};

export const projects = [
  {
    name: 'project-manager',
    description: 'A comprehensive full-stack project management application designed for developers and teams to organize, track, and document their projects with todo management, notes system, development logs, and documentation templates.',
    longDescription: 'As I worked on multiple coding projects, I found myself losing track of tasks, ideas, and progress. I needed a centralized place to manage everything from initial concepts to deployment notes.',
    learned: 'This project taught me advanced state management with React and TypeScript, complex database relationships with MongoDB, and how to design intuitive user interfaces for productivity tools. I also learned about real-time updates and collaborative features.',
    goal: 'Create a developer-focused project management tool that scales from personal projects to team collaboration, with features specifically designed for the software development lifecycle.',
    techStack: 'React, TypeScript, Node.js, Express, MongoDB, Mongoose, Vite, Tailwind CSS',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/project-management',
    media: [
      {
        type: 'image',
        url: '/project-manager/project-manager2.png'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager.png'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager5.png'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager3.png'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager4.png'
      },
    ]
  },
  {
    name: 'gator',
    description: 'A web-based RSS feed aggregator/reader with a React frontend and Go backend API featuring user authentication, real-time feed aggregation, and post browsing with filtering.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, React, PostgreSQL, Vite, Tailwind CSS, React Router',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/Gator',
    media: [
      {
        type: 'image',
        url: '/gator/gator.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/gator/gator2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/gator/gator3.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/gator/gator5.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/gator/gator4.png',
        caption: ''
      }
    ]
  },
  {
    name: 'streaming-helper',
    description: 'A Netflix-style streaming platform built to help find actors, movies and TV shows as well as information about them.',
    longDescription: 'I wanted to create a platform that helps users discover and manage their favorite movies and TV shows across multiple streaming services. The goal was to provide a seamless experience for finding content and tracking what to watch next.',
    learned: 'This project deepened my understanding of full-stack development, API integration, and user authentication. I also learned how to work with third-party APIs like TMDB for movie data and how to implement search and filtering features effectively.',
    goal: 'Build a comprehensive streaming helper that aggregates content from various platforms, provides detailed information about movies and shows, and allows users to create personalized watchlists.',
    techStack: 'Node.js, Express, MongoDB, TMDB API',
    status: 'Completed - May 2025',
    liveDemo: 'https://streaming-helper-production.up.railway.app/',
    github: 'https://github.com/LFroesch/streaming-helper',
    media: [
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper.png'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper2.png'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper3.png'
      },{
        type: 'image',
        url: '/streaming-helper/streaming-helper4.png'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper5.png'
      }
    ]
  },
  {
    name: 'fresh-notes',
    description: 'Simple Markdown note-taking app with React frontend and Node.js backend.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'React, Node.js, Express, MongoDB, Redis, Tailwind CSS',
    status: 'Completed - May 2025',
    liveDemo: 'https://fresh-notes.up.railway.app/',
    github: 'https://github.com/LFroesch/FreshNotes',
    media: [
      {
        type: 'image',
        url: '/fresh-notes/FreshNotes.png'
      },
      {
        type: 'image',
        url: '/fresh-notes/FreshNotes2.png'
      },
      {
        type: 'image',
        url: '/fresh-notes/FreshNotes3.png'
      }
    ]
  },
  {
    name: 'template-hub',
    description: 'A full-stack MERN application for developers to share, discover, and manage reusable code templates and snippets with authentication, search & filter, star system, and dark mode support.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'React, Express.js, MongoDB, Mongoose, Tailwind CSS, Vite, JWT, Prism.js',
    status: 'Completed - May 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/template_hub',
    media: [
      {
        type: 'image',
        url: '/template-hub/template-hub.png'
      },
      {
        type: 'image',
        url: '/template-hub/template-hub2.png'
      },
      {
        type: 'image',
        url: '/template-hub/template-hub3.png'
      }
    ]
  },
  {
    name: 'event-chat',
    description: 'A location-based social platform featuring real-time messaging, event creation, and social networking capabilities with geolocation-based discovery and RSVP system.',
    longDescription: 'I wanted to create a platform that bridges the gap between online social interaction and real-world events. The idea was to help people discover local events and connect with others who share similar interests.',
    learned: 'This project was my deep dive into real-time technologies. I mastered Socket.IO for live messaging, learned geolocation APIs, and tackled complex state management for real-time updates. Working with Cloudinary taught me about media optimization and CDN integration.',
    goal: 'Build a scalable social platform that encourages real-world meetups and community building through location-based event discovery and seamless communication.',
    techStack: 'React, Node.js, MongoDB, Express, Socket.IO, Tailwind CSS, DaisyUI, Zustand, Cloudinary, JWT',
    status: 'Completed - May 2025',
    liveDemo: 'https://event-chat.onrender.com/',
    github: 'https://github.com/LFroesch/event-chat',
    media: [
      {
        type: 'image',
        url: '/event-chat/event-chat.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/event-chat/event-chat2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/event-chat/event-chat3.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/event-chat/event-chat4.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/event-chat/event-chat5.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/event-chat/event-chat6.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/event-chat/event-chat7.png',
        caption: ''
      }
    ]
  },
  {
    name: 'ecommerce platform',
    description: 'A full-stack e-commerce platform with React frontend and Node.js backend featuring user authentication, shopping cart, Stripe payments, admin dashboard, and coupon system.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'React, Node.js, Express, MongoDB, Stripe, Tailwind CSS, Zustand, Cloudinary, Redis',
    status: 'Completed - May 2025',
    liveDemo: 'https://e-commerce-store-9t97.onrender.com/',
    github: 'https://github.com/LFroesch/e-commerce-store',
    media: [
      {
        type: 'image',
        url: '/e-commerce/e-commerce.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce3.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce4.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce5.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce6.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce7.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce8.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce9.png',
        caption: ''
      }
    ]
  },
  {
    name: 'z-chat',
    description: 'A social media app built with React and Node.js featuring real-time messaging, user authentication, image uploads, and modern social networking capabilities with a clean, responsive interface.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'React, Tailwind CSS, DaisyUI, TanStack Query, React Router, Node.js, Express, MongoDB, JWT, Cloudinary, bcrypt',
    status: 'Completed - 2025',
    liveDemo: 'https://zchat-u64e.onrender.com/',
    github: 'https://github.com/LFroesch/social-media-demo',
    media: [
      {
        type: 'image',
        url: '/z-chat/z-chat.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/z-chat/z-chat2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/z-chat/z-chat3.png',
        caption: ''
      }
    ]
  },
  {
    name: 'voice memo transcriber',
    description: 'A desktop application that uses global hotkeys to capture audio from your microphone and transcribe it to text using speech recognition. Features a dark mode UI for easy note management, voice command functionality, and real-time transcription with persistent storage.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Python, Google Speech Recognition, PyAudio, Tkinter',
    status: 'Completed - June 2024',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/voice-memo-transcriber',
    media: [
      {
        type: 'image',
        url: '/voice-memo/voice-memo.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/voice-memo/voice-memo2.png',
        caption: ''
      }
    ]
  },
  {
    name: 'window manager',
    description: 'A Windows desktop utility for managing, organizing, and resizing application windows with smart layout saving and restoration features.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Python, customtkinter, psutil, pywin32',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/window_manager',
    media: [
      {
        type: 'image',
        url: '/window_manager/window-manager.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/window_manager/window-manager2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/window_manager/window-manager3.png',
        caption: ''
      }
    ]
  },
  {
    name: 'tui-hub',
    description: 'A comprehensive collection of terminal-based applications and games built with Go and BubbleTea. Features productivity apps like file managers, text editors, and system monitors, alongside engaging games including Chess with full rule implementation, Snake with score tracking, Blackjack with card counting, Auto-battler with strategic gameplay, and Mini ASCII Roguelike with dungeon exploration and combat systems.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - Summer 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/tui-hub',
    media: [
      {
        type: 'image',
        url: '/tui-hub/tui-hub.png'
      },
      {
        type: 'image',
        url: '/tui-hub/tui-games.png'
      },
      {
        type: 'image',
        url: '/tui-hub/Blackjack.png'
      },
      {
        type: 'image',
        url: '/tui-hub/Blackjack2.png'
      },
      {
        type: 'image',
        url: '/tui-hub/MiniRoguelike.png'
      },
      {
        type: 'image',
        url: '/tui-hub/SnakeGame.png'
      },
      {
        type: 'image',
        url: '/tui-hub/TUI-Chess.png'
      }
    ]
  },
  {
    name: 'portmon',
    description: 'A live port monitoring tool with real-time, interactive terminal interface for viewing and managing network ports and their associated processes with smart categorization.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/portmon',
    media: [
      {
        type: 'image',
        url: '/portmon/Portmon.png'
      }
    ]
  },
  {
    name: 'scout',
    description: 'A lightning-fast TUI file explorer and fuzzy finder for developers with live preview, Git integration, smart navigation, VS Code integration, and bookmark management.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/scout',
    media: [
      {
        type: 'image',
        url: '/scout/scout.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/scout/scout2.png',
        caption: ''
      }
    ]
  },
  {
    name: 'zap',
    description: 'An easy to manage TUI file registry for developers to organize and instantly access important files across all projects with project organization and smart editor detection.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/zap',
    media: [
      {
        type: 'image',
        url: '/zap/zap.png',
        caption: ''
      }
    ]
  },
  {
    name: 'git-helper',
    description: 'A simple, user-friendly terminal UI for creating git commits with smart suggestions, function detection, conventional commits formatting, and commit hook management.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/git-helper',
    media: [
      {
        type: 'image',
        url: '/git-helper/git-helper.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/git-helper/git-helper2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/git-helper/git-helper3.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/git-helper/git-helper4.png',
        caption: ''
      }
    ]
  },
  {
    name: 'project-launcher',
    description: 'A sleek project launcher and manager with interactive terminal interface for organizing, launching, and managing development projects with cross-platform support and WSL2 integration.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/project-launcher',
    media: [
      {
        type: 'image',
        url: '/project-launcher/ProjectLauncher.png'
      }
    ]
  },
  {
    name: 'dwight',
    description: 'Terminal-based AI resource manager and assistant powered by Docker + Ollama with support for custom models, organizing prompts, templates, and project files.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, Docker, Ollama API, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/dwight',
    media: [
      {
        type: 'image',
        url: '/dwight/dwight.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight3.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight4.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight5.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight6.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight7.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/dwight/dwight8.png',
        caption: ''
      }
    ]
  },
  {
    name: 'logdog',
    description: 'A TUI-based logging utility that makes structured logging simple and consistent across Go projects with automatic project detection, JSON logs with daily rotation, and log management.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/logdog',
    media: [
      {
        type: 'image',
        url: '/logdog/logdog1.png'
      },
      {
        type: 'image',
        url: '/logdog/logdog2.png'
      }
    ]
  },
  {
    name: 'backup-xd',
    description: 'A terminal-based backup management system for creating, scheduling, and managing backups for databases, files, and directories with automated cleanup and restore operations.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/backup-xd',
    media: [
      {
        type: 'image',
        url: '/backup-xd/backup-xd.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/backup-xd/backup-xd2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/backup-xd/backup-xd3.png',
        caption: ''
      }
    ]
  },
  {
    name: 'scriptgodx',
    description: 'A lightning-fast TUI script manager for developers to organize and instantly run most-used scripts and commands with category organization, script tracking, and output history.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/scriptgodx',
    media: [
      {
        type: 'image',
        url: '/scriptgodx/scriptgodx.png'
      }
    ]
  },
  {
    name: 'lif',
    description: 'A terminal user interface application for managing daily tasks, reminders, rolling todos, and a command glossary with countdown timers, alarms, and cross-platform notifications.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Go, SQLite, BubbleTea, Bubbles, Lipgloss, Cron',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/lif',
    media: [
      {
        type: 'image',
        url: '/lif/lif.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/lif/lif2.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/lif/lif3.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/lif/lif4.png',
        caption: ''
      }
    ]
  },
  {
    name: 'isle of brynd',
    description: 'A fantasy action RPG built with Godot Engine featuring 3D combat system, character progression, equipment system, quest system, multi-level world exploration, and interactive NPCs.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Godot Engine, GDScript',
    status: 'Demo Completed - May 2025',
    liveDemo: 'https://lfroesch.itch.io/isle-of-brynd',
    github: 'https://github.com/LFroesch/3d-rpg',
    media: [
      {
        type: 'image',
        url: '/rpg/promo5.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/rpg/promo4.png',
        caption: ''
      },
      {
        type: 'video',
        url: '/rpg/rpg.mp4',
        caption: 'Gameplay footage showing exploration, combat, and quest mechanics in the 3D RPG world'
      },
      {
        type: 'image',
        url: '/rpg/promo6.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/rpg/promo7.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/rpg/promo8.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/rpg/promo9.png',
        caption: ''
      }
    ]
  },
  {
    name: 'asteroids',
    description: 'My first game, basic pygame implementation of Asteroids game. Learned the basics of game development, physics, and collision detection.',
    longDescription: '',
    learned: '',
    goal: '',
    techStack: 'Python, Pygame',
    status: 'Completed - Late 2024',
    liveDemo: 'https://lfroesch.itch.io/asteroids',
    github: 'https://github.com/LFroesch/asteroids',
    media: [
      {
        type: 'image',
        url: '/asteroids/asteroids.png',
        caption: ''
      },
      {
        type: 'image',
        url: '/asteroids/asteroids2.png',
        caption: ''
      }
    ]
  }
];