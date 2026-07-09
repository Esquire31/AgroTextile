"use client"

import { useEffect, useMemo, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

/**
 * @typedef {Object} Marker
 * @property {string} id
 * @property {[number, number]} location
 * @property {string} label
 */

/**
 * @typedef {Object} Arc
 * @property {string} id
 * @property {[number, number]} from
 * @property {[number, number]} to
 * @property {string} [label]
 */

// ─── Colors sourced from variables.scss ───────────────────────────────────
// cobe draws to a WebGL canvas, so it needs raw normalized [r, g, b] values
// (0–1) rather than CSS custom properties — these constants mirror the scss
// tokens directly so the globe stays in sync with the rest of the site.
const COLOR_PRIMARY = [0 / 255, 98 / 255, 65 / 255] // $green       #006241
const COLOR_WHITE = [237 / 255, 237 / 255, 236 / 255] // $white       #ededec
const COLOR_BLACK = [26 / 255, 28 / 255, 26 / 255] // $black       #1a1c1a
const COLOR_BLACK_GREEN = [15 / 255, 20 / 255, 18 / 255] // $black-green #0f1412
const COLOR_GREY_BG = [243 / 255, 244 / 255, 243 / 255] // $grey-bg     #f3f4f3
const COLOR_GREY_GREEN = [29 / 255, 37 / 255, 33 / 255] // $grey-green  #1d2521

// Theme-driven defaults, matching the token pairs in variables.scss:
//   light -> background: $white   / text-primary: $black
//   dark  -> background: $black-green / text-primary: $white
// So in light mode the sphere reads as white with black country dots,
// and in dark mode it flips to a dark sphere with white dots.
// NOTE: dark-mode base intentionally is NOT $black-green (#0f1412). That's
// the page background color, and the hero also sits under a bg-black/55
// overlay — stacking three near-black layers made the globe invisible.
// $grey-green (#1d2521) is dark but distinct enough from the surrounding
// black to still read as a sphere.
const THEME_DEFAULTS = {
  light: { base: COLOR_WHITE, marker: COLOR_BLACK, glow: COLOR_WHITE },
  dark: { base: COLOR_GREY_GREEN, marker: COLOR_WHITE, glow: COLOR_GREY_GREEN },
}
// ────────────────────────────────────────────────────────────────────────

// Watches <html> (and <body>, as a fallback) for the light/dark theme class
// the rest of the site already toggles (.light/.dark or .theme-light/.theme-dark),
// falling back to a data-theme attribute or the OS preference if neither is set.
function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof document === "undefined") return

    const root = document.documentElement
    const body = document.body

    const compute = () => {
      const classes = `${root.className} ${body?.className || ""}`
      if (/\b(dark|theme-dark)\b/.test(classes)) return true
      if (/\b(light|theme-light)\b/.test(classes)) return false

      const dataTheme = root.getAttribute("data-theme") || body?.getAttribute("data-theme")
      if (dataTheme) return dataTheme === "dark"

      return !!window.matchMedia?.("(prefers-color-scheme: dark)").matches
    }

    setIsDark(compute())

    const observer = new MutationObserver(() => setIsDark(compute()))
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] })
    if (body) observer.observe(body, { attributes: true, attributeFilter: ["class", "data-theme"] })

    const media = window.matchMedia?.("(prefers-color-scheme: dark)")
    const onMediaChange = () => setIsDark(compute())
    media?.addEventListener?.("change", onMediaChange)

    return () => {
      observer.disconnect()
      media?.removeEventListener?.("change", onMediaChange)
    }
  }, [])

  return isDark
}

/**
 * @param {Object} props
 * @param {Marker[]} [props.markers]
 * @param {Arc[]} [props.arcs]
 * @param {string} [props.className]
 * @param {[number, number, number]} [props.markerColor] - overrides theme default
 * @param {[number, number, number]} [props.baseColor] - overrides theme default
 * @param {[number, number, number]} [props.arcColor]
 * @param {[number, number, number]} [props.glowColor] - overrides theme default
 * @param {number} [props.dark]
 * @param {number} [props.mapBrightness]
 * @param {number} [props.markerSize]
 * @param {number} [props.markerElevation]
 * @param {number} [props.arcWidth]
 * @param {number} [props.arcHeight]
 * @param {number} [props.speed]
 * @param {number} [props.theta]
 * @param {number} [props.diffuse]
 * @param {number} [props.mapSamples]
 */
export default function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor,
  baseColor,
  arcColor = COLOR_PRIMARY,
  glowColor,
  dark,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
}) {
  const isDark = useIsDarkTheme()
  const themeDefaults = isDark ? THEME_DEFAULTS.dark : THEME_DEFAULTS.light

  // cobe's own `dark` param (0-1) drives its baked-in land/ocean shading
  // *underneath* whatever markerColor/baseColor we pass in. Leaving it at a
  // fixed value regardless of theme meant cobe's internal shading could
  // still tint the dots away from pure white in dark mode. Tie it to the
  // detected theme too, unless the caller explicitly overrides it.
  const resolvedDark = dark ?? (isDark ? 1 : 0)

  // Explicit props always win; otherwise fall back to the light/dark token pair.
  // useMemo keeps the array references stable across re-renders so the effect
  // below doesn't tear down and rebuild the globe unnecessarily.
  const resolvedBaseColor = useMemo(
    () => baseColor ?? themeDefaults.base,
    [baseColor, themeDefaults.base]
  )
  const resolvedMarkerColor = useMemo(
    () => markerColor ?? themeDefaults.marker,
    [markerColor, themeDefaults.marker]
  )
  const resolvedGlowColor = useMemo(
    () => glowColor ?? themeDefaults.glow,
    [glowColor, themeDefaults.glow]
  )

  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const lastPointer = useRef(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  // ─── Keep the globe perfectly circular ──────────────────────────────────
  // The root element may be stretched to fill a non-square parent (e.g. a
  // full-bleed hero background). Rather than trusting CSS aspect-ratio utilities
  // (which are ignored if a parent forces both width AND height), we measure
  // the root's box ourselves and size an inner square to the smaller of the
  // two dimensions, centered. The canvas then fills that square 1:1, so it
  // can never be stretched into an oval no matter what className is passed in.
  const [squareSize, setSquareSize] = useState(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const updateSize = () => {
      const { width, height } = root.getBoundingClientRect()
      const size = Math.floor(Math.min(width, height))
      if (size > 0) setSquareSize(size)
    }

    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(root)
    return () => ro.disconnect()
  }, [])
  // ─────────────────────────────────────────────────────────────────────────

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x
      const deltaY = e.clientY - pointerInteracting.current.y
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }
      const now = Date.now()
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1)
        const maxVelocity = 0.15
        velocity.current = {
          phi: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)
          ),
          theta: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)
          ),
        }
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current || squareSize === 0) return
    const canvas = canvasRef.current
    let globe = null
    let animationId
    let phi = 0
    let destroyed = false

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe || destroyed) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: 0,
        theta,
        dark: resolvedDark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        markerElevation,
        markers: markers.map((m) => ({
          location: m.location,
          size: markerSize,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({
          from: a.from,
          to: a.to,
          id: a.id,
        })),
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 1,
      })

      function animate() {
        if (destroyed || !globe) return
        if (!isPausedRef.current) {
          phi += speed
          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffsetRef.current += velocity.current.phi
            thetaOffsetRef.current += velocity.current.theta
            velocity.current.phi *= 0.95
            velocity.current.theta *= 0.95
          }
          const thetaMin = -0.4,
            thetaMax = 0.4
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1
          }
        }
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark: resolvedDark,
          mapBrightness,
          markerColor: resolvedMarkerColor,
          baseColor: resolvedBaseColor,
          arcColor,
          markerElevation,
          markers: markers.map((m) => ({
            location: m.location,
            size: markerSize,
            id: m.id,
          })),
          arcs: arcs.map((a) => ({
            from: a.from,
            to: a.to,
            id: a.id,
          })),
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      destroyed = true
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) {
        globe.destroy()
        globe = null
      }
    }
  }, [
    squareSize,
    markers,
    arcs,
    resolvedMarkerColor,
    resolvedBaseColor,
    arcColor,
    resolvedGlowColor,
    resolvedDark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
  ])

  return (
    <div
      ref={rootRef}
      className={`relative select-none flex items-center justify-center ${className}`}
    >
      <div
        className="relative"
        style={{ width: squareSize || "100%", height: squareSize || "100%" }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            opacity: 0,
            transition: "opacity 1.2s ease",
            borderRadius: "50%",
            touchAction: "none",
          }}
        />
        {markers.map((m) => (
          <div
            key={m.id}
            style={{
              position: "absolute",
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 8,
              padding: "2px 6px",
              background: "var(--color-text-primary)",
              color: "var(--color-background)",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: "opacity 0.8s, filter 0.8s",
            }}
          >
            {m.label}
            <span
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translate3d(-50%, -1px, 0)",
                border: "5px solid transparent",
                borderTopColor: "var(--color-text-primary)",
              }}
            />
          </div>
        ))}
        {arcs
          .filter((a) => a.label)
          .map((a) => (
            <div
              key={a.id}
              style={{
                position: "absolute",
                positionAnchor: `--cobe-arc-${a.id}`,
                bottom: "anchor(top)",
                left: "anchor(center)",
                translate: "-50% 0",
                marginBottom: 8,
                padding: "2px 6px",
                background: "var(--color-background)",
                color: "var(--color-text-primary)",
                fontFamily: "monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 1px 4px var(--color-shadow)",
                opacity: `var(--cobe-visible-arc-${a.id}, 0)`,
                filter: `blur(calc((1 - var(--cobe-visible-arc-${a.id}, 0)) * 8px))`,
                transition: "opacity 0.8s, filter 0.8s",
              }}
            >
              {a.label}
              <span
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translate3d(-50%, -1px, 0)",
                  border: "5px solid transparent",
                  borderTopColor: "var(--color-background)",
                }}
              />
            </div>
          ))}
      </div>
    </div>
  )
}