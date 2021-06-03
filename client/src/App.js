import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { HawkerSearchBar } from './HawkerSearchBar';
import Welcome from './BottomTextComponent';

function App() {

  // /* Returns a getter and setter for this state. */
  // const [currentTime, setCurrentTime] = useState(0);

  //for results
  const [storeName, setStoreName] = useState(0);
  const [location, setLocation] = useState(0);
  const [language, setLanguage] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json())
  //                 .then(data => {setCurrentTime(data.time);
  //   });
  // }, []); // Empty list here so that this function only called on initial rendering

  function searchHawker(locationName, languageName) {
    fetch('/hawkers',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: locationName,
            languages: languageName            
          })
        }).then(res => res.json())
        .then(data => {setStoreName(data.storeName);
          setLocation(data.location);
          setLanguage(data.languages)});

    return (<p>The store name is {storeName}. 
      The location is {location}. 
      The language spoken is {language}. </p>);
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
        <Welcome storeName=""/>
      </header>

    </div>
  );
}

export default App;
