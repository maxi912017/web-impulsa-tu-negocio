import { lazy, Suspense, useState } from 'react';
import {
  ArrowUpRight,
  MessageCircle,
  X,
  Zap,
} from 'lucide-react';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { AnimatedLogoMark, HeroLogoGlow } from './AnimatedLogo';
import { DeferredSection } from './DeferredSection';
import './neon-critical.css';

const PortfolioSection = lazy(() =>
  import('./PortfolioSection').then((m) => ({ default: m.PortfolioSection })),
);
const TestimonialsSection = lazy(() =>
  import('./TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })),
);
const ContactForm = lazy(() =>
  import('./ContactSection').then((m) => ({ default: m.ContactForm })),
);

const WHATSAPP_LINK =
  'https://wa.me/5492664484918?text=Hola%20Impulsa%20Tu%20Negocio%2C%20quiero%20contarles%20mi%20idea';
const INSTAGRAM_LINK = 'https://www.instagram.com/impulsatunegocio.dev/';


function Brand() {
  return (
    <a id="header-brand" className="neon-brand" href="#inicio" aria-label="Impulsa Tu Negocio, inicio">
      <span id="header-brand-mark" className="neon-brand-mark neon-brand-mark--motion">
        <AnimatedLogoMark label="Logo animado de Impulsa Tu Negocio" />
      </span>
      <span id="header-brand-name" className="neon-brand-name">
        impulsa<span>tu</span>negocio<span className="neon-brand-dot">.dev</span>
        <small>webs que hacen crecer negocios</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header id="site-header" className="neon-header">
      <div className="neon-container neon-header-inner">
        <Brand />
        <nav id="site-nav" className="neon-nav" aria-label="Navegación principal">
          <a id="nav-item-portafolio" href="#portafolio" className="neon-nav-highlight">
            <span>Portfolio</span>
            <span className="neon-nav-badge">Casos</span>
          </a>
          <a id="nav-item-testimonios" href="#testimonios">Reseñas</a>
          <a id="nav-item-preguntas" href="#preguntas">Preguntas</a>
        </nav>
        <button
          id="header-menu-btn"
          className="neon-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <span className="neon-menu-lines"><i /><i /><i /></span>}
        </button>
      </div>
      {open && (
        <nav id="site-mobile-nav" className="neon-mobile-nav" aria-label="Navegación móvil">
          <a href="#portafolio" onClick={close} className="neon-mobile-highlight">
            Portfolio / Casos de Éxito <span className="neon-nav-badge">Casos</span>
          </a>
          <a href="#testimonios" onClick={close}>Reseñas</a>
          <a href="#preguntas" onClick={close}>Preguntas</a>
        </nav>
      )}
    </header>
  );
}

function Landing() {
  return (
    <div className="neon-landing">
      <Header />
      <main>
        <section className="neon-hero neon-container" id="inicio">
          <HeroLogoGlow />
          <div className="neon-hero-copy">
            <span className="neon-mono-label neon-accent-label">
              DISEÑO WEB · DESARROLLO · VISIBILIDAD
            </span>
            <h1 className="neon-display">
              Tu negocio
              <br />
              merece una
              <br />
              <span>web que trabaje.</span>
            </h1>
            <p className="neon-hero-intro">
              Una presencia digital profesional para que te entiendan rápido, confíen en vos y te encuentren cuando te buscan.
            </p>
            <div id="hero-actions" className="neon-hero-actions">
              <a
                id="hero-primary-cta"
                className="neon-primary-button"
                href="#contacto"
              >
                <span>Pedir presupuesto</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="neon-proof-stats" aria-label="Lo que puede hacer una web profesional">
              <div><strong>01</strong><span>mensaje claro</span></div>
              <div><strong>02</strong><span>más confianza</span></div>
              <div><strong>∞</strong><span>posibilidades</span></div>
            </div>
          </div>
        </section>

        <div className="neon-marquee" aria-label="Beneficios de una web profesional">
          <div className="neon-marquee-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <span key={index}>MÁS CONFIANZA <Zap size={13} /> MÁS CLARIDAD <Zap size={13} /> MÁS CONSULTAS <Zap size={13} /> MÁS NEGOCIO <Zap size={13} /></span>
            ))}
          </div>
        </div>

        <DeferredSection id="portafolio">
          <Suspense fallback={<div className="neon-deferred-section" aria-hidden="true" />}>
            <PortfolioSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection compact id="testimonios">
          <Suspense fallback={<div className="neon-deferred-section neon-deferred-section--compact" aria-hidden="true" />}>
            <TestimonialsSection />
          </Suspense>
        </DeferredSection>

        <section id="contacto-banner-section" className="neon-contact neon-container">
          <div id="contact-banner" className="neon-contact-banner">
            <div>
              <span id="banner-mono-label" className="neon-mono-label neon-accent-label">EL PRÓXIMO PASO ES SIMPLE</span>
              <h2 id="banner-title">Hablemos de lo que <span>tu negocio necesita.</span></h2>
            </div>
            <a
              id="banner-whatsapp-btn"
              className="neon-banner-button"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              <span>Escribime por WhatsApp</span>
            </a>
          </div>
        </section>

        <div id="contacto" className="neon-contact-anchor" aria-hidden="true" />
        <section id="preguntas" className="neon-contact-grid neon-container">
          <div>
            <span className="neon-mono-label">PREGUNTAS FRECUENTES</span>
            <h2 className="neon-section-title">Antes de empezar, <span>hablemos claro.</span></h2>
            <p>Una primera conversación también sirve para ordenar. No necesitás llegar con todo resuelto.</p>
          </div>
          <DeferredSection compact>
            <Suspense fallback={<div className="neon-deferred-section neon-deferred-section--compact" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </DeferredSection>
        </section>
      </main>
      <footer className="neon-footer">
        <div className="neon-container neon-footer-inner">
          <Brand />
          <div className="neon-footer-links">
            <a href="#inicio">Inicio</a>
            <a href="#portafolio">Portfolio</a>
            <a href="#testimonios">Reseñas</a>
            <a href="#preguntas">Preguntas</a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">Instagram</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <span className="neon-footer-copy">© {new Date().getFullYear()} Impulsa Tu Negocio</span>
        </div>
      </footer>
      <WhatsAppFloatingButton />
    </div>
  );
}

export default Landing;