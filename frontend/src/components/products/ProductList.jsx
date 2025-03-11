import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = ({ products, loading, error }) => {
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const navigate = useNavigate();

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log("Failed to delete product");
        return false; // Return false if delete fails
      }
      return true; // Return true if delete is successful
    } catch (error) {
      console.error("Error deleting product:", error);
      navigate("/admin");
    }
  };

  const handleDelete = async (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + jobId,
    );
    if (!confirm) return;

    const success = await deleteJob(jobId);
    if (success) {
      console.log("Product Deleted Successfully!");
      toast.success("Product Deleted Successfully!");
      navigate("/");
    } else {
      console.error("Failed to delete the product!");
      toast.error("Failed to delete the product!");
      navigate("/");
    }
  };

  const handleEdit = (productId) => {
    // Navigate to the edit form or open a modal with the edit form
    console.log(`Edit product with ID: ${productId}`);
    // Example: Navigate to the edit form
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div>
      <h2 className="section-title">Products List</h2>
      <ul className="product-list">
        {products.length > 0 ? (
          <table className="product-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th className="th-center">Actions</th>
                <th className="th-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="product-item">
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>€{product.price}</td>
                  <td>{product.quantity}</td>
                  <td className="th-center">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="th-center">
                    <button
                      className="remove-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
