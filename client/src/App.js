import React from 'react';
import { AssistHawkerPage } from './pages/AssistHawker/AssistHawker';
import { SignUpPage } from './pages/SignUp/SignUp';

export function App() {

  return (
    <div>
      <AssistHawkerPage />
      {/* UNCOMMENT IF U WANT TO SWITCH PAGES */}
      {/* <SignUpPage /> */}
    </div>
  );
}

export default App;
