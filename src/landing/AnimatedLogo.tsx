import { useEffect, useState } from 'react';

const POSTER = '/assets/logo-arrow-poster.webp';
const WEBM = '/assets/logo-arrow.webm';
const MP4 = '/assets/logo-arrow.mp4';

/** Monta el video del logo solo cuando el navegador está libre y el usuario acepta animaciones. */
function useMotionLogo() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };
    const idleId = window.requestIdleCallback?.(enable);
    const timeoutId = window.setTimeout(enable, 1500);

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return ready;
}

export function AnimatedLogoMark({ label }: { label: string }) {
  const ready = useMotionLogo();

  if (!ready) {
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
      className="neon-brand-video"
      poster={POSTER}
      width={44}
      height={44}
      muted
      autoPlay
      loop
      playsInline
      controls={false}
      preload="none"
      aria-label={label}
    >
      <source src={WEBM} type="video/webm" />
      <source src={MP4} type="video/mp4" />
    </video>
  );
}

export function HeroLogoGlow() {
  const ready = useMotionLogo();
  const wide = typeof window !== 'undefined' && window.innerWidth >= 900;
  if (!ready || !wide) return null;

  return (
    <div className="neon-hero-glow" aria-hidden="true">
      <video muted autoPlay loop playsInline controls={false} preload="none" poster={POSTER}>
        <source src={WEBM} type="video/webm" />
        <source src={MP4} type="video/mp4" />
      </video>
    </div>
  );
}
