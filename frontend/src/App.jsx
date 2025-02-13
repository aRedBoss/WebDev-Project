import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header.jsx";
import Home from "./sections/Home/Home.jsx";
import About from "./sections/about/About.jsx";
import Services from "./sections/services/Services.jsx";
import Contact from "./sections/contact/Contact.jsx";
import SignIn from "./sections/signin/SignIn.jsx";
import Register from "./sections/register/Register.jsx";
import Booking from "./sections/booking/Booking.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
