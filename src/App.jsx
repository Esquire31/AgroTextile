import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Footer } from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrolltoTop";

function App() {
  const [isDark, setIsDark] = useState(() => {
  return localStorage.getItem("theme") !== "light";
});

  useEffect(() => {
  const root = document.documentElement;

  if (isDark) {
    root.classList.add("dark");
    root.classList.remove("light");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [isDark]);

  return (
    <BrowserRouter>
    <ScrollToTop />
      <>
        <Navigation
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <AppRoutes />
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;