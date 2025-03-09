const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const Order = require("./models/orderModelOld");

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/musa-barber-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fake Product Data (Using the same as your seedDB)
const products = [
  {
    name: "Premium Hair Styling Gel",
    image: "/uploads/premium-hair-styling-gel.jpg",
    description: "Strong hold styling gel for a sleek look.",
    price: 15,
    quantity: 10,
  },
  {
    name: "Beard Grooming Kit",
    image: "/uploads/beard-grooming-kit.jpg",
    description: "Complete set for beard maintenance and care.",
    price: 25,
    quantity: 5,
  },
  {
    name: "Luxury Shaving Cream",
    image: "/uploads/luxury-shaving-cream.jpg",
    description: "Smooth shaving experience with hydration.",
    price: 12,
    quantity: 7,
  },
  {
    name: "Hair Clippers and Trimmers",
    image: "/uploads/hair-clippers-trimmers.jpg",
    description: "Professional quality clippers for precise cuts.",
    price: 50,
    quantity: 3,
  },
  {
    name: "Men's Cologne Selection",
    image: "/uploads/mens-cologne-selection.jpg",
    description: "Handpicked premium cologne for every occasion.",
    price: 35,
    quantity: 8,
  },
  {
    name: "Organic Beard Oils",
    image: "/uploads/organic-beard-oils.jpg",
    description: "Natural beard oil for soft and healthy hair.",
    price: 18,
    quantity: 6,
  },
];

// Fake Order Data
const fakeOrders = async () => {
  await Order.deleteMany({});
  const createdProducts = await Product.find({}); // Get the products from the database

  const orders = [
    {
      userId: new mongoose.Types.ObjectId(), // Replace with a valid user ID if you have users
      items: [
        {
          productId: createdProducts[0]._id,
          quantity: 2,
          price: createdProducts[0].price,
        },
        {
          productId: createdProducts[2]._id,
          quantity: 1,
          price: createdProducts[2].price,
        },
      ],
      totalPrice: 42, // Calculate totalPrice
      status: "pending",
    },
    {
      userId: new mongoose.Types.ObjectId(),
      items: [
        {
          productId: createdProducts[3]._id,
          quantity: 1,
          price: createdProducts[3].price,
        },
        {
          productId: createdProducts[5]._id,
          quantity: 3,
          price: createdProducts[5].price,
        },
      ],
      totalPrice: 104,
      status: "processing",
    },
    {
      userId: new mongoose.Types.ObjectId(),
      items: [
        {
          productId: createdProducts[1]._id,
          quantity: 1,
          price: createdProducts[1].price,
        },
        {
          productId: createdProducts[4]._id,
          quantity: 2,
          price: createdProducts[4].price,
        },
      ],
      totalPrice: 95,
      status: "completed",
    },
  ];

  await Order.insertMany(orders);
  console.log("Fake Order Data Seeded!");
  mongoose.connection.close();
};

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database Seeded!");
  await fakeOrders(); // seed the orders after products are created.
};

seedDB();
