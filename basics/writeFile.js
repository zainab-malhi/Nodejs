const fs = require("fs"); // importing the module name fs

// sync way of writing in a file
//*****************************/
//fs.writeFileSync("./products.txt", "Apple");

//async way of writing file
// write file will overwrite existing data
//*************************************8 */
//fs.writeFile("./products.txt", "Mango", (err) => {
//  console.log(err);
//});

// to append data
// \n makes the text go in next line
// \t for tab space
// simple space for normal space
fs.appendFile("./products.txt", "\nApple", (err) => {
  console.log(err);
});
