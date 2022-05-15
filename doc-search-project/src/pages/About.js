import React from "react";
import { ListGroup } from "react-bootstrap";
import '../styles/about.css';

export default function AboutPg(){
    return (
        <>
        <div id="about-content">
            
            <div className="container" id="about-body">
                <h2>About</h2>
                <br/>
                <p>NPI Online serves to provide real-time Medicare provider enrollment data by consuming Application Programming Interfaces (APIs) 
                    available to the public by the Centers for Medicare and Medicaid Services (CMS). As such this application is made available free of charge for public use.
                    This application does not store queries, nor results.

                </p>
            <h5>Data Sources </h5>
            <ListGroup>
                <ListGroup.Item><a href="https://npiregistry.cms.hhs.gov/registry/help-api">NPPES Provider Registry API</a></ListGroup.Item>
                <ListGroup.Item><a href="https://data.cms.gov/provider-characteristics/medicare-provider-supplier-enrollment/order-and-referring">Provider Enrollment, Chain and Ownership System (PECOS) API </a></ListGroup.Item>
            </ListGroup>
            </div>
            <br/>
            <h5>Contact Us</h5>
            For general inquiries, to report bugs or for suggestions, please email us at <a href="mailto:betheatechconsultants@gmail.com">betheatechconsultants@gmail.com</a>
        </div>
        </>
    )
}