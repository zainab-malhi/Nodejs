const mongoose = require("mongoose");
const express = require("express");
const { type } = require("mocha/lib/utils");

const app = express();
app.use(express.json());

//app.use(middleman);

//conneting to the database
mongoose
  .connect("mongodb://localhost:27017/mongotuts")
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

//coding realted to products
//Product Schema
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Mandatory"],
    },
    price: {
      type: Number,
      required: [true, "Price is Mandatory"],
      min: 1,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Mandatory"],
    },
    category: {
      type: String,
      enum: ["Clothing", "Electronics", "Household"],
    },
  },
  { timestamps: true }
);

// Product Model
const productModel = mongoose.model("products", productSchema);

// endpoint to create a product
app.post("/products", (req, res) => {
  let product = req.body;
  productModel
    .create(product)
    .then((document) => {
      res.send({ data: document, message: "Product Created" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some problem" });
    });
});

//end point to find products
app.get("/products", (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem" });
    });
});

// endpoint to find one products
app.get("/products/:id", (req, res) => {
  productModel
    .findOne({ _id: req.params.id })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem" });
    });
});

//end point to delete object
app.delete("/products/:id", (req, res) => {
  productModel
    .deleteOne({ _id: req.params.id })
    .then((info) => {
      res.send({ message: "Product Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem" });
    });
});

//update product
app.put("/products/:id", (req, res) => {
  let product = req.body;
  productModel
    .updateOne({ _id: req.params.id }, product)
    .then((info) => {
      res.send({ message: "Product Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem" });
    });
});

// middleware logic

// app.get("/testing/:id", middleman, (req, res) => {
//   res.send({ message: "Testing request" });
// });

// function middleman(req, res, next) {
//   if (req.params.id < 10) {
//     res.send({ message: "You are bloacked" });
//   } else {
//     next();
//   }
// }

app.listen(8000, () => {
  console.log("Server up and running");
});
