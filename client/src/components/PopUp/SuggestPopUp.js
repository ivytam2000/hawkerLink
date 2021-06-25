import React, { useState } from "react";
import "./PopUp.css";
import { submitHawker } from "../../services/SubmitHawkerSuggestion";

export default function SuggestPopUp(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    if (!props.storeName) {
      alert("Please enter the store name.");
      return;
    } 

    if (!props.hawkerCentre) {
      alert("Please enter the hawker centre name.");
      return;
    } 

    if (!props.address) {
      alert("Please enter the stores's address.");
      return;
    } 

    if (!props.region) {
      alert("Please select a region.");
      return;
    } 

    if (!props.hawkerName) {
      alert("Please enter the hawker's name.");
      return;
    } 

    if (!props.hawkerPhoneNumber) {
      alert("Please enter the hawker's phone number.");
      return;
    } 

    if (!props.reasonForHelp) {
      alert("Please choose/enter a reason why this hawker would require our help.");
      return;
    } 

    if (typeof props.languages === 'undefined' || !Array.isArray(props.languages) || !props.languages.length) {
      alert("Please select the languages the hawker can speak.");
      return;
    } 

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
