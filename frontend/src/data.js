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
        url: '/e-commerce/e-commerce.png',
        caption: 'Modern storefront with product catalog and search functionality'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce2.png',
        caption: 'Shopping cart with real-time price calculations and coupon system'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce3.png',
        caption: 'Secure checkout process with Stripe payment integration'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce4.png',
        caption: 'User account dashboard with order history and tracking'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce5.png',
        caption: 'Admin dashboard with sales analytics and inventory management'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce6.png',
        caption: 'Product management interface for adding and editing items'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce7.png',
        caption: 'Order management system with status tracking and fulfillment'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce8.png',
        caption: 'Customer reviews and ratings system with moderation tools'
      },
      {
        type: 'image',
        url: '/e-commerce/e-commerce9.png',
        caption: 'Mobile-responsive design optimized for mobile shopping experience'
      }
    ]
  },
  {
    name: 'z-chat',
    description: 'A social media app built with React and Node.js featuring real-time messaging, user authentication, image uploads, and modern social networking capabilities with a clean, responsive interface.',
    longDescription: 'I wanted to create a modern social media experience that focused on clean design and real-time interaction. The goal was to build something that felt familiar yet fresh with smooth user experience.',
    learned: 'This project taught me advanced React patterns with TanStack Query for data management, real-time features, and implementing secure image upload systems with Cloudinary. I also learned about optimistic UI updates and error handling.',
    goal: 'Build a polished social media platform with modern UX patterns, focusing on real-time messaging, media sharing, and responsive design across all devices.',
    techStack: 'React, Tailwind CSS, DaisyUI, TanStack Query, React Router, Node.js, Express, MongoDB, JWT, Cloudinary, bcrypt',
    status: 'Completed - 2025',
    liveDemo: 'https://zchat-u64e.onrender.com/',
    github: 'https://github.com/LFroesch/social-media-demo',
    media: [
      {
        type: 'image',
        url: '/z-chat/z-chat.png',
        caption: 'Clean social feed with modern post interactions and real-time updates'
      },
      {
        type: 'image',
        url: '/z-chat/z-chat2.png',
        caption: 'User profiles with post history and social connection features'
      },
      {
        type: 'image',
        url: '/z-chat/z-chat3.png',
        caption: 'Real-time messaging interface with media sharing capabilities'
      }
    ]
  },
  {
    name: 'voice memo transcriber',
    description: 'A desktop application that uses global hotkeys to capture audio from your microphone and transcribe it to text using speech recognition. Features a dark mode UI for easy note management, voice command functionality, and real-time transcription with persistent storage.',
    longDescription: 'I needed a way to quickly capture thoughts and ideas while working without interrupting my workflow. Voice memos seemed perfect, but I wanted them automatically transcribed for easy searching and editing.',
    learned: 'This project taught me about working with system-level APIs, audio processing with PyAudio, and integrating Google\'s speech recognition services. I also learned about global hotkey registration and desktop app UI design.',
    goal: 'Create a productivity tool that seamlessly captures voice memos and converts them to searchable text, making idea capture effortless during busy work sessions.',
    techStack: 'Python, Google Speech Recognition, PyAudio, Tkinter',
    status: 'Completed - June 2024',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/voice-memo-transcriber',
    media: [
      {
        type: 'image',
        url: '/voice-memo/voice-memo.png',
        caption: 'Dark mode interface with transcribed memo list and audio controls'
      },
      {
        type: 'image',
        url: '/voice-memo/voice-memo2.png',
        caption: 'Real-time transcription display with voice activity detection'
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
        caption: 'Main window manager interface with layout presets and window detection'
      },
      {
        type: 'image',
        url: '/window_manager/window-manager2.png',
        caption: 'Window arrangement controls with size and position customization'
      },
      {
        type: 'image',
        url: '/window_manager/window-manager3.png',
        caption: 'Saved layout management with quick restore functionality'
      }
    ]
  },
  {
    name: 'tui-hub',
    description: 'A comprehensive collection of terminal-based applications and games built with Go and BubbleTea. Features productivity apps like file managers, text editors, and system monitors, alongside engaging games including Chess with full rule implementation, Snake with score tracking, Blackjack with card counting, Auto-battler with strategic gameplay, and Mini ASCII Roguelike with dungeon exploration and combat systems.',
    longDescription: 'I became fascinated with terminal user interfaces and wanted to explore how far I could push the boundaries of what\'s possible in a terminal environment. This collection represents my journey into TUI development.',
    learned: 'This project was my deep dive into Go programming and the BubbleTea framework. I learned about event-driven programming, complex state management in TUIs, and how to create engaging interactive experiences without traditional graphics.',
    goal: 'Create a comprehensive suite of terminal applications that proves TUIs can be both powerful and enjoyable, covering everything from productivity tools to entertainment.',
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
        caption: 'Games selection menu with various terminal-based entertainment options'
      },
      {
        type: 'image',
        url: '/tui-hub/Blackjack.png',
        caption: 'Blackjack game with card visualization and betting system'
      },
      {
        type: 'image',
        url: '/tui-hub/Blackjack2.png',
        caption: 'Blackjack gameplay showing dealer and player hands with score tracking'
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
    longDescription: 'As a developer running multiple services, I needed a quick way to see what was running on which ports. Traditional tools felt clunky, so I built an interactive terminal solution.',
    learned: 'This project taught me about system monitoring, network programming in Go, and creating real-time updating interfaces. I learned about port scanning, process detection, and efficient data polling.',
    goal: 'Create a developer-friendly tool for monitoring network activity that provides clear, real-time information about running services and their resource usage.',
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
    longDescription: 'I wanted a file explorer that could match the speed of my thinking. Traditional file managers felt slow, so I built a terminal-based solution with fuzzy finding and instant navigation.',
    learned: 'This project taught me about efficient file system operations, fuzzy search algorithms, and Git integration. I learned about terminal UI optimization and creating responsive interfaces that feel instant.',
    goal: 'Build the fastest file navigation tool possible, combining the power of fuzzy finding with the convenience of traditional file management.',
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
        caption: 'Git integration showing file status and branch information'
      }
    ]
  },
  {
    name: 'zap',
    description: 'An easy to manage TUI file registry for developers to organize and instantly access important files across all projects with project organization and smart editor detection.',
    longDescription: 'I found myself constantly hunting for important files across different projects. I needed a centralized registry that could instantly jump to any important file regardless of location.',
    learned: 'This project taught me about file system watching, cross-project organization, and editor integration. I learned about building efficient search systems and persistent storage for file references.',
    goal: 'Create a file registry that acts as a bookmark system for developers, enabling instant access to important files across all projects with smart categorization.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/zap',
    media: [
      {
        type: 'image',
        url: '/zap/zap.png',
        caption: 'File registry interface with project organization and quick access'
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
        caption: 'Git commit interface with smart message suggestions'
      },
      {
        type: 'image',
        url: '/git-helper/git-helper2.png',
        caption: 'Change analysis with function detection and impact assessment'
      },
      {
        type: 'image',
        url: '/git-helper/git-helper3.png',
        caption: 'Conventional commit formatting with category selection'
      },
      {
        type: 'image',
        url: '/git-helper/git-helper4.png',
        caption: 'Commit preview with validation and hook management'
      }
    ]
  },
  {
    name: 'project-launcher',
    description: 'A sleek project launcher and manager with interactive terminal interface for organizing, launching, and managing development projects with cross-platform support and WSL2 integration.',
    longDescription: 'Managing multiple development projects across different directories and environments became tedious. I needed a central launcher that could organize and quickly start any project with the right environment setup.',
    learned: 'This project taught me about cross-platform development, WSL2 integration, and process management. I learned about project detection, environment setup automation, and creating intuitive project organization systems.',
    goal: 'Create a unified project management interface that eliminates the friction of switching between different development projects and environments.',
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
    longDescription: 'I wanted to integrate AI assistance into my terminal workflow without leaving my development environment. This tool provides local AI capabilities with organized prompt management and project integration.',
    learned: 'This project taught me about Docker integration, AI model management with Ollama, and creating conversational interfaces in terminals. I learned about prompt engineering and organizing AI workflows for development tasks.',
    goal: 'Build a terminal-native AI assistant that integrates seamlessly with development workflows, providing local AI capabilities without disrupting the command-line experience.',
    techStack: 'Go, Docker, Ollama API, BubbleTea, Bubbles, Lipgloss',
    status: 'In Development - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/dwight',
    media: [
      {
        type: 'image',
        url: '/dwight/dwight.png',
        caption: 'AI assistant main interface with model selection and conversation history'
      },
      {
        type: 'image',
        url: '/dwight/dwight2.png',
        caption: 'Prompt template management with categorization and quick access'
      },
      {
        type: 'image',
        url: '/dwight/dwight3.png',
        caption: 'Project integration showing file context and AI-assisted development'
      },
      {
        type: 'image',
        url: '/dwight/dwight4.png',
        caption: 'Model management interface with Docker and Ollama integration'
      },
      {
        type: 'image',
        url: '/dwight/dwight5.png',
        caption: 'AI conversation interface with syntax highlighting and code assistance'
      },
      {
        type: 'image',
        url: '/dwight/dwight6.png',
        caption: 'Resource manager for organizing AI-related files and templates'
      },
      {
        type: 'image',
        url: '/dwight/dwight7.png',
        caption: 'Settings and configuration management for AI models and preferences'
      },
      {
        type: 'image',
        url: '/dwight/dwight8.png',
        caption: 'Terminal-based chat interface with streaming responses and history'
      }
    ]
  },
  {
    name: 'logdog',
    description: 'A TUI-based logging utility that makes structured logging simple and consistent across Go projects with automatic project detection, JSON logs with daily rotation, and log management.',
    longDescription: 'Consistent logging across projects was becoming a challenge. I needed a tool that could standardize logging practices while making it easy to view and manage logs from multiple projects.',
    learned: 'This project taught me about structured logging best practices, log rotation strategies, and building developer tools that enforce consistency. I learned about JSON logging formats and log aggregation techniques.',
    goal: 'Standardize logging across all Go projects while providing an intuitive interface for log management and analysis, making debugging and monitoring more efficient.',
    techStack: 'Go, BubbleTea, Bubbles, Lipgloss',
    status: 'Completed - June 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/logdog',
    media: [
      {
        type: 'image',
        url: '/logdog/logdog1.png',
        caption: 'Logging utility interface with project detection and log configuration'
      },
      {
        type: 'image',
        url: '/logdog/logdog2.png',
        caption: 'Log viewer with filtering and search capabilities across multiple projects'
      }
    ]
  },
  {
    name: 'backup-xd',
    description: 'A terminal-based backup management system for creating, scheduling, and managing backups for databases, files, and directories with automated cleanup and restore operations.',
    longDescription: 'Managing backups across multiple projects and databases was becoming cumbersome. I needed a centralized solution that could handle different backup types with scheduling and automated cleanup.',
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
        caption: 'Backup management interface with scheduling and job status monitoring'
      },
      {
        type: 'image',
        url: '/backup-xd/backup-xd2.png',
        caption: 'Database backup configuration with multiple engine support'
      },
      {
        type: 'image',
        url: '/backup-xd/backup-xd3.png',
        caption: 'Backup history and restore operations with integrity verification'
      }
    ]
  },
  {
    name: 'scriptgodx',
    description: 'A lightning-fast TUI script manager for developers to organize and instantly run most-used scripts and commands with category organization, script tracking, and output history.',
    longDescription: 'I had dozens of utility scripts scattered across projects and constantly forgot where specific scripts were located. I needed a centralized manager that could organize and execute scripts instantly.',
    learned: 'This project taught me about script execution management, output capturing, and creating efficient search systems. I learned about cross-platform script handling and building responsive terminal interfaces.',
    goal: 'Create the ultimate script management tool that eliminates the friction of finding and running utility scripts, with smart organization and execution tracking.',
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
    longDescription: 'I needed a productivity system that lived in my terminal and could handle tasks, reminders, and knowledge management without disrupting my development workflow. Something personal and always accessible.',
    learned: 'This project taught me about persistent data storage with SQLite, cross-platform notifications, and building complex TUI applications with multiple views. I learned about cron-like scheduling and terminal-based productivity systems.',
    goal: 'Build a comprehensive personal productivity system that integrates seamlessly with terminal-based workflows, combining task management with knowledge tracking.',
    techStack: 'Go, SQLite, BubbleTea, Bubbles, Lipgloss, Cron',
    status: 'Completed - July 2025',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/lif',
    media: [
      {
        type: 'image',
        url: '/lif/lif.png',
        caption: 'Personal productivity dashboard with tasks and reminders'
      },
      {
        type: 'image',
        url: '/lif/lif2.png',
        caption: 'Task management with rolling todos and deadline tracking'
      },
      {
        type: 'image',
        url: '/lif/lif3.png',
        caption: 'Command glossary for storing frequently used commands and snippets'
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
    longDescription: 'I wanted to create a complete RPG experience that showcased everything I had learned about game development. This project represents my most ambitious game development effort to date.',
    learned: 'This project taught me advanced 3D game development, including complex state machines, inventory systems, and level design. I learned about quest scripting, NPC behavior systems, and creating engaging combat mechanics.',
    goal: 'Create a polished RPG demo that demonstrates advanced game development skills while providing an engaging fantasy adventure experience with professional-quality systems.',
    techStack: 'Godot Engine, GDScript',
    status: 'Demo Completed - May 2025',
    liveDemo: 'https://lfroesch.itch.io/isle-of-brynd',
    github: 'https://github.com/LFroesch/3d-rpg',
    media: [
      {
        type: 'image',
        url: '/rpg/promo5.png',
        caption: 'Fantasy world exploration with detailed environments and atmospheric lighting'
      },
      {
        type: 'image',
        url: '/rpg/promo4.png',
        caption: 'Character progression system with skill trees and equipment management'
      },
      {
        type: 'video',
        url: '/rpg/rpg.mp4',
        caption: 'Gameplay footage showing exploration, combat, and quest mechanics in the 3D RPG world'
      },
      {
        type: 'image',
        url: '/rpg/promo6.png',
        caption: 'Combat system with real-time action and strategic depth'
      },
      {
        type: 'image',
        url: '/rpg/promo7.png',
        caption: 'Quest system with dynamic NPC interactions and story progression'
      },
      {
        type: 'image',
        url: '/rpg/promo8.png',
        caption: 'Multi-level dungeon exploration with puzzle and combat challenges'
      },
      {
        type: 'image',
        url: '/rpg/promo9.png',
        caption: 'Rich fantasy world with immersive environments and detailed assets'
      }
    ]
  },
  {
    name: 'asteroids',
    description: 'My first game, basic pygame implementation of Asteroids game. Learned the basics of game development, physics, and collision detection.',
    longDescription: 'This was my very first game project and my introduction to programming beyond basic tutorials. It represents the beginning of my journey into game development and programming in general.',
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