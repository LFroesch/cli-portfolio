import React, { useState, useEffect } from 'react'
import { personalInfo, sections, projects, contentData } from './data'

function ConsolePortfolio() {
  const [currentSection, setCurrentSection] = useState('projects');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(2);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          navigateMenu(-1);
          break;
        case 'ArrowRight':
          navigateMenu(1);
          break;
        case 'ArrowUp':
          if (currentSection === 'projects') {
            navigateProjects(-1);
          }
          break;
        case 'ArrowDown':
          if (currentSection === 'projects') {
            navigateProjects(1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, currentProjectIndex]);

  const navigateMenu = (direction) => {
    const currentIndex = sections.indexOf(currentSection);
    const newIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
    setCurrentSection(sections[newIndex]);
  };

  const navigateProjects = (direction) => {
    setCurrentProjectIndex(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) {
        newIndex = projects.length - 1; // Loop to end
      } else if (newIndex >= projects.length) {
        newIndex = 0; // Loop to beginning
      }
      return newIndex;
    });
  };

  const renderProjectsWheel = () => {
    const visibleProjects = [];
    const totalVisible = 5; // Show 2 above, current, 2 below
    const halfVisible = Math.floor(totalVisible / 2);
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      let index = currentProjectIndex + i;
      
      // Handle looping for the wheel display
      if (index < 0) {
        index = projects.length + index; // Wrap to end
      } else if (index >= projects.length) {
        index = index - projects.length; // Wrap to beginning
      }
      
      visibleProjects.push({ project: projects[index].name, originalIndex: index, offset: i });
    }
    
    return visibleProjects.map(({ project, originalIndex, offset }) => {
      let className = "text-center py-1 px-2 transition-all duration-300 cursor-pointer flex items-center justify-center min-w-[180px] ";
      
      if (offset === 0) {
        // Current/center project
        className += "border border-white font-medium opacity-100 text-base h-8";
      } else if (Math.abs(offset) === 1) {
        // Adjacent projects
        className += "opacity-70 text-sm h-6";
      } else {
        // Outer projects
        className += "opacity-40 text-xs h-5";
      }

      return (
        <div 
          key={`${originalIndex}-${offset}`} 
          className={className}
          onClick={() => setCurrentProjectIndex(originalIndex)}
        >
          <span className="truncate">{project}</span>
        </div>
      );
    });
  };

  const renderContent = () => {
    const currentProject = projects[currentProjectIndex];
    
    switch(currentSection) {
      case 'about':
        return (
          <div className="max-w-2xl text-left">
            <h2 className="text-2xl mb-6 text-center">About</h2>
            {contentData.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 opacity-90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        );
      
      case 'skills':
        return (
          <div className="max-w-2xl">
            <h2 className="text-2xl mb-6 text-center">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contentData.skills.categories.map((category, index) => (
                <div key={index} className="text-center">
                  <h3 className="mb-4 font-medium">{category.name}</h3>
                  <div className="space-y-2 text-sm opacity-80">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="max-w-2xl text-center">
            <p className="mb-4 opacity-90 leading-relaxed">
              {currentProject.description}
            </p>
            <div className="mb-6 text-sm opacity-80">
              <strong>Tech Stack:</strong> {currentProject.techStack}
            </div>
            <div className="space-x-6">
              <a 
                href={currentProject.liveDemo} 
                className="inline-block px-4 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Live Demo
              </a>
              <a 
                href={currentProject.github} 
                className="inline-block px-4 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="max-w-2xl text-center">
            <h2 className="text-2xl mb-6">Contact</h2>
            <div className="space-y-4 text-lg leading-loose">
              {contentData.contact.items.map((item, index) => (
                <div key={index}>{item.icon} {item.text}</div>
              ))}
            </div>
          </div>
        );
      
      case 'links':
        return (
          <div className="max-w-2xl text-center">
            <h2 className="text-2xl mb-6">Links</h2>
            <div className="space-y-4">
              {contentData.links.items.map((item, index) => (
                <a key={index} href={item.url} className="block text-white hover:underline">
                  {item.icon} {item.text}
                </a>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center font-mono">
      <div className="text-center w-full max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 tracking-wide">{personalInfo.name}</h1>
          <p className="text-lg opacity-80 font-light">{personalInfo.title}</p>
        </div>

        {/* Main Menu - Fixed Height */}
        <div className="flex items-center justify-center gap-10 mb-8 h-16">
          {sections.map((section) => (
            <React.Fragment key={section}>
              {section === 'projects' && currentSection === 'projects' ? (
                <div className="flex flex-col items-center justify-center gap-1 min-w-[200px] h-16">
                  {renderProjectsWheel()}
                </div>
              ) : (
                <div 
                  className={`text-lg font-light tracking-wider py-3 px-5 transition-all duration-300 cursor-pointer border-2 min-w-[100px] text-center ${
                    currentSection === section 
                      ? 'border-white font-normal' 
                      : 'border-transparent hover:border-white'
                  }`}
                  onClick={() => setCurrentSection(section)}
                >
                  {section}
                </div>
              )}
              {section !== sections[sections.length - 1] && (
                <span className="opacity-50">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Area - Fixed Height */}
        <div className="h-96 flex items-start justify-center">
          <div className="w-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsolePortfolio;