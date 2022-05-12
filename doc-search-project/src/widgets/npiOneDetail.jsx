import React from "react";
import "../styles/npiOneDetailStyle.css";
import toTitleCase from "../utilities/casing";
import RenderList from "./listRender";
import convertToWrittenDate from "../utilities/dateandtime";

function NpiOneResultModal(props) {

    //handle boolean display for json objects
    const checkVal = (value) =>{
        let new_value;
        if (typeof value === 'boolean'){
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
    const addrs = props.entry.addresses;
    const idents = props.entry.identifiers;
    const dtCreated = convertToWrittenDate(props.entry.created_epoch);
    const dtUpdated = convertToWrittenDate(props.entry.last_updated_epoch);
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
                      <div className="col-sm" id="field-lbl">
                        {toTitleCase(field.toString().replace("_", " "))}
                      </div>
                      <div className="col-sm" id="field-value">{basic[field]}</div>
                    </div>
                  );
                })}
                <hr />
              </div>
              {/* Taxonomies */}
                <RenderList dtLabel="Taxonomies" listData={taxs}/>
              <hr />
              {/* Addresses */}
                <RenderList dtLabel="Addresses" listData={addrs} />
                {/* Identifiers */}
              <hr />
                <RenderList dtLabel="Identifiers" listData={idents}/>
              <hr />
                
              {/* date created / last updated  */}
              <div className="container" id="dates">
                  <div className="row">
                      <div className="col-sm">
                            Date Created
                      </div>
                      <div className="col-sm" id="dt-created-val">
                          {dtCreated}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-sm">
                          Date Updated
                      </div>
                      <div className="col-sm">
                          {dtUpdated}
                      </div>
                  </div>
              </div>
              <br />
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
