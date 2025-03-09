// productController.test.js
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const productController = require("../controllers/productController");
const Product = require("../models/productModel");

const app = express();
app.use(express.json());

// Mock routes
app.get("/products", productController.getProducts);
app.get("/products/:id", productController.getProductById);
app.post("/products", productController.createProduct);
app.put("/products/:id", productController.updateProduct);
app.delete("/products/:id", productController.deleteProduct);

describe("Product Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_URI_TEST ||
        "mongodb://127.0.0.1:27017/musa-barber-shop-test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it("should get all products", async () => {
    await Product.create({ name: "Test Product 1", price: 10 });
    await Product.create({ name: "Test Product 2", price: 20 });

    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should get a product by id", async () => {
    const product = await Product.create({ name: "Test Product", price: 10 });
    const response = await request(app).get(`/products/${product._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Test Product");
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "New Product", price: 30 });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("New Product");
  });

  it("should update a product", async () => {
    const product = await Product.create({ name: "Old Product", price: 40 });
    const response = await request(app)
      .put(`/products/${product._id}`)
      .send({ name: "Updated Product", price: 50 });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated Product");
  });

  it("should delete a product", async () => {
    const product = await Product.create({ name: "Delete Product", price: 60 });
    const response = await request(app).delete(`/products/${product._id}`);
    expect(response.statusCode).toBe(200);
    const foundProduct = await Product.findById(product._id);
    expect(foundProduct).toBeNull();
  });
});
