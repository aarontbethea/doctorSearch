//Individually Rendered results
import React from "react";
import "../styles/npiOneStyle.css";
//icon
import bldg from "../assets/building.svg";
import tel from "../assets/telephone.svg";
import fax from "../assets/printer.svg";

function IndResult(props) {

  //set state values when function executed
  const setModalParams = (e) => {
    //prevent default behavior
    e.preventDefault();
    if (!props.show) {
      //console.log(props)
      props.setShow(true);
      props.setEntry(props.data)
      console.log("Modal data set")
    }
  }
  //convert "last_updated" date to mm/dd/yyyy
  const rawAddr = props.data.addresses[0];
  const addr = (
    <>
      {rawAddr.address_1}
      {rawAddr.address_2 ? ", " + rawAddr.address_2 : ""};&nbsp;{rawAddr.city}
      ,&nbsp;{rawAddr.state}&nbsp;{rawAddr.postal_code.toString().slice(0, 5)}
    </>
  );
  function formatDate(date) {
    const dateObj = new Date(date + "T00:00:00");
    return new Intl.DateTimeFormat("en-US").format(dateObj);
  }
  return (
    <div className="list-group" id="result">
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <div onClick={setModalParams} name="provName" id="provName" style={{cursor:"pointer"}}>{props.data.basic.first_name} {props.data.basic.last_name}&nbsp;
            {props.data.basic.credential}</div>
          </h5>
          {/* NPI Number */}
          <small>{props.data.number}</small>
        </div>
        <div className="d-flex align-items-left">
            <p>
              <i>{props.data.taxonomies[0].desc}</i>
            </p>
        </div>
        <p className="mb-1">
          <img src={bldg} alt="practice-address" />: &nbsp; {addr}
          <br />
          <img src={tel} alt="practice-phone" />: {rawAddr.telephone_number}
          <br />
          <img src={fax} alt="fax-number" />:{" "}
          {rawAddr.fax_number
            ? rawAddr.fax_number
            : "Not Registered"}
        </p>
        {/* Last Updated */}
        {/* <small>
          Record Last Updated: {formatDate(props.data.basic.last_updated)}
        </small> */}
      </div>
    </div>
    // <div id="result">
    //     <p>{props.number}</p>
    //     <ul>
    //         <li>Credential: {props.basic.credential}</li>
    //         <li>
    //             Last Name: {props.basic.last_name}
    //         </li>
    //         <li>First Name: {props.basic.first_name}</li>
    //     </ul>
    // </div>
  );
}

export default IndResult;
