import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AssistMainPage } from './pages/AssistMain/AssistMain';
import { AssistHawkerPage } from './pages/AssistHawker/AssistHawker';
import { SignUpPage } from './pages/Forms/SignUp';

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <BrowserRouter>
     <div className="route-wrapper">
    {/* <AssistHawkerPage /> */}
    <Switch>
     <Route exact path="/" component={AssistMainPage} />
     <Route exact path="/findhawker" component={AssistHawkerPage} />
     <Route path="/page2" component={SignUpPage} />
   </Switch>
   </div>
   </BrowserRouter>,
   rootElement
 );

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
