const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {});

// Product Data for seeding
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

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database Seeded!");
};

seedDB();
