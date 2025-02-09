import "./App.css";
import Header from "./components/header/Header.jsx";
import Home from "./sections/Home/Home.jsx";
import About from "./sections/about/About.jsx";
import Services from "./sections/services/Services.jsx";
import Contact from "./sections/contact/Contact.jsx";
import SignIn from "./sections/signin/SignIn.jsx";
import Register from "./sections/register/Register.jsx";

function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Services />
      <Contact />
      <SignIn />
      <Register />
    </>
  );
}

export default App;
