import { useState, useEffect } from "react";

export default function useCart(url) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch cart items");

        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [url]);

  return { cartItems, loading, error };
}
