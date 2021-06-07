import React from "react";

export default function InfoText(props) {
  return (<p> The store name is {props.storeName}.
    The location is {props.location}.
    The language spoken is {props.language}. </p>
  );
}