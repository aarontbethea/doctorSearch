const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
};

// This function runs if the http://localhost:5000/api-nppes-getData endpoint
// is requested with a GET request
app.get("/api-nppes-getData", cors(corsOptions), async (req, res) => {
  const requestEndpoint = "https://npiregistry.cms.hhs.gov/api/?version=2.1";
  const fetchOptions = {
    method: "GET",
  };

  var url = new URL(requestEndpoint);

  // if ("number" in req.query) {
  //     url.searchParams.append("number",req.query.number)
  // };
  for (let q in req.query) {
    url.searchParams.append(q, req.query[q]);
  }

  const response = await fetch(url, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
});

// This function runs if the http://localhost:5000/api-oandp-getData endpoint
// is requested with a GET request
//read the docs: https://data.cms.gov/provider-characteristics/medicare-provider-supplier-enrollment/order-and-referring
app.get("/api-oandp-getData", cors(corsOptions), async (req, res) => {
  const requestEndpoint =
    "https://data.cms.gov/data-api/v1/dataset/0824b6d0-14ad-47a0-94e2-f317a3658317/data";
  const fetchOptions = {
    method: "GET",
  };

  var url = new URL(requestEndpoint);

  /*
        we'll only receive NPI, LAST_NAME, and FIRST_NAME from this form
    */
  if (Object.keys(req.query).length == 1) {
    var fieldName = Object.keys(req.query)[0];
    var fieldVal = req.query[fieldName];

    //Check if only the NPI number was submitted:
    if (fieldName.toUpperCase() === "NPI") {
      // append exact search filter to url
      url.searchParams.append("filter[NPI]", fieldVal);
    } else {
      //when only the last or first name is submitted, use the "CONTAINS operator path"

      url.searchParams.append(
        `filter[${fieldName.toLowerCase()}-filter][condition][path]`,
        fieldName.toUpperCase()
      );
      url.searchParams.append(
        `filter[${fieldName.toLowerCase()}-filter][condition][operator]`,
        "CONTAINS"
      );
      url.searchParams.append(
        `filter[${fieldName.toLowerCase()}-filter][condition][value]`,
        fieldVal
      );
    }
  } else {
    //This clause handles when both last and first name are submitted by the user
    //append the params using two separate filters, using contains
    for (let q in req.query) {
      url.searchParams.append(
        `filter[${q.toLowerCase()}-filter][condition][path]`,
        q.toUpperCase()
      );
      url.searchParams.append(
        `filter[${q.toLowerCase()}-filter][condition][operator]`,
        "CONTAINS"
      );
      url.searchParams.append(
        `filter[${q.toLowerCase()}-filter][condition][value]`,
        req.query[q]
      );
    }
  }


  const response = await fetch(url, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
});

app.listen(PORT, () => {
  console.log(`Backend Server app listening at http://localhost:${PORT}`);
});
