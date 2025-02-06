import "./App.css";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Services />
      <Contact />
      <SignIn />
      <Register />
    </>
  );
}

export default App;
