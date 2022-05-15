import React from "react";
import "../styles/nppesSearch.css";
import { useState } from "react";

//Set up a search form

const BASEURL = "http://localhost:5000/api-nppes-getData";

function IndSearchForm(props) {
  //set up state value for toggle
  const [searchType, setSearchType] = useState("NPI-1");



  //intro message
  const introMsg = (
    <>
      <p>
        Quickly look up NPI registry details &amp; PECOS enrollment status on Individual or Organization health care providers.
        <br/>
        <small><b>Pro Tip:</b> Enter an asterisk <code>" * "</code> after the first two letters in any "Name" (or "City") field to get a wider range of results. </small>
      </p>
    </>
  );

  const disclaimerMsg = (
      <>
        <small><p>The results on this page are obtained IN REAL TIME from APIs offered by the Centers for Medicare &amp; Medicaid Services (CMS).
        As such, this web-application, it's developer and hosting provider are not responsible for the accuracy of the information obtained. Validation of the results received is the sole responsibility of the user (that's you).
        <br/><br/>
        As a general disclaimer, the issuance of an NPI number DOES NOT indicate that the provider, or organization queried is Licensed or Credentialed.</p></small>
      </>
  )

  let searchName;
  if (searchType === "NPI-1") {
    searchName = (
      <>
        <div className="form-group row justify-content-between">
          <label htmlFor="lname" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-4">
            <input
              key="lname"
              className="form-control form-control-sm"
              type="text"
              name="lname"
              id="lname"
              placeholder="Feelgood"
            ></input>
          </div>
          <label htmlFor="fname" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-4">
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
        <div className="form-group row justify-content-center">
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
  const onProviderTypeChange = (e) => {
    //log the value
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
    if (searchType === "NPI-1") {
      inputData.last_name = e.target.lname.value.trim();
      inputData.first_name = e.target.fname.value.trim();
    } else {
      inputData.organization_name = e.target.orgname.value.trim();
    }

    //get city state and zip
    inputData.city = e.target.city.value.trim();
    inputData.state = e.target.state.value.trim();
    inputData.postal_code = e.target.postal_code.value.trim();

    //build url
    var queryUrl = new URL(BASEURL);

    //add params to url
    for (let i of Object.keys(inputData)) {
      if (inputData[i] !== "") {
        queryUrl.searchParams.append(i, inputData[i]);
      }
    }

    //send the request
    getAPIResult(queryUrl);
  };

  /*Set up a function to handle Calls to our `backend` API, which calls the NPPES API with
  the parameters entered by the user, then assigns the JSON results to a `state` object.
  */
  const getAPIResult = async (url) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    props.setData(jsonData);

  };

  return (
    <div id="medicare-search">
      <h3>NPPES Search</h3>
      {introMsg}
      <form onSubmit={handlesubmit}>
        {/* Toggle between Individual and Organizational Providers */}
        {/* <div className="form-check form-check-inline">

        {/* NPI Number */}
        <div className="form-group row justify-content-between">
          <label htmlFor="npinbr" className="col-sm-2 col-form-label">
            NPI Number:
          </label>
          <div className="col-sm-4" id="npientry">
            <input
              className="form-control form-control-sm"
              type="text"
              name="npinbr"
              id="npinbr"
              placeholder="1234567890"
            ></input>
          </div>
          <label htmlFor="npiType" className="col-sm-2 col-form-label">
            Type
          </label>
          <select
            className="form-select form-select-sm"
            name="npiType"
            id="npiType"
            aria-label="Default select example"
            onChange={onProviderTypeChange}
          >
            <option value="NPI-1" defaultValue>
              Individual
            </option>
            <option value="NPI-2">Organization</option>
          </select>
        </div>
        -or-
        {searchName}
        {/* Address, city state and zip */}
        <div className="form-group row justify-content-between">
          <label htmlFor="city" className="col-sm-2 col-form-label">
            City
          </label>
          <div className="col-sm-4">
            <input
              key="city"
              name="city"
              id="city"
              type="text"
              className="form-control form-control-sm"
              placeholder="Woodlawn"
            />
          </div>
          <label htmlFor="state" className="col-sm-2 col-form-label">
            State
          </label>
          <div className="col-sm-4">
            <input
              key="state"
              name="state"
              id="state"
              type="text"
              className="form-control form-control-sm"
              placeholder="MD"
            />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label htmlFor="postal_code" className="col-sm-2 col-form-label">
            Zip
          </label>
          <div className="col-sm-2">
            <input
              key="postal_code"
              name="postal_code"
              id="postal_code"
              type="text"
              className="form-control form-control-sm"
              placeholder="21244"
            />
          </div>
        </div>
        {/* Submit button */}
        <br />
        <button type="submit" className="btn btn-outline-dark btn-sm">
          Search Registry
        </button>
      </form>
      <hr/>
      {/* Inject the disclaimer message here */}
      {disclaimerMsg}
    </div>
  );
}

export default IndSearchForm;
