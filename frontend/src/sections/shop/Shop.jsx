import React, { useState } from "react";
import Slider from "react-slick";
import ShopCart from "../../components/shop-chart/ShopCart.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Shop.css"; // Import CSS
import premiumGel from "../../assets/premium-hair-styling-gel.jpg";
import beardKit from "../../assets/beard-grooming-kit.jpg";
import shavingCream from "../../assets/luxury-shaving-cream.jpg";
import clippers from "../../assets/hair-clippers-trimmers.jpg";
import cologne from "../../assets/mens-cologne-selection.jpg";
import beardoil from "../../assets/organic-beard-oils.jpg";

const Shop = () => {
  const [cart, setCart] = useState([]);

  const products = [
    {
      name: "Premium Hair Styling Gel",
      image: premiumGel,
      description: "Strong hold styling gel for a sleek look.",
      price: "€15",
    },
    {
      name: "Beard Grooming Kit",
      image: beardKit,
      description: "Complete set for beard maintenance and care.",
      price: "€25",
    },
    {
      name: "Luxury Shaving Cream",
      image: shavingCream,
      description: "Smooth shaving experience with hydration.",
      price: "€12",
    },
    {
      name: "Hair Clippers and Trimmers",
      image: clippers,
      description: "Professional quality clippers for precise cuts.",
      price: "€50",
    },
    {
      name: "Men's Cologne Selection",
      image: cologne,
      description: "Handpicked premium cologne for every occasion.",
      price: "€35",
    },
    {
      name: "Organic Beard Oils",
      image: beardoil,
      description: "Natural beard oil for soft and healthy hair.",
      price: "€18",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  // Slider settings for infinite loop
  const sliderSettings = {
    //dots: true, // Show navigation dots
    infinite: true, // Loop continuously
    speed: 800, // Transition speed
    slidesToShow: 3, // Show 3 items at a time
    slidesToScroll: 1, // Scroll one by one for a smooth loop
    autoplay: true, // Auto-slide
    autoplaySpeed: 2000, // Slide every 2 seconds
    pauseOnHover: true, // Pause when hovered
    //arrows: true, // Show prev/next arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="shop-section">
      <h2>Our Shop</h2>
      <p>Explore our high-quality grooming products.</p>

      <div className="shop-slider-container">
        <Slider {...sliderSettings}>
          {products.map((product, index) => (
            <div key={index} className="shop-card">
              <img
                src={product.image}
                alt={product.name}
                className="shop-image"
              />
              <div className="shop-info">
                <h3 className="shop-title">{product.name}</h3>
                <p className="shop-description">{product.description}</p>
                <p className="shop-price">{product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Pass setCart to ShopCart so items can be removed */}
      <ShopCart cart={cart} setCart={setCart} />
    </section>
  );
};

export default Shop;
