// frontend/src/hooks/useCart.jsx
import { useState, useEffect } from "react";

const useCart = (url, token) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!url) return;

      setLoading(true);
      setError(null);

      try {
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
        };

        const response = await fetch(url, {
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCartItems(data.items); // Extract the items array from the response
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [url, token]);

  return { cartItems, loading, error };
};

export default useCart;
