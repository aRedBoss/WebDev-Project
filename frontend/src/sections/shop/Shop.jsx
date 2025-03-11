import { useState, useEffect } from "react";
import Slider from "react-slick";
import ShopCart from "../../components/shop-chart/ShopCart.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path
import { useNavigate } from "react-router-dom";
import "./Shop.css"; // Import CSS

const Shop = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const token = user?.accessToken; // Get the token from AuthContext

      if (!token) {
        console.log("No token found, redirecting to signin...");
        navigate("/signin"); // Redirect to login page if no token
        return;
      }

      // const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      console.log("Authorization Header:", `Bearer ${token}`);
      if (token) {
        const response = await fetch("/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: [{ productId: product._id, quantity: 1 }],
          }), // Send an array of items
        });

        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }
        const data = await response.json();
        setCart([...cart, { ...product, quantity: 1, _id: data._id }]);
      } else {
        console.log("Cart after adding:", cart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
    arrows: true, // Show prev/next arrows
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
      <p className="margin-tb">Explore our high-quality grooming products.</p>

      <div className="shop-slider-container">
        <Slider {...sliderSettings}>
          {products.map((product, index) => (
            <div key={index} className="shop-card">
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.name}
                className="shop-image"
              />
              <div className="shop-info">
                <h3 className="shop-title">{product.name}</h3>
                <p className="shop-description">{product.description}</p>
                <p className="shop-price">€{product.price}</p>
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
