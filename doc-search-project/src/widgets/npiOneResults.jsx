//Individually Rendered results
import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import "../styles/npiOneStyle.css";
//icon
import bldg from "../assets/building.svg";
import tel from "../assets/telephone.svg";
import fax from "../assets/printer.svg";

function IndResult(props) {
  /* set up state value for OandP API results (json returned as list containing
    NPI, LAST_NAME, FIRST_NAME, PARTB, DME, HHA, */
  const [oandpData, setOandpData] = useState([]);

  //set state values when function executed
  const setModalParams = (e) => {
    //prevent default behavior
    e.preventDefault();
    if (!props.show) {
      props.setShow(true);
      props.setEntry(props.data);
    }
  };
  //convert "last_updated" date to mm/dd/yyyy
  const rawAddr = props.data.addresses[0];
  const addr = (
    <>
      {rawAddr.address_1}
      {rawAddr.address_2 ? ", " + rawAddr.address_2 : ""};&nbsp;{rawAddr.city}
      ,&nbsp;{rawAddr.state}&nbsp;{rawAddr.postal_code.toString().slice(0, 5)}
    </>
  );

  //conditional rendering!!!!
  //render the name element. Organization Name for NPI-2, First/Last Name for NPI-1
  //handle fax element, display fax component, otherwise display nothing

  let nameField;
  let faxField;
  if (props.data.enumeration_type === "NPI-1") {
    nameField = (
      <div
        onClick={setModalParams}
        name="provName"
        id="provName"
        style={{ cursor: "pointer" }}
      >
        {props.data.basic.first_name} {props.data.basic.last_name}&nbsp;
        {props.data.basic.credential}
      </div>
    );
    faxField = (
      <>
        <img src={fax} alt="fax-number" />:{" "}
        {rawAddr.fax_number ? rawAddr.fax_number : "Not Registered"}
      </>
    );
  } else {
    nameField = (
      <div
        onClick={setModalParams}
        name="orgName"
        id="orgName"
        style={{ cursor: "pointer" }}
      >
        {props.data.basic.organization_name} {props.data.basic.last_name}&nbsp;
        {props.data.basic.credential}
      </div>
    );
    faxField = null;
  }

  //handle date formatting
  const formatDate = (date) => {
    const dateObj = new Date(date + "T00:00:00");
    return new Intl.DateTimeFormat("en-US").format(dateObj);
  };

  //search result for PECOS enrollment

  useEffect(() => {
    const checkPecosEnrollment = async (npi) => {
      const BASEURL = "http://localhost:5000/api-oandp-getData";
      var queryUrl = new URL(BASEURL);
      queryUrl.searchParams.append("npi", npi);
      const response = await fetch(queryUrl);
      const jsonData = await response.json();
      setOandpData(jsonData);

    };
    // call the function
    checkPecosEnrollment(props.data.number);
  }, [props.data.number]);

  //launch pecos enrollment query
  const pecosCols = ["DME", "HHA", "PARTB", "PMD"];
  let pecosDisplay;
  if (oandpData.length !== 0) {
    pecosDisplay = (
      <>
        {" "}
        <div className="flex justify-content-start" id="pecos-enroll" key="samplekey">
          <div className="row" key="row-key-1">
            <div className="col-sm-4" key={`pecos`}>PECOS Enrollment:</div>
            {pecosCols.map((p, i) => {
              return (
                <>
                  
                  <div className="col-sm" key={p}>
                    {oandpData[0][p] === "Y" ? (
                      <Badge bg="success" key={`true-${p}`}>{p}</Badge>
                    ) : (
                      <Badge bg="danger" key={`false-${p}`}>{p}</Badge>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    pecosDisplay = (
      <>
        <div className="container justify-content-start" id="pecos-enroll">
          <div className="row">
            <div className="col-sm">PECOS Enrollment:</div>
            <div className="col-sm"><Badge bg="warning">Not Enrolled</Badge></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="list-group" id="result">
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{nameField}</h5>
          {/* NPI Number */}
          <small>{props.data.number}</small>
        </div>
        <div className="d-flex align-items-left">
          <p>
            <i>{props.data.taxonomies[0].desc}</i>
          </p>
        </div>
        {pecosDisplay}
        <p className="mb-1">
          <img src={bldg} alt="practice-address" />: &nbsp; {addr}
          <br />
          <img src={tel} alt="practice-phone" />: {rawAddr.telephone_number}
          <br />
          {/* render fax number */}
          {faxField}
        </p>
        {/* Last Updated */}
        {/* <small>
          Record Last Updated: {formatDate(props.data.basic.last_updated)}
        </small> */}
      </div>
    </div>
  );
}

export default IndResult;
