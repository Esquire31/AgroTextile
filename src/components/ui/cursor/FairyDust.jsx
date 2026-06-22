import { useEffect, useState } from 'react';

const FairyDustCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) {
        setIsHovering(false);
        return;
      }

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-hover') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    // hide native cursor everywhere (including on hover) by injecting a stylesheet
    const styleId = 'hide-native-cursor-style';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = '* { cursor: none !important; }';
      document.head.appendChild(styleEl);
    }

    // also set body cursor as a fallback
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = prev;
      styleEl?.parentNode?.removeChild(styleEl);
    };
  }, []);

  return (
    <div
      className="fairy-dust-core"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isHovering ? '60px' : '18px',
        height: isHovering ? '60px' : '18px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: isHovering ? 'rgba(0, 98, 65, 0.5)' : '#006241',
        boxShadow: '0 0 12px rgba(0, 98, 65, 0.35)',
        pointerEvents: 'none',
        transition: 'width 200ms ease, height 200ms ease',
        zIndex: 10000,
      }}
    />
  );
};

export default FairyDustCursor;
