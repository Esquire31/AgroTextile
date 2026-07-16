import { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Navigation } from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Footer } from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import SplashCursor from "./components/ui/cursor/SplashCursor";
import FairyDustCursor from "./components/ui/cursor/FairyDust";
import Lenis from "lenis";

function AppContent({ isDark, setIsDark }) {
  const location = useLocation();

  const is404 =
    location.pathname !== "/" &&
    location.pathname !== "/about" &&
    location.pathname !== "/products" &&
    location.pathname !== "/contact" &&
    !location.pathname.startsWith("/products/");

  return (
    <>
      {!is404 && (
        <Navigation
          isDark={isDark}
          setIsDark={setIsDark}
        />
      )}

      <AppRoutes />

      {!is404 && <Footer />}
    </>
  );
}

function App() {
  const [canUseSplashCursor, setCanUseSplashCursor] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
      orientation: "vertical",
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

  // Detect desktop vs mobile/tablet
  useEffect(() => {
    const checkIsDesktop = () => {
      const hasTouch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isLargeScreen = window.innerWidth >= 1024;

      setIsDesktop(isLargeScreen && !hasTouch);
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);

    return () =>
      window.removeEventListener("resize", checkIsDesktop);
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

      {isDesktop && <FairyDustCursor />}

      <AppContent
        isDark={isDark}
        setIsDark={setIsDark}
      />
    </BrowserRouter>
  );
}

export default App;