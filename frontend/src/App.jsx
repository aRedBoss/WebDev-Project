import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header.jsx";
import Home from "./sections/Home/Home.jsx";
import AboutUs from "./sections/about/AboutUs.jsx";
import Services from "./sections/services/Services.jsx";
import Contact from "./sections/contact/Contact.jsx";
import SignIn from "./sections/signin/SignIn.jsx";
import Register from "./sections/register/Register.jsx";
import Footer from "./components/footer/Footer.jsx";
import Booking from "./sections/booking/Booking.jsx";
import Shop from "./sections/shop/Shop.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import EditProduct from "./sections/products/EditProduct.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
