# Self-Assessment about frontend

### Example 1: Improving Code Quality

 

```javascript

// Original Code
const removeFromCart = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setCart(updatedCart);
};

const updateQuantity = (index, change) => {
  const updatedCart = [...cart];
  updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
  setCart(updatedCart);
};

 
```

 

   

To address these issues, we refactored the code to handle edge cases effectively:  

```javascript

// Improved Code
const removeFromCart = useCallback(
  (id) => setCart((prevCart) => prevCart.filter((item) => item.id !== id)),
  [setCart]
);

const updateQuantity = useCallback(
  (id, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  },
  [setCart]
);

 
```

### Key Improvements:

Used id instead of index for better stability.
Used useCallback to optimize performance.
Simplified state updates using functional updates.
 

---

 

```javascript

 // Optimized Price Calculation
const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

```

**Lessons Learned:**
Using unique id improves item tracking.
useCallback prevents unnecessary function re-creations.
Storing numeric prices avoids extra string parsing.
  


 
 
