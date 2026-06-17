import { useState, useEffect } from "react";
import { Navigation } from "./components/layout/Navbar";
import Home from "./app/pages/home";
import { Footer } from "./components/layout/Footer";

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.className = isDark
      ? "dark"
      : "light";
  }, [isDark]);

  return (
    <>
      <Navigation
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <Home />
      <Footer/>
    </>
  );
}

export default App;