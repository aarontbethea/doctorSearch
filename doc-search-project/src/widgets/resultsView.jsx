import React, { useState } from "react";
import IndResult from "./npiOneResults";
import "../styles/resultsViewStyle.css";
import NpiOneResultModal from "./npiOneDetail";
import {Badge} from "react-bootstrap";

//style the results using JSON data
function ResultsViewer(props) {
  //set up state variables
  const [show, setShow] = useState(false);
  const [entry, setEntry] = useState(null);
  var numResults = 0;
  numResults = props.searchData.result_count;

  const resultList = props.searchData.results;

  return (
    <div id="results">
      <div className="container">
        {/* Legend */}
        Legend:{" "}
        <Badge bg="success">Can Order/Refer</Badge>{" "}
        <Badge bg="danger">Can NOT Order/Refer</Badge>
      </div>

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
