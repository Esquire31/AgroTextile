import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Footer } from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrolltoTop";
import SplashCursor from "./components/ui/cursor/SplashCursor";
import FairyDustCursor from "./components/ui/cursor/FairyDust";
import Lenis from "lenis";

function App() {
  const [canUseSplashCursor, setCanUseSplashCursor] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const canvas = document.createElement("canvas");
    const webglContext =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    setCanUseSplashCursor(Boolean(webglContext));
  }, []);

  return (
    <BrowserRouter>
    <ScrollToTop />
    {canUseSplashCursor && (
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#006241"
      />
    )}
    <FairyDustCursor />
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