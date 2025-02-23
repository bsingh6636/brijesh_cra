import React from 'react';
import  './App.css'
const App = () => {
  return (
    <div className="hello-container">
      <h1>Hello React</h1>
      <p>Welcome to my application , Brijesh</p>
      <button>Get Started</button>
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