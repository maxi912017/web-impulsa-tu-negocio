import { type ReactNode, useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  compact?: boolean;
}

export function DeferredSection({ children, compact = false }: DeferredSectionProps) {
  const [isReady, setIsReady] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = placeholderRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (isReady) return children;

  return (
    <div
      ref={placeholderRef}
      className={compact ? 'neon-deferred-section neon-deferred-section--compact' : 'neon-deferred-section'}
      aria-hidden="true"
    />
  );
}
