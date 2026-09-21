import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  MessageCircle,
  X,
  Zap,
} from 'lucide-react';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import './neon-landing.css';

const PortfolioSection = lazy(() =>
  import('./PortfolioSection').then((m) => ({ default: m.PortfolioSection })),
);
const TestimonialsSection = lazy(() =>
  import('./LazySections').then((m) => ({ default: m.TestimonialsSection })),
);
const ContactForm = lazy(() =>
  import('./LazySections').then((m) => ({ default: m.ContactForm })),
);

const WHATSAPP_LINK =
  'https://wa.me/5492664484918?text=Hola%20Impulsa%20Tu%20Negocio%2C%20quiero%20contarles%20mi%20idea';
const INSTAGRAM_LINK = 'https://www.instagram.com/impulsatunegocio.dev/';


function Brand() {
  return (
    <a id="header-brand" className="neon-brand" href="#inicio" aria-label="Impulsa Tu Negocio, inicio">
      <span id="header-brand-mark" className="neon-brand-mark">
        <img
          id="header-brand-img"
          src="/assets/isotipo-44.webp"
          srcSet="/assets/isotipo-44.webp 44w, /assets/isotipo-88.webp 88w, /assets/isotipo-150.webp 150w"
          sizes="44px"
          width="44"
          height="44"
          alt="Logo de Impulsa Tu Negocio"
          decoding="async"
        />
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
          <div className="neon-hero-copy">
            <motion.span
              className="neon-mono-label neon-accent-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              DISEÑO WEB · DESARROLLO · VISIBILIDAD
            </motion.span>
            <motion.h1
              className="neon-display"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              Tu negocio
              <br />
              merece una
              <br />
              <span>web que trabaje.</span>
            </motion.h1>
            <motion.p
              className="neon-hero-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.16 }}
            >
              Una presencia digital profesional para que te entiendan rápido, confíen en vos y te encuentren cuando te buscan.
            </motion.p>
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

        <Suspense fallback={null}>
          <PortfolioSection />
          <TestimonialsSection />
        </Suspense>

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

        <section id="preguntas" className="neon-contact-grid neon-container">
          <div>
            <span className="neon-mono-label">PREGUNTAS FRECUENTES</span>
            <h2 className="neon-section-title">Antes de empezar, <span>hablemos claro.</span></h2>
            <p>Una primera conversación también sirve para ordenar. No necesitás llegar con todo resuelto.</p>
          </div>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
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