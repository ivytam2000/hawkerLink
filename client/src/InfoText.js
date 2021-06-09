import React from "react";

export default function InfoText(props) {
    return (<p> Store name {props.storeName}. 
    Location :{props.location}. 
    Languages: {props.language}. </p>
    );
  }