import React, { useState } from "react";
import "./PopUp.css";

import { submitHawker } from "../services/SubmitHawkerSuggestion";

export default function SuggestPopUp(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const toggleModalAndSubmit = (e) => {
    e.preventDefault();
    setModal(!modal);
    submitHawker(
      props.storeName,
      props.hawkerCentre,
      props.address,
      props.hawkerName,
      props.hawkerPhoneNumber,
      props.region,
      props.languages,
      props.reasonForHelp);
      props.clearSuggestFields();
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
