var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync("template.html", "utf8");
//13 128 Green
async function pdfdownload(){

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

var users = [
    {
     "image":"https://s3.ap-south-1.amazonaws.com/happimobiles/studentinfo/IMG-20220825-WA0013.jpg"
    },
    {
        "image":"https://s3.ap-south-1.amazonaws.com/happimobiles/studentinfo/IMG-20220825-WA0013.jpg"
    },
    {
        "image":"https://s3.ap-south-1.amazonaws.com/happimobiles/studentinfo/IMG-20220825-WA0013.jpg"
    },
  ];
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "./output.pdf",
    type: "",
  };

  pdf
  .create(document, options)
  .then((res) => {
    console.log(res.filename);
  })
  .catch((error) => {
    console.error(error);
  });
}

pdfdownload();