import React, { useState } from 'react';
import './adminpanel.css';

const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderContent = () => {
        switch (activeSection) {
            case 'users':
                return <h2 className="section-title">Users List</h2>;
            case 'bookings':
                return <h2 className="section-title">Bookings List</h2>;
            case 'services':
                return <h2 className="section-title">Services List</h2>;
            case 'products':
                return <h2 className="section-title">Products List</h2>;
            case 'settings':
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
                    <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
                    <button onClick={() => setActiveSection('users')}>Users</button>
                    <button onClick={() => setActiveSection('bookings')}>Bookings</button>
                    <button onClick={() => setActiveSection('services')}>Services</button>
                    <button onClick={() => setActiveSection('products')}>Products</button>
                    <button onClick={() => setActiveSection('settings')}>Settings</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPanel;