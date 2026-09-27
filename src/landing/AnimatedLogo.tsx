import { useEffect, useRef, useState } from "react";

const POSTER = "/assets/logo-arrow-poster.webp";
const WEBM = "/assets/logo-arrow.webm";
const MP4 = "/assets/logo-arrow.mp4";

/** Detecta si el usuario tiene activada la preferencia de reducción de movimiento */
export function usePrefersReducedMotion() {
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

/**
 * Controla la reproducción continua y eficiente de videos interactivos y logos:
 * - Reproduce continuamente en bucle infinito mientras el elemento está visible en pantalla.
 * - Pausa la animación inmediatamente cuando el usuario hace scroll y desaparece de la vista.
 * - Reanuda la reproducción continua tan pronto vuelve al área visible del viewport.
 * - Pausa cuando la pestaña pasa a segundo plano.
 * - Listener de 'ended' para reiniciar fluidamente si el bucle nativo del navegador titubea.
 */
export function useAutoPlayOnVisible(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  disabled: boolean = false,
) {
  useEffect(() => {
    if (disabled) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    // Failsafe de bucle infinito continuo
    const handleEnded = () => {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };
    video.addEventListener("ended", handleEnded);

    let isIntersecting = false;

    const playVideo = () => {
      if (document.hidden || !isIntersecting) return;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };

    const pauseVideo = () => {
      video.pause();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          isIntersecting = true;
          playVideo();
        } else {
          isIntersecting = false;
          pauseVideo();
        }
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
      } else if (isIntersecting) {
        playVideo();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [videoRef, disabled]);
}

export function AnimatedLogoMark({ label, size = 48 }: { label: string; size?: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useAutoPlayOnVisible(videoRef, reducedMotion);

  if (reducedMotion) {
    return (
      <img
        className="neon-brand-video"
        src={POSTER}
        width={size}
        height={size}
        alt={label}
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="neon-brand-video"
      poster={POSTER}
      width={size}
      height={size}
      muted
      autoPlay
      loop
      playsInline
      controls={false}
      preload="auto"
      aria-label={label}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    >
      <source src={MP4} type="video/mp4" />
      <source src={WEBM} type="video/webm" />
    </video>
  );
}

export function HeroLogoGlow() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useAutoPlayOnVisible(videoRef, reducedMotion);

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
