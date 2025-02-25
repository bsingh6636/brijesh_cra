import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const [buttonPosition, setButtonPosition] = useState({ x: 100, y: 100 });
  const [isMoving, setIsMoving] = useState(false);
  const [caught, setCaught] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current || !containerRef.current || caught) return;
      
      const button = buttonRef.current;
      const container = containerRef.current;
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
      );
      
      if (distance < 100) {
        setIsMoving(true);
        
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        let newX = Math.max(0, Math.min(maxX, buttonPosition.x + (Math.random() * 200 - 100)));
        let newY = Math.max(0, Math.min(maxY, buttonPosition.y + (Math.random() * 200 - 100)));
        
        setButtonPosition({ x: newX, y: newY });
      } else {
        setIsMoving(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [buttonPosition, caught]);

  return (
    <div className="hello-container" ref={containerRef}>
      <h1>{caught ? "You got me! 🎉" : "Catch Me If You Can!"}</h1>
      <p>{caught ? "You win! 🎊" : "Try clicking the button before it escapes!"}</p>
      {!caught && (
        <button 
          ref={buttonRef}
          style={{
            transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
            position: 'absolute',
            transition: isMoving ? 'none' : 'transform 0.2s ease-out'
          }}
          onClick={() => setCaught(true)}
        >
          Catch Me
        </button>
      )}
    </div>
  );
};

const styles = `
.hello-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #282c34;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

p {
  font-size: 24px;
  margin-bottom: 30px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4fa8d1;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;
