import React from "react";
import "../styles/nppesSearch.css";
import { useState } from "react";

//Set up a search form

const BASEURL = "http://localhost:5000/getData";

function IndSearchForm(props) {
  //set up state value or toggle
  const [searchType, setSearchType] = useState("NPI-1");

  //intro message
  const introMsg = <><p>
    This tool provides results from the CMS/NPPES provider registry.</p></>

  let searchName;
  if (searchType === "NPI-1") {
    searchName = (
      <>
        <div className="form-group row">
          <label htmlFor="lname" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              key="lname"
              className="form-control form-control-sm"
              type="text"
              name="lname"
              id="lname"
              placeholder="Feelgood"
            ></input>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="fname" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              key="fname"
              className="form-control form-control-sm"
              type="text"
              name="fname"
              id="fname"
              placeholder="Jonathan"
            ></input>
          </div>
        </div>
      </>
    );
  } else {
    searchName = (
      <>
        <div className="form-group row">
          <label htmlFor="orgname" className="col-sm-2 col-form-label">
            Org. Name
          </label>
          <div className="col-sm-10">
            <input
              key="orgname"
              type="text"
              className="form-control form-control-sm"
              name="orgname"
              id="orgname"
              placeholder="Healing Hands Rehab"
            />
          </div>
        </div>
      </>
    );
  }

  //handle radio button toggle change
  const onRadioToggle = (e) => {
    //log the value
    console.log(e.target.value);
    setSearchType(e.target.value);
  };

  //set up function for button click

  const handlesubmit = (e) => {
    e.preventDefault();
    //get input values here
    
    const inputData = {
      number: e.target.npinbr.value.trim(),
      //last_name: e.target.lname.value,
      //first_name: e.target.fname.value,
      enumeration_type: searchType,
      //organization_name: e.target.orgname.value
    };
    if (searchType === 'NPI-1') {
      inputData.last_name = e.target.lname.value.trim();
      inputData.first_name = e.target.fname.value.trim();
    } else {
      inputData.organization_name = e.target.orgname.value.trim();
    }

    //build url
    var queryUrl = new URL(BASEURL);

    //add params to url
    for (let i of Object.keys(inputData)) {
      if (inputData[i] !== "") {
        queryUrl.searchParams.append(i, inputData[i]);
      }
    }
    console.log("query url");
    console.log(queryUrl.toString());
    //send the request
    getAPIResult(queryUrl);
  };

  const getAPIResult = async (url) => {
    //get data from api and return as json
    const response = await fetch(url);
    const jsonData = await response.json();
    props.setData(jsonData);
    console.log("Request Returned");
    console.log(jsonData);
  };

  return (
    <div id="medicare-search">
      <h3>Medicare Provider Search</h3>
      {introMsg}
      <form onSubmit={handlesubmit}>
        {/* Toggle between Individual and Organizational Providers */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="npiType"
            id="npiTypeInd"
            value="NPI-1"
            onChange={onRadioToggle}
            defaultChecked
          />
          <label className="form-check-label" htmlFor="npiTypeInd">
            Individual
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="npiType"
            id="npiTypeOrg"
            value="NPI-2"
            onChange={onRadioToggle}
          />
          <label className="form-check-label" htmlFor="npiTypeOrg">
            Organization
          </label>
        </div>

        {/* NPI Number */}
        <div className="form-group row">
          <label htmlFor="npinbr" className="col-sm-2 col-form-label">
            NPI Number:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-sm"
              type="text"
              name="npinbr"
              id="npinbr"
              placeholder="1234567890"
            ></input>
          </div>
        </div>
        {searchName}
        {/* Submit button */}
        <button type="submit" className="btn btn-outline-dark btn-sm">Search CMS Database</button>

      </form>
    </div>
  );
}

export default IndSearchForm;
