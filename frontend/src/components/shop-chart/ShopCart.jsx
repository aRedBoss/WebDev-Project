import { useState, useEffect } from "react";
import "./ShopCart.css"; // Import CSS

const ShopCart = () => {
  const [cart, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCartItems(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cart.filter((item) => item.product._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  // // Function to handle booking
  // const bookItem = (item) => {
  //   alert(`You have booked: ${item.name}`);
  // };

  // Function to update quantity
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      setCartItems(
        cart.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const clearCart = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch("/api/cart/clear", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems([]);
        setOrderConfirmed(true);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0,
  );

  return (
    <section className="shop-cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Products</th>
                <th>Thumbnails</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.name}
                    <br />
                    <small>{item.description}</small>
                  </td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />
                  </td>
                  <td>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td className="align-items-center">
                    {/*<button className="book-btn" onClick={() => bookItem(item)}>*/}
                    {/*  Book Item*/}
                    {/*</button>*/}
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="total-price">Total: €{totalPrice.toFixed(2)}</h3>
          <button className="book-btn" onClick={clearCart}>
            Confirm Booking Order
          </button>
        </div>
      )}
    </section>
  );
};

export default ShopCart;
