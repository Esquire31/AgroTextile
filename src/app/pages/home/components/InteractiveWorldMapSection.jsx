import React, { useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map/without-countries";
import worldMapData from "./worldMapData.json";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const worldMap = new DottedMap({
  map: worldMapData,
});

const worldPoints = worldMap.getPoints();
const worldImage = worldMap.image;
const hoverThreshold = 3.2;
const spreadRadius = 4.2;
const baseRadius = 0.28;

function getNearestPointIndex(points, x, y) {
  let nearestIndex = -1;
  let nearestDistanceSquared = hoverThreshold * hoverThreshold;

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index];
    const deltaX = point.x - x;
    const deltaY = point.y - y;
    const distanceSquared = deltaX * deltaX + deltaY * deltaY;

    if (distanceSquared < nearestDistanceSquared) {
      nearestDistanceSquared = distanceSquared;
      nearestIndex = index;
    }
  }

  return nearestIndex;
}

export default function InteractiveWorldMapSection() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const frameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const activePoint = activeIndex === null ? null : worldPoints[activeIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const renderedPoints = useMemo(() => {
    return worldPoints.map((point, index) => {
      if (!activePoint) {
        return {
          key: `${point.x}-${point.y}`,
          cx: point.x,
          cy: point.y,
          radius: baseRadius,
          fill: "var(--color-outline-variant)",
          opacity: 0.62,
        };
      }

      const deltaX = point.x - activePoint.x;
      const deltaY = point.y - activePoint.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const intensity = Math.max(0, 1 - distance / spreadRadius);

      return {
        key: `${point.x}-${point.y}`,
        cx: point.x,
        cy: point.y - intensity * 0.45,
        radius: baseRadius + intensity * 0.12,
        fill: intensity > 0 ? "var(--color-primary)" : "var(--color-outline-variant)",
        opacity: 0.62,
        isActive: index === activeIndex,
      };
    });
  }, [activeIndex, activePoint]);

  const updateHoverPoint = (event) => {
    if (!svgRef.current) {
      return;
    }

    const bounds = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * worldImage.width;
    const y = ((event.clientY - bounds.top) / bounds.height) * worldImage.height;

    const nextIndex = getNearestPointIndex(worldPoints, x, y);

    setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex === -1 ? null : nextIndex));
  };

  const handlePointerMove = (event) => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      updateHoverPoint(event);
      frameRef.current = null;
    });
  };

  const handlePointerLeave = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    setActiveIndex(null);
  };

  return (
    <section className="relative px-0 pb-12 pt-4 sm:pb-16 sm:pt-24 lg:pb-12 lg:pt-16 overflow-visible w-full">
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Background Map rendering in flow but absolutely positioned to allow content overlay */}
        <div className="w-full pointer-events-none select-none opacity-70 px-4 sm:px-8 lg:px-12">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${worldImage.width} ${worldImage.height}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto min-h-[500px] cursor-crosshair pointer-events-auto overflow-visible"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            aria-hidden="true"
          >
            {renderedPoints.map((point) => (
              <circle
                key={point.key}
                cx={point.cx}
                cy={point.cy}
                r={point.radius}
                fill={point.fill}
                fillOpacity={point.opacity}
                className="transition-all duration-200 ease-out"
              />
            ))}
          </svg>
        </div>

        {/* Content overlaid on the map */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 sm:pt-16 pointer-events-none text-center px-2 sm:px-8">
<<<<<<< HEAD
          <div className="z-10 max-w-5xl">
            <h2 className="type-display text-text-primary mb-8">
              {formatMessage({ id: "app.pages.home.hero.title" })}
              <br />
              <span style={{ color: 'var(--color-primary)' }}>
                <span dangerouslySetInnerHTML={{ __html: formatMessage({ id: 'app.pages.home.hero.title_highlight' }) }} />
              </span>
            </h2>
=======
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 max-w-5xl flex flex-col items-center"
          >
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <span
                className="inline-block type-badge px-4 py-2 rounded-full border"
                style={{
                  borderColor: 'var(--color-outline-variant)',
                  color: 'var(--color-on-surface)',
                }}
              >
                {formatMessage({ id: 'app.pages.home.hero.eyebrow' })}
              </span>
            </motion.div>
>>>>>>> origin/main

            {/* Main Heading */}
            <motion.h2
              variants={itemVariants}
              className="type-display text-text-primary mb-8"
            >
              {formatMessage({ id: "app.pages.home.hero.title" })}
              <br />
              <motion.span
                style={{ color: 'var(--color-primary)' }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {formatMessage({ id: "app.pages.home.hero.title_highlight" })}
              </motion.span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-text-primary type-body-lg mb-10"
            >
              {formatMessage({ id: "app.pages.home.hero.subtitle" })}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            >
              <button 
                onClick={() => navigate('/products')}
                className="pointer-events-auto bg-primary text-text-on-primary px-8 py-4 rounded-full font-bold spring-hover spring-active flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                {formatMessage({ id: "app.pages.home.hero.btn.start_sourcing" })}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
 
              <button 
                onClick={() => navigate('/products')}
                className="pointer-events-auto border border-outline bg-card-bg/70 backdrop-blur-sm text-text-primary px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors spring-hover spring-active"
              >
                {formatMessage({ id: "app.pages.home.hero.btn.view_catalogue" })}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}