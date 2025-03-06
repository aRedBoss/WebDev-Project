const ProductList = ({ products, loading, error }) => {
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="section-title">Products List</h2>
      <ul className="product-list">
        {products.length > 0 ? (
          products.map((product) => {
            console.log("Product:", product); // Add this line
            return (
              <li key={product._id} className="product-item">
                <strong>{product.name}</strong> - €{product.price}
              </li>
            );
          })
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
