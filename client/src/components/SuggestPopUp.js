import React, { useState } from "react";
import "./SuggestPopUp.css";

import { submitHawker } from "../services/SubmitHawkerSuggestion";

// const [storeName, setStoreName] = useState(0);
// const [location, setLocation] = useState(0);
// const [address, setAddress] = useState(0);
// const [region, setRegion] = useState(0);
// const [hawkerName, setHawkerName] = useState(0);
// const [hawkerNumber, setHawkerNumber] = useState(0);
// const [languages, setLanguages] = useState([]);

export default function SuggestPopUp(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const toggleModalAndSubmit = (e) => {
    e.preventDefault();
    setModal(!modal);
    submitHawker(props.storeName, props.location, props.region, props.languages);
  }

  return (
    <>
      <button onClick={toggleModal} className="submit-form">
        Submit
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p className="info-header">BEFORE SUGGESTING A HAWKER, HAVE YOU...</p>
            <ul className="info-point">
              <li>Had a conversation with the hawker telling them that you want to suggest them to us?</li>
              <li>Checked that they want to get on food delivery platforms, but need help with the process?</li>
            </ul>
            <button className="btn-cancel" onClick={toggleModal}>
              CANCEL
                </button>
            <button className="btn-confirm" onClick={toggleModalAndSubmit}>
              CONFIRM
            </button>
          </div>
        </div>
      )}

    </>
  );
}
