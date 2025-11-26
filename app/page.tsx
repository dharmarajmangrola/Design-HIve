import Home from "./Components/Home";
import About from "./Components/About";
import Projects from "./Components/Projects";

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <Home />
      <Projects />
      <About />
    </main>
  );
}
