import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FairyDustCursor from '@/components/ui/cursor/FairyDust';
import './globals.css';

export const metadata = {
  title: 'Agritex Global',
  description: 'Precision sourcing for sustainable scale',
};

export default function RootLayout({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(isLargeScreen && !hasTouch);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {isDesktop && <FairyDustCursor />}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
