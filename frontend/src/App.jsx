import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Services from "./components/Services/Services.jsx";
import Contact from "./components/Contact/Contact.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import Register from "./components/Register/Register.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <AboutUs />
      <Services />
      <Contact />
      <SignIn />
      <Register />
    </>
  );
}

export default App;
