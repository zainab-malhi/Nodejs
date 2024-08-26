const http = require("http");
const fs = require("fs");
const url = require("url");
const { createInvalidArgumentValueError } = require("mocha/lib/errors");
//create a server
// 127.0.0.1:8000
// local host

http
  .createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);

    let products = fs.readFileSync("./products.json", "utf-8");

    // fetching all products data
    if (
      parsedUrl.pathname == "/products" &&
      parsedUrl.query.id == undefined &&
      req.method == "GET"
    ) {
      res.end(products);
    }

    //fetching data of a particular id
    else if (
      parsedUrl.pathname == "/products" &&
      parsedUrl.query.id != undefined &&
      req.method == "GET"
    ) {
      let productArray = JSON.parse(products);
      let product = productArray.find((product) => {
        return product.id == parsedUrl.query.id;
      });

      if (product != undefined) {
        res.end(JSON.stringify(product));
      } else {
        res.end(JSON.stringify({ message: "Product not found" }));
      }
    }
    // create new product
    else if (parsedUrl.pathname == "/products" && req.method == "POST") {
      let product = "";
      req.on("data", (chunk) => {
        product = product + chunk;
      });
      req.on("end", () => {
        let productArray = JSON.parse(products);
        let newProduct = JSON.parse(product);

        productArray.push(newProduct);

        fs.writeFile("./products.json", JSON.stringify(productArray), (err) => {
          if (err == null) {
            res.end(JSON.stringify({ message: "New Product Created" }));
          } else {
            console.log(err);
            res.end(JSON.stringify({ message: "Some Problem" }));
          }
        });
      });
    }
  })
  .listen(8000);
