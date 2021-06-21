import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LandingPage } from './pages/Landing/LandingPage';
import { AssistMainPage } from './pages/AssistMain/AssistMain';
import { SearchHawkerPage } from './pages/SearchHawker/SearchHawker';
import { SignUpPage } from './pages/Forms/SignUp';
import { SuggestionPage } from './pages/Forms/Suggestion';
import { ResourcesPage } from './pages/Resources/Resources'
import { ResourcesVerificationPage } from './pages/Resources/ResourcesVerified';
import { BookingPage } from './pages/Booking/BookingPage';

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <BrowserRouter>
     <div className="route-wrapper">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/assist" component={AssistMainPage} />
        <Route exact path="/search" component={SearchHawkerPage} />
        <Route exact path="/suggesthawker" component={SuggestionPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/resources-verified" component={ResourcesVerificationPage} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/:id/booking" component={BookingPage} />
      </Switch>
    </div>
   </BrowserRouter>,
   rootElement
 )

reportWebVitals();
