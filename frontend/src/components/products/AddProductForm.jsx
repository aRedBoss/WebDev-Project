import React, { useState } from "react";
import "./AddProductForm.css";
import { toast } from "react-toastify";

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // Assuming image URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, price, image }),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
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
      <h2>Add New Product</h2>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
