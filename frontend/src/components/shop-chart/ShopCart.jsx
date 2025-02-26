import "./ShopCart.css"; // Import CSS

const ShopCart = ({ cart, setCart }) => {
  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Function to handle booking
  const bookItem = (item) => {
    alert(`You have booked: ${item.name}`);
  };

  // Function to update quantity
  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.price.replace("€", "")) * item.quantity), 0);

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
                  <td>{item.name}<br/><small>{item.description}</small></td>
                  <td><img src={item.image} alt={item.name} className="cart-image" /></td>
                  <td>
                    <button className="quantity-btn" onClick={() => updateQuantity(index, -1)}>-</button>
                    <input type="text" value={item.quantity} readOnly className="quantity-input" />
                    <button className="quantity-btn" onClick={() => updateQuantity(index, 1)}>+</button>
                  </td>
                  <td>€{(parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="book-btn" onClick={() => bookItem(item)}>Book Item</button>
                    <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="total-price">Total: €{totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </section>
  );
};

export default ShopCart;
