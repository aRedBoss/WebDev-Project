import { useState, useEffect } from "react";

export default function useCart(url) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return; // Stop execution if token is missing
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json(); // Get error details
          throw new Error(errorData.error || "Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(data.items); // Assuming data is { items: [...] }
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
