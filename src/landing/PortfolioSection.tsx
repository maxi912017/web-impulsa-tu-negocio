import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Smartphone,
  Laptop,
  Monitor,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  FileText,
  Clock,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Eye,
  X,
  Layers,
  Star,
  Activity,
  HeartPulse,
  UserCheck,
  Building2,
  Wrench,
  BarChart3,
  Share2,
  Zap,
  CloudSun,
  DollarSign,
  Mic,
  Bot,
  Bell,
  Send,
  Cpu,
  FolderOpen,
  Calculator,
  AlertTriangle,
  PlusCircle,
  HardHat,
  MapPin,
  Car,
  Download,
  RotateCcw,
  Film,
  Radio,
} from 'lucide-react';

interface ProjectItem {
  id: string;
  category: 'salud' | 'apps' | 'corporativo' | 'servicios' | 'graficas' | 'todos';
  categoryLabel: string;
  badgeTag: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  whatsappMessage: string;
  mockupType: 'salud-medica' | 'web-app-dashboard' | 'web-corporativa' | 'servicios-oficios' | 'social-creatives';
  accentColor: string;
  laptopView: {
    title: string;
    badge: string;
    items: { label: string; val: string; status?: string; badgeColor?: string }[];
    chartValue?: string;
  };
  mobileView: {
    title: string;
    action: string;
    status: string;
  };
}

const portfolioProjects: ProjectItem[] = [
  {
    id: 'saas-electricista-pampa',
    category: 'apps',
    categoryLabel: 'SaaS & Web Apps a Medida',
    badgeTag: 'Web App & SaaS de Gestión Eléctrica',
    title: 'SaaS integral para electricistas e instaladores matriculados.',
    subtitle:
      'Cálculos técnicos AEA desde cero, creación de listas con IA y presupuestos en PDF con logo propio',
    description:
      'Sistema integral en la nube desarrollado a medida para profesionales del rubro eléctrico. Incluye funciones de cálculo para obras eléctricas desde cero basándose en la guía AEA del Reglamento Argentino (conductores, caídas de tensión y protecciones), creación de listados de materiales utilizando IA (copiás y pegás un listado de cualquier app de notas o WhatsApp), y su función principal: creación de presupuestos profesionales en PDF con logos propios del emprendedor, cálculo de movilidad en mapa en vivo, ajuste por IPC y cotización del Dólar Blue en tiempo real.',
    tags: [
      'Cálculos AEA Desde Cero',
      'Listados con IA (Pegar Notas)',
      'Presupuestos PDF con Logo Propio',
      'Viáticos en Mapa en Vivo',
      'Dólar Blue en Tiempo Real',
      'Planillas Corpico & Cooperativas',
    ],
    metrics: [
      { label: 'Clientes en CRM', value: '52' },
      { label: 'Obras & Trabajos', value: '+33' },
      { label: 'Ahorro administrativo', value: '20h/sem' },
    ],
    features: [
      'Cálculos de obras eléctricas desde cero basados en la guía AEA del Reglamento Argentino (calibre de cables, térmicas, caídas de tensión y DPMS)',
      'Creación de listados de materiales utilizando IA: copiás y pegás un listado de notas o WhatsApp y la IA computa y clasifica al instante',
      'Creación de presupuestos en PDF con logos y membrete propio del emprendedor, desglose por etapas y ajuste por IPC',
      'Cálculo de movilidad y viáticos en mapa en vivo con cálculo automático de distancia y costo por kilómetro',
      'Cotizador sincronizado con el Dólar Blue en tiempo real para cotizaciones seguras',
      'Generación y gestión de planillas técnicas y trámites ante cooperativas eléctricas (Corpico)',
      'Panel IA Global con asistente por voz, detección de cobros pendientes y alertas de calibración de herramientas',
      'Comandos bidireccionales por WhatsApp y Telegram para cargar gastos e ingresos directo desde el lugar de trabajo',
    ],
    whatsappMessage:
      'Hola Maxi de Impulsa Tu Negocio, vi el SaaS de Gestión para Electricistas (Instalaciones Eléctricas Pampa) con cálculos AEA, listados con IA y presupuestos PDF con logo propio, y quiero cotizar una Web App similar para mi rubro.',
    mockupType: 'web-app-dashboard',
    accentColor: '#38bdf8',
    laptopView: {
      title: 'Instalaciones Eléctricas Pampa · v1.14.5',
      badge: 'Admin Propietario',
      chartValue: '52 Clientes · 23 Presupuestos',
      items: [
        { label: 'Cálculos AEA Desde Cero', val: 'Normativa', status: 'Activo', badgeColor: '#a855f7' },
        { label: 'Listado con IA (Pegar Notas)', val: 'Autocómputo', status: 'En vivo', badgeColor: '#38bdf8' },
        { label: 'Presupuestos PDF con Logo', val: 'Personalizado', status: 'Listo', badgeColor: '#4ade80' },
      ],
    },
    mobileView: {
      title: 'Instalaciones Pampa',
      action: 'Crear Presupuesto con Logo',
      status: 'Panel IA Activo',
    },
  },
  {
    id: 'landing-salud-estetica',
    category: 'salud',
    categoryLabel: 'Salud, Estética & Profesionales',
    badgeTag: 'Landing Page Médica & Salud',
    title: 'Presencia digital para profesionales de la salud y estética.',
    subtitle: 'Convierte visitas y seguidores en pacientes con cita confirmada',
    description:
      'Diseño web estratégico para médicos, odontólogos, traumatólogos y centros de estética. Comunica tratamientos con claridad, genera máxima confianza desde el primer contacto y habilita agendamiento directo por WhatsApp.',
    tags: ['Agenda Online', 'Link en Bio Optimizado', 'Testimonios Reales', 'WhatsApp Directo'],
    metrics: [
      { label: 'Cierre de turnos', value: '+75%' },
      { label: 'Consultas aclaradas', value: '80%' },
    ],
    features: [
      'Presentación clara de especialidades, matrícula y trayectoria profesional',
      'Botón destacado para agendar consultas por WhatsApp en un solo toque',
      'Sección de testimonios reales y opiniones verificadas de pacientes',
      'Optimización extrema para celulares: el 80% de los pacientes busca desde su móvil',
    ],
    whatsappMessage:
      'Hola Impulsa Tu Negocio, vi el caso de Landing Médica/Salud y quiero consultar para mi consultorio.',
    mockupType: 'salud-medica',
    accentColor: '#10b981',
    laptopView: {
      title: 'Dr. Martín Herrera · Traumatología & Ortopedia',
      badge: 'CABA & Turnos Online',
      chartValue: '★ 5.0 (140+ Pacientes)',
      items: [
        { label: 'Diagnóstico y Tratamientos', val: 'Personalizado', status: 'En consultorio', badgeColor: '#10b981' },
        { label: 'Agendar Turno por WhatsApp', val: 'Horarios libres', status: 'Respuesta rápida', badgeColor: '#d7fe3b' },
        { label: 'Convenios & Obras Sociales', val: 'Reintegros', status: 'Verificado', badgeColor: '#38bdf8' },
      ],
    },
    mobileView: {
      title: 'Dr. Martín Herrera',
      action: 'Agendar Consulta por WhatsApp',
      status: 'Atención personalizada',
    },
  },
  {
    id: 'web-corporativa-conecta',
    category: 'corporativo',
    categoryLabel: 'Web Corporativa & Empresas',
    badgeTag: 'Sitio Web Corporativo',
    title: 'Web corporativa para marcas y empresas con visión.',
    subtitle: 'Estrategias digitales que conectan marcas con personas y transmiten solidez',
    description:
      'Desarrollo web corporativo pensado para presentar tu propuesta de valor, equipo, casos de éxito y metodología. Diseñado para proyectar autoridad inmediata ante clientes corporativos y licitaciones.',
    tags: ['Identidad Corporativa', 'Diseño Responsive', '+120 Proyectos', 'Google & SEO'],
    metrics: [
      { label: 'Satisfacción clientes', value: '98%' },
      { label: 'Velocidad de carga', value: '< 1.1s' },
    ],
    features: [
      'Estructura modular con pilares de Estrategia, Diseño UX/UI y Desarrollo',
      'Diseño sobrio y de alto impacto adaptado a la identidad de tu empresa',
      'Módulo de casos de éxito con métricas de impacto reales',
      'Formulario de contacto corporativo y enlace directo a gerencia comercial',
    ],
    whatsappMessage:
      'Hola Impulsa Tu Negocio, quiero cotizar un Sitio Web Corporativo para mi empresa.',
    mockupType: 'web-corporativa',
    accentColor: '#38bdf8',
    laptopView: {
      title: 'Conecta. · Estrategias Digitales para Marcas',
      badge: 'Web Oficial 2026',
      chartValue: '+120 Proyectos Entregados',
      items: [
        { label: 'Estrategia Digital & Branding', val: 'Fase 01', status: 'Alineado', badgeColor: '#38bdf8' },
        { label: 'Diseño UX/UI de Alta Conversión', val: 'Fase 02', status: 'Validado', badgeColor: '#d7fe3b' },
        { label: 'Desarrollo Web & Escalabilidad', val: 'Fase 03', status: 'Producción', badgeColor: '#22c55e' },
      ],
    },
    mobileView: {
      title: 'Soluciones Digitales',
      action: 'Ver Casos y Contactar',
      status: 'Disponible',
    },
  },
  {
    id: 'web-oficios-tecnicos',
    category: 'servicios',
    categoryLabel: 'Servicios Profesionales & Técnicos',
    badgeTag: 'Sitio Completo de Servicios',
    title: 'Presencia online para servicios profesionales y oficios.',
    subtitle: 'Muestra tus trabajos realizados y permite cotizar en un clic por WhatsApp',
    description:
      'Creamos un espacio digital claro para servicios técnicos, instalaciones eléctricas, sanitarias o talleres, donde los clientes pueden consultar zonas de cobertura, ver la calidad de tus trabajos antes/después y solicitar presupuesto en el día.',
    tags: ['Presupuesto en 1 Clic', 'Galería de Trabajos', 'Garantía Escrita', 'WhatsApp Directo'],
    metrics: [
      { label: 'Cierre presupuestos', value: '+45%' },
      { label: 'Tiempo de respuesta', value: '< 3 min' },
    ],
    features: [
      'Catálogo visual de trabajos anteriores con fotos de calidad y detalles de obra',
      'Botón flotante a WhatsApp con mensaje automático predefinido según el servicio',
      'Mapa de zonas de cobertura, formas de pago aceptadas y certificados',
      'Carga ultrarrápida incluso en conexiones móviles 3G/4G',
    ],
    whatsappMessage:
      'Hola Impulsa Tu Negocio, quiero un sitio web para mi negocio de servicios profesionales.',
    mockupType: 'servicios-oficios',
    accentColor: '#d7fe3b',
    laptopView: {
      title: 'Servicios Técnicos & Mantenimiento · Web Oficial',
      badge: 'Presupuestos en el día',
      chartValue: '+60 Consultas / mes',
      items: [
        { label: 'Instalaciones Certificadas', val: 'Garantía 1 año', status: 'Verificado', badgeColor: '#22c55e' },
        { label: 'Solicitar Presupuesto Online', val: 'WhatsApp Directo', status: 'En línea', badgeColor: '#d7fe3b' },
        { label: 'Obras y Trabajos Realizados', val: '24 Casos', status: 'Fotos HD', badgeColor: '#38bdf8' },
      ],
    },
    mobileView: {
      title: 'Pedir Presupuesto',
      action: 'Cotizar por WhatsApp',
      status: 'Respuesta inmediata',
    },
  },
  {
    id: 'diseno-digital-graficas-redes',
    category: 'graficas',
    categoryLabel: 'Diseño Digital & Redes',
    badgeTag: 'Diseño Digital & Flyers',
    title: 'Gráficas de alto impacto que captan clientes en 5 segundos.',
    subtitle: 'Piezas para Instagram, flyers promocionales y menús digitales interactivos',
    description:
      'El 90% de la decisión visual ocurre en los primeros segundos. Diseñamos piezas para historias, carruseles educativos y cartas digitales con QR pensadas para captar miradas, generar interacción y vender.',
    tags: ['Carruseles de Instagram', 'Flyers Promocionales', 'Menús QR', 'Identidad Visual'],
    metrics: [
      { label: 'Atención visual', value: '< 3 seg' },
      { label: 'Interacción en feed', value: '+65%' },
    ],
    features: [
      'Diseño de carruseles de Instagram con ganchos visuales que detienen el scroll',
      'Flyers de promociones y lanzamientos para historias, estados y anuncios',
      'Menús digitales y cartas interactivas con QR para locales comerciales',
      'Entrega en alta resolución listos para publicar en redes y pauta publicitaria',
    ],
    whatsappMessage:
      'Hola Impulsa Tu Negocio, quiero packs de diseño gráfico y piezas para redes sociales.',
    mockupType: 'social-creatives',
    accentColor: '#a855f7',
    laptopView: {
      title: 'Pack de Contenido Visual & Redes · Impulsa',
      badge: 'Feed & Stories HD',
      chartValue: '+3.500 Alcance orgánico',
      items: [
        { label: 'Carrusel: "Tu web puede ser linda..."', val: '1080x1350', status: 'Viral', badgeColor: '#a855f7' },
        { label: 'Flyer: Hero Section de Alta Conversión', val: '1080x1920', status: 'Listo', badgeColor: '#22c55e' },
        { label: 'Story: Automatización de WhatsApp', val: 'Interactivo', status: 'Publicado', badgeColor: '#d7fe3b' },
      ],
    },
    mobileView: {
      title: 'Promo Semanal',
      action: 'Ver Carrusel Completo',
      status: 'Diseño HD',
    },
  },
];

const categories = [
  { id: 'todos', label: 'Todos los casos' },
  { id: 'apps', label: 'SaaS & Web Apps' },
  { id: 'salud', label: 'Salud & Estética' },
  { id: 'corporativo', label: 'Web Corporativa' },
  { id: 'servicios', label: 'Servicios & Oficios' },
  { id: 'graficas', label: 'Diseño & Redes' },
];

/* -------------------------------------------------------------------------- */
/* Visual Mockup Device Renderers (Fidelity based on Real SaaS & References)  */
/* -------------------------------------------------------------------------- */

function MockupSaludView() {
  return (
    <div className="neon-mockup-inner neon-mockup-salud">
      {/* Clinic Header Bar */}
      <div className="neon-mockup-clinic-header">
        <div className="neon-mockup-clinic-brand">
          <div className="neon-clinic-avatar">
            <HeartPulse size={11} />
          </div>
          <div>
            <strong>Dr. Martín Herrera</strong>
            <small>Traumatología & Ortopedia</small>
          </div>
        </div>
        <div className="neon-mockup-clinic-badge">
          <span className="neon-live-green-dot" /> Agenda Abierta
        </div>
      </div>

      {/* Hero Body */}
      <div className="neon-mockup-clinic-hero">
        <div className="neon-mockup-clinic-headline">
          <span className="neon-mockup-mini-tag">Salud & Bienestar</span>
          <h5>Cuidar tu movimiento, es cuidar tu calidad de vida.</h5>
          <p>Diagnóstico y tratamiento personalizado para volver a tu rutina sin dolor.</p>
        </div>

        {/* CTA Button */}
        <div className="neon-mockup-clinic-cta-row">
          <div className="neon-mockup-clinic-btn">
            <Calendar size={9} /> Agendar consulta
          </div>
          <div className="neon-mockup-clinic-stars">
            <span>★★★★★</span> <b>5.0</b> (140+ opiniones)
          </div>
        </div>

        {/* 4 Feature Chips */}
        <div className="neon-mockup-clinic-chips">
          <div className="neon-mockup-clinic-chip">
            <CheckCircle2 size={8} /> Tratamientos personalizados
          </div>
          <div className="neon-mockup-clinic-chip">
            <ShieldCheck size={8} /> Tecnología de vanguardia
          </div>
          <div className="neon-mockup-clinic-chip">
            <UserCheck size={8} /> Atención cálida y humana
          </div>
          <div className="neon-mockup-clinic-chip">
            <Activity size={8} /> Resultados verificados
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* VIDEO SHOWCASE VIEWER: Video Continuo Infinito Software Electricista       */
/* -------------------------------------------------------------------------- */

function MockupElectricistaVideoViewer() {
  return (
    <div
      className="neon-mockup-inner neon-mockup-webapp"
      style={{ padding: '0', overflow: 'hidden', background: '#020617', display: 'block' }}
    >
      {/* Video Canvas Container (Infinite Continuous Loop) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          maxHeight: '420px',
          background: '#020617',
          overflow: 'hidden'
        }}
      >
        <video
          src="/assets/electricista-saas-demo.webm"
          poster="/assets/electricista-saas-poster.webp"
          muted
          autoPlay
          loop
          playsInline
          controls={false}
          preload="metadata"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}

function MockupCorporateView() {
  return (
    <div className="neon-mockup-inner neon-mockup-corporate">
      {/* Corporate Nav */}
      <div className="neon-mockup-corp-nav">
        <div className="neon-mockup-corp-logo">
          <Building2 size={12} color="#38bdf8" />
          <span>Conecta.</span>
        </div>
        <div className="neon-mockup-corp-links">
          <span>Nosotros</span>
          <span>Servicios</span>
          <span>Casos</span>
          <span className="highlight">Contacto</span>
        </div>
      </div>

      {/* Corporate Hero */}
      <div className="neon-mockup-corp-hero">
        <span className="neon-mockup-mini-tag sky">Presencia Corporativa 2026</span>
        <h5>Estrategias digitales que conectan marcas con personas.</h5>
        <p>Impulsamos a empresas con presencia sólida, diseño UX/UI de vanguardia y tecnología escalable.</p>

        {/* 2 Big stats */}
        <div className="neon-mockup-corp-stats-row">
          <div className="neon-mockup-corp-stat">
            <strong>+120</strong>
            <small>Proyectos entregados</small>
          </div>
          <div className="neon-mockup-corp-stat">
            <strong>98%</strong>
            <small>Satisfacción de clientes</small>
          </div>
          <div className="neon-mockup-corp-btn">
            <span>Conocé más</span>
            <ArrowUpRight size={10} />
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="neon-mockup-corp-pillars">
          <div className="corp-pillar">
            <b>01 Estrategia</b>
            <span>Análisis de mercado</span>
          </div>
          <div className="corp-pillar">
            <b>02 Diseño</b>
            <span>Identidad & UX/UI</span>
          </div>
          <div className="corp-pillar">
            <b>03 Desarrollo</b>
            <span>Código rápido & SEO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupServicesTradesView() {
  return (
    <div className="neon-mockup-inner neon-mockup-trades">
      {/* Trade Header */}
      <div className="neon-mockup-trades-header">
        <div className="neon-mockup-trades-brand">
          <Wrench size={12} color="#d7fe3b" />
          <div>
            <strong>Servicios Técnicos & Obras</strong>
            <small>Presupuestos en el día por WhatsApp</small>
          </div>
        </div>
        <span className="neon-mockup-badge-yellow">Técnicos Certificados</span>
      </div>

      {/* Trade Hero */}
      <div className="neon-mockup-trades-hero">
        <span className="neon-mockup-mini-tag yellow">Atención en toda la zona</span>
        <h5>Instalaciones profesionales y mantenimiento con garantía escrita.</h5>
        <p>Mirá nuestros trabajos antes/después y cotizá en un solo clic.</p>

        {/* Action button */}
        <div className="neon-mockup-trades-cta-bar">
          <div className="neon-mockup-trades-wa-btn">
            <MessageCircle size={10} /> Cotizar por WhatsApp
          </div>
          <span className="neon-mockup-trades-time">
            <Clock size={9} /> Respuesta en &lt; 3 min
          </span>
        </div>

        {/* Job previews */}
        <div className="neon-mockup-trades-cases">
          <div className="trade-case-card">
            <span className="case-title">Instalación Eléctrica Trifásica</span>
            <span className="case-badge">Garantía 1 Año</span>
          </div>
          <div className="trade-case-card">
            <span className="case-title">Mantenimiento Preventivo Edilicio</span>
            <span className="case-badge">Finalizado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupSocialCreativesView() {
  return (
    <div className="neon-mockup-inner neon-mockup-social">
      {/* Social header */}
      <div className="neon-mockup-social-header">
        <div className="neon-mockup-social-brand">
          <Share2 size={11} color="#a855f7" />
          <span>Contenido & Redes de Alto Impacto</span>
        </div>
        <span className="neon-mockup-badge-purple">Formato 1080x1350</span>
      </div>

      {/* Instagram carousel style cards */}
      <div className="neon-mockup-social-carousel">
        <div className="neon-mockup-social-card slide-1">
          <div className="social-card-tag">⚠️ ESTRATEGIA WEB</div>
          <h4>Tu web puede ser linda... y no vender nada.</h4>
          <p>Descubrí cómo estructurar una landing page que convierta visitas en clientes reales.</p>
          <div className="social-card-footer">
            <span>Deslizá para ver el método ➜</span>
          </div>
        </div>

        <div className="neon-mockup-social-card slide-2">
          <div className="social-card-tag">⏱️ 5 SEGUNDOS CLAVE</div>
          <h4>Hero Section: El 90% de la decisión pasa ahí.</h4>
          <p>La primera impresión ya no es cara a cara. Es digital.</p>
          <div className="social-card-footer">
            <span>bex / Impulsa Tu Negocio</span>
          </div>
        </div>
      </div>

      {/* Metric badge */}
      <div className="neon-mockup-social-stat">
        <Sparkles size={10} color="#d7fe3b" />
        <span>+65% Interacción orgánica y mensajes directos</span>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === 'todos'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);

  const renderMockupContent = (mockupType: ProjectItem['mockupType']) => {
    switch (mockupType) {
      case 'web-app-dashboard':
        return <MockupElectricistaVideoViewer />;
      case 'salud-medica':
        return <MockupSaludView />;
      case 'web-corporativa':
        return <MockupCorporateView />;
      case 'servicios-oficios':
        return <MockupServicesTradesView />;
      case 'social-creatives':
        return <MockupSocialCreativesView />;
      default:
        return <MockupElectricistaVideoViewer />;
    }
  };

  return (
    <section id="portafolio" className="neon-portfolio-section">
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
              No se trata solo de un diseño bonito. Mirá cómo desarrollamos Web Apps y sistemas de gestión a medida para electricistas, profesionales de la salud, técnicos y empresas que automatizan su operativa y multiplican sus cierres.
            </p>
          </div>

          <div className="neon-portfolio-note">
            <span className="neon-portfolio-note-dot" />
            <span>
              <strong>Mockups interactivos basados en desarrollos reales</strong> · Prototipos interactivos con funciones de producción: cálculos AEA, cotizador Dólar Blue, Panel con IA, agendamiento médico y sitios corporativos.
            </span>
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
              className={`neon-portfolio-tab ${activeCategory === cat.id ? 'active' : ''}`}
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
                  {/* Visual Mockup Showcase Header (Laptop + Companion Smartphone) */}
                  <div className="neon-mockup-wrapper">
                    {/* Laptop Mockup Frame */}
                    <div className="neon-laptop-frame">
                      <div className="neon-laptop-camera" />
                      <div className="neon-laptop-screen">
                        {/* Browser Top bar (hidden on the video showcase card) */}
                        {project.mockupType !== 'web-app-dashboard' && (
                          <div className="neon-mockup-bar">
                            <div className="neon-mockup-dots">
                              <span />
                              <span />
                              <span />
                            </div>
                            <span className="neon-mockup-url">{project.laptopView.title}</span>
                            <span className="neon-mockup-badge">{project.laptopView.badge}</span>
                          </div>
                        )}

                        {/* Render customized mockup body */}
                        {renderMockupContent(project.mockupType)}
                      </div>
                      <div className="neon-laptop-base" />
                    </div>

                    {/* Companion Smartphone Mockup Frame (hidden on the video showcase card) */}
                    {project.mockupType !== 'web-app-dashboard' && (
                    <div className="neon-phone-frame">
                      <div className="neon-phone-notch" />
                      <div className="neon-phone-screen">
                        <div className="neon-phone-header">
                          <span className="neon-phone-time">11:29</span>
                          <span className="neon-phone-battery">89%</span>
                        </div>
                        <div className="neon-phone-app-content">
                          <span className="neon-phone-app-title">{project.mobileView.title}</span>
                          <div className="neon-phone-card-preview">
                            <div className="neon-phone-status-pill">
                              <Zap size={10} color="#facc15" /> {project.mobileView.status}
                            </div>
                            <div className="neon-phone-btn-action">
                              <PlusCircle size={10} /> {project.mobileView.action}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>

                  {/* Project Info Body */}
                  <div className="neon-project-content">
                    <div className="neon-project-meta-row">
                      <span className="neon-project-category-tag neon-project-badge-tag">{project.badgeTag}</span>
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

        {/* Bottom Banner inside Portfolio */}
        <div className="neon-portfolio-cta-box">
          <div className="neon-portfolio-cta-content">
            <span className="neon-mono-label neon-accent-label">EL PRÓXIMO PASO</span>
            <h3 className="neon-portfolio-cta-title">¿Querés una Web App o Sistema de Gestión a medida de tu negocio?</h3>
            <p>
              Diseñamos soluciones potentes que integran cálculo de costos, Inteligencia Artificial, presupuestos en vivo y conexión con WhatsApp para instaladores, técnicos, empresas y profesionales.
            </p>
          </div>
          <a
            id="portfolio-whatsapp-cta-direct"
            href="https://wa.me/5492664484918?text=Hola%20Maxi%2C%20vi%20el%20SaaS%20de%20gesti%C3%B3n%20para%20electricistas%20y%20quiero%20cotizar%20un%20sistema%20para%20mi%20negocio"
            target="_blank"
            rel="noreferrer"
            className="neon-portfolio-yellow-button"
          >
            <span>Hablemos por WhatsApp</span>
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="neon-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="neon-modal-content"
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
                <h2>{selectedProject.title}</h2>
                <p className="neon-modal-subtitle">{selectedProject.subtitle}</p>
              </div>

              <div className="neon-modal-body">
                <div className="neon-modal-section">
                  <h4>¿Qué resuelve este sistema?</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="neon-modal-section">
                  <h4>Funcionalidades y módulos incluidos en este desarrollo</h4>
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
                    <strong>Desarrollo 100% a medida:</strong> Cálculos específicos de tu industria, cotizaciones de insumos en vivo,
                    alertas con Inteligencia Artificial, bots de WhatsApp/Telegram y flujos adaptados a la operatoria exacta de tu empresa.
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


