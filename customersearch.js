var axios = require('axios');
var md5 = require("md5");
const crypto = require('crypto');
const request = require('request');
const express = require('express');
var cors = require("cors");
const res = require('express/lib/response');
//let requestdate=require('./requestdate.js');
const app = express();
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let requestdate=require('./requestdate.js');

async function customerSearchApi(req,res) {
   
    try {
        let request_date= await requestdate.generatedate();
        //console.log("req.body----",req.body);
        let plaintext={}

        plaintext.TXNTYPE= "BILSRCH",
        plaintext.Request_ID="CUST"+request_date,
        plaintext.Dealer_Code="123888",
        plaintext.Request_Date_Time=request_date,
        plaintext.Dealer_Validation_Key="4462137033265896",
        plaintext.Card_number="2030400222777222"
       
        plaintext.ACQCHANNEL=22
        

        console.log("plaintext----",plaintext);

        const ENCRYPTION_KEY = '1OY67PYHXN210322121936X6KCG559YT';
        const IV_LENGTH = 16;
        let iv = '1234567887654321';
        iv = new Buffer(iv, "binary");
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(JSON.stringify(plaintext));
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        var enc = encrypted.toString('base64');
        var seal = md5(enc + ENCRYPTION_KEY);
        console.log("seal",seal);
        console.log("encrypted",enc);
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

        let responsedata={
                 
            "CUST_RESI_CITY_NAME": "",
            "DIGITAL_PROMO": "",
            "CD_PROMO": "",
            "INTERCITY_DELIVERY_FLAG": "N",
            "RESPONSE_DESCRIPTION": "SUCCESS",
            "RESPONSE_CODE": "00",
            "RESPONSE_DATE_TIME": "20220912173440",
            "REQUEST_ID": "CUST12092022173431",
            "CUSTOMER_PINCODE": "411040",
            "TXNTYPE": "BILSRCH"
        
    }
    return res.json({
        data:responsedata
    })

        request(customer_config, function (error, response) {
            if (error) throw new Error(error);
            console.log("================================== Response ================================== ");
           
            console.log(response.body);
          let customerResponse=     decrypt(response.body);
          console.log( customerResponse);
          return res.json({
              data:customerResponse
          })
        });
     }
    catch (error) {
       console.log(error);
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

//customerSearchApi();

module.exports.customerSearchApi = customerSearchApi;