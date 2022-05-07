const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

const requestEndpoint = "https://npiregistry.cms.hhs.gov/api/?version=2.1";

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/getData', cors(corsOptions), async (req, res) => {
    const fetchOptions = {
        method: 'GET'
    }
    console.log("Query Params")
    console.log(req.query)
    var url = new URL(requestEndpoint)
    
    // if ("number" in req.query) {
    //     url.searchParams.append("number",req.query.number)
    // };
    for (let q in req.query) {
        url.searchParams.append(q,req.query[q])
    }
    

    console.log("URL")
    console.log(url.toString())
    const response = await fetch(url, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    console.log(`Backend Server app listening at http://localhost:${PORT}`);
});