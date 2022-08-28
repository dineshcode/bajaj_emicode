var axios = require('axios');
var md5 = require("md5");
const crypto = require('crypto');
const request = require('request');
const express = require('express');
var cors = require("cors");
const res = require('express/lib/response');
const app = express();
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tokenApi=require('./generatetokenapi');


async function schemafetchApi(req, res) {
    try {
        let access_token=await tokenApi.generateTokenApi();

        let schemadata=req.body;
        var schema_config = {
            method: 'POST',
            url: 'https://prodapitm.bajajfinserv.in/POSReinventDealerWS/TopSchemeLogic',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'a431223466ba4eba856517f32986c522',
                'Authorization': `Bearer ${access_token}`


            },
            data: JSON.stringify(schemadata)
        };

        let schemaresponse = await axios(schema_config);
        return res.json({
            data:schemaresponse
        })

    }
    catch (error) {
        return res.josn({
            message: error
        })
    }

}

module.exports.schemafetchApi = schemafetchApi;