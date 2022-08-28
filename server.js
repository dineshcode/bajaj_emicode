let express=require('express');
var cors = require("cors");
const app = express();
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let port=3000;

let customersearch= require('./customersearch');
let schema=require('./schemafetch.js');
let billing=require('./billingotp.js');
let auth=require('./auth.js');
let requery=require('./requery.js');

let zip=require('./test.js');

app.post('/api/customertsearch',customersearch.customerSearchApi);
app.post('/api/schemafetch',schema.schemafetchApi);
app.post('/api/billingotp',billing.billingOtp);
app.post('/api/auth',auth.authApi);
app.post('/api/requeryapi',requery.RequeryApi);
app.get('/api/zip',zip.zipfile);





app.listen(port,function(error){
    console.log(`server is running on port${port}`);
})
