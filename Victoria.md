# Self-Assessment of CartController.js (Backend)

##  Improving Code Quality

## Code Readability and Reusability:

### 1. Calculate Total Price:

Instead of repeating the reduction logic, create a function:
   
Code Before:

```javascript
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.productId.price;
  }, 0);
};
```

Usage:

```javascript
cart.totalPrice = calculateTotalPrice(cart.items);
```

### 2. Find Existing Cart Item:

The logic to find an existing item in the cart is repeated in addToCart. Extract it:

Code Before:

```javascript
const findExistingCartItem = (cartItems, productId) => {
  return cartItems.find(
    (cartItem) =>
      cartItem.productId && cartItem.productId.equals(productId),
  );
};
```

Usage:

```javascript
const existingItem = findExistingCartItem(cart.items, productId);
```

### 3. Validate Quantity:

The quantity validation logic is also used in multiple places. Extract it:

Code Before:

```javascript
const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};
```
Usage:

```javascript
if (!validateQuantity(quantity)) { ... }
```

### 4. Populate Cart Items:

The populated call is used in many places. Extract it if you want to reuse it multiple times.

Code Before:

```javascript
const populateCartItems = async (cart) => {
  return cart.populate("items.productId", "name description price image");
};
```

Usage:

```javascript
cart = await populateCartItems(cart);
```

### 5. Handle Cart Not Found:

If you have more functions that handle the case where the cart is not found, you can extract that logic.

Code Before:

```javascript
const handleCartNotFound = (res, userId) => {
  console.log("Cart not found for user:", userId);
  return res.status(404).json({ error: "Cart not found" });
};
```

Usage:

```javascript
if (!cart) { return handleCartNotFound(res, userId); }
```

---

### Benefits of Helper Functions:

- Reduced Code Duplication: Makes your code shorter and easier to maintain.

- Improved Readability: Breaks down complex logic into smaller, more understandable pieces.

- Increased Reusability: Allows you to reuse common logic across different parts of your application.

- Easier Testing: Makes it easier to write unit tests for individual functions.

---

Example of Updated addToCart with Helper Functions:

```javascript
const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel");

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.productId.price;
  }, 0);
};

const findExistingCartItem = (cartItems, productId) => {
  return cartItems.find(
    (cartItem) =>
      cartItem.productId && cartItem.productId.equals(productId),
  );
};

const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};

const addToCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items must be a non-empty array" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    for (const item of items) {
      const { productId, quantity } = item;

      if (!validateQuantity(quantity)) {
        return res.status(400).json({ error: "Quantity must be a positive integer" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${productId}` });
      }

      const existingItem = findExistingCartItem(cart.items, productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.populate("items.productId", "name description price image");
    cart.totalPrice = calculateTotalPrice(cart.items);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};
```

**Lessons Learned:**

- By extracting common logic into helper functions, you can improve code quality and maintainability.

- Helper functions make your code more readable, reusable, and easier to test.

- Use helper functions to encapsulate common tasks and reduce code duplication.

- Helper functions can be used to break down complex tasks into smaller, more manageable pieces.


