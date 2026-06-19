import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Footer } from "./components/layout/Footer";

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.className = isDark
      ? "dark"
      : "light";
  }, [isDark]);

  return (
    <BrowserRouter>
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