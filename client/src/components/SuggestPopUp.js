import React, {useState} from "react";
import "./SuggestPopUp.css";


export default function SuggestPopUp(){
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
              <p className="info-header">BEFORE SUGGESTING A HAWKER, HAVE YOU...</p>
                <ul className="info-point">
                 <li>Had a conversation with the hawker telling them that you want to suggest them to us?</li>
                 <li>Checked that they want to get on food delivery platforms, but need help with the process?</li>
                 </ul>
                <button className="btn-cancel" onClick={toggleModal}>
                  CANCEL
                </button>
                <button className="btn-confirm" onClick={toggleModal}>
                  CONFIRM
                </button>
              </div>
            </div>
          )}

        </>
      );
}
