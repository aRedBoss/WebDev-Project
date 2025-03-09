import useCart from "../../hooks/useCart";

export default function CartLists() {
  const { cartItems, loading, error } = useCart("/api/cart/all");

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId._id}>
            <h3>{item.productId.name}</h3>
            <p>{item.productId.description}</p>
            <p>Price: ${item.productId.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
        <h3>User: {cartItems.userId.email}</h3>
        <h3>User: {cartItems.userId.phoneNumber}</h3>
      </ul>
    </div>
  );
}
