import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppFloatingButton({
  phoneNumber = "5492664484918",
  defaultMessage = "Hola Impulsa Tu Negocio, quiero consultar por una web o app para mi negocio",
}: WhatsAppFloatingButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Show tooltip only on desktop after initial page interaction
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 200;
        setIsScrolled((current) => (current === shouldShow ? current : shouldShow));
        frameId = null;
      });
    };

    // Attach scroll listener passively without forced synchronous reflow on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div id="whatsapp-floating-container" className="neon-whatsapp-floating-wrapper">
      {showTooltip && (
        <div id="whatsapp-floating-tooltip" className="neon-whatsapp-tooltip">
          <button
            id="whatsapp-tooltip-close"
            type="button"
            className="neon-whatsapp-tooltip-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Cerrar mensaje de WhatsApp"
          >
            <X size={13} />
          </button>
          <div className="neon-whatsapp-tooltip-header">
            <span className="neon-whatsapp-status-dot" />
            <span className="neon-whatsapp-tooltip-title">Impulsa Tu Negocio</span>
          </div>
          <p className="neon-whatsapp-tooltip-text">
            ¡Hola! 👋 ¿Querés saber qué tipo de web o app necesita tu negocio? Escribinos y te
            orientamos sin compromiso.
          </p>
          <a
            id="whatsapp-tooltip-action"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="neon-whatsapp-tooltip-btn"
          >
            Abrir chat directo
          </a>
        </div>
      )}

      <a
        id="whatsapp-floating-fab"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={`neon-whatsapp-fab ${isScrolled ? "visible" : ""}`}
        aria-label="Chatear por WhatsApp con Impulsa Tu Negocio"
      >
        <span className="neon-whatsapp-radar" aria-hidden="true" />
        <span className="neon-whatsapp-radar-secondary" aria-hidden="true" />
        <span className="neon-whatsapp-fab-icon">
          <MessageCircle size={28} />
        </span>
        <span className="neon-whatsapp-fab-badge">1</span>
      </a>
    </div>
  );
}
