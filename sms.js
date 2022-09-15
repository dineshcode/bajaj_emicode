let axios = require('axios');
var otplib = require('otplib');

let PhoneNumber=require('./smsvalidation.js');

var OTP_SECRET = process.env.OTP_SECRET || 'ETTRTFGFCFSCGJLKLLUIOYUITTFFGCFZXEAWRRTTIUIGHFERHAPPI2022IIPL';

async function SendOtp(phone) {

    try{

    var pn= await PhoneNumber.phoneValidation(phone);
    if(pn){

    const secret = OTP_SECRET + phone;
    const token = otplib.authenticator.generate(secret);
    var options = {
        'method': 'GET',
        'url': `https://2factor.in/API/V1/e27f1a8a-e428-11e9-9721-0200cd936042/SMS/${phone}/${token}/Happi`,
    };

    let response= await axios(options);
    var result = response.data;
    console.log(result);
    if (result.Status == "Success") {

        return 'Otp send'
       

    }
    else{
       return 'Unable to send otp'
    }
}
else{
    return 'Invalid phone number'
}
}
catch(error){
    console.log(error);
    res.json({
        status:false,
        message:"please try again"
    })
}


}

SendOtp('8106838432');
// module.exports.SendOtp = SendOtp;