import React, {useState, useEffect} from 'react';
import './App.css';
import HawkerSearchBar from './HawkerSearchBar';
import LanguageSearchBar from './LanguageSearchBar';

 export function App() {

  async function SearchHawker(locationName, languageName) {
  
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

    <body>

        <header className="page-header">
            <div className="header-logo">
                <p className="header-text">hawkerlink</p>
            </div>

            <nav className="main-nav" id="nav">
                <ul className="main-nav-links">
                    <li><a className="header" href="/">resources</a></li>
                    <li><a className="header" href="/">suggest a hawker</a></li>
                    <li className="current"><a className="header" href="/">assist a hawker</a></li>
                    <li><a className="header" href="/">about us</a></li>
                </ul>
            </nav>
        </header>

        <section className="content"> 
          <p class = "text-alt-l"><HawkerSearchBar searchHawker={SearchHawker}/></p>
          <LanguageSearchBar/>
        </section>

	</body>

  );
}

export default App;
