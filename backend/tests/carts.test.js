// backend/tests/cartModel.test.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Cart = require("../models/cartModel");

describe("Cart Test", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Cart.deleteMany({});
  });

  it("should create a new cart", async () => {
    const cartData = {
      items: [
        {
          productId: new mongoose.Types.ObjectId(),
          quantity: 2,
        },
      ],
      totalPrice: 100,
    };

    const cart = new Cart(cartData);
    const savedCart = await cart.save();

    expect(savedCart._id).toBeDefined();
    expect(savedCart.items.length).toBe(1);
    expect(savedCart.totalPrice).toBe(100);
  });

  it("should retrieve a cart", async () => {
    const cartData = {
      items: [
        {
          productId: new mongoose.Types.ObjectId(),
          quantity: 3,
        },
      ],
      totalPrice: 150,
    };

    const cart = new Cart(cartData);
    const savedCart = await cart.save();

    const retrievedCart = await Cart.findById(savedCart._id);

    expect(retrievedCart).toBeDefined();
    expect(retrievedCart.items.length).toBe(1);
    expect(retrievedCart.totalPrice).toBe(150);
  });

  it("should update a cart", async () => {
    const cartData = {
      items: [
        {
          productId: new mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      totalPrice: 50,
    };

    const cart = new Cart(cartData);
    const savedCart = await cart.save();

    savedCart.totalPrice = 200;
    const updatedCart = await savedCart.save();

    expect(updatedCart.totalPrice).toBe(200);
  });

  it("should delete a cart", async () => {
    const cartData = {
      items: [
        {
          productId: new mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      totalPrice: 50,
    };

    const cart = new Cart(cartData);
    const savedCart = await cart.save();

    await Cart.findByIdAndDelete(savedCart._id);
    const deletedCart = await Cart.findById(savedCart._id);

    expect(deletedCart).toBeNull();
  });
});
