const fs = require("fs"); // importing the module name fs

//  ./ means the same folder
// utf-8 is an encoding system to convert bytes to human readable lanaguage

let data = fs.readFileSync("./abc.txt", "utf-8"); // for large file it will take time
// read file is sync it will block
// so we have async way to read file
console.log(data);

//Async way to read file
// two ways to handle async it call back and promises
// but if there are to many call back it gives callback hell so we use promises

// using call back function
fs.readFile("./abc.txt", "utf-8", (err, data) => {
  console.log(err);
  console.log(data);
});
// In js synchronous code execute first and then asynchronous code
console.log("some random code");
