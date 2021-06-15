import React, { useState } from "react";
import "./PopUp.css";
import check from "../imgs/check.png";
import { submitHawker } from "../services/SubmitHawkerSuggestion";

export function VerificationPopUp(props) {
  const [modal, setModal] = useState(true);

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
  }

  return (
    <>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
              <img src={check} width="50" height="50" class="center"/> 
            <p className="verify-content">Your match has been confirmed. <br/> Thank you for signing up!</p>
           
            <button className="btn-ok" onClick={toggleModalAndSubmit}>
                OK 
            </button>
          </div>
        </div>
      )}

    </>
  );
}
