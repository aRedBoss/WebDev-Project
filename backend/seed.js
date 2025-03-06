const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/musa-barber-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const premiumGel = require("../frontend/src/assets/premium-hair-styling-gel.jpg");
// const beardKit = require("../frontend/src/assets/beard-grooming-kit.jpg");
// const shavingCream = require("../frontend/src/assets/luxury-shaving-cream.jpg");
// const clippers = require("../frontend/src/assets/hair-clippers-trimmers.jpg");
// const cologne = require("../frontend/src/assets/mens-cologne-selection.jpg");
// const beardoil = require("../frontend/src/assets/organic-beard-oils.jpg");

const products = [
  {
    name: "Premium Hair Styling Gel",
    image: "/uploads/premium-hair-styling-gel.jpg", // Relative path to the image
    description: "Strong hold styling gel for a sleek look.",
    price: 15,
  },
  {
    name: "Beard Grooming Kit",
    image: "/uploads/beard-grooming-kit.jpg",
    description: "Complete set for beard maintenance and care.",
    price: 25,
  },
  {
    name: "Luxury Shaving Cream",
    image: "/uploads/luxury-shaving-cream.jpg",
    description: "Smooth shaving experience with hydration.",
    price: 12,
  },
  {
    name: "Hair Clippers and Trimmers",
    image: "/uploads/hair-clippers-trimmers.jpg",
    description: "Professional quality clippers for precise cuts.",
    price: 50,
  },
  {
    name: "Men's Cologne Selection",
    image: "/uploads/mens-cologne-selection.jpg",
    description: "Handpicked premium cologne for every occasion.",
    price: 35,
  },
  {
    name: "Organic Beard Oils",
    image: "/uploads/organic-beard-oils.jpg",
    description: "Natural beard oil for soft and healthy hair.",
    price: 18,
  },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database Seeded!");
  mongoose.connection.close();
};

seedDB();
