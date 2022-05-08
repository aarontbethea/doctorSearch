import React from "react";
import "../styles/npiOneDetailStyle.css";

function NpiOneResultModal(props) {
    //handle on-close
    const onClose = () => {
        console.log("Closing Modal")
        props.setEntry(null);
        props.setShow(false);
    }
  if (!props.show) {
    return null;
  } else {
      const basic = props.entry.basic;
    return (
      // <!-- Modal -->
      <div className="modal" id="modal-result">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-result-title">
                Provider Detail: {basic.first_name} {basic.last_name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                Provider Info 
                <hr/>
                {Object.keys(basic).map((field,i) => {
                    return(
                    <p key={i}>{field}: {basic[field]}</p>
                    )
                })}
                Taxonomy
                <br/>
                Address(es)
                <br/>
                Date Created 
                <br/>
                Date Updated
               
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
             
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default NpiOneResultModal;
