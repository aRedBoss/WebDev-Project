import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import CartLists from "../shop-chart/CartLists";
import useProducts from "../../hooks/useProducts";
import ProductList from "../products/ProductList.jsx";
import AddProductForm from "../products/AddProductForm.jsx";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { products, loading, error } = useProducts([]);

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <h2 className="section-title">Users List</h2>;
      case "time-bookings":
        return <h2 className="section-title">Time Bookings List</h2>;
      case "cart-bookings":
        return (
          <div>
            <h2 className="section-title">Cart Booking List</h2>
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
                <h3>Services</h3>
                <p>10</p>
              </div>
              <div className="card">
                <h3>Products</h3>
                <p>50</p>
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
            Time Bookings
          </button>
          <button onClick={() => setActiveSection("cart-bookings")}>
            Cart Bookings
          </button>
          <button onClick={() => setActiveSection("services")}>Services</button>
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
