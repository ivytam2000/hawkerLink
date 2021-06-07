import React, { useState } from "react";
import {Multiselect} from 'multiselect-react-dropdown';

export function LanguageSearchBar(){
    const data = [
        {Language: 'English', id: 1},
        {Language: 'Mandarin', id:2},
        {Language: 'Hokkien', id:3},
        {Language: 'Teochew', id:4},
        {Language: 'Malay', id:5},
        {Language: 'Tamil', id:6}
    ]

    const [options] = useState(data);

    return(
        <div style = {{width:"90%", justifyContent: "center", display: "flex"}}>
        <div className= "LanguageSearchBar">
            <h3 style = {{color:"red"}}>Languages</h3>
            <Multiselect options={options} displayValue="Language"/>
        </div>
        </div>
    );

}