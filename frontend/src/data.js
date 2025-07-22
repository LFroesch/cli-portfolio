export const personalInfo = {
  name: "Lucas Froeschner",
  title: "Full-Stack Developer & Software Engineer"
};

export const sections = ['about', 'skills', 'contact', 'links', 'projects'];

export const projects = [
  {
    name: 'E-Commerce Site',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
    techStack: 'React, Node.js, MongoDB, Stripe',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Chat App',
    description: 'Real-time chat application with WebSocket connections, user presence, and message history.',
    techStack: 'React, Socket.io, Express, PostgreSQL',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Tetris Clone',
    description: 'Classic Tetris game implementation with modern graphics, scoring system, and responsive controls.',
    techStack: 'JavaScript, Canvas API, HTML5',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Portfolio CLI',
    description: 'Interactive command-line interface portfolio showcasing projects and skills in a terminal environment.',
    techStack: 'Node.js, Inquirer.js, Chalk',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Data Visualizer',
    description: 'Interactive data visualization tool with multiple chart types, filtering, and export capabilities.',
    techStack: 'React, D3.js, Chart.js, Express',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Weather App',
    description: 'Weather forecast application with location services, interactive maps, and detailed weather data.',
    techStack: 'React, Weather API, Leaflet.js',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Task Manager',
    description: 'Collaborative task management application with project organization, team features, and progress tracking.',
    techStack: 'Vue.js, Node.js, MongoDB, Socket.io',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Blog Platform',
    description: 'Content management system with rich text editor, user authentication, and SEO optimization.',
    techStack: 'Next.js, Prisma, PostgreSQL, Tailwind',
    liveDemo: '#',
    github: '#'
  },
  {
    name: 'Game Engine',
    description: '2D game engine with physics simulation, sprite animation, and level editor for indie game development.',
    techStack: 'C++, OpenGL, GLFW, Box2D',
    liveDemo: '#',
    github: '#'
  }
];

export const contentData = {
  about: {
    paragraphs: [
      "I'm a full-stack developer passionate about creating clean, efficient solutions. I enjoy working with modern web technologies and building applications that solve real problems.",
      "When I'm not coding, you can find me exploring fractals, playing retro games, or learning about new technologies."
    ]
  },
  skills: {
    categories: [
      {
        name: 'Frontend',
        items: ['JavaScript', 'React', 'Vue.js', 'CSS3']
      },
      {
        name: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL']
      },
      {
        name: 'Tools',
        items: ['Git', 'Vite', 'Docker', 'AWS']
      }
    ]
  },
  contact: {
    items: [
      { icon: '📧', text: 'your.email@example.com' },
      { icon: '💻', text: 'github.com/yourusername' },
      { icon: '💼', text: 'linkedin.com/in/yourprofile' },
      { icon: '🌐', text: 'yourwebsite.com' }
    ]
  },
  links: {
    items: [
      { icon: '📝', text: 'Resume / CV', url: '#' },
      { icon: '📊', text: 'GitHub Stats', url: '#' },
      { icon: '📚', text: 'Blog / Articles', url: '#' },
      { icon: '🎮', text: 'Game Projects', url: '#' }
    ]
  }
};