import { type FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Globe2,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  Search,
  Send,
  Sparkles,
  Star,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { PortfolioSection } from './PortfolioSection';
import { sendContactMessage } from '@/lib/contact.functions';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import './neon-landing.css';

const WHATSAPP_LINK =
  'https://wa.me/5492664484918?text=Hola%20Impulsa%20Tu%20Negocio%2C%20quiero%20contarles%20mi%20idea';
const INSTAGRAM_LINK = 'https://www.instagram.com/impulsatunegocio.dev/';

const contactTopics = [
  { id: 'landing', label: 'Landing page' },
  { id: 'site', label: 'Sitio completo' },
  { id: 'app', label: 'App / Turnos / Gestión' },
  { id: 'seo', label: 'SEO y visibilidad' },
  { id: 'other', label: 'Otra idea' },
];

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
        <img id="header-brand-img" src="/assets/isotipo.jpg" alt="Logo de Impulsa Tu Negocio" />
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
          <a id="nav-item-soluciones" href="#soluciones">Soluciones</a>
          <a id="nav-item-diferencia" href="#diferencia">Landing o sitio</a>
          <a id="nav-item-portafolio" href="#portafolio" className="neon-nav-highlight">
            <span>Portfolio</span>
            <span className="neon-nav-badge">Casos</span>
          </a>
          <a id="nav-item-visibilidad" href="#visibilidad">SEO & IA</a>
          <a id="nav-item-testimonios" href="#testimonios">Reseñas</a>
          <a id="nav-item-preguntas" href="#preguntas">Preguntas</a>
        </nav>
        <div className="neon-header-actions-group">
          <a
            id="header-whatsapp-btn"
            className="neon-header-whatsapp-btn"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
          >
            <span className="neon-whatsapp-dot" />
            <MessageCircle size={15} />
            <span className="neon-header-whatsapp-text">WhatsApp</span>
          </a>
          <a id="header-cta-btn" className="neon-header-cta" href="#contacto">
            <span>Hablemos</span> <ArrowUpRight size={14} />
          </a>
        </div>
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
          <a href="#soluciones" onClick={close}>Soluciones</a>
          <a href="#diferencia" onClick={close}>Landing o sitio</a>
          <a href="#portafolio" onClick={close} className="neon-mobile-highlight">
            Portfolio / Casos de Éxito <span className="neon-nav-badge">Casos</span>
          </a>
          <a href="#visibilidad" onClick={close}>SEO & IA</a>
          <a href="#testimonios" onClick={close}>Reseñas</a>
          <a href="#preguntas" onClick={close}>Preguntas</a>
          <a
            id="mobile-menu-whatsapp-btn"
            className="neon-mobile-whatsapp-cta"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            onClick={close}
          >
            <span className="neon-whatsapp-dot" />
            <MessageCircle size={17} />
            <span>Escribir por WhatsApp</span>
          </a>
          <a id="mobile-menu-cta-btn" className="neon-mobile-cta" href="#contacto" onClick={close}>
            Contame tu idea <ArrowUpRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}

function ContactChannels() {
  const channels = [
    {
      id: 'channel-whatsapp',
      icon: MessageCircle,
      title: 'WhatsApp directo',
      detail: '+54 9 2664 484918',
      meta: 'En línea',
      href: WHATSAPP_LINK,
      isWhatsApp: true,
    },
    {
      id: 'channel-instagram',
      icon: Instagram,
      title: '@impulsatunegocio.dev',
      detail: 'Ideas, proyectos y soluciones',
      meta: 'Instagram',
      href: INSTAGRAM_LINK,
      isWhatsApp: false,
    },
    {
      id: 'channel-orientacion',
      icon: Mail,
      title: 'Primera orientación',
      detail: 'Ordenamos juntos el próximo paso',
      meta: 'sin compromiso',
      href: '#contacto',
      isWhatsApp: false,
    },
  ];

  return (
    <div className="neon-channels">
      {channels.map(({ id, icon: Icon, title, detail, meta, href, isWhatsApp }, index) => (
        <motion.a
          id={id}
          className={`neon-channel ${isWhatsApp ? 'neon-channel-whatsapp' : ''}`}
          key={title}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22 + index * 0.07 }}
        >
          <span className="neon-channel-icon">
            {isWhatsApp && <span className="neon-channel-pulse-dot" />}
            <Icon size={18} />
          </span>
          <span className="neon-channel-copy">
            <strong>{title}</strong>
            <small>{detail}</small>
          </span>
          <span className={`neon-channel-meta ${isWhatsApp ? 'neon-channel-meta-online' : ''}`}>
            {isWhatsApp && <span className="neon-live-green-dot" />}
            {meta}
          </span>
          <ArrowUpRight className="neon-channel-arrow" size={17} />
        </motion.a>
      ))}
    </div>
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
  const [topic, setTopic] = useState('landing');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.message || sending) return;
    setSending(true);
    setError(null);
    try {
      const result = await sendContactMessage({ data: { ...form, topic } });
      if (!result.ok) {
        setError('No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.');
        return;
      }
      setSent(true);
      const waText = encodeURIComponent(
        `Hola Maxi, soy ${form.name}. Te escribo desde el formulario web.\nBusco: ${topicLabels[topic] ?? topic}\nMi teléfono: ${form.phone}${form.email ? `\nMi email: ${form.email}` : ''}\n\n${form.message}`,
      );
      window.open(`https://wa.me/5492664484918?text=${waText}`, '_blank', 'noopener');
    } catch (err) {
      console.error(err);
      setError('No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.');
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
                  <span className="neon-mono-label">CONTAME TU IDEA</span>
                  <h2>Hagamos que te elijan.</h2>
                </div>
                <span className="neon-reply"><Clock3 size={12} /> respuesta rápida</span>
              </div>
              <p className="neon-form-intro">Contame qué hacés y qué te gustaría que una web o pieza digital empiece a hacer por vos.</p>
              <span className="neon-mono-label">¿QUÉ ESTÁS BUSCANDO?</span>
              <div className="neon-topic-list">
                {contactTopics.map((item) => (
                  <button
                    className={topic === item.id ? 'neon-topic active' : 'neon-topic'}
                    key={item.id}
                    type="button"
                    onClick={() => setTopic(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
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
                  placeholder="Teléfono / WhatsApp *"
                  aria-label="Teléfono o WhatsApp"
                  required
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                />
              </div>
              <input
                className="neon-input"
                type="email"
                placeholder="Tu email (opcional)"
                aria-label="Tu email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <textarea
                className="neon-input neon-textarea"
                rows={4}
                placeholder={topic === 'seo' ? '¿Qué querés que encuentren cuando te busquen?' : '¿Qué te gustaría mejorar o poner en marcha? Contanos sobre tu rubro.'}
                aria-label="Contame tu idea"
                required
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
              <button className="neon-submit" type="submit" disabled={sending} style={sending ? { opacity: 0.7 } : undefined}>
                <span>{sending ? 'Enviando…' : 'Enviar mi consulta'}</span> <Send size={16} />
              </button>
              {error ? (
                <small className="neon-form-note" style={{ color: '#fca5a5' }}>{error}</small>
              ) : (
                <small className="neon-form-note">Sin spam. Te responderemos directamente por WhatsApp para coordinar.</small>
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
              <span className="neon-mono-label">CONSULTA RECIBIDA</span>
              <h2>¡Perfecto! Ya dimos el primer paso.</h2>
              <p>Gracias, {form.name.split(' ')[0] || 'por escribir'}. Nos pondremos en contacto directamente a tu WhatsApp <strong>{form.phone}</strong> para ordenar la propuesta.</p>
              <div style={{ marginTop: '16px' }}>
                <a
                  href={`https://wa.me/5492664484918?text=Hola%20Maxi%2C%20soy%20${encodeURIComponent(form.name)}%2C%20acabo%20de%20enviar%20el%20formulario%20web%20para%20consultar%20por%20${encodeURIComponent(topic)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-portfolio-yellow-button"
                  style={{ display: 'inline-flex', padding: '0 20px', minHeight: '44px', fontSize: '13px' }}
                >
                  <MessageCircle size={16} />
                  <span>O abrir WhatsApp ahora</span>
                </a>
              </div>
              <button className="neon-reset" type="button" onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', message: '' }); }}>Enviar otra consulta</button>
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
                <span>Quiero impulsar mi negocio</span>
                <ArrowUpRight size={17} />
              </a>
              <a
                id="hero-secondary-cta"
                className="neon-text-button"
                href="#diferencia"
              >
                <span>Ver qué necesito</span>
                <ArrowDownRight size={16} />
              </a>
            </div>
            <ContactChannels />
            <div className="neon-proof-stats" aria-label="Lo que puede hacer una web profesional">
              <div><strong>01</strong><span>mensaje claro</span></div>
              <div><strong>02</strong><span>más confianza</span></div>
              <div><strong>∞</strong><span>posibilidades</span></div>
            </div>
          </div>
          <div className="neon-hero-side">
            <div className="neon-photo-card">
              <img src="/assets/hero-business-owner.jpg" alt="Persona revisando una web profesional en su computadora" />
              <div className="neon-photo-caption"><span className="neon-live-dot" /> Tu próxima consulta puede empezar acá</div>
            </div>
            <div className="neon-float-note neon-note-top"><Globe2 size={15} /> presencia que <strong>genera confianza</strong></div>
            <div className="neon-float-note neon-note-bottom"><BarChart3 size={15} /> pensada para <strong>traer oportunidades</strong></div>
            <div className="neon-side-tag"><Rocket size={14} /> hecha para negocios reales</div>
          </div>
        </section>

        <div className="neon-marquee" aria-label="Beneficios de una web profesional">
          <div className="neon-marquee-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <span key={index}>MÁS CONFIANZA <Zap size={13} /> MÁS CLARIDAD <Zap size={13} /> MÁS CONSULTAS <Zap size={13} /> MÁS NEGOCIO <Zap size={13} /></span>
            ))}
          </div>
        </div>

        <section className="neon-split-section neon-container" id="soluciones">
          <div className="neon-section-copy">
            <span className="neon-mono-label">SOLUCIONES DIGITALES</span>
            <h2 className="neon-section-title">No se trata de tener una web. <span>Se trata de que te ayude.</span></h2>
            <p>Elegimos la herramienta correcta para el momento real de tu negocio, sin venderte algo más grande de lo que necesitás.</p>
          </div>
          <div className="neon-solution-stack">
            <a className="neon-solution-card" href="#contacto">
              <span className="neon-card-index">01</span>
              <span className="neon-card-icon"><Globe2 size={20} /></span>
              <span><strong>Sitio web completo</strong><small>Tu casa digital: servicios, contenido, FAQs, contacto y una base sólida de SEO.</small></span>
              <ArrowUpRight size={18} />
            </a>
            <a className="neon-solution-card accent" href="#contacto">
              <span className="neon-card-index">02</span>
              <span className="neon-card-icon"><Target size={20} /></span>
              <span><strong>Landing page</strong><small>Una campaña, un mensaje y una acción clara para convertir visitas en consultas.</small></span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="neon-dark-section" id="diferencia">
          <div className="neon-container neon-dark-grid">
            <div>
              <span className="neon-mono-label">LA DIFERENCIA IMPORTA</span>
              <h2 className="neon-dark-title">Una landing <span>convierte.</span><br />Un sitio completo <b>acompaña.</b></h2>
              <p>La pregunta no es qué se ve más grande. Es qué necesita tu negocio hoy y qué querés construir después.</p>
            </div>
            <div className="neon-comparison">
              <div><span>Promocionar un servicio puntual</span><b>Landing page</b></div>
              <div><span>Una campaña con un CTA</span><b>Landing page</b></div>
              <div><span>Contar todo lo que hacés</span><strong>Sitio completo</strong></div>
              <div><span>Crecer con contenido y SEO</span><strong>Sitio completo</strong></div>
            </div>
          </div>
        </section>

        {/* Portfolio / Casos de Éxito - Prueba de trabajo real */}
        <PortfolioSection />

        {/* SEO / Visibilidad */}
        <section className="neon-visibility neon-container" id="visibilidad">
          <div className="neon-search-card">
            <div className="neon-browser-bar"><i /><i /><i /><small>google.com/search</small></div>
            <div className="neon-search-input"><Search size={14} /> servicios profesionales en mi zona</div>
            <div className="neon-search-result"><b>Tu negocio · Web Oficial</b><span>Presupuestos en el día por WhatsApp. Trabajos con garantía...</span></div>
            <div className="neon-search-result muted"><b>Google Maps & IA</b><span>Ficha verificada y contenido estructurado.</span></div>
            <div className="neon-ai-badge"><Sparkles size={14} /> Optimizado para Google y buscadores con Inteligencia Artificial</div>
          </div>
          <div className="neon-visibility-copy">
            <span className="neon-mono-label">QUE TE ENCUENTREN RÁPIDO</span>
            <h2 className="neon-section-title">SEO para Google y para <span>búsquedas con IA.</span></h2>
            <p className="neon-visibility-summary">
              Cuando alguien busca lo que hacés, tu web tiene que responder al instante con información clara, rápida y confiable.
            </p>
            <ul className="neon-visibility-fast-list">
              <li><CheckCircle2 size={16} /><span><strong>Estructura limpia:</strong> Google comprende tus servicios y ciudad al instante.</span></li>
              <li><CheckCircle2 size={16} /><span><strong>Respuestas directas:</strong> Contenido pensado para resolver dudas y generar consultas.</span></li>
              <li><CheckCircle2 size={16} /><span><strong>Carga en 1 segundo:</strong> Fluidez instantánea en cualquier celular y conexión.</span></li>
            </ul>
            <small className="neon-honesty"><CheckCircle2 size={13} /> Sin humo ni promesas falsas: creamos las mejores bases técnicas para que te descubran.</small>
          </div>
        </section>

        {/* Testimonials / Client Reviews */}
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
            <a href="#soluciones">Soluciones</a>
            <a href="#diferencia">Landing o sitio</a>
            <a href="#portafolio">Portfolio</a>
            <a href="#visibilidad">SEO & IA</a>
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