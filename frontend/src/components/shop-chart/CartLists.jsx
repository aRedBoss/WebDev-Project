import "./CartLists.css";

const CartLists = ({ cartItems, loading, error, userData }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <p>No items in cart.</p>;
  }

  return (
    <div className="cart-table">
      {userData && (
        <div className="user-info">
          <p>Email: {userData.email}</p>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.productId.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartLists;
