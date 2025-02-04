import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Hero from "./components/Hero";
import "./App.css";
import RegisterPage from "./pages/RegisterPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <SignInPage />
      <RegisterPage />
    </>
  );
}

export default App;
