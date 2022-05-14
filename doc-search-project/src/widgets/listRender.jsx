import React from "react";
import checkVal from "../utilities/checkValue";
import toTitleCase from "../utilities/casing";

function RenderList(props) {
  //this is the list
  if (typeof props.listData !== "undefined") {
    const listData = props.listData;
    const element = (
      <>
        <h6>
          {props.dtLabel}: {listData.length}
        </h6>
        {listData.map((list, indx) => {
          return (
            <>
              <div
                key={indx}
                id={`${props.dtLabel}-${indx}`}
                className="container"
              >
                <small><b>--{indx +1}--</b></small>
                {/* iterate through each item and display */}
                {Object.keys(listData[indx]).map((l, i) => {
                  return (
                    // Add a row element
                    <div className="row" key={i}>
                      <div className="col-sm" id="field-lbl" key={`label-${i}`}>
                        {toTitleCase(l.toString().replace("_", " "))}
                      </div>
                      <div className="col-sm" id="field-value" key={`value-${i}`}>
                        {checkVal(listData[indx][l])}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </>
    );
    return element;
  } else {
    return null;
  }
}

export default RenderList;
