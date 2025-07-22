import React from 'react'

function CLIPortfolio() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState([]);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      
      // Add command to output
      setOutput(prev => [...prev, `guest@portfolio:~$ ${command}`]);
      
      // Process command
      if (command === 'help') {
        setOutput(prev => [...prev, 'Available commands: help, about, clear']);
      } else if (command === 'about') {
        setOutput(prev => [...prev, 'I am a developer learning to build cool stuff!']);
      } else if (command === 'clear') {
        setOutput([]);
      } else if (command) {
        setOutput(prev => [...prev, `Command not found: ${command}`]);
      }
      
      setInput('');
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="bg-black text-green-400 h-screen p-4 font-mono overflow-auto" onClick={handleClick}>
      <div className="mb-4">
        <h1 className="text-2xl">Welcome to my CLI Portfolio</h1>
        <p>Type 'help' and press Enter</p>
      </div>
      
      {/* Output area */}
      <div className="mb-4">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      
      {/* Input line */}
      <div className="flex">
        <span className="mr-2">guest@portfolio:~$</span>
        <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input" 
            />
      </div>
    </div>
  );
}

export default CLIPortfolio;