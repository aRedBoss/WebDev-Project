import "./App.css";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Hero from "./components/Hero";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";

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
