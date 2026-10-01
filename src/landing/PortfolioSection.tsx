import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoPlayOnVisible } from "./AnimatedLogo";
import { CheckCircle2, ArrowUpRight, Sparkles, MessageCircle, X } from "lucide-react";
import "./neon-landing.css";

interface ProjectItem {
  id: string;
  category: "salud" | "apps" | "corporativo" | "servicios" | "graficas" | "todos";
  categoryLabel: string;
  badgeTag: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  whatsappMessage: string;
  accentColor: string;
  showcase: {
    kind: "video" | "image";
    mp4?: string;
    webm?: string;
    poster?: string;
    image?: string;
    caption: string;
  };
}

const portfolioProjects: ProjectItem[] = [
  {
    id: "saas-electricista-pampa",
    category: "apps",
    categoryLabel: "SaaS & Web Apps a Medida",
    badgeTag: "Web App & SaaS de Gestión Eléctrica",
    title: "SaaS integral para electricistas e instaladores matriculados.",
    subtitle:
      "Cálculos técnicos AEA desde cero, creación de listas con IA y presupuestos en PDF con logo propio",
    description:
      "Sistema integral en la nube desarrollado a medida para profesionales del rubro eléctrico. Incluye funciones de cálculo para obras eléctricas desde cero basándose en la guía AEA del Reglamento Argentino (conductores, caídas de tensión y protecciones), creación de listados de materiales utilizando IA (copiás y pegás un listado de cualquier app de notas o WhatsApp), y su función principal: creación de presupuestos profesionales en PDF con logos propios del emprendedor, cálculo de movilidad en mapa en vivo, ajuste por IPC y cotización del Dólar Blue en tiempo real.",
    tags: [
      "Cálculos AEA Desde Cero",
      "Listados con IA (Pegar Notas)",
      "Presupuestos PDF con Logo Propio",
      "Viáticos en Mapa en Vivo",
      "Dólar Blue en Tiempo Real",
      "Planillas Corpico & Cooperativas",
    ],
    metrics: [
      { label: "Clientes en CRM", value: "52" },
      { label: "Obras & Trabajos", value: "+33" },
      { label: "Ahorro administrativo", value: "20h/sem" },
    ],
    features: [
      "Cálculos de obras eléctricas desde cero basados en la guía AEA del Reglamento Argentino (calibre de cables, térmicas, caídas de tensión y DPMS)",
      "Creación de listados de materiales utilizando IA: copiás y pegás un listado de notas o WhatsApp y la IA computa y clasifica al instante",
      "Creación de presupuestos en PDF con logos y membrete propio del emprendedor, desglose por etapas y ajuste por IPC",
      "Cálculo de movilidad y viáticos en mapa en vivo con cálculo automático de distancia y costo por kilómetro",
      "Cotizador sincronizado con el Dólar Blue en tiempo real para cotizaciones seguras",
      "Generación y gestión de planillas técnicas y trámites ante cooperativas eléctricas (Corpico)",
      "Panel IA Global con asistente por voz, detección de cobros pendientes y alertas de calibración de herramientas",
      "Comandos bidireccionales por WhatsApp y Telegram para cargar gastos e ingresos directo desde el lugar de trabajo",
    ],
    whatsappMessage:
      "Hola Maxi de Impulsa Tu Negocio, vi el SaaS de Gestión para Electricistas (Instalaciones Eléctricas Pampa) con cálculos AEA, listados con IA y presupuestos PDF con logo propio, y quiero cotizar una Web App similar para mi rubro.",
    accentColor: "#38bdf8",
    showcase: {
      kind: "video",
      mp4: "/assets/electricista-saas-demo.mp4",
      webm: "/assets/electricista-saas-demo.webm",
      poster: "/assets/electricista-saas-poster.webp",
      caption:
        "Recorrido real del sistema de gestión para electricistas: cálculos AEA, listados de materiales con IA y presupuestos en PDF con logo propio.",
    },
  },
  {
    id: "landing-inmobiliaria-propiedades",
    category: "corporativo",
    categoryLabel: "Inmobiliarias & Propiedades",
    badgeTag: "Landing Inmobiliaria + CRM de Consultas",
    title: "Landing inmobiliaria con catálogo de propiedades y reservas.",
    subtitle: "Catálogo de propiedades, consultas centralizadas y reservas confirmadas online",
    description:
      "Sitio desarrollado para inmobiliarias y desarrollos de propiedades: catálogo con fotos en alta calidad, fichas de cada unidad, buscador por zona y precio, y un panel donde cada consulta queda registrada para su seguimiento hasta concretar la reserva.",
    tags: [
      "Catálogo de Propiedades",
      "Buscador por Zona y Precio",
      "Reserva Online",
      "Panel de Consultas",
      "WhatsApp Directo",
    ],
    metrics: [
      { label: "Consultas mensuales", value: "+5.6k" },
      { label: "Tasa de conversión", value: "4.53%" },
      { label: "Reservas concretadas", value: "+22%" },
    ],
    features: [
      "Catálogo de propiedades con galería, ficha técnica, ubicación y estado (disponible, reservada, vendida)",
      "Buscador y filtros por zona, tipo de operación, ambientes y rango de precio",
      "Formulario de reserva online con confirmación automática y aviso instantáneo al asesor",
      "Panel de consultas tipo CRM con seguimiento de cada interesado y métricas de rendimiento",
      "Botón de WhatsApp por propiedad con mensaje precargado del inmueble consultado",
      "Diseño adaptado a celular y carga optimizada para recorrer decenas de fotos sin demoras",
    ],
    whatsappMessage:
      "Hola Maxi de Impulsa Tu Negocio, vi la web inmobiliaria con catálogo de propiedades, reservas online y panel de consultas, y quiero cotizar algo similar para mi inmobiliaria.",
    accentColor: "#38bdf8",
    showcase: {
      kind: "video",
      mp4: "/assets/inmobiliaria-landing.mp4",
      webm: "/assets/inmobiliaria-landing.webm",
      poster: "/assets/inmobiliaria-landing-poster.webp",
      caption:
        "Web para inmobiliaria: catálogo de propiedades con fotos, buscador por zona y precio, reserva online confirmada y panel de consultas con métricas de ventas.",
    },
  },
  {
    id: "kamil-ai-gestion-salon",
    category: "salud",
    categoryLabel: "Salud, Estética & Bienestar",
    badgeTag: "Landing + App de Gestión con IA",
    title: "Kamil.ai: gestión diaria con IA para salones y spas.",
    subtitle: "Agenda, inventario, finanzas y marketing de un salón o spa, todo en un solo lugar",
    description:
      "Presentación de producto y app de gestión para salones de belleza, spas y centros de estética. Automatiza la agenda de turnos, controla el stock de productos, ordena las finanzas del mes y sugiere acciones de marketing, con paneles claros tanto en celular como en computadora.",
    tags: [
      "Agenda Automática",
      "Control de Stock",
      "Finanzas del Negocio",
      "Marketing con IA",
      "App Móvil y Escritorio",
    ],
    metrics: [
      { label: "Negocios usando el sistema", value: "+500" },
      { label: "Facturación mensual gestionada", value: "$540k" },
      { label: "Menos quiebres de stock", value: "-90%" },
    ],
    features: [
      "Agenda inteligente de turnos con recordatorios automáticos y menos ausencias",
      "Control de inventario con alertas de productos por agotarse antes de que falten",
      "Panel financiero con ingresos, gastos y ticket promedio actualizado al día",
      "Sugerencias de marketing y campañas generadas con Inteligencia Artificial",
      "Versión móvil y de escritorio con la misma información sincronizada en vivo",
      "Landing de presentación con prueba gratuita y contacto directo por WhatsApp",
    ],
    whatsappMessage:
      "Hola Maxi de Impulsa Tu Negocio, vi el sistema Kamil.ai de gestión con IA para salones y spas (agenda, stock, finanzas y marketing) y quiero cotizar algo similar para mi negocio.",
    accentColor: "#a855f7",
    showcase: {
      kind: "video",
      mp4: "/assets/video-ia-portfolio.mp4",
      webm: "/assets/video-ia-portfolio.webm",
      poster: "/assets/video-ia-portfolio-poster.webp",
      caption:
        "Kamil.ai: landing y app de gestión con IA para salones y spas, con agenda de turnos, inventario, finanzas y marketing en celular y computadora.",
    },
  },
  {
    id: "landing-gastronomia-reservas",
    category: "servicios",
    categoryLabel: "Gastronomía & Locales",
    badgeTag: "Landing Gastronómica con Reservas",
    title: "Landing gastronómica con carta digital y reservas por WhatsApp.",
    subtitle: "Carta digital, fotos que abren el apetito y reservas en un solo toque",
    description:
      "Sitio de una página para restaurantes, bares y cafeterías: presentación de la propuesta gastronómica, carta digital con precios siempre actualizados, galería de platos y reserva directa por WhatsApp sin intermediarios ni comisiones.",
    tags: ["Carta Digital", "Reservas por WhatsApp", "Galería de Platos", "Código QR en Mesa"],
    metrics: [
      { label: "Más reservas directas", value: "+38%" },
      { label: "Carga de la página", value: "< 1.2s" },
    ],
    features: [
      "Carta digital con precios editables al instante, sin reimprimir menús",
      "Reserva de mesa por WhatsApp con mensaje precargado de día, horario y cantidad de personas",
      "Galería de platos en alta calidad optimizada para celulares",
      "Código QR para las mesas que lleva directo a la carta online",
    ],
    whatsappMessage:
      "Hola Maxi de Impulsa Tu Negocio, quiero una landing gastronómica con carta digital y reservas por WhatsApp para mi local.",
    accentColor: "#d7fe3b",
    showcase: {
      kind: "image",
      image: "/assets/landing-gastronomia.jpg",
      caption:
        "Landing de restaurante: portada con el plato estrella, botón de reserva por WhatsApp y carta digital con precios actualizados.",
    },
  },
];

const categories = [
  { id: "todos", label: "Todos los casos" },
  { id: "apps", label: "SaaS & Web Apps" },
  { id: "salud", label: "Salud & Estética" },
  { id: "corporativo", label: "Inmobiliaria & Empresas" },
  { id: "servicios", label: "Gastronomía & Servicios" },
];

/* -------------------------------------------------------------------------- */
/* Visores de proyecto: video en bucle (pausa y silencio fuera de pantalla)    */
/* e imagen de vista previa                                                    */
/* -------------------------------------------------------------------------- */

function ProjectShowcase({ project }: { project: ProjectItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoPlayOnVisible(videoRef, project.showcase.kind !== "video");

  return (
    <div
      className="neon-showcase-inner"
      style={{ padding: "0", overflow: "hidden", background: "#020617", display: "block" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          maxHeight: "420px",
          background: "#020617",
          overflow: "hidden",
        }}
      >
        {project.showcase.kind === "video" ? (
          <video
            ref={videoRef}
            poster={project.showcase.poster}
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            preload="metadata"
            aria-label={project.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src={project.showcase.mp4} type="video/mp4" />
            <source src={project.showcase.webm} type="video/webm" />
          </video>
        ) : (
          <img
            src={project.showcase.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === "todos"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);


  return (
    <section className="neon-portfolio-section">
      <div className="neon-container">
        {/* Section Header */}
        <div className="neon-portfolio-header">
          <div className="neon-portfolio-heading">
            <span className="neon-mono-label neon-accent-label">
              <Sparkles size={13} /> PORTFOLIO / CASOS DE ÉXITO
            </span>
            <h2 className="neon-section-title">
              Negocios reales. <span>Resultados que se ven.</span>
            </h2>
            <p className="neon-portfolio-intro">
              No se trata solo de un diseño bonito. Mirá cómo desarrollamos Web Apps y sistemas de
              gestión a medida para electricistas, profesionales de la salud, técnicos y empresas
              que automatizan su operativa y multiplican sus cierres.
            </p>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="neon-portfolio-filters" role="tablist" aria-label="Categorías de proyectos">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`neon-portfolio-tab ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="neon-portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const waUrl = `https://wa.me/5492664484918?text=${encodeURIComponent(project.whatsappMessage)}`;

              return (
                <motion.div
                  layout
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="neon-project-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  {/* Vista previa del proyecto (pantalla de notebook) */}
                  <div className="neon-mockup-wrapper">
                    <div className="neon-laptop-frame">
                      <div className="neon-laptop-camera" />
                      <div className="neon-laptop-screen">
                        <ProjectShowcase project={project} />
                      </div>
                      <div className="neon-laptop-base" />
                    </div>
                  </div>

                  {/* Pie descriptivo del proyecto */}
                  <p className="neon-project-showcase-caption">{project.showcase.caption}</p>

                  {/* Project Info Body */}
                  <div className="neon-project-content">
                    <div className="neon-project-meta-row">
                      <span className="neon-project-category-tag neon-project-badge-tag">
                        {project.badgeTag}
                      </span>
                      <div className="neon-project-metrics-chips">
                        {project.metrics.map((m, i) => (
                          <span key={i} className="neon-project-metric-badge">
                            <strong>{m.value}</strong> {m.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="neon-project-title">{project.title}</h3>
                    <p className="neon-project-description">{project.description}</p>

                    {/* Features list */}
                    <ul className="neon-project-features">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <li key={i}>
                          <CheckCircle2 size={15} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="neon-project-tags">
                      {project.tags.map((t, i) => (
                        <span key={i} className="neon-project-tag">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="neon-project-actions">
                      <a
                        id={`btn-whatsapp-project-${project.id}`}
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="neon-whatsapp-project-btn"
                      >
                        <span className="neon-whatsapp-pulse-ring" />
                        <MessageCircle size={17} />
                        <span>Quiero un desarrollo similar</span>
                      </a>

                      <button
                        type="button"
                        className="neon-project-detail-btn"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Ver detalles de ${project.title}`}
                      >
                        <span>Ver funciones y flujo</span>
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="neon-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="neon-modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
            >
              <button
                type="button"
                className="neon-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>

              <div className="neon-modal-header">
                <span className="neon-project-category-tag">{selectedProject.categoryLabel}</span>
                <h2 id="project-modal-title">{selectedProject.title}</h2>
                <p className="neon-modal-subtitle">{selectedProject.subtitle}</p>
              </div>

              <div className="neon-modal-body">
                <div className="neon-modal-section">
                  <h3>¿Qué resuelve este sistema?</h3>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="neon-modal-section">
                  <h3>Funcionalidades y módulos incluidos en este desarrollo</h3>
                  <ul className="neon-modal-features-grid">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="neon-modal-metrics-box">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="neon-modal-metric">
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="neon-modal-note">
                  <span className="neon-portfolio-note-dot" />
                  <p>
                    <strong>Desarrollo 100% a medida:</strong> Cálculos específicos de tu industria,
                    cotizaciones de insumos en vivo, alertas con Inteligencia Artificial, bots de
                    WhatsApp/Telegram y flujos adaptados a la operatoria exacta de tu empresa.
                  </p>
                </div>
              </div>

              <div className="neon-modal-footer">
                <a
                  href={`https://wa.me/5492664484918?text=${encodeURIComponent(selectedProject.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-whatsapp-hero-cta"
                >
                  <span className="neon-whatsapp-pulse-ring" />
                  <MessageCircle size={18} />
                  <span>Pedir presupuesto para mi proyecto por WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
