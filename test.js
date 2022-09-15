// var axios = require('axios');
// var qs = require('qs');
// var data = qs.stringify({
//   'grant_type': 'client_credentials',
//   'client_id': '3a02ba11-1585-4737-8577-2c9fe194f219',
//   'client_secret': 'kiR7Q~9KVucp_.ff6NCMHUpNjWiUat0pIP~sG',
//   'resource': 'https://management.azure.com' 
// });
// var config = {
//   method: 'post',
//   url: 'https://login.microsoftonline.com/bajajfinance.in/oauth2/token',
//   headers: { 
//     'Cookie': 'fpc=AhpM-DymtyZDtA6AsEx_xXmNYUY5AQAAAGukn9oOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd; fpc=AhpM-DymtyZDtA6AsEx_xXmgHnfcAQAAAPzdpNoOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd', 
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });


var axios = require('axios');
var data = JSON.stringify({
  "name": "dinesh"
});

var config = {
  method: 'post',
  url: 'https://aeab-183-82-111-252.in.ngrok.io/api/testing',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log("-------------",JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
