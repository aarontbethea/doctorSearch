import React from "react";
import IndResult from "./npiOneResults";
import "../styles/resultsViewStyle.css";

//style the results using JSON data
function ResultsViewer(props) {
  var numResults = 0;
  numResults = props.searchData.result_count;
  console.log("Search Results Rendered");
  console.log(props.searchData.result_count);
  const resultList = props.searchData.results;
  console.log(resultList);

  return (
    <div id="results">
      <div className="d-flex justify-content-start">
        <h3>Results: {numResults}</h3>
      </div>

      <br />
      {resultList.map((r, i) => {
        return <IndResult key={i} data={r} />;
      })}
    </div>
  );
}

export default ResultsViewer;
