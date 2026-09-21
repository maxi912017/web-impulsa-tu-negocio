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
const LazySections = lazy(() => import('./LazySections'));

const WHATSAPP_LINK =
  'https://wa.me/5492664484918?text=Hola%20Impulsa%20Tu%20Negocio%2C%20quiero%20contarles%20mi%20idea';
const INSTAGRAM_LINK = 'https://www.instagram.com/impulsatunegocio.dev/';


const faqs = [
  {
    question: '¿Landing page, sitio web o aplicación web?',
    answer:
      'Una landing concentra una campaña o servicio en una sola acción directa. Un sitio completo funciona como la casa digital del negocio con múltiples secciones y SEO. Y una app web permite automatizar procesos diarios como turnos online, reservas, presupuestos por WhatsApp o gestión de clientes.',
  },
  {
    question: '¿Cómo funciona la integración con WhatsApp?',
    answer:
      'Conectamos los botones y formularios para que las solicitudes, reservas o consultas lleguen directamente a tu chat de WhatsApp con un mensaje prearmado y ordenado, sin intermediarios ni demoras.',
  },
  {
    question: '¿Qué necesito para arrancar?',
    answer:
      'Solo una idea y ganas de ordenar el próximo paso. Entendemos tu negocio, tu público y tu objetivo antes de recomendarte una solución.',
  },
  {
    question: '¿La web ayuda a aparecer en Google y en buscadores con IA?',
    answer:
      'Construimos una base de SEO honesta: estructura clara, contenido útil, velocidad, accesibilidad y datos organizados. Eso ayuda a que Google y los asistentes entiendan mejor tu negocio, sin prometer posiciones garantizadas.',
  },
  {
    question: '¿Puedo empezar simple y sumar funciones después?',
    answer:
      'Sí, 100%. Podés arrancar con una landing o sitio base y más adelante incorporar un sistema de reservas, portal de clientes o catálogo autogestionable a medida que tu negocio crezca.',
  },
];

const reviews = [
  {
    name: 'Martín R.',
    role: 'Servicios Técnicos & Climatización',
    stars: 5,
    highlight: 'Más presupuestos cerrados en menos tiempo',
    comment:
      'Antes perdía clientes por pasar presupuestos tarde en notas de audio. Con la web y el botón directo a WhatsApp, la gente ve mis trabajos anteriores y me escribe decidida. Un cambio total en la imagen de mi negocio.',
  },
  {
    name: 'Dra. Valeria S.',
    role: 'Centro de Estética & Bienestar',
    stars: 5,
    highlight: 'Agenda completa desde Instagram',
    comment:
      'La landing page conectada con mis historias y anuncios de Instagram aumentó un montón las reservas de turnos. Se ve impecable, elegante y transmite la confianza que mi centro necesitaba.',
  },
  {
    name: 'Gonzalo M.',
    role: 'Emprendimiento Gastronómico & Eventos',
    stars: 5,
    highlight: 'Ahorro de horas de atención diaria',
    comment:
      'El diseño digital y la carta interactiva nos ahorraron horas de responder mensajes repetitivos en WhatsApp. La atención de Maxi fue súper cercana, rápida y atenta a cada detalle.',
  },
];

function Brand() {
  return (
    <a id="header-brand" className="neon-brand" href="#inicio" aria-label="Impulsa Tu Negocio, inicio">
      <span id="header-brand-mark" className="neon-brand-mark">
        <img id="header-brand-img" src="/assets/isotipo-150.webp" width="150" height="150" alt="Logo de Impulsa Tu Negocio" />
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

function TestimonialsSection() {
  return (
    <section className="neon-reviews-section neon-container" id="testimonios">
      <div className="neon-reviews-header">
        <span className="neon-mono-label neon-accent-label">OPINIONES DE CLIENTES</span>
        <h2 className="neon-section-title">
          Lo que dicen quienes ya <span>confiaron en su presencia digital.</span>
        </h2>
        <p className="neon-reviews-intro">
          Resultados medibles: más consultas por WhatsApp, agendas organizadas y clientes que reconocen la calidad del servicio.
        </p>
      </div>

      <div className="neon-reviews-grid">
        {reviews.map((rev, idx) => (
          <div key={idx} className="neon-review-card">
            <div className="neon-review-stars">
              {Array.from({ length: rev.stars }).map((_, i) => (
                <Star key={i} size={15} fill="#d7fe3b" color="#d7fe3b" />
              ))}
            </div>
            <strong className="neon-review-highlight">"{rev.highlight}"</strong>
            <p className="neon-review-comment">{rev.comment}</p>
            <div className="neon-review-author">
              <div className="neon-review-author-avatar">{rev.name.charAt(0)}</div>
              <div>
                <span className="neon-review-name">{rev.name}</span>
                <span className="neon-review-role">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.whatsapp || !form.message || sending) return;
    setSending(true);
    setError(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setError('No pudimos enviar tu solicitud. Probá de nuevo o escribinos por WhatsApp.');
        return;
      }
      setSent(true);
      toast.success('Tu solicitud de cotización fue enviada con éxito');
    } catch (err) {
      console.error(err);
      setError('No pudimos enviar tu solicitud. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="neon-form-column"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
    >
      <div className="neon-form-card" id="contacto">
        <span className="neon-form-glow" aria-hidden="true" />
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              className="neon-form"
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="neon-form-heading">
                <div>
                  <span className="neon-mono-label">PEDÍ TU COTIZACIÓN</span>
                  <h2>Hagamos que te elijan.</h2>
                </div>
                <span className="neon-reply"><Clock3 size={12} /> respuesta rápida</span>
              </div>
              <p className="neon-form-intro">Contame qué necesitás cotizar y te respondo con una propuesta concreta.</p>
              <div className="neon-form-grid">
                <input
                  className="neon-input"
                  placeholder="Tu nombre completo *"
                  aria-label="Tu nombre completo"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
                <input
                  className="neon-input"
                  type="tel"
                  placeholder="Número de WhatsApp *"
                  aria-label="Número de WhatsApp"
                  required
                  value={form.whatsapp}
                  onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
                />
              </div>
              <input
                className="neon-input"
                type="email"
                placeholder="Tu correo electrónico *"
                aria-label="Tu correo electrónico"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <textarea
                className="neon-input neon-textarea"
                rows={4}
                placeholder="Detalle de lo que necesitás cotizar *"
                aria-label="Detalle de lo que necesitás cotizar"
                required
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
              <button className="neon-submit" type="submit" disabled={sending} style={sending ? { opacity: 0.7 } : undefined}>
                <span>{sending ? 'Enviando…' : 'Solicitar cotización'}</span> <Send size={16} />
              </button>
              {error ? (
                <small className="neon-form-note" style={{ color: '#fca5a5' }}>{error}</small>
              ) : (
                <small className="neon-form-note">Sin spam. Te responderemos directamente para coordinar.</small>
              )}
            </motion.form>
          ) : (
            <motion.div
              className="neon-success"
              key="success"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="neon-success-icon"><CheckCircle2 size={30} /></span>
              <span className="neon-mono-label">SOLICITUD RECIBIDA</span>
              <h2>¡Perfecto! Ya dimos el primer paso.</h2>
              <p>Gracias, {form.name.split(' ')[0] || 'por escribir'}. Tu solicitud de cotización fue enviada con éxito. Te contactaremos a tu WhatsApp <strong>{form.whatsapp}</strong> o a tu correo para ordenar la propuesta.</p>
              <div style={{ marginTop: '16px' }}>
                <a
                  href={`https://wa.me/5492664484918?text=Hola%20Maxi%2C%20soy%20${encodeURIComponent(form.name)}%2C%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n%20desde%20la%20web`}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-portfolio-yellow-button"
                  style={{ display: 'inline-flex', padding: '0 20px', minHeight: '44px', fontSize: '13px' }}
                >
                  <MessageCircle size={16} />
                  <span>O abrir WhatsApp ahora</span>
                </a>
              </div>
              <button className="neon-reset" type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', whatsapp: '', message: '' }); }}>Enviar otra consulta</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FAQ />
    </motion.div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="neon-faq">
      <span className="neon-mono-label">ANTES DE ESCRIBIR · RESPUESTAS RÁPIDAS</span>
      <div className="neon-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div className="neon-faq-item" key={faq.question}>
              <button
                type="button"
                className="neon-faq-question"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown className={isOpen ? 'neon-faq-chevron open' : 'neon-faq-chevron'} size={16} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="neon-faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
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

        <PortfolioSection />
        <TestimonialsSection />

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
          <ContactForm />
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