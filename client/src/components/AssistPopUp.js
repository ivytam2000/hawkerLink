import React, { useState } from "react";
import "./PopUp.css";

export function AssistPopUp(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="submit-form">
        Submit
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p className="info-header">THANK YOU FOR SIGNING UP </p>
            <p className='popup-content'> Your actions are making a tangible difference in these
            hawkers' lives. </p>
            <p className = 'popup-content'> We will be in touch soon via <b>email</b> with more information on training and the volunteer process.</p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}

    </>
  );
}