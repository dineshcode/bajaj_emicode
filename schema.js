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
        let data={"dealerId":"0011t00001HGP3JAAX",
        "modelId":"a0d1t000006ObwUAAS",
        "loanAmt":"140000",
        "invoiceAmt":"140000",
        "schemeType":null,
        "dealerCode":"",
        "model":"",
        "cdLtv":"100",
        "digitalLtv":"100",
        "lsfLtv":"100",
        "mshLtv":"100",
        "lcfLtv":"100",
        "channel":"Website"
        }

        let schemafetchres={
            "data": {
                "records": [
                    {
                        "schemeId": "a0i1t000003SQHeAAO",
                        "tenor": 7,
                        "advEmi": 0,
                        "schemeType": "5014942",
                        "downPayment": 6399,
                        "processingFee": 0,
                        "charges": "MBD:0.00; DBD:8.25;MRATE :0 ;DRATE:4868",
                        "advEmiAmt": 0,
                        "marginMoney": 0,
                        "manufactureId": "1988",
                        "productCode": "SCE",
                        "totalScore": 30033900,
                        "rateOfInterest": 0,
                        "Scheme_Category": "Dealer Tie Up",
                        "Minimum_Loan_Amount": 7000,
                        "Minimum_EMI_Amount": 830,
                        "Minimum_Amount_Financed": 12000,
                        "MaxTenInMonths": 99,
                        "MinTenInMonths": 0,
                        "Special_Scheme__c": "EMI Holiday (1),",
                        "LTV_PERCENTAGE__C": 100
                    },
                    {
                        "schemeId": "a0i1t000002tdhkAAA",
                        "tenor": 7,
                        "advEmi": 0,
                        "schemeType": "5014587",
                        "downPayment": 9069,
                        "emiAmount": 7143,
                        "processingFee": 0,
                        "charges": "MBD:0.00; DBD:8.25;MRATE :0 ;DRATE:4868",
                        "advEmiAmt": 0,
                        "marginMoney": 0,
                        "manufactureId": "1988",
                        "productCode": "SCE",
                        "totalScore": 30023900,
                        "rateOfInterest": 0,
                        "Scheme_Category": "Dealer Tie Up",
                        "Minimum_Loan_Amount": 7000,
                        "Minimum_EMI_Amount": 830,
                        "Minimum_Amount_Financed": 12000,
                        "MaxTenInMonths": 99,
                        "MinTenInMonths": 0,
                        "Special_Scheme__c": "NA",
                        "LTV_PERCENTAGE__C": 100
                    }
                ]
            }
        }


        return res.json({
            schemaresponse:schemafetchres.data.records
        })
      

       

    }
    catch (error) {
        return res.josn({
            message: error
        })
    }

}

module.exports.schemafetchApi = schemafetchApi;