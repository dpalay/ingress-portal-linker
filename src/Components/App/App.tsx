import React from 'react';
import Button from 'antd/es/button';
import logo from '../../logo.svg';
import './App.css';
import myClickFunction from '../../Utils/events'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >Learn React
        </a>
            
           <Button type="primary" onClick={myClickFunction}>Learn React</Button>
      </header>
      
    </div>
  );
}

export default App;
