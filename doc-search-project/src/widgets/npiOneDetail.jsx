import React from "react";
import "../styles/npiOneDetailStyle.css";
import toTitleCase from "../utilities/casing";

function NpiOneResultModal(props) {

    //handle boolean display for json objects
    const checkVal = (value) =>{
        let new_value;
        if (typeof value === 'boolean'){
            console.log("Bool")
            if (value === true) {
                new_value = "YES";
            } else {
                new_value = "NO";
            }
        } else {
            new_value = value;
        }

        
        
        return new_value
    }
  //handle on-close
  const onClose = () => {
    console.log("Closing Modal");
    props.setEntry(null);
    props.setShow(false);
  };
  if (!props.show) {
    return null;
  } else {
    const basic = props.entry.basic;
    const taxs = props.entry.taxonomies;
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
              <div className="container">
                <h6>Provider Info</h6>
                {Object.keys(basic).map((field, i) => {
                  return (
                    <div key={i} id={i} className="row">
                      <div className="col-sm">
                        {toTitleCase(field.toString().replace("_", " "))}
                      </div>
                      <div className="col-sm">{basic[field]}</div>
                    </div>
                  );
                })}
                <hr />
              </div>
              <div className="container">
                <h6>Taxonomies/Specialties</h6>
                {taxs.map((tax, i) => {
                  return (
                    <>
                      <div key={i} id={i} className="container">
                         {""}
                        {Object.keys(taxs[i]).map((t, indx) => {
                          return (
                            <div className="row">
                              {console.log(t)}
                              {/* Add Taxonomy data here */}
                              <div className="col-sm">
                                {toTitleCase(t.toString().replace("_", " "))}
                              </div>
                              <div className="col-sm">
                                  {checkVal(taxs[i][t])}
                                  </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
              <br />
              Address(es)
              <br />
              Date Created
              <br />
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
  }
}
export default NpiOneResultModal;
