import { useState } from "react";
import "./AdminPanel.css";
import CartLists from "../shop-chart/CartLists";
import useProducts from "../../hooks/useProducts";
import ProductList from "../products/ProductList.jsx";
import AddProductForm from "../products/AddProductForm.jsx";
import useCart from "../../hooks/useCart.jsx";
import AdminBookings from "./AdminBookings"; // Import AdminBookings Component

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { products, loading, error } = useProducts([]);
  const { cartItems, loadingCart, errorCart } = useCart([]);

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <h2 className="section-title">Users List</h2>;
      case "time-bookings":
        return <AdminBookings />; // Show the Bookings List component
      case "cart-bookings":
        return (
          <div>
            <h2 className="section-title">Cart Reservations List</h2>
            <CartLists />
          </div>
        );
      case "services":
        return <h2 className="section-title">Services List</h2>;
      case "products":
        return (
          <div>
            <ProductList products={products} loading={loading} error={error} />
            <AddProductForm />
          </div>
        );
      case "settings":
        return <h2 className="section-title">Settings</h2>;
      default:
        return (
          <>
            <h2 className="section-title">Dashboard</h2>
            <div className="dashboard-cards">
              <div className="card">
                <h3>Users</h3>
                <p>120</p>
              </div>
              <div className="card">
                <h3>Bookings</h3>
                <p>35</p>
              </div>
              <div className="card">
                <h3>Cart Reservations</h3>
                <p>{cartItems.length}</p>
              </div>
              <div className="card">
                <h3>Products</h3>
                <p>{products.length}</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h4>Admin Panel</h4>
        <nav>
          <button onClick={() => setActiveSection("dashboard")}>
            Dashboard
          </button>
          <button onClick={() => setActiveSection("users")}>Users</button>
          <button onClick={() => setActiveSection("time-bookings")}>
            Bookings
          </button>
          <button onClick={() => setActiveSection("cart-bookings")}>
            Cart Reservations
          </button>
          <button onClick={() => setActiveSection("products")}>Products</button>
          <button onClick={() => setActiveSection("settings")}>Settings</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default AdminPanel;
