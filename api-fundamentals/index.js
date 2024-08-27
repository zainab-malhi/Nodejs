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
    //res.setHeader("Acess-Control-Allow-Origin","*")
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
      // this event is called at every chunk
      req.on("data", (chunk) => {
        product = product + chunk;
      });

      // this event is called at the ned of streams and convert bytes to readeable string
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

    // delete based on id
    else if (parsedUrl.pathname == "/products" && req.method == "DELETE") {
      let productArray = JSON.parse(products);

      let index = productArray.findIndex((product) => {
        return product.id == parsedUrl.query.id;
      });

      productArray.splice(index, 1);

      fs.writeFile("./products.json", JSON.stringify(productArray), (err) => {
        if (err == null) {
          res.end(JSON.stringify({ message: "Product deleted suceessfully" }));
        } else {
          res.end(JSON.stringify({ message: "Some Problem" }));
        }
      });
    }

    //endpoint to update
    else if (parsedUrl.pathname == "/products" && req.method == "PUT") {
      let id = parsedUrl.query.id;
      let product = "";

      // this event is called at every chunk
      req.on("data", (chunk) => {
        product = product + chunk;
      });

      // this event is called at the end of streams and convert bytes to readeable string
      req.on("end", () => {
        let productArray = JSON.parse(products);
        let productOBJ = JSON.parse(product);

        let index = productArray.findIndex((product) => {
          return product.id == id;
        });

        if (index != -1) {
          productArray[index] = productOBJ;
          fs.writeFile(
            "./products.json",
            JSON.stringify(productArray),
            (err) => {
              if (err == null) {
                res.end(
                  JSON.stringify({ message: "Element sucessfully updated" })
                );
              } else {
                res.end(JSON.stringify({ message: "Some problem" }));
              }
            }
          );
        } else {
          res.end(JSON.stringify({ message: "Element not found" }));
        }
      });
    }
  })
  .listen(8000);
