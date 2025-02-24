import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current || !containerRef.current) return;
      
      const button = buttonRef.current;
      const container = containerRef.current;
      const buttonRect = button.getBoundingClientRect();
      
      // Calculate distance between mouse and button center
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
      );
      
      // If mouse is close (within 100px), move the button away
      if (distance < 100) {
        setIsMoving(true);
        
        // Calculate container boundaries
        const containerRect = container.getBoundingClientRect();
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        // Calculate move direction (away from mouse)
        const directionX = buttonCenterX - mouseX;
        const directionY = buttonCenterY - mouseY;
        
        // Normalize and scale the movement
        const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        const normalizedX = directionX / magnitude * 50;
        const normalizedY = directionY / magnitude * 50;
        
        // Calculate new position, keeping button within container
        let newX = buttonPosition.x + normalizedX;
        let newY = buttonPosition.y + normalizedY;
        
        newX = Math.max(0, Math.min(maxX, newX));
        newY = Math.max(0, Math.min(maxY, newY));
        
        setButtonPosition({ x: newX, y: newY });
      } else {
        setIsMoving(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [buttonPosition]);

  return (
    <div className="hello-container" ref={containerRef}>
      <h1>Hello React</h1>
      <p>Welcome to my application, Brijesh</p>
      <button 
        ref={buttonRef}
        style={{
          transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
          position: 'relative',
          transition: isMoving ? 'none' : 'transform 0.5s ease-out'
        }}
      >
        Get Started
      </button>
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