import useCart from "../../hooks/useCart";
import { useParams } from "react-router-dom";

export default function CartLists() {
  const { id } = useParams();
  const { cartItems, loading, error } = useCart("/api/cart");

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <ul>
        {cartItems.map((item) => (
          <li key={`item.${id}`}>
            <h3>{item.productId.name}</h3>
            <p>{item.productId.description}</p>
            <p>Price: ${item.productId.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
