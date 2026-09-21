import { type ReactNode, useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  compact?: boolean;
  id?: string;
}

export function DeferredSection({ children, compact = false, id }: DeferredSectionProps) {
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
      { rootMargin: '0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={placeholderRef}
      className={!isReady ? (compact ? 'neon-deferred-section neon-deferred-section--compact' : 'neon-deferred-section') : undefined}
      aria-hidden={!isReady ? true : undefined}
    >
      {isReady ? children : null}
    </div>
  );
}
