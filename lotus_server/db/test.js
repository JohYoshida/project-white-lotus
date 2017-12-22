console.log ("starting");
var Jimp = require("jimp");

// open a file called "lenna.png"

Jimp.read("./test.jpg").then(function (lenna) {
    console.log("read complete");
    lenna.resize(256, 256)            // resize
         .quality(60)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .write("lena-small-bw.jpg"); // save
}).catch(function (err) {
    console.error(err);
    console.log(err);
});