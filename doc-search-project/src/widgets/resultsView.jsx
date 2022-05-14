import React, { useState } from "react";
import IndResult from "./npiOneResults";
import "../styles/resultsViewStyle.css";
import NpiOneResultModal from "./npiOneDetail";

//style the results using JSON data
function ResultsViewer(props) {
  //set up state variables
  const [show, setShow] = useState(false);
  const [entry, setEntry] = useState(null);
  var numResults = 0;
  numResults = props.searchData.result_count;
  console.log("Search Results Rendered");
  console.log(props.searchData.result_count);
  const resultList = props.searchData.results;
  console.log(resultList);

  return (
    <div id="results">
      <span className="badge badge-pill badge-danger">test</span>

      <div className="d-flex justify-content-start">
        <h4>Results: {numResults}</h4>
      </div>

      <br />
      {resultList.map((r, i) => {
        return (
          <IndResult
            key={i}
            data={r}
            show={show}
            setShow={setShow}
            setEntry={setEntry}
          />
        );
      })}
      {/* Add modal */}
      <NpiOneResultModal
        show={show}
        setShow={setShow}
        entry={entry}
        setEntry={setEntry}
      />
    </div>
  );
}

export default ResultsViewer;
