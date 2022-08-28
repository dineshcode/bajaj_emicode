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

async function  authApi(req,res){
    try{
        let plaintext=req.body;
        const ENCRYPTION_KEY = '1OY67PYHXN210322121936X6KCG559YT';
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
                "SUPPLIERID": "123888",
                'Content-Type': 'application/json',
                "disabled": true
            },
            body: JSON.stringify(enc)

        };
        request(customer_config, function (error, response) {
            if (error) throw new Error(error);
            console.log("================================== Response ================================== ")
            console.log(response.body);
          let customerResponse=    decrypt(response.body);
          return res.json({
              data:customerResponse
          })
        });

    }
    catch(error){
        return res.json({
            message:error
        })
    }
    
}

 function decrypt(key){

    const ENCRYPTION_KEY = '1OY67PYHXN210322121936X6KCG559YT';
    let iv = '1234567887654321';
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    var receivedPlaintext =decipher.update(key, 'base64', null, 'utf8');
    
      try {
           receivedPlaintext += decipher.final();
           let decrypt_response=JSON.parse(receivedPlaintext)
           return decrypt_response;
       } catch (err) {
        //    console.error('Authentication failed!', err);
           return 'Authentication failed!' ;
       }
 
}

module.exports.authApi = authApi;