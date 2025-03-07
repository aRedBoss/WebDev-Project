import React, { useState } from "react";
import "./AddProductForm.css";
import { toast } from "react-toastify";

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // Assuming image URL
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, price, image, quantity }),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setQuantity(0);
        if (onProductAdded) {
          onProductAdded();
        }
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to add product: ${errorData.message || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="add-product-form">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
