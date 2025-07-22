export const personalInfo = {
  name: "Lucas Froeschner",
  title: "Full-Stack Developer & Software Engineer"
};

export const sections = ['about', 'skills', 'contact', 'stats', 'projects'];

export const contentData = {
  about: {
    paragraphs: [
      "I'm a full-stack developer passionate about creating clean, efficient solutions. I enjoy learning new tech/langs or modifying existing ones to their extreme.",
      "When I'm not coding (rarely), you can find me playing games, watching movies, or learning about new tech in other fields."
    ]
  },
  skills: {
    categories: [
      {
        name: 'Frontend',
        items: [
          'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
          'HTML5', 'CSS3', 'SCSS/Sass', 'Less', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Chakra UI',
          'Styled Components', 'Emotion', 'jQuery', 'Alpine.js', 'Lit', 'Stencil', 'Web Components',
          'PWA', 'Service Workers', 'WebAssembly', 'Three.js', 'D3.js', 'Chart.js', 'Framer Motion',
          'React Native', 'Flutter', 'Ionic', 'Cordova', 'Electron'
        ]
      },
      {
        name: 'Backend',
        items: [
          'Node.js', 'Express', 'Fastify', 'Koa', 'NestJS', 'Python', 'Django', 'Flask', 'FastAPI',
          'Java', 'Spring Boot', 'C#', '.NET', 'ASP.NET Core', 'Go', 'Gin', 'Fiber', 'Rust', 'Actix',
          'PHP', 'Laravel', 'Symfony', 'Ruby', 'Rails', 'Sinatra', 'Kotlin', 'Scala', 'Play Framework',
          'Deno', 'Bun', 'GraphQL', 'Apollo', 'REST APIs', 'gRPC', 'tRPC', 'Socket.io', 'WebSockets',
          'Microservices', 'Serverless', 'Lambda', 'Azure Functions', 'Vercel Functions'
        ]
      },
      {
        name: 'Databases',
        items: [
          'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Elasticsearch', 'DynamoDB',
          'Cassandra', 'CouchDB', 'Neo4j', 'Firebase Firestore', 'Supabase', 'PlanetScale',
          'Prisma', 'TypeORM', 'Mongoose', 'Sequelize', 'Drizzle', 'Knex.js'
        ]
      },
      {
        name: 'Cloud & DevOps',
        items: [
          'AWS', 'Azure', 'Google Cloud', 'Digital Ocean', 'Heroku', 'Vercel', 'Netlify',
          'Docker', 'Kubernetes', 'Docker Compose', 'Terraform', 'Ansible', 'Jenkins',
          'GitHub Actions', 'GitLab CI', 'CircleCI', 'Travis CI', 'Nginx', 'Apache',
          'Cloudflare', 'CDN', 'Load Balancers', 'Auto Scaling'
        ]
      },
      {
        name: 'Languages',
        items: [
          'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'C++', 'C',
          'PHP', 'Ruby', 'Kotlin', 'Swift', 'Dart', 'Scala', 'Clojure', 'Haskell', 'Erlang',
          'Elixir', 'F#', 'OCaml', 'Lua', 'Shell/Bash', 'PowerShell', 'SQL', 'NoSQL'
        ]
      },
      {
        name: 'Tools & Platforms',
        items: [
          'Git', 'GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'IntelliJ IDEA', 'WebStorm',
          'Vim/Neovim', 'Emacs', 'Sublime Text', 'Atom', 'Postman', 'Insomnia', 'Thunder Client',
          'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'GIMP', 'Blender', 'Unity', 'Unreal Engine',
          'Jira', 'Trello', 'Notion', 'Slack', 'Discord', 'Teams', 'Zoom'
        ]
      },
      {
        name: 'Testing & QA',
        items: [
          'Jest', 'Vitest', 'Mocha', 'Chai', 'Cypress', 'Playwright', 'Selenium', 'Puppeteer',
          'Testing Library', 'Enzyme', 'Storybook', 'Chromatic', 'Percy', 'Lighthouse',
          'WebPageTest', 'k6', 'Artillery', 'JMeter', 'Postman Tests', 'Newman'
        ]
      },
      {
        name: 'Build Tools',
        items: [
          'Vite', 'Webpack', 'Rollup', 'Parcel', 'esbuild', 'SWC', 'Babel', 'ESLint', 'Prettier',
          'Husky', 'lint-staged', 'Commitizen', 'Semantic Release', 'Changesets', 'Lerna',
          'Rush', 'Nx', 'Turborepo', 'Grunt', 'Gulp', 'Browsersync'
        ]
      },
      {
        name: 'Game Development',
        items: [
          'Unity', 'Unreal Engine', 'Godot', 'GameMaker Studio', 'Construct 3', 'Phaser.js',
          'PixiJS', 'Babylon.js', 'A-Frame', 'PlayCanvas', 'Cocos2d', 'LibGDX', 'MonoGame',
          'SDL', 'SFML', 'Allegro', 'OpenGL', 'DirectX', 'Vulkan', 'Metal'
        ]
      },
      {
        name: 'Mobile Development',
        items: [
          'React Native', 'Flutter', 'Ionic', 'Cordova', 'PhoneGap', 'Xamarin', 'NativeScript',
          'Swift (iOS)', 'Objective-C', 'Kotlin (Android)', 'Java (Android)', 'Android Studio',
          'Xcode', 'Expo', 'Capacitor'
        ]
      },
      {
        name: 'Data Science & AI',
        items: [
          'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
          'Jupyter', 'Google Colab', 'Anaconda', 'R', 'RStudio', 'Tableau', 'Power BI',
          'Apache Spark', 'Hadoop', 'Kafka', 'Airflow', 'MLflow', 'Kubeflow'
        ]
      },
      {
        name: 'Blockchain & Web3',
        items: [
          'Solidity', 'Web3.js', 'Ethers.js', 'Hardhat', 'Truffle', 'Ganache', 'MetaMask',
          'IPFS', 'The Graph', 'Moralis', 'Alchemy', 'Infura', 'OpenZeppelin', 'Chainlink',
          'Polygon', 'Binance Smart Chain', 'Avalanche', 'Solana', 'Cardano'
        ]
      }
    ]
  },
  contact: {
    items: [
      { icon: '📧', text: 'lucas.froeschner@gmail.com', url: 'mailto:lucas.froeschner@gmail.com' },
      { icon: '💻', text: 'github.com/LFroesch', url: 'https://github.com/LFroesch' },
      { icon: '💼', text: 'linkedin.com/in/lucas-froeschner', url: 'https://www.linkedin.com/in/lucas-froeschner-938886114/' },
      { icon: '📝', text: 'Resume / CV', url: '#' }, // this will be a page on this site
      { icon: '🎮', text: 'Game Projects', url: 'https://lfroesch.itch.io/' }
    ]
  }
};

export const projects = [
  {
    name: 'E-Commerce Site',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
    techStack: 'React, Node.js, MongoDB, Stripe',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'video', // 'video', 'gif', 'image', or null
      url: '/path/to/ecommerce-demo.mp4',
      poster: '/path/to/ecommerce-thumbnail.jpg' // optional poster image for videos
    }
  },
  {
    name: 'Chat App',
    description: 'Real-time chat application with WebSocket connections, user presence, and message history.',
    techStack: 'React, Socket.io, Express, PostgreSQL',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'gif',
      url: '/path/to/chat-demo.gif'
    }
  },
  {
    name: 'Tetris Clone',
    description: 'Classic Tetris game implementation with modern graphics, scoring system, and responsive controls.',
    techStack: 'JavaScript, Canvas API, HTML5',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'video',
      url: '/path/to/tetris-gameplay.mp4',
      poster: '/path/to/tetris-thumbnail.jpg'
    }
  },
  {
    name: 'Portfolio CLI',
    description: 'Interactive command-line interface portfolio showcasing projects and skills in a terminal environment.',
    techStack: 'Node.js, Inquirer.js, Chalk',
    liveDemo: '#',
    github: 'https://github.com/LFroesch/cli-portfolio',
    media: {
      type: 'gif',
      url: '/path/to/cli-demo.gif'
    }
  },
  {
    name: 'Data Visualizer',
    description: 'Interactive data visualization tool with multiple chart types, filtering, and export capabilities.',
    techStack: 'React, D3.js, Chart.js, Express',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'video',
      url: '/path/to/dataviz-demo.mp4',
      poster: '/path/to/dataviz-thumbnail.jpg'
    }
  },
  {
    name: 'Weather App',
    description: 'Weather forecast application with location services, interactive maps, and detailed weather data.',
    techStack: 'React, Weather API, Leaflet.js',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'image',
      url: '/path/to/weather-screenshot.png'
    }
  },
  {
    name: 'Task Manager',
    description: 'Collaborative task management application with project organization, team features, and progress tracking.',
    techStack: 'Vue.js, Node.js, MongoDB, Socket.io',
    liveDemo: '#',
    github: '#',
    media: null // No media for this project
  },
  {
    name: 'Blog Platform',
    description: 'Content management system with rich text editor, user authentication, and SEO optimization.',
    techStack: 'Next.js, Prisma, PostgreSQL, Tailwind',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'gif',
      url: '/path/to/blog-editing.gif'
    }
  },
  {
    name: 'Game Engine',
    description: '2D game engine with physics simulation, sprite animation, and level editor for indie game development.',
    techStack: 'C++, OpenGL, GLFW, Box2D',
    liveDemo: '#',
    github: '#',
    media: {
      type: 'video',
      url: '/path/to/gameengine-demo.mp4',
      poster: '/path/to/gameengine-thumbnail.jpg'
    }
  }
];