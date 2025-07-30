import React from 'react';
import { contentData } from '../data';

const CollapsibleHeader = ({ sectionKey, collapsedSections, toggleSection, title }) => (
  <button
    onClick={() => toggleSection(sectionKey)}
    className="w-full group flex items-center gap-4 mb-8 hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
  >
    <div className={`flex-shrink-0 w-8 h-8 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-white/80 group-hover:bg-white/10 transition-all duration-300 ${collapsedSections[sectionKey] ? 'bg-white/20' : ''}`}>
      <div className={`transition-transform duration-300 ${collapsedSections[sectionKey] ? 'rotate-180' : ''}`}>
        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-left">
      {title}
    </h3>
  </button>
);

const PhotoTextSection = ({ section, index, getBorderRadius }) => {
  const isLeftPhoto = index % 2 === 0;
  
  return (
    <div key={index} className={`flex flex-col ${isLeftPhoto ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
      {/* Photo */}
      <div className="flex-shrink-0">
        <div className={`w-48 h-48 lg:w-56 lg:h-56 border-2 border-white/20 overflow-hidden bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center ${getBorderRadius('card')}`}>
          <img
            src={section.photo.src}
            alt={section.photo.alt}
            className={`w-full h-full object-cover ${getBorderRadius('card')}`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full flex-col items-center justify-center text-white/40">
            <div className="text-6xl mb-2">👨‍💻</div>
            <div className="text-sm">Lucas F.</div>
          </div>
        </div>
        {/* Photo Caption */}
        <p className="text-center text-sm opacity-60 mt-2">
          {section.photo.caption}
        </p>
      </div>
      
      {/* Text Content */}
      <div className={`flex-1 text-center ${isLeftPhoto ? 'lg:text-left' : 'lg:text-right'}`}>
        {section.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex} className="text-xl lg:text-2xl opacity-90 leading-relaxed mb-6 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

const LearningTimeline = ({ collapsedSections, toggleSection, getBorderRadius }) => (
  <div className="mt-16">
    <CollapsibleHeader 
      sectionKey="about-timeline"
      collapsedSections={collapsedSections}
      toggleSection={toggleSection}
      title="Learning Journey"
    />
    {!collapsedSections['about-timeline'] && (
      <div className="animate-fade-in">
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>
          
          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {contentData.about.timeline.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row md:items-center">
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-white/80 rounded-full border-2 border-white/40 z-10"></div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right md:w-1/2' : 'md:pl-8 md:text-left md:w-1/2 md:ml-auto'}`}>
                  <div className={`bg-white/5 border border-white/10 p-6 backdrop-blur-sm ${getBorderRadius('card')}`}>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                      <span className="text-lg font-semibold text-white/90">{item.period}</span>
                      <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">{item.type}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {item.title}
                    </h4>
                    <p className="text-white/80 leading-relaxed mb-4">{item.description}</p>
                    {item.highlights && (
                      <ul className="space-y-1">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-white/40 mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const AboutSection = ({ collapsedSections, toggleSection, getBorderRadius }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* About Header */}
      <div className="mb-12">
        <CollapsibleHeader 
          sectionKey="about-bio"
          collapsedSections={collapsedSections}
          toggleSection={toggleSection}
          title="About"
        />
        {!collapsedSections['about-bio'] && (
          <div className="animate-fade-in space-y-12">
            {/* Photo and Text Sections */}
            {contentData.about.sections.map((section, index) => (
              <PhotoTextSection 
                key={index}
                section={section}
                index={index}
                getBorderRadius={getBorderRadius}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Learning Timeline */}
      <LearningTimeline 
        collapsedSections={collapsedSections}
        toggleSection={toggleSection}
        getBorderRadius={getBorderRadius}
      />
      
      {/* FAQ Section */}
      <div className="mt-16">
        <CollapsibleHeader 
          sectionKey="about-faq"
          collapsedSections={collapsedSections}
          toggleSection={toggleSection}
          title={contentData.about.faq.title}
        />
        {!collapsedSections['about-faq'] && (
          <div className="animate-fade-in">
            <p className="text-center text-lg opacity-80 leading-relaxed mb-12">
              {contentData.about.faq.description}
            </p>
            
            <div className="space-y-8">
              {contentData.about.faq.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={`border border-white/20 bg-white/5 ${getBorderRadius('card')}`}>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                      {section.category}
                    </h4>
                    
                    <div className="space-y-6">
                      {section.questions.map((qa, qaIndex) => (
                        <div key={qaIndex} className="text-left">
                          <h5 className="text-base lg:text-lg font-medium mb-3 text-white/90">
                            Q: {qa.question}
                          </h5>
                          <p className="text-sm lg:text-base opacity-80 leading-relaxed pl-4 border-l-2 border-white/20">
                            {qa.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;