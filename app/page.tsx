import Preloader from "./Components/Preloader";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Footer from "./Components/Footer";

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <Preloader />
      <Navbar />
      <Home />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
