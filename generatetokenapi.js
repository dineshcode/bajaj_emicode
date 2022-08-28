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



async function generateTokenApi(req, res) {
    try {
        var data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': '3a02ba11-1585-4737-8577-2c9fe194f219',
            'client_secret': 'kiR7Q~9KVucp_.ff6NCMHUpNjWiUat0pIP~sG'
        });

        var token_config = {
            method: 'post',
            url: 'https://login.microsoftonline.com/bajajfinance.in/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'fpc=At4LFFMXkQBEpVpBSqQqGypLGtu-AQAAAMnYXdoOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd'
            },
            data: data
        };
        let accessToken= await axios(token_config);
        return accessToken.data.access_token;

    }
    catch (error) {

        return res.json({
            message: error
        })
    }

}


module.exports.generateTokenApi = generateTokenApi;