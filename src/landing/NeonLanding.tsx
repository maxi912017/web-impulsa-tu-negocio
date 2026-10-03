import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Code2, LayoutTemplate, Palette, Rocket, X, Zap } from "lucide-react";
import { WhatsAppFloatingButton } from "./WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { PortfolioSection } from "./PortfolioSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactForm, FAQ } from "./ContactSection";
import { trackWhatsAppClick } from "../lib/analytics";
import "./neon-critical.css";
import "./neon-landing.css";

const WHATSAPP_LINK =
  "https://wa.me/5492664484918?text=Hola%20Impulsa%20Tu%20Negocio%2C%20quiero%20contarles%20mi%20idea";
const INSTAGRAM_LINK =
  "https://www.instagram.com/impulsatunegocio.dev?stkn=MTFyczcxbGM2cGY0Mg%3D%3D";

function HeaderBrand() {
  return (
    <a
      id="header-brand"
      className="neon-brand"
      href="#inicio"
      aria-label="Impulsa Tu Negocio, inicio"
    >
      <span id="header-brand-mark" className="neon-brand-mark">
        <picture>
          <source srcSet="/assets/brand-isologo-dark.webp" type="image/webp" />
          <img
            src="/assets/brand-isologo-dark.png"
            alt="Isologo de Impulsa Tu Negocio - Estudio digital de desarrollo web y software a medida"
            width={44}
            height={44}
            className="neon-brand-img"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </span>
      <span className="neon-brand-lockup">
        <span id="header-brand-name" className="neon-brand-name">
          impulsa tu negocio<span className="neon-brand-dot">.dev</span>
        </span>
        <small>estudio digital · webs que crecen</small>
      </span>
    </a>
  );
}

function FooterBrand() {
  return (
    <a
      id="footer-brand"
      className="neon-footer-brand"
      href="#inicio"
      aria-label="Impulsa Tu Negocio, volver al inicio"
    >
      <div className="neon-footer-brand-mark">
        <picture>
          <source srcSet="/assets/brand-isologo-dark.webp" type="image/webp" />
          <img
            src="/assets/brand-isologo-dark.png"
            alt="Isologo de Impulsa Tu Negocio - Webs y Apps que hacen crecer negocios en Argentina"
            width={76}
            height={76}
            className="neon-footer-brand-img"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="neon-footer-brand-copy">
        <span className="neon-footer-brand-title">
          impulsa tu negocio<span className="neon-footer-brand-dot">.dev</span>
        </span>
        <div className="neon-footer-brand-tagline">
          <span className="neon-tagline-line" aria-hidden="true" />
          <span className="neon-tagline-text">ESTUDIO DIGITAL · WEBS QUE CRECEN</span>
          <span className="neon-tagline-line" aria-hidden="true" />
        </div>
      </div>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header id="site-header" className="neon-header">
      <div className="neon-container neon-header-inner">
        <HeaderBrand />
        <nav id="site-nav" className="neon-nav" aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a id="nav-item-portafolio" href="#portafolio" className="neon-nav-highlight">
            <span>Portfolio</span>
            <span className="neon-nav-badge">Casos</span>
          </a>
          <a id="nav-item-testimonios" href="#testimonios">
            Reseñas
          </a>
          <a id="nav-item-preguntas" href="#preguntas">
            Preguntas
          </a>
        </nav>
        <Button
          id="header-menu-btn"
          variant="ghost"
          size="icon"
          className="neon-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? (
            <X size={20} />
          ) : (
            <span className="neon-menu-lines">
              <i />
              <i />
              <i />
            </span>
          )}
        </Button>
      </div>
      {open && (
        <nav id="site-mobile-nav" className="neon-mobile-nav" aria-label="Navegación móvil">
            <a href="#servicios" onClick={close}>Servicios</a>
          <a href="#portafolio" onClick={close} className="neon-mobile-highlight">
            Portfolio <span className="neon-nav-badge">Casos</span>
          </a>
          <a href="#testimonios" onClick={close}>
            Reseñas
          </a>
          <a href="#preguntas" onClick={close}>
            Preguntas
          </a>
        </nav>
      )}
    </header>
  );
}

function Landing() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="neon-landing">
      {/* Video de fondo global fijo y proporcionado para multipantalla */}
      <div className="neon-hero-bg-wrapper" aria-hidden="true">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="neon-hero-bg-video"
        >
          <source src="/hero-animation.webm" type="video/webm" />
          <source src="/hero%20animation.webm" type="video/webm" />
          Tu navegador no soporta video HTML5.
        </video>

        {/* Capa de opacidad y contraste global fija */}
        <div className="neon-hero-overlay" />
      </div>

      <Header />
      <main>
        <section id="inicio" className="neon-hero-section">
          {/* Contenido principal del Hero */}
          <div className="neon-container neon-hero">
            <div className="neon-hero-copy">
              <div className="neon-hero-brand-headline">
                <span className="neon-hero-brand-badge">
                  <span className="neon-hero-brand-name">
                    impulsa tu negocio<span className="neon-brand-dot">.dev</span>
                  </span>
                  <span className="neon-hero-brand-sep">·</span>
                  <span className="neon-hero-brand-tagline">Estudio digital · Webs que crecen</span>
                </span>
              </div>
              <div className="neon-hero-main-title">
                <span className="neon-hero-title-brand">
                  impulsa tu negocio<span className="neon-brand-dot">.dev</span>
                </span>
              </div>
              <span className="neon-mono-label neon-hero-eyebrow">
                DISEÑO WEB · DESARROLLO · VISIBILIDAD
              </span>
              <h1 className="neon-display">
                Tu negocio merece<br className="neon-hero-break" /> una <span>web que trabaje.</span>
              </h1>
              <p className="neon-hero-intro">
                Una presencia digital profesional para que te entiendan rápido, confíen en vos y te
                encuentren cuando te buscan.
              </p>
              <div id="hero-actions" className="neon-hero-actions">
                <a id="hero-primary-cta" className="neon-primary-button" href="#contacto">
                  <span>Pedir presupuesto</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="neon-proof-stats" role="group" aria-label="Lo que puede hacer una web profesional">
                <div>
                  <strong>01</strong>
                  <span>mensaje claro</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>más confianza</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>más consultas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="neon-services">
          <div className="neon-container">
            <div className="neon-services-heading">
              <span className="neon-mono-label neon-accent-label">QUÉ HACEMOS</span>
              <h2>Elegí cómo querés que tu negocio <span>se vea online.</span></h2>
              <p>Diseñamos y desarrollamos soluciones digitales según lo que necesitás hoy, preparadas para crecer mañana.</p>
            </div>
            <div className="neon-services-grid">
              <article className="neon-service" itemScope itemType="https://schema.org/Service">
                <span className="neon-service-icon" aria-hidden="true"><LayoutTemplate size={23} /></span>
                <h3 itemProp="name">Landing pages</h3>
                <strong>Una página, una sola acción: que te escriban.</strong>
                <p itemProp="description">Ideal para una campaña, un servicio puntual o un lanzamiento. Todo apunta a que la persona consulte por WhatsApp o deje sus datos.</p>
                <ul>
                  <li><Check size={17} />Mensaje claro desde el primer vistazo</li>
                  <li><Check size={17} />Acceso directo a WhatsApp</li>
                  <li><Check size={17} />Pensada para anuncios y redes</li>
                </ul>
              </article>
              <article className="neon-service neon-service-featured" itemScope itemType="https://schema.org/Service">
                <span className="neon-service-icon" aria-hidden="true"><Rocket size={23} /></span>
                <h3 itemProp="name">Sitios web completos</h3>
                <strong>La casa digital de tu negocio.</strong>
                <p itemProp="description">Varias secciones para contar quién sos, qué hacés y por qué elegirte. Una base para aparecer en Google y crecer con el tiempo.</p>
                <ul>
                  <li><Check size={17} />Estructura pensada para buscadores</li>
                  <li><Check size={17} />Servicios, trabajos y contacto</li>
                  <li><Check size={17} />Se amplía a medida que crecés</li>
                </ul>
              </article>
              <article className="neon-service" itemScope itemType="https://schema.org/Service">
                <span className="neon-service-icon" aria-hidden="true"><Code2 size={23} /></span>
                <h3 itemProp="name">Web apps a medida</h3>
                <strong>Automatizá lo que hoy te roba horas.</strong>
                <p itemProp="description">Sistemas hechos para tu forma de trabajar: turnos, presupuestos, gestión de clientes o catálogos autogestionables.</p>
                <ul>
                  <li><Check size={17} />Herramientas hechas para tu negocio</li>
                  <li><Check size={17} />Menos tareas repetitivas</li>
                  <li><Check size={17} />Experiencias fáciles de usar</li>
                </ul>
              </article>
              <article className="neon-service" itemScope itemType="https://schema.org/Service">
                <span className="neon-service-icon" aria-hidden="true"><Palette size={23} /></span>
                <h3 itemProp="name">Identidad &amp; redes</h3>
                <strong>Que tu marca se vea como tu trabajo.</strong>
                <p itemProp="description">Diseño gráfico, piezas para redes y una presencia visual coherente para que te reconozcan y recuerden.</p>
                <ul>
                  <li><Check size={17} />Identidad visual consistente</li>
                  <li><Check size={17} />Contenido para redes</li>
                  <li><Check size={17} />Diseño enfocado en tu público</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="comparativa" className="neon-solutions-matrix-section" aria-label="Comparativa de soluciones de desarrollo web">
          <div className="neon-container">
            <div className="neon-matrix-header">
              <span className="neon-mono-label neon-accent-label">GUÍA RÁPIDA · CHUNKING RAG</span>
              <h2 className="neon-section-title">
                Comparativa de soluciones: <span>elegí según tu objetivo.</span>
              </h2>
              <p className="neon-portfolio-intro">
                Estructura de referencia para entender alcances, plazos y objetivos de cada tipo de desarrollo digital.
              </p>
            </div>
            <div className="neon-matrix-table-wrapper" tabIndex={0} role="region" aria-label="Tabla comparativa de servicios">
              <table className="neon-matrix-table">
                <thead>
                  <tr>
                    <th scope="col">Solución</th>
                    <th scope="col">Objetivo principal</th>
                    <th scope="col">Funcionalidades clave</th>
                    <th scope="col">Plazo estimado</th>
                    <th scope="col">Canal directo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Landing Page</strong></td>
                    <td>Conversión directa y captación de leads en campañas o anuncios</td>
                    <td>Estructura persuasiva, carga ultrarrápida, botón directo a WhatsApp</td>
                    <td>3 a 5 días</td>
                    <td>WhatsApp / Formulario</td>
                  </tr>
                  <tr>
                    <td><strong>Sitio Web Completo</strong></td>
                    <td>Presencia corporativa oficial, catálogo de servicios y SEO en Google</td>
                    <td>Múltiples secciones, optimización en buscadores, formulario de cotización</td>
                    <td>1 a 2 semanas</td>
                    <td>Email & WhatsApp</td>
                  </tr>
                  <tr>
                    <td><strong>Web App &amp; SaaS a Medida</strong></td>
                    <td>Automatización de presupuestos, cobros, turnos y operativa diaria</td>
                    <td>Cálculos con IA, generación de PDFs con logo propio, panel de clientes</td>
                    <td>2 a 4 semanas</td>
                    <td>Asesoramiento directo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="neon-marquee" role="region" aria-label="Beneficios de una web profesional">
          <div className="neon-marquee-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <span key={index}>
                MÁS CONFIANZA <Zap size={13} /> MÁS CLARIDAD <Zap size={13} /> MÁS CONSULTAS{" "}
                <Zap size={13} /> MÁS NEGOCIO <Zap size={13} />
              </span>
            ))}
          </div>
        </div>

        <section id="portafolio" aria-label="Casos de éxito y portafolio">
          <PortfolioSection />
        </section>
        <section id="testimonios" aria-label="Opiniones y testimonios de clientes">
          <TestimonialsSection />
        </section>

        <div id="contacto" className="neon-contact-anchor" aria-hidden="true" />
        <section id="contacto-seccion" className="neon-contact-unified neon-container">
          <div className="neon-contact-unified-header">
            <span id="banner-mono-label" className="neon-mono-label neon-accent-label">
              EL PRÓXIMO PASO ES SIMPLE
            </span>
            <h2 id="banner-title" className="neon-contact-unified-title">
              Hablemos de lo que <span>tu negocio necesita.</span>
            </h2>
            <p className="neon-contact-unified-desc">
              ¿Querés una Web App, Landing Page o Sistema de Gestión a medida de tu negocio?
              Diseñamos soluciones potentes que integran cálculo de costos, Inteligencia
              Artificial, presupuestos en vivo y conexión directa para que automatices tu
              operativa y vendas más.
            </p>
          </div>

          <div id="preguntas" className="neon-contact-grid">
            <div className="neon-contact-left-col">
              <span className="neon-mono-label">PREGUNTAS FRECUENTES</span>
              <h3 className="neon-faq-heading">
                Antes de empezar, <span>hablemos claro.</span>
              </h3>
              <p className="neon-contact-intro-text">
                Una primera conversación también sirve para ordenar. No necesitás llegar con todo
                resuelto.
              </p>
              <FAQ />
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="neon-footer">
        <div className="neon-container neon-footer-container">
          <div className="neon-footer-main">
            <FooterBrand />
            <nav className="neon-footer-links" aria-label="Navegación del pie de página">
              <a href="#inicio">Inicio</a>
              <a href="#servicios">Servicios</a>
              <a href="#portafolio">Portfolio</a>
              <a href="#testimonios">Reseñas</a>
              <a href="#preguntas">Preguntas</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick("footer_nav")}
              >
                WhatsApp
              </a>
            </nav>
          </div>
          <div className="neon-footer-bottom">
            <span className="neon-footer-copy">
              © {new Date().getFullYear()} Impulsa Tu Negocio · Todos los derechos reservados.
            </span>
            <span className="neon-footer-subcopy">
              Desarrollo web de alto impacto & sistemas a medida
            </span>
          </div>
        </div>
      </footer>
      <WhatsAppFloatingButton />
    </div>
  );
}

export default Landing;
