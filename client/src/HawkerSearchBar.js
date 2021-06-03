import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function HawkerSearchBar({searchHawker}) {

  const [location, setLocation] = useState({
    name: ""
  });

  const [language, setLanguage] = useState({
    name: ""
  });

//   const data = [
//     {Language: 'English', id: 1},
//     {Language: 'Mandarin', id:2},
//     {Language: 'Hokkien', id:3},
//     {Language: 'Teochew', id:4},
//     {Language: 'Malay', id:5},
//     {Language: 'Tamil', id:6}
// ]

  // const [options] = useState(data);

  function handleLocInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setLocation({ ...location, name: e.target.value });
  }

  function handleLangInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setLanguage({ ...language, name: e.target.value });
  }

  

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    searchHawker(location.name, language.name);
    // if (location.name.trim()) {
    //   setSubject({ ...location, name: "" });
    // }
  }

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <TextField
        label="Location"
        type="text"
        name="Location"
        value={location.name}
        onChange={handleLocInputChange}
      />
       <TextField
        label="Language"
        type="text"
        name="Language"
        value={language.name}
        onChange={handleLangInputChange}
      />
      <Button type="submit" onClick={handleSubmit}>Search</Button>
    </form>
  );
}