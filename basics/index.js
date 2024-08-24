//no need of any html file
//start writing your js code
// if you are writing js code outside browser, you can not do dom manipultion
// only if you have html file and running inside browser you can do do manipulation
// dom manipulation not allowed outside javascript
// dom is tree created inside the browser
// run it using node index.js
// node index
//ctrl + j to open and close terminal

let data = [23, 45, 56, 78];

data.forEach((n) => {
  console.log(n);
});
console.log("I am outside");
console.log(data[2]);

let student = {
  name: "saurabh",
  age: 22,
};

console.log(student);

// You are installing runtime
// npm
// paths
// docs
// core package

// What is a package?
// In coding when wer write code, we write functions.
// function a piece of code
// when I create multiple related functionality in a file
// it is called as module.
// MODULE module is nothing but a file
// when you collect muliple modules it is called PACKAGE or library.
// while installing node js alot of packages were installed

// The first module we will learn is FS module
// it is module to read and write files.
