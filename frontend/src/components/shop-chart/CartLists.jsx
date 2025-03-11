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
    <div>
      {userData && (
        <div>
          <p>Email: {userData?.email}</p>
        </div>
      )}
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            Product Name: {item.productId.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartLists;
