import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Services from "./components/Services/Services.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Contact from "./components/Contact/Contact.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Services />
      <AboutUs />
      <Contact />
      <SignIn />
      <Register />
    </>
  );
}

export default App;
