/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
// import inquirer from "inquirer"
// import qr from "qr-image"

// inquirer
//   .prompt([
//     /* Pass your questions in here */
//      {  message: "Type in your URL: ",
//         name: "URL",
//      }  // curly braces cuz its an object.
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//     const url = answer.URL;
//     var qr_svg = qr.image(url);
//     qr_svg.pipe(require('fs').createWriteStream('qr_img.png'));
//     console.log(answers);
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });
import inquirer from "inquirer";
import QRCode from "qrcode";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Create QR Code and save as image
    QRCode.toFile("qr_img.png", url, (err) => {
      if (err) throw err;
      console.log("QR code saved!");

      // Save URL to text file
      fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The URL has been saved!");
      });
    });
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });
