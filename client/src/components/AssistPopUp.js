import React, { useState } from "react";
import "./PopUp.css";
import { AssistHawker } from "../services/AssistHawker";

export function AssistPopUp(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
    AssistHawker(
        props.name,
        props.email,
        props.hawkerIds,
        props.number,
        props.availability,
        props.languages,
        props.comfortable
      );

  };

  const toggleModalAndSubmit = (e) => {
    e.preventDefault();
    setModal(!modal);
    props.clearFields();
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
            <p className="info-header">THANK YOU FOR SIGNING UP </p>
            <p className='popup-content'> Your actions are making a tangible difference in these
            hawkers' lives. </p>
            <p className = 'popup-content'> We will be in touch soon via <b>email</b> with more information on training and the volunteer process.</p>
            <button className="close-modal" onClick={toggleModalAndSubmit}>
            </button>
          </div>
        </div>
      )}

    </>
  );
}