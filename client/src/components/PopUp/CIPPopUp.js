import React, { useState } from "react";
import "./PopUp.css";
import check from "./imgs/check.png";
import { submitHawker } from "../../services/SubmitHawkerSuggestion";

export function CipPopUp(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const toggleModalAndSubmit = (e) => {
    e.preventDefault();
    setModal(!modal);
  }

  return (
    <>
     <button onClick={toggleModal} className="submit-form">
        Submit
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
              <img src={check} width="50" height="50" class="center"/> 
            <p className="verify-content"> We have received your details and will be in contact to confirm your CIP hours. </p>
           
            <button className="submit-form" onClick={toggleModalAndSubmit}>
                OK 
            </button>
          </div>
        </div>
      )}

    </>
  );
}
