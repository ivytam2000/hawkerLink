import React, {useState, useEffect} from 'react';
import './App.css';
import HawkerSearchBar from './HawkerSearchBar';
import LanguageSearchBar from './LanguageSearchBar';
import {SearchHawker} from './services/AssistHawker';

 export function App() {

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
