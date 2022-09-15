const imageToBase64 = require('image-to-base64');
//or
//import imageToBase64 from 'image-to-base64/browser';

imageToBase64("https://happimobiles.s3.ap-south-1.amazonaws.com/happi/B20200205T000001088.jpg") // Path to the image
    .then(
        (response) => {
            console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )