import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  /* Returns a getter and setter for this state. */
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json())
                  .then(data => {setCurrentTime(data.time);
    });
  }, []); // Empty list here so that this function only called on initial rendering

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Hello world update! The current time is {currentTime}.</p>
      </header>

    </div>
  );
}

export default App;
