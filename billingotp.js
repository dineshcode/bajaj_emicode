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
let requestdate=require('./requestdate.js');

async function billingOtp(req, res) {
    try {
        let request_date= await requestdate.generatedate();
        let plaintext = req.body;
        const ENCRYPTION_KEY = '5PP3LIZ8CB210322114958LBV9QBGE1F';
        const IV_LENGTH = 16;
        let iv = '1234567887654321';
        iv = new Buffer(iv, "binary");
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(JSON.stringify(plaintext));
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        var enc = encrypted.toString('base64');
        var seal = md5(enc + ENCRYPTION_KEY);
        var customer_config = {
            'method': 'POST',
            'url': 'https://bfluat.in.worldline-solutions.com/worldlineinterfaceexperia/WorldlineInterfaceExperia.svc/BILINTRequest',
            'headers': {
                'SealValue': seal,
                "SUPPLIERID": "123999",
                'Content-Type': 'application/json',
                "disabled": true
            },
            body: JSON.stringify(enc)

        };
        request(customer_config, function (error, response) {
            if (error) throw new Error(error);
            console.log("================================== Response ================================== ")
            console.log(response.body);
            let billingResponse = billingDecrypt(response.body);
            return res.json({
                data: billingResponse
            })
        });

    }
    catch (error) {
        console.log(error);
    }

}


function billingDecrypt(key) {
   
    console.log("----------------", key);

    const ENCRYPTION_KEY = '5PP3LIZ8CB210322114958LBV9QBGE1F';
    let iv = '1234567887654321';
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    var receivedPlaintext = decipher.update(key, 'base64', null, 'utf8');
    console.log("receivedPlaintext", receivedPlaintext);

    try {
        receivedPlaintext += decipher.final();
        let decrypt_response = JSON.parse(receivedPlaintext)
        return decrypt_response;
    } catch (err) {
        console.log(err);
        //    console.error('Authentication failed!', err);
        return 'Authentication failed!';
    }

}

//billingOtp();

 module.exports.billingOtp = billingOtp;