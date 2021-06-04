import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import HawkerSearchBar from './HawkerSearchBar';

function App() {

  // /* Returns a getter and setter for this state. */
  // const [currentTime, setCurrentTime] = useState(0);

  //for results

  // useEffect(() => {
  //   fetch('/time').then(res => res.json())
  //                 .then(data => {setCurrentTime(data.time);
  //   });
  // }, []); // Empty list here so that this function only called on initial rendering


  async function searchHawker(locationName, languageName) {
  
    const response = await fetch('/hawkers',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: locationName,
            languages: languageName            
          })
        });

    const data = await response.json();
    
    return data;
  }

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
        <HawkerSearchBar searchHawker={searchHawker}/>
      </header>

    </div>
  );
}

export default App;
