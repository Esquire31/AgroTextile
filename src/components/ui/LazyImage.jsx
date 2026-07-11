import React, { useEffect, useRef, useState } from 'react';

/**
 * LazyImage
 * Loads the image ~300px before it enters the viewport (instead of
 * native loading="lazy", which waits until the image is much closer/visible).
 * This removes the "pop-in" delay you feel while scrolling.
 *
 * Usage: <LazyImage src={...} alt={...} className={...} />
 * Same props as a normal <img>, plus optional rootMargin override.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  rootMargin = '300px',
  onLoad,
  ...rest
}) {
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    // If browser has no IntersectionObserver support, just load immediately.
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin } // start loading before it's actually on screen
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {/* Skeleton placeholder shown until the real image has loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface-container-low animate-pulse" />
      )}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
          }}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...rest}
        />
      )}
    </div>
  );
}