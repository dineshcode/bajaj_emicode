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


async function RequeryApi(req,res) {
   let plaintext=req.body;

   
    const crypto = require('crypto');
    const ENCRYPTION_KEY = 'sOnfGB3atf4UYZggYGQQjzCrZ9XeUgNn'; 
    const IV_LENGTH = 16; 
    let iv = '1234567887654321';
    iv = new Buffer(iv, "binary");
    console.log("IV", iv.toString('hex'), iv);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(JSON.stringify(plaintext));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    var enc = encrypted.toString('base64');
    var seal = md5(enc + ENCRYPTION_KEY);
    

    var options = {
        'method': 'POST',
        'url': 'https://bfl2.in.worldline.com/WorldlineInterfaceEnqRequery/WorldlineInterfaceEnhanceRequery.svc/ENQRequest',
        'headers': {
            'SealValue': seal,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enc)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        
        var data = response.body.split("|");
        console.log("keyyyyyyyyyyyyyy", data[0]);
       
        var requeryOutput =  decrypt(data[0]);
        return res.json({
            data:requeryOutput
        })
        

    });
}

 function decrypt(key) {
    const ENCRYPTION_KEY = 'sOnfGB3atf4UYZggYGQQjzCrZ9XeUgNn';
    let iv = '1234567887654321';
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    var receivedPlaintext = decipher.update(
        JSON.stringify(key),
        'base64', null, 'utf8');
    
    try {
        receivedPlaintext += decipher.final();
        let requeryResponse=JSON.parse(receivedPlaintext);
        return requeryResponse;
    } catch (err) {
        console.error('Authentication failed!', err);
       return res.json({
           message:'Authentication failed!'
       })
    }

   
}

module.exports.RequeryApi= RequeryApi;