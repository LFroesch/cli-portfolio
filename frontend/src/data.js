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
          "I'm a full-stack developer passionate about creating clean and efficient apps, tools, games and more! I enjoy learning new tech/langs or thinking up innovative solutions to complex problems."
        ],
        photo: {
          src: "/general_icons/profile.jpg",
          alt: "Lucas Froeschner",
          caption: "Full-Stack Developer"
        }
      },
      {
        paragraphs: [
          "I love building things that solve real problems and make life easier, as well as working on more creative or fun projects."
        ],
        photo: {
          src: "/general_icons/profile.jpg",
          alt: "Lucas Froeschner at work",
          caption: "Building efficient solutions"
        }
      },
      {
        paragraphs: [
          "At home I have a beautiful and supportive fiancée Sarah, as well as our rascal of a dog, Brady. When I'm not coding (rarely), you can find me playing games, watching movies, or learning about new tech/trivia. I love a good info rabbit hole!"
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
      { icon: '📝', text: 'Resume / CV', url: '/Resume.pdf' },
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
        url: '/project-manager/project-manager2.png',
        caption: 'Main dashboard with notes, todos, and devlog sections'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager.png',
        caption: 'Tech Stack and package management section'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager5.png',
        caption: 'Plan & manage your tech stack with an interactive UI'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager3.png',
        caption: 'Manage your db schema, documentation and more with templates or custom entries'
      },
      {
        type: 'image',
        url: '/project-manager/project-manager4.png',
        caption: 'Project settings with tags, colors & categories for organization'
      },
    ]
  },
  {
    name: 'gator',
    description: 'A web-based RSS feed aggregator/reader with a React frontend and Go backend API featuring user authentication, real-time feed aggregation, and post browsing with filtering.',
    longDescription: 'One of my earlier Boot.dev projects was building the backend in Go, which sparked my interest in creating a full-fledged RSS aggregator. I wanted to build something that could handle multiple feeds efficiently while providing a clean user experience.',
    learned: 'This project taught me the fundamentals of Go backend services, including HTTP servers, database integration with PostgreSQL, and API design. I also learned to rework legacy code and implement new features like a frontend built with React.',
    goal: 'Create a fast, reliable RSS aggregator that can handle multiple feeds simultaneously while providing users with an intuitive way to browse and organize their content.',
    techStack: 'Go, React, PostgreSQL, Vite, Tailwind CSS, React Router',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/Gator',
    media: [
      {
        type: 'image',
        url: '/gator/gator.png',
        caption: 'User dashboard, each user represents a different feed aggregator instance'
      },
      {
        type: 'image',
        url: '/gator/gator2.png',
        caption: 'Feed management interface for adding and organizing RSS sources for the user'
      },
      {
        type: 'image',
        url: '/gator/gator3.png',
        caption: 'Post browsing interface with filtering options for specific feeds'
      },
      {
        type: 'image',
        url: '/gator/gator5.png',
        caption: 'Bookmarks of the user\'s favorite posts with quick access to read later'
      },
      {
        type: 'image',
        url: '/gator/gator4.png',
        caption: 'Admin dashboard to reset the database (posts only)'
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
        url: '/streaming-helper/streaming-helper.png',
        caption: 'Homepage showing featured movies and TV shows'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper5.png',
        caption: 'Search functionality to find movies, TV shows, and actors quickly'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper3.png',
        caption: 'Detailed movie/TV show page with cast, crew, trailers and more information'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper4.png',
        caption: 'Detailed actor page with biography and filmography'
      },
      {
        type: 'image',
        url: '/streaming-helper/streaming-helper2.png',
        caption: 'Add to your watchlist / use it to find movies and shows to watch'
      }
    ]
  },
  {
    name: 'fresh-notes',
    description: 'Simple Markdown note-taking app with React frontend and Node.js backend.',
    longDescription: 'I needed a simple but powerful note-taking solution that could handle Markdown formatting while being fast and accessible. The goal was to create something clean that wouldn\'t get in the way of writing.',
    learned: 'This project helped me understand the importance of user experience in productivity tools. I learned about Markdown parsing, real-time preview, and how to implement Redis for session management and caching.',
    goal: 'Build a minimalist note-taking app that focuses on writing experience while providing essential features like Markdown support and easy organization.',
    techStack: 'React, Node.js, Express, MongoDB, Redis, Tailwind CSS',
    status: 'Completed - May 2025',
    liveDemo: 'https://fresh-notes.up.railway.app/',
    github: 'https://github.com/LFroesch/FreshNotes',
    media: [
      {
        type: 'image',
        url: '/fresh-notes/FreshNotes.png',
        caption: 'Main dashboard with notes and folders'
      },
      {
        type: 'image',
        url: '/fresh-notes/FreshNotes2.png',
        caption: 'Create and manage notes with tags and priority levels'
      },
      {
        type: 'image',
        url: '/fresh-notes/FreshNotes3.png',
        caption: 'Create and manage folders for better organization of notes'
      }
    ]
  },
  {
    name: 'template-hub',
    description: 'A full-stack MERN application for developers to share, discover, and manage reusable code templates and snippets with authentication, search & filter, star system, and dark mode support.',
    longDescription: 'As a developer, I constantly found myself recreating similar components and patterns. I wanted to build a platform where developers could share useful code templates and discover solutions from others.',
    learned: 'This project taught me about code syntax highlighting with Prism.js, advanced search and filtering systems, and implementing user engagement features like starring and rating systems. I also learned about secure JWT authentication.',
    goal: 'Create a collaborative platform where developers can efficiently share, discover, and manage reusable code templates and snippets to accelerate development workflows.',
    techStack: 'React, Express.js, MongoDB, Mongoose, Tailwind CSS, Vite, JWT, Prism.js',
    status: 'Completed - May 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/template_hub',
    media: [
      {
        type: 'image',
        url: '/template-hub/template-hub.png',
        caption: 'Template discovery dashboard with search and filter options'
      },
      {
        type: 'image',
        url: '/template-hub/template-hub2.png',
        caption: 'Create templates / code snippets with tags and categories'
      },
      {
        type: 'image',
        url: '/template-hub/template-hub3.png',
        caption: 'View templates / code snippets and bookmark your favorites with stars'
      }
    ]
  },
  {
    name: 'event-chat',
    description: 'A location-based social platform featuring real-time messaging, event creation, and social networking capabilities with geolocation-based discovery and RSVP system.',
    longDescription: 'I wanted to create a platform that bridges the gap between online social interaction and real-world events. The idea was to help people discover local events and connect with others who share similar interests.',
    learned: 'This project was my deep dive into real-time technologies. I mastered Socket.IO for live messaging, learned geolocation APIs, and tackled complex state management for real-time updates. Working with Cloudinary taught me about media optimization and CDN integration.',
    goal: 'Build a scalable social platform that solves the age old problem of finding local events as well as community building through location-based event discovery and seamless communication.',
    techStack: 'React, Node.js, MongoDB, Express, Socket.IO, Tailwind CSS, DaisyUI, Zustand, Cloudinary, JWT',
    status: 'Completed - May 2025',
    liveDemo: 'https://event-chat.onrender.com/',
    github: 'https://github.com/LFroesch/event-chat',
    media: [
      {
        type: 'image',
        url: '/event-chat/event-chat2.png',
        caption: 'Geolocation-based event discovery feed'
      },
      {
        type: 'image',
        url: '/event-chat/event-chat3.png',
        caption: 'Geolocation-based post discovery feed'
      },
      {
        type: 'image',
        url: '/event-chat/event-chat4.png',
        caption: 'Get notifications for nearby events and posts'
      },
      {
        type: 'image',
        url: '/event-chat/event-chat5.png',
        caption: 'Realtime chat with event attendees and friends'
      },
      {
        type: 'image',
        url: '/event-chat/event-chat6.png',
        caption: 'Create and manage events with RSVP functionality'
      },
      {
        type: 'image',
        url: '/event-chat/event-chat7.png',
        caption: 'Create posts with images and geolocation tagging'
      }
    ]
  },
  {
    name: 'ecommerce platform',
    description: 'A full-stack e-commerce platform with React frontend and Node.js backend featuring user authentication, shopping cart, Stripe payments, admin dashboard, and coupon system.',
    longDescription: 'I wanted to understand the complete e-commerce ecosystem from user experience to payment processing to inventory management. This comprehensive project covers all aspects of running an online store.',
    learned: 'This project was my introduction to payment integration with Stripe, advanced state management with Zustand, and building admin dashboards with analytics. I also learned about Redis for session management and Cloudinary for image optimization.',
    goal: 'Create a full-featured e-commerce platform that could handle real transactions, inventory management, and provide both customer and administrator interfaces with modern UX patterns.',
    techStack: 'React, Node.js, Express, MongoDB, Stripe, Tailwind CSS, Zustand, Cloudinary, Redis',
    status: 'Completed - May 2025',
    liveDemo: 'https://e-commerce-store-9t97.onrender.com/',
    github: 'https://github.com/LFroesch/e-commerce-store',
    media: [
      {
        type: 'image',
        url: '/e-commerce/e-commerce2.png',
        caption: 'Customer frontpage with categories'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce3.png',
        caption: 'An example category page with products'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce4.png',
        caption: 'Checkout page with shopping cart and payment options'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce5.png',
        caption: 'Stripe payment integration for secure transactions'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce6.png',
        caption: 'Admin menu to create a new product with image upload'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce7.png',
        caption: 'Admin product management interface with featured item selection'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce8.png',
        caption: 'Admin analytics dashboard with sales and user statistics'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce9.png',
        caption: 'Successful order page with order details'
      }
    ]
  },
  {
    name: 'z-chat',
    description: 'A social media app built with React and Node.js featuring real-time messaging, user authentication, image uploads, and modern social networking capabilities with a clean, responsive interface.',
    longDescription: 'I wanted to create a learning experience by building a social media platform and trying to emulate an industry standard structure and codebase. This was one of my first full-stack projects - a simple Twitter clone that helped me understand how social platforms work.',
    learned: 'This project taught me advanced React patterns with TanStack Query for data management, implementing secure image upload systems with Cloudinary, and how to structure a full-stack application. I also learned about optimistic UI updates and error handling.',
    goal: 'Build a simple but functional social media platform to learn full-stack development patterns and understand how social platforms are structured and built.',
    techStack: 'React, Tailwind CSS, DaisyUI, TanStack Query, React Router, Node.js, Express, MongoDB, JWT, Cloudinary, bcrypt',
    status: 'Completed - 2025',
    liveDemo: 'https://zchat-u64e.onrender.com/',
    github: 'https://github.com/LFroesch/social-media-demo',
    media: [
      {
        type: 'image',
        url: '/z-chat/z-chat3.png',
        caption: 'Login and registration forms with secure authentication'
      },
      {
        type: 'image',
        url: '/z-chat/z-chat.png',
        caption: 'Clean social feed with post interactions and real-time updates'
      },
      {
        type: 'image',
        url: '/z-chat/z-chat2.png',
        caption: 'User profiles with post history and social connection features'
      }
    ]
  },
  {
    name: 'voice memo transcriber',
    description: 'A desktop application that uses global hotkeys to capture audio from your microphone and transcribe it to text using speech recognition. Features a dark mode UI for easy note management, voice command functionality for music control (start/stop/next song), and real-time transcription with persistent storage.',
    longDescription: 'I needed a way to quickly capture thoughts and ideas while working without interrupting my workflow. Voice memos seemed perfect, but I wanted them automatically transcribed for easy searching and editing. It also includes voice commands for music control.',
    learned: 'This project taught me about working with system-level APIs, audio processing with PyAudio, and integrating Google\'s speech recognition services. I also learned about implementing voice commands for system control and desktop app UI design.',
    goal: 'Create a productivity tool that seamlessly captures voice memos, converts them to searchable text, and provides voice commands for music control, making workflow interruption minimal.',
    techStack: 'Python, Google Speech Recognition, PyAudio, Tkinter',
    status: 'Completed - June 2024',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/voice-memo-transcriber',
    media: [
      {
        type: 'image',
        url: '/voice-memo/voice-memo.png',
        caption: 'Dark mode interface with transcribed memo list and controls'
      },
      {
        type: 'image',
        url: '/voice-memo/voice-memo2.png',
        caption: 'List of available voice commands'
      }
    ]
  },
  {
    name: 'window manager',
    description: 'A Windows desktop utility for managing, organizing, and resizing application windows with smart layout saving and restoration features.',
    longDescription: 'Working with multiple monitors and many applications, I found myself constantly repositioning windows. I wanted a tool that could remember and restore my preferred window layouts instantly.',
    learned: 'This project introduced me to Windows API programming with pywin32, process management, and creating system utilities. I learned about window manipulation, display management, and persistent configuration storage.',
    goal: 'Build a productivity tool that eliminates the tedious task of arranging windows by providing smart layout management and instant workspace restoration.',
    techStack: 'Python, customtkinter, psutil, pywin32',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/window_manager',
    media: [
      {
        type: 'image',
        url: '/window_manager/window-manager.png',
        caption: 'Saved layout management with quick restore functionality'
      },
      {
        type: 'image',
        url: '/window_manager/window-manager2.png',
        caption: 'Window detection and selection interface'
      },
      {
        type: 'image',
        url: '/window_manager/window-manager3.png',
        caption: 'Quick actions menu for managing windows'
      }
    ]
  },
  {
    name: 'tui-hub',
    description: 'A comprehensive collection of terminal-based applications and games built with Go and BubbleTea. Features productivity apps like file managers, text editors, and system monitors, alongside engaging games including Chess with full rule implementation, Snake, Blackjack, Auto-battler, and a Mini ASCII Roguelike with dungeon exploration.',
    longDescription: 'I wanted a kit of staple tools that get the job done quickly and easily all in one place. This collection represents my comprehensive TUI development suite, and the next few projects are from this tui-hub suite. There\'s also a game side with Snake, Chess, a roguelike and more.',
    learned: 'This project was my deep dive into Go programming and the BubbleTea framework. I learned about event-driven programming, complex state management in TUIs, and how to create engaging interactive experiences without traditional graphics.',
    goal: 'Create a comprehensive suite of terminal applications that combines essential productivity tools with entertaining games, all accessible from one central hub.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - Summer 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/tui-hub',
    media: [
      {
        type: 'image',
        url: '/tui-hub/tui-hub.png',
        caption: 'TUI Hub main menu showcasing the collection of terminal applications'
      },
      {
        type: 'image',
        url: '/tui-hub/tui-games.png',
        caption: 'Games selection menu with various terminal-based games available'
      },
      {
        type: 'image',
        url: '/tui-hub/Blackjack.png',
        caption: 'Blackjack game with card visualization and betting system'
      },
      {
        type: 'image',
        url: '/tui-hub/Blackjack2.png',
        caption: 'Blackjack gameplay showing betting options'
      },
      {
        type: 'image',
        url: '/tui-hub/MiniRoguelike.png',
        caption: 'ASCII roguelike with dungeon exploration and combat mechanics'
      },
      {
        type: 'image',
        url: '/tui-hub/SnakeGame.png',
        caption: 'Classic Snake game implementation with smooth terminal graphics'
      },
      {
        type: 'image',
        url: '/tui-hub/TUI-Chess.png',
        caption: 'Full Chess implementation with move validation and game state tracking'
      }
    ]
  },
  {
    name: 'portmon',
    description: 'A live port monitoring tool with real-time, interactive terminal interface for viewing and managing network ports and their associated processes with smart categorization.',
    longDescription: 'As a developer running multiple services, I needed a quick way to see what was running on which ports during app development. Traditional tools felt clunky, so I built an interactive terminal solution that\'s perfect for development workflows.',
    learned: 'This project taught me about system monitoring, network programming in Go, and creating real-time updating interfaces. I learned about port scanning, process detection, and efficient data polling.',
    goal: 'Create a developer-friendly tool for monitoring network activity during development that provides clear, real-time information about running services and their resource usage.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/portmon',
    media: [
      {
        type: 'image',
        url: '/portmon/Portmon.png',
        caption: 'Real-time port monitoring with process information and categorization'
      }
    ]
  },
  {
    name: 'scout',
    description: 'A lightning-fast TUI file explorer and fuzzy finder for developers with live preview, Git integration, smart navigation, VS Code integration, and bookmark management.',
    longDescription: 'I wanted to make a good solid working fast tool that I could use to navigate my workspaces and see previews, do file operations via a TUI and keyboard inputs. Traditional file managers felt slow, so I built this terminal-based solution.',
    learned: 'This project taught me about efficient file system operations, fuzzy search algorithms, and Git integration. I learned about terminal UI optimization and creating responsive interfaces that feel instant.',
    goal: 'Build a reliable and fast file navigation tool that combines fuzzy finding with practical file management features for daily development work.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/scout',
    media: [
      {
        type: 'image',
        url: '/scout/scout.png',
        caption: 'File explorer interface with fuzzy search and live preview'
      },
      {
        type: 'image',
        url: '/scout/scout2.png',
        caption: 'Bookmark management interface with quick access to important directories'
      }
    ]
  },
  {
    name: 'zap',
    description: 'A TUI file bookmarking system for developers to organize and instantly access important files and folders across all projects with smart categorization.',
    longDescription: 'I needed a way to bookmark and quickly access important files scattered across different projects. Think of it like a bookmark manager but for files - you can instantly jump to any config file regardless of where it\'s located.',
    learned: 'This project taught me about file system organization, cross-project file management, and editor integration. I learned about building efficient bookmark systems and persistent storage for file references.',
    goal: 'Create a file bookmarking system that acts as a central hub for quick access to important files across all development projects.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/zap',
    media: [
      {
        type: 'image',
        url: '/zap/zap.png',
        caption: 'File registry interface with quick access'
      }
    ]
  },
  {
    name: 'git-helper',
    description: 'A simple, user-friendly terminal UI for creating git commits with smart suggestions, function detection, conventional commits formatting, and commit hook management.',
    longDescription: 'Writing good commit messages consistently was challenging. I wanted a tool that could analyze my changes and suggest appropriate commit messages while enforcing conventional commit standards.',
    learned: 'This project taught me about Git internals, diff analysis, and natural language processing for commit message generation. I learned about conventional commits and automated code analysis.',
    goal: 'Streamline the commit process by providing intelligent suggestions and enforcing best practices, making it easier to maintain clean commit history.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/git-helper',
    media: [
      {
        type: 'image',
        url: '/git-helper/git-helper.png',
        caption: 'File change dashboard & clean or dirty state detection'
      },
      {
        type: 'image',
        url: '/git-helper/git-helper2.png',
        caption: 'Change analysis with suggested commit messages based on file changes'
      },
      {
        type: 'image',
        url: '/git-helper/git-helper3.png',
        caption: 'Custom commit message with standard enforcement'
      },
      {
        type: 'image',
        url: '/git-helper/git-helper4.png',
        caption: 'Output of push command with file changes'
      }
    ]
  },
  {
    name: 'project-launcher',
    description: 'A sleek project launcher and manager with interactive terminal interface for organizing, launching, and managing development projects with cross-platform support and WSL2 integration.',
    longDescription: 'I built this to streamline my development workflow by providing a centralized way to launch projects. It organizes development and production environments in one place, with easy path management and quick project switching.',
    learned: 'This project taught me about cross-platform development, WSL2 integration, and process management. I learned about project detection, environment setup automation, and creating intuitive project organization systems.',
    goal: 'Create a simple but effective project launcher that makes it easy to quickly start development or production projects with minimal setup.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/project-launcher',
    media: [
      {
        type: 'image',
        url: '/project-launcher/ProjectLauncher.png',
        caption: 'Project launcher interface with organized project categories and quick launch'
      }
    ]
  },
  {
    name: 'dwight',
    description: 'Terminal-based AI resource manager and assistant powered by Docker + Ollama with support for custom models, organizing prompts, templates, and project files.',
    longDescription: 'This is my first venture into working with local AI/LLM/model management and wanting to work with it to create efficient workflows and integrate it with other TUI apps. I wanted to integrate AI assistance into my terminal workflow without leaving my development environment.',
    learned: 'This project taught me about Docker integration, AI model management with Ollama, and creating conversational interfaces in terminals. I learned about prompt engineering, local AI deployment, and organizing AI workflows for development tasks.',
    goal: 'Build a terminal-native AI assistant that integrates seamlessly with development workflows, providing local AI capabilities and learning how to work with LLMs effectively.',
    techStack: 'Go, Docker, Ollama API, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/dwight',
    media: [
      {
        type: 'image',
        url: '/dwight/dwight.png',
        caption: 'AI assistant main menu with options for managing models, resources, and settings'
      },
      {
        type: 'image',
        url: '/dwight/dwight2.png',
        caption: 'Resource management interface with prompt templates and file organization'
      },
      {
        type: 'image',
        url: '/dwight/dwight3.png',
        caption: 'Global resource integration with push/pull functionality for managing AI resources'
      },
      {
        type: 'image',
        url: '/dwight/dwight6.png',
        caption: 'Model management interface with Docker and Ollama integration'
      },
      {
        type: 'image',
        url: '/dwight/dwight4.png',
        caption: 'Master settings and configuration management for AI models and preferences'
      },
      {
        type: 'image',
        url: '/dwight/dwight8.png',
        caption: 'Chat with your selected model with automatic chat history saving'
      },
      {
        type: 'image',
        url: '/dwight/dwight5.png',
        caption: 'Clean old chat logs'
      }
    ]
  },
  {
    name: 'logdog',
    description: 'A TUI-based logging utility that makes structured logging simple and consistent across Go projects with automatic project detection, JSON logs with daily rotation, and log management.',
    longDescription: 'I wanted a custom centralized logging system that could help with both dev and production apps by having log viewer, installer, and management all in one. I needed a tool that could standardize logging practices across projects.',
    learned: 'This project taught me about structured logging best practices, log rotation strategies, and building developer tools that enforce consistency. I learned about JSON logging formats and log aggregation techniques.',
    goal: 'Create a custom centralized logging system that provides both development and production logging capabilities with integrated viewing and management tools.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/logdog',
    media: [
      {
        type: 'image',
        url: '/logdog/logdog1.png',
        caption: 'Main menu with project detection and log management options'
      },
      {
        type: 'image',
        url: '/logdog/logdog2.png',
        caption: 'Clean, simple tui log viewer'
      }
    ]
  },
  {
    name: 'backup-xd',
    description: 'A terminal-based backup management system for creating, scheduling, and managing backups for databases, files, and directories with automated cleanup and restore operations.',
    longDescription: 'I wanted a comprehensive backup solution for managing backups across multiple projects and databases. I needed a centralized tool that could handle different backup types with scheduling and automated cleanup.',
    learned: 'This project taught me about backup strategies, database dump operations, and automated scheduling systems. I learned about data integrity verification and creating reliable restore procedures.',
    goal: 'Create a comprehensive backup solution that automates the entire backup lifecycle from creation to cleanup, ensuring data safety without manual intervention.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/backup-xd',
    media: [
      {
        type: 'image',
        url: '/backup-xd/backup-xd.png',
        caption: 'Backup management interface with scheduling, status, and restore options'
      },
      {
        type: 'image',
        url: '/backup-xd/backup-xd2.png',
        caption: 'View your backups with details'
      },
      {
        type: 'image',
        url: '/backup-xd/backup-xd3.png',
        caption: 'Auto clean up backups older than a specified number of days'
      }
    ]
  },
  {
    name: 'scriptgodx',
    description: 'A lightning-fast TUI script manager for developers to organize and instantly run most-used scripts and commands with category organization, script tracking, and output history.',
    longDescription: 'I had dozens of utility scripts scattered across projects and constantly forgot where specific scripts were located. I needed a simple centralized manager that could organize and execute scripts easily.',
    learned: 'This project taught me about script execution management, output capturing, and creating efficient search systems. I learned about cross-platform script handling and building responsive terminal interfaces.',
    goal: 'Create a simple script management tool that helps organize and run utility scripts with basic categorization and execution tracking.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/scriptgodx',
    media: [
      {
        type: 'image',
        url: '/scriptgodx/scriptgodx.png',
        caption: 'Script manager interface with categorization and instant execution'
      }
    ]
  },
  {
    name: 'lif',
    description: 'A terminal user interface application for managing daily tasks, reminders, rolling todos, and a command glossary with countdown timers, alarms, and cross-platform notifications.',
    longDescription: 'I needed a productivity system that lived in my terminal and could handle tasks, reminders, and knowledge management without disrupting my development workflow. It\'s just a basic TUI reminder system with rolling todos and a glossary for commands I may forget.',
    learned: 'This project taught me about persistent data storage, cross-platform notifications, and building complex TUI applications with multiple views. I learned about terminal-based productivity systems and simple task management.',
    goal: 'Build a simple personal productivity system that integrates with terminal workflows, combining basic task management with a command glossary.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/lif',
    media: [
      {
        type: 'image',
        url: '/lif/lif.png',
        caption: 'Personal productivity dashboard front page with reminder & rolling todo widget'
      },
      {
        type: 'image',
        url: '/lif/lif2.png',
        caption: 'Dailies that reset every day with a simple checklist system'
      },
      {
        type: 'image',
        url: '/lif/lif3.png',
        caption: 'Rolling to do list to manage tasks that may not relate to other projects'
      },
      {
        type: 'image',
        url: '/lif/lif4.png',
        caption: 'Timer and alarm system with cross-platform notifications'
      }
    ]
  },
  {
    name: 'isle of brynd',
    description: 'A fantasy action RPG built with Godot Engine featuring 3D combat system, character progression, equipment system, quest system, multi-level world exploration, and interactive NPCs.',
    longDescription: 'This is a comprehensive 3D RPG featuring quests, combat, inventory management, equipment systems, skills, dialogue trees, and multiple explorable areas. It is similar in playstyle to Skyrim, although it is not as expansive, of course.',
    learned: 'This project taught me advanced 3D game development, including complex state machines, inventory systems, and level design. I learned about quest scripting, NPC behavior systems, and creating engaging combat mechanics.',
    goal: 'Create a feature-complete RPG that demonstrates solid intermediate game development skills with polished systems and engaging gameplay mechanics.',
    techStack: 'Godot Engine, GDScript',
    status: 'Demo Completed - May 2025',
    liveDemo: 'https://lfroesch.itch.io/isle-of-brynd',
    github: 'https://github.com/LFroesch/3d-rpg',
    media: [
      {
        type: 'image',
        url: '/rpg/promo5.png',
        caption: 'Explore a world of combat, magic, and adventure!'
      },
      {
        type: 'image',
        url: '/rpg/promo4.png',
        caption: 'Shop UI with buying and selling items, currency and upgrades'
      },
      {
        type: 'video',
        url: '/rpg/rpg.mp4',
        caption: 'Gameplay footage showing a combat quest with NPC interaction and combat mechanics'
      },
      {
        type: 'image',
        url: '/rpg/promo6.png',
        caption: 'Lootable Chests with randomized items and equipment drops that persist on reload'
      },
      {
        type: 'image',
        url: '/rpg/promo7.png',
        caption: 'Inventory and equipment management system with character stats and item attributes'
      },
      {
        type: 'image',
        url: '/rpg/promo8.png',
        caption: 'Heal yourself with magic!'
      },
      {
        type: 'image',
        url: '/rpg/promo9.png',
        caption: 'Use different weapons and combat styles to defeat different enemies!'
      }
    ]
  },
  {
    name: 'asteroids',
    description: 'My first game, basic pygame implementation of Asteroids game. This was one of the first Boot.dev assignments and it got me hooked on programming.',
    longDescription: 'This was one of the first Boot.dev assignments and it really got me hooked on programming! It was my very first game project and my introduction to programming beyond basic tutorials. It represents the beginning of my journey into game development.',
    learned: 'This project taught me the fundamentals of game development, including game loops, collision detection, and basic physics. I learned about object-oriented programming and how to structure a complete project from start to finish.',
    goal: 'Learn the basics of game development while creating a functional clone of the classic Asteroids arcade game, establishing a foundation for future projects.',
    techStack: 'Python, Pygame',
    status: 'Completed - Late 2024',
    liveDemo: 'https://lfroesch.itch.io/asteroids',
    github: 'https://github.com/LFroesch/asteroids',
    media: [
      {
        type: 'image',
        url: '/asteroids/asteroids.png',
        caption: 'Classic Asteroids gameplay with ship movement and asteroid destruction'
      },
      {
        type: 'image',
        url: '/asteroids/asteroids2.png',
        caption: 'Game over screen showing score tracking and restart functionality'
      }
    ]
  }
];