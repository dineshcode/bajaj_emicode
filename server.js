let express=require('express');
var cors = require("cors");
const app = express();
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let port='3000';

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



let customersearch= require('./customersearch');
let schemafetch=require('./schemafetch.js');
let billingotp=require('./billingotp');
let authapi=require('./auth.js');
let requeryapi=require('./requery.js');


let schema=require('./schema');


app.get('/api/customersearch',customersearch.customerSearchApi);
app.get('/api/schema',schema.schemafetchApi);
//app.post('/api/schemafetch',schemafetch.schemafetchApi);
//app.post('/api/billingotp',billingotp.billingOtp);
//app.post('/api/authapi',authapi.authApi);
//app.post('/api/requery',requeryapi.RequeryApi);

app.post('/api/testing',(req,res)=>{
    
    res.json({
        data:'success'
    })
})


app.post('/api/customer',async (req,res)=>{
    let response= {
        "CUST_RESI_CITY_NAME": "PUNA",
        "DIGITAL_PROMO": "100",
        "CD_PROMO": "100",
        "INTERCITY_DELIVERY_FLAG": "N",
        "RESPONSE_DESCRIPTION": "SUCCESS",
        "RESPONSE_CODE": "00",
        "RESPONSE_DATE_TIME": "20220912173440",
        "REQUEST_ID": "CUST12092022173431",
        "CUSTOMER_PINCODE": "411040",
        "TXNTYPE": "BILSRCH"
    }

    return res.json({
        response:response
    })
})


app.post('/api/schema',async (req,res)=>{
    let datares={
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
        response:datares.data.records
    })
})


app.post('/api/billingotp',async (req,res)=>{

   let  Response= {
        RESPONSE_DESCRIPTION: 'Success',
        RESPONSE_CODE: '00',
        RESPONSE_DATE_TIME: '20220830124552',
        REQUEST_ID: 'OTP30082022124622',
        TXNTYPE: 'OTPREQ'
      }

      return res.json({
          response:Response
      })

})




app.listen(port,function(error){
    console.log(`server is running on port${port}`);
})
