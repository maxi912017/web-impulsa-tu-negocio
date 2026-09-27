import { useEffect, useRef, useState } from "react";

const POSTER = "/assets/logo-arrow-poster.webp";
const WEBM = "/assets/logo-arrow.webm";
const MP4 = "/assets/logo-arrow.mp4";

/** Detecta si el usuario tiene activada la preferencia de reducción de movimiento */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function AnimatedLogoMark({ label }: { label: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // En caso de que el navegador pause el video, el poster verde de alta resolución queda visible
      });
    }
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <img
        className="neon-brand-video"
        src={POSTER}
        width="44"
        height="44"
        alt={label}
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="neon-brand-video"
      poster={POSTER}
      width={44}
      height={44}
      muted
      autoPlay
      loop
      playsInline
      controls={false}
      preload="auto"
      aria-label={label}
    >
      <source src={MP4} type="video/mp4" />
      <source src={WEBM} type="video/webm" />
    </video>
  );
}

export function HeroLogoGlow() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // En caso de bloqueo de autoplay en escritorio, el poster verde de alta definición queda visible
      });
    }
  }, [reducedMotion]);

  return (
    <div className="neon-hero-glow" aria-hidden="true">
      {reducedMotion ? (
        <img
          src={POSTER}
          alt=""
          className="neon-hero-glow-media"
          width="480"
          height="480"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          className="neon-hero-glow-media"
          muted
          autoPlay
          loop
          playsInline
          controls={false}
          preload="auto"
          poster={POSTER}
        >
          <source src={MP4} type="video/mp4" />
          <source src={WEBM} type="video/webm" />
        </video>
      )}
    </div>
  );
}
